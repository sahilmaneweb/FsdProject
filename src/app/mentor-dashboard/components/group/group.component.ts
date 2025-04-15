import { Component, OnInit } from '@angular/core';
import { MentorServiceService } from '../../services/mentor-service.service';

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {
  mentorId:string = "";
  groups: any[] = [];

  constructor(private mentorService:MentorServiceService){}

  ngOnInit(): void {
      this.mentorId = localStorage.getItem('username') || '';
      this.loadGroups();
  }
  loadGroups() {
    this.mentorService.getGroupsOfMentor(this.mentorId).subscribe((res:any)=>{
      console.log(res.data);
      this.groups = res.data;
    })
  }

}
