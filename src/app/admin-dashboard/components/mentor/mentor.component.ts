import { Component } from '@angular/core';

@Component({
  selector: 'app-mentor',
  standalone: false,
  templateUrl: './mentor.component.html',
  styleUrl: './mentor.component.css'
})
export class MentorComponent {
  isMentorFormVisible: boolean = false;

  mentors = [
    { id: 1, name: 'Monisha Linkesh', email: 'monisha@gmail.com', batch: 'Batch-1' },
    { id: 2, name: 'Purvi Sankhe', email: 'purvi@gmail.com', batch: 'Batch-2' },
    { id: 3, name: 'Apeksha Waghmare', email: 'apeksha@gmail.com', batch: 'Batch-1' },
    { id: 4, name: 'Nidhi Bavsar', email: 'nidhi@gmail.com', batch: 'Batch-3' },
    { id: 5, name: 'Namdeo Badhe', email: 'namdeo@gmail.com', batch: 'Batch-2' }
  ];
  
  
  openMentorForm() {
    this.isMentorFormVisible = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeMentorForm() {
    this.isMentorFormVisible = false;
    document.body.style.overflow = 'auto';
  }
}
