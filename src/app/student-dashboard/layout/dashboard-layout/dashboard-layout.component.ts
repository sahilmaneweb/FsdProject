import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(private router: Router) {}

  logOut() {
    alert("Logged Out Successfully...");
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.nativeElement.classList.toggle('open');
    }
  }
}