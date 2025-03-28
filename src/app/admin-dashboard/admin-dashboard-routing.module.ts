import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { StudentComponent } from './components/student/student.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { GroupComponent } from './components/group/group.component';
import { AttendanceComponent } from './components/attendance/attendance.component';

const routes: Routes = [{
  path: '',
  component: DashboardLayoutComponent,
  children: [
    {
      path : 'student',
      component: StudentComponent
    },
    {
      path : 'mentor',
      component: MentorComponent
    },
    {
      path : 'group',
      component: GroupComponent
    },
    {
      path : 'attendance',
      component: AttendanceComponent
    }
   ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
