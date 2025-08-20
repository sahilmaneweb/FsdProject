import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // This is optional, but good for ensuring the sidebar exists
    if (!this.sidebar) {
      console.error('Sidebar element not found!');
    }
  }

  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.nativeElement.classList.toggle('open');
    }
  }

  logOut() {
    alert("Logged Out Successfully...");
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }
}