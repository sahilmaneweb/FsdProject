import { Component } from '@angular/core';

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  groupNumber = 3;
  batchNumber = 'Batch 1';

  students = [
    { uid: 'S101', name: 'Sahil Dilip Mane', contact: '9876543210', email: 'sahil@example.com' },
    { uid: 'S102', name: 'Sudhir Vedprakash Maurya', contact: '9876512340', email: 'sudhir@example.com' },
    { uid: 'S103', name: 'Sakshi Vijay Mashalkar', contact: '9876523456', email: 'sakshi@example.com' },
    { uid: 'S104', name: 'Aarya Kumar', contact: '9876598765', email: 'aarya@example.com' },
  ];

  project = {
    title: 'Smart Attendance System',
    description: 'A system to manage and track student attendance digitally with reporting features.',
  };

  mentors = [
    { name: 'Monisha Linkesh', contact: '9988776655', email: 'monisha@college.com', department: 'Computer' },
    { name: 'Purvi Sankhe', contact: '8877665544', email: 'purvi@college.com', department: 'IT' },
    { name: 'Apeksha Waghmare', contact: '7766554433', email: 'apeksha@college.com', department: 'Computer' },
  ];
}
