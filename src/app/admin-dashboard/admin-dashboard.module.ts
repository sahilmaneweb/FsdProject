import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { StudentComponent } from './components/student/student.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { GroupComponent } from './components/group/group.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { interceptors } from '../shared/interceptor';


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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withInterceptors(interceptors)), AdminDashboardService],
})
export class AdminDashboardModule { }
