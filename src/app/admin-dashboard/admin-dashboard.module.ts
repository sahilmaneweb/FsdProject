import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { StudentComponent } from './components/student/student.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { GroupComponent } from './components/group/group.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    StudentComponent,
    MentorComponent,
    GroupComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    CoreModule,
    FormsModule
  ]
})
export class AdminDashboardModule { }
