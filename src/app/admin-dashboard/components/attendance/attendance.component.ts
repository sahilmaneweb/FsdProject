import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  standalone: false,
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceForm!: FormGroup;
  batches: any[] = []; // Fill from backend
  selectedBatch: string = '';
  selectedMonth: string = ''; // format YYYY-MM
  studentsAttendance: any[] = []; // Each element will have: uid, name, attendanceByDay

  daysInMonth: number[] = [];
  year!: number;
  month!: number;

  constructor(private fb: FormBuilder, private service: AdminDashboardService) {}

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({
      batch: [''],
      month: ['']
    });

    // Load batch list from backend
    this.service.getBatches().subscribe((batches: any) => {
      this.batches = batches?.data;
    });
  }

  onLoad() {
    const { batch, month } = this.attendanceForm.value;
    if (!batch || !month) return;

    this.selectedBatch = batch;
    this.selectedMonth = month;
    console.log(month);
    const [year, monthNum] = month.split('-').map(Number);
    this.year = year;
    this.month = monthNum;
    const days = new Date(year, monthNum, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);

    this.service.getAttendanceByBatchAndMonth(batch, `${month}-01`).subscribe((response: any) => {
      // Response is {uid: [Attendance]}, transform into frontend model
      this.studentsAttendance = Object.entries(response.data).map(([uid, records]: any) => {
        const studentName = records[0]?.student?.name || 'Unknown';
        const attendanceByDay: Record<number, 'PRESENT' | 'ABSENT'> = {};
        records.forEach((r: any) => {
          const day = new Date(r.date).getDate();
          attendanceByDay[day] = r.status;
        });

        return { uid, name: studentName, attendanceByDay };
      });
    });
  }

  toggleAttendance(student: any, day: number) {
    const current = student.attendanceByDay[day];
    student.attendanceByDay[day] = current === 'PRESENT' ? 'ABSENT' : 'PRESENT';
  }

  onClear() {
    this.studentsAttendance.forEach(student => {
      this.daysInMonth.forEach(day => {
        student.attendanceByDay[day] = 'ABSENT';
      });
    });
  }

  onSave() {
    const attendanceList: any[] = [];

    this.studentsAttendance.forEach(student => {
      this.daysInMonth.forEach(day => {
        const date = formatDate(new Date(this.year, this.month - 1, day), 'yyyy-MM-dd', 'en');
        const status = student.attendanceByDay[day] || 'ABSENT';
        attendanceList.push({
          uid: student.uid,
          date,
          status
        });
      });
    });

    this.service.markAttendance(attendanceList).subscribe(res => {
      alert('Attendance saved successfully!');
    });
  }
}
