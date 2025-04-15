import { Component, OnInit } from '@angular/core';
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
  constructor(private mentorService:MentorServiceService){}

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
}
