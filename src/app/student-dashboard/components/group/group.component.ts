import { Component, OnInit } from '@angular/core';
import { StudentDashboardServiceService } from '../../services/student-dashboard-service.service';

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  uid:string ="";
  groupId:string ="";
  batchName:string = '';
  students:any[] = [ ];

  project:any = { };

  mentors:any[] = [ ];

  constructor(private studentDashboard:StudentDashboardServiceService){}

  ngOnInit(): void {
      this.uid = "S1051423";
      this.loadGroup();
  }

  loadGroup(){
    this.studentDashboard.getGroupByStudent(this.uid).subscribe((res:any)=>{
      const group = res.data;
      this.groupId = group.groupId;
      this.batchName = group.batchName;
      this.students = group.students;
      this.project = {
        projectTitle: group.projectTitle,
        projectDescription: group.projectDescription,
      };
      this.mentors = group.mentors;
    })
    console.log("Group loaded successfully...");
  }
}
