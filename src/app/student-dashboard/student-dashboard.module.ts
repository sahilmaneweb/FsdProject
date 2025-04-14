import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardRoutingModule } from './student-dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GroupComponent } from './components/group/group.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { StudentDashboardServiceService } from './services/student-dashboard-service.service';


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
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[provideHttpClient(), StudentDashboardServiceService]
})
export class StudentDashboardModule { }
