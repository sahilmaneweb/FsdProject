import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorDashboardRoutingModule } from './mentor-dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsComponent } from './components/students/students.component';
import { GroupComponent } from './components/group/group.component';
import { AttendanceComponent } from './components/attendance/attendance.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProfileComponent,
    StudentsComponent,
    GroupComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    MentorDashboardRoutingModule
  ]
})
export class MentorDashboardModule { }
