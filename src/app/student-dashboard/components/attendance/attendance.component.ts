import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  presentLectures = 22;
  totalLectures = 30;

  get attendancePercentage(): number {
    return Math.round((this.presentLectures / this.totalLectures) * 100);
  }
}
