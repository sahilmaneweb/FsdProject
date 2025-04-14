import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsComponent } from './components/students/students.component';
import { GroupComponent } from './components/group/group.component';

const routes: Routes = [{
  path:'',
  component:DashboardLayoutComponent,
  children:[
    {
      path: 'profile',
      component: ProfileComponent
    },
    {
      path:'students',
      component: StudentsComponent
    },
    {
      path: 'group',
      component: GroupComponent
    },
    {
      path: 'attendance',
      component: GroupComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorDashboardRoutingModule { }
