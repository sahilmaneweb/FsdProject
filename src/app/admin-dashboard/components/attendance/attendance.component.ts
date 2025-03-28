import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  selectedMonth: string = '2025-04'; // April 2025 (YYYY-MM format)
selectedBatch: string = 'Batch 1';

  batches = ['Batch-1', 'Batch-2', 'Batch-3'];

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  students: any[] = [
    { uid: '22-ITB04-26', name: 'Sahil Dilip Mane', attendance: {} },
    { uid: '22-ITB04-27', name: 'Sudhir Vedprakash Maurya', attendance: {} },
    { uid: '22-ITB04-28', name: 'Sakshi Vijay Mashalkar', attendance: {} },
    { uid: '22-ITB04-29', name: 'Aarya Kumar', attendance: {} },
    { uid: '22-ITB04-30', name: 'Kartik Maurya', attendance: {} },
    { uid: '22-ITB04-31', name: 'Kruten Lohar', attendance: {} },
  ];
}
