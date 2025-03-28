import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupComponent } from './components/group/group.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CoreModule } from '../core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProfileComponent,
    GroupComponent,
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    StudentDashboardRoutingModule,
    CoreModule,
    FormsModule
  ]
})
export class StudentDashboardModule { }
