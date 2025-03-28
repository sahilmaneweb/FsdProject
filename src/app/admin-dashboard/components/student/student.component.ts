import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  isFormVisible: boolean = false;

  students = [
    {
      uid: '22-ITB04-26',
      name: 'Sahil Dilip Mane',
      email: 'manesahil2808@gmail.com',
      batch: 'Batch-1',
    },
    {
      uid: '22-ITB04-27',
      name: 'Sudhir Vedprakash Maurya',
      email: 'sudhirmaurya@example.com',
      batch: 'Batch-2',
    },
    {
      uid: '22-ITB04-28',
      name: 'Sakshi Vijay Mashalkar',
      email: 'sakshimashalkar@example.com',
      batch: 'Batch-1',
    },
    {
      uid: '22-ITB04-29',
      name: 'Aarya Kumar',
      email: 'aaryakumar@example.com',
      batch: 'Batch-3',
    },
    {
      uid: '22-ITB04-30',
      name: 'Kartik Maurya',
      email: 'kartikmaurya@example.com',
      batch: 'Batch-2',
    },
    {
      uid: '22-ITB04-31',
      name: 'Kruten Lohar',
      email: 'krutenlohar@example.com',
      batch: 'Batch-3',
    },
  ];

  openForm() {
    this.isFormVisible = true;
  }

  closeForm() {
    this.isFormVisible = false;
  }
}
