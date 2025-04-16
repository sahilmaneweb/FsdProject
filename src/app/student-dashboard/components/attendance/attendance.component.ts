import { Component, OnInit } from '@angular/core';
import { StudentDashboardServiceService } from '../../services/student-dashboard-service.service';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  presentLectures:number = 0;
  totalLectures:number = 0;
  percentage:number =0;

  constructor(private studentService:StudentDashboardServiceService){}

  ngOnInit(): void {
      this.loadDashboard();
  }
  loadDashboard(){
    this.studentService.getAttendanceDashboard().subscribe((res:any)=>{
      console.log(res);
      this.presentLectures = res.data.presentLectures;
      this.totalLectures = res.data.totalLectures;
      this.percentage = res.data.percentage;
    })
  }

  get attendancePercentage(): number {
    return Math.round((this.presentLectures / this.totalLectures) * 100);
  }
}
