import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { MentorServiceService } from '../../services/mentor-service.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students:any[]=[];
  mentorId:string = '';
  selectedStudent: any | null = null;
  showModal: boolean = false;

  constructor(private mentorService:MentorServiceService, private renderer: Renderer2, private el: ElementRef){}

  ngOnInit(): void {
      this.mentorId = localStorage.getItem('username') || '';
      this.loadStudents()
  }

  loadStudents(){
    this.mentorService.getMentorStudents(this.mentorId).subscribe((res:any)=>{
      this.students = res.data;
      console.log(res.data);
    })
  }

  openStudentDetails(student: any) {
    this.selectedStudent = student;
    this.showModal = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  closeStudentDetails() {
    this.selectedStudent = null;
    this.showModal = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}