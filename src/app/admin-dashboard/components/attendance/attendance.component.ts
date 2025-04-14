import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  students: any[] = [];
  days: number[] = [];
  selectedBatch: string = '';
  selectedMonth: string = '';
  batches: any[] = [];

  constructor(private fb: FormBuilder, private service: AdminDashboardService) {}

  ngOnInit(): void {
    this.service.getBatches().subscribe((res: any) => {
      this.batches = res.data;
    });
    this.form = this.fb.group({});
  }


OnBatchChange(batch:string){
  this.selectedBatch = batch;
  console.log(this.selectedBatch);
}
onMonthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedMonth = input.value;
    console.log(this.selectedMonth);
  }

  loadAttendance():void {
    console.log(this.selectedBatch, this.selectedMonth);
    if (!this.selectedBatch || !this.selectedMonth) return;
    const [year, month] = this.selectedMonth.split('-').map(Number); 
    const daysInMonth = new Date(year, month, 0).getDate();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    this.service.getStudentsByBatch(this.selectedBatch).subscribe((res:any)=>{
      this.students = res.data;
      this.form = this.fb.group({});
      for (let student of this.students) {
        for (let day of this.days) {
          const controlName = `${student.id}_${day}`;
          this.form.addControl(controlName, new FormControl(false));
        }
      }
      console.log(this.form);

      this.service.getAttendance(this.selectedBatch, +this.selectedMonth).subscribe((records: any[]) => {
        for (let record of records) {
          const day = new Date(record.date).getDate();
          const control = this.form.get(`${record.student.id}_${day}`);
          if (control) control.setValue(record.status === 'PRESENT');
        }
      });
    })
  }

  saveAttendance(){
    const list: any[] = [];
    for (let student of this.students) {
      for (let day of this.days) {
        const controlName = `${student.id}_${day}`;
        const isPresent = this.form.get(controlName)?.value;
        const date = `${this.selectedMonth}-${String(day).padStart(2, '0')}`;
        list.push({
          studentId: student.uid,
          date,
          status: isPresent ? 'PRESENT' : 'ABSENT',
        });
      }
    }
    this.service.saveAttendance(list).subscribe(() => alert('Attendance Saved'));
  }

  clearAttendance(): void {
    for (let control in this.form.controls) {
      this.form.get(control)?.setValue(false);
    }
  }
  // onBatchChange(event: Event): void {
  //   const select = event.target as HTMLSelectElement;
  //   this.selectedBatch = select.value;
  // }

  // onMonthChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   this.selectedMonth = input.value;
  // }

  // loadAttendance(): void {
  //   if (!this.selectedBatch || !this.selectedMonth) return;

  //   const [year, month] = this.selectedMonth.split('-').map(Number);
  //   const daysInMonth = new Date(year, month, 0).getDate();
  //   this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  //   this.service.getStudentsByBatch(this.selectedBatch).subscribe((students:any) => {
  //     this.students = students.data;

  //     this.form = this.fb.group({});
  //     for (let student of students) {
  //       for (let day of this.days) {
  //         const controlName = `${student.id}_${day}`;
  //         this.form.addControl(controlName, new FormControl(false));
  //       }
  //     }

  //     this.service.getAttendance(this.selectedBatch, +this.selectedMonth).subscribe((records: any[]) => {
  //       for (let record of records) {
  //         const day = new Date(record.date).getDate();
  //         const control = this.form.get(`${record.student.id}_${day}`);
  //         if (control) control.setValue(record.status === 'PRESENT');
  //       }
  //     });
  //   });
  // }

  // saveAttendance(): void {
  //   const list: any[] = [];
  //   for (let student of this.students) {
  //     for (let day of this.days) {
  //       const controlName = `${student.id}_${day}`;
  //       const isPresent = this.form.get(controlName)?.value;
  //       const date = `${this.selectedMonth}-${String(day).padStart(2, '0')}`;
  //       list.push({
  //         studentId: student.uid,
  //         date,
  //         status: isPresent ? 'PRESENT' : 'ABSENT',
  //       });
  //     }
  //   }
  //   this.service.saveAttendance(list).subscribe(() => alert('Attendance Saved'));
  // }

  // clearAttendance(): void {
  //   for (let control in this.form.controls) {
  //     this.form.get(control)?.setValue(false);
  //   }
  // }

  trackByStudent = (_: number, item: any) => item.id;
  trackByDay = (_: number, item: number) => item;
}
