import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDashboardComponent } from './components/header-dashboard/header-dashboard.component';



@NgModule({
  declarations: [
    HeaderDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderDashboardComponent
  ]
})
export class CoreModule { }
