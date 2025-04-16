import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  standalone: false,
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  studentAttendanceForm!: FormGroup;
  attendanceForm!: FormGroup;
  uids: { uid: string; name: string }[] = [];
  batches: any[] = [];
  selectedBatch: string = '';
  selectedMonth: string = '';
  studentsAttendance: any[] = [];

  dateList: string[] = [];
  date: string[] = [];
  year!: number;
  month!: number;

  constructor(private fb: FormBuilder, private service: AdminDashboardService) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      batch: [''],
      month: ['']
    });
    this.studentAttendanceForm = this.fb.group({});

    this.service.getBatches().subscribe((batches: any) => {
      this.batches = batches?.data;
    });
  }

  onLoad() {
    const { batch, month } = this.attendanceForm.value;
    if (!batch || !month) return;

    this.selectedBatch = batch;
    this.selectedMonth = month;

    const [year, monthNum] = month.split('-').map(Number);
    this.year = year;
    this.month = monthNum;

    this.generateDateList(this.selectedMonth);

    // 1. Load all students from the selected batch
    this.service.getStudentsByBatch(this.selectedBatch).subscribe((studentsResponse: any) => {
      const allStudents = studentsResponse?.data || [];

      const studentList = allStudents.map((s: any) => ({
        uid: s.uid,
        name: s.name
      }));

      // 2. Load attendance data for that month and batch
      this.service.getAttendanceByBatchAndMonth(this.selectedBatch, this.selectedMonth).subscribe((attendanceResponse: any) => {
        const attendanceData = attendanceResponse?.data || {};

        // Ensure every student has an entry, even if they are newly added
        studentList.forEach((student: { uid: string; name: string }) => {
          if (!attendanceData[student.uid]) {
            attendanceData[student.uid] = []; // Empty attendance
          }
        });

        this.uids = studentList;
        this.studentAttendanceForm = this.fb.group({});

        // 3. Build the form
        for (let student of this.uids) {
          const uid = student.uid;
          const attendanceArray = attendanceData[uid];

          for (let date of this.dateList) {
            const found = attendanceArray.find((entry: any) => entry.date === date);
            const fieldName = `${uid}_${date}`;
            const isPresent = found?.status === 'PRESENT';
            this.studentAttendanceForm.addControl(fieldName, this.fb.control(isPresent));
          }
        }
      });
    });
    console.log('Form controls:', Object.keys(this.studentAttendanceForm.controls));

  }

  generateDateList(month: string) {
    const [year, mon] = month.split('-').map(Number);
    const totalDays = new Date(year, mon, 0).getDate();
    this.dateList = Array.from({ length: totalDays }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`);
    this.date = Array.from({ length: totalDays }, (_, i) => `${String(i + 1).padStart(2, '0')}`);
  }

  createFormWithDefaults() {
    this.studentAttendanceForm = this.fb.group({});
    if (!this.uids) return;
    for (let student of this.uids) {
      for (let date of this.dateList) {
        const fieldName = `${student.uid}_${date}`;
        this.studentAttendanceForm.addControl(fieldName, this.fb.control(false));
      }
    }
  }

  clearForm() {
    if (this.studentAttendanceForm) {
      Object.keys(this.studentAttendanceForm.controls).forEach(key => {
        this.studentAttendanceForm.get(key)?.setValue(false);
      });
    }
  }

  saveAttendance() {
    const formData = this.studentAttendanceForm.value;
    const requestPayload = Object.entries(formData).map(([key, value]) => {
      const [uid, date] = key.split('_');
      return {
        uid,
        date,
        status: value ? 'PRESENT' : 'ABSENT'
      };
    });

    this.service.markAttendance(requestPayload).subscribe((res: any) => {
      alert(res.message);
    });
  }

  toggleAttendance(uid: string, date: string) {
    const controlName = `${uid}_${date}`;
    const control = this.studentAttendanceForm.get(controlName);
    if (control) {
      control.setValue(!control.value);
    }
  }
}
