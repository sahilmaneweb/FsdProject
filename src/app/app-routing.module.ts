import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'student',
  loadChildren: () => import('./student-dashboard/student-dashboard.module').then(m => m.StudentDashboardModule)
},{
  path:'admin',
  loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
},
{
  path: '',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
