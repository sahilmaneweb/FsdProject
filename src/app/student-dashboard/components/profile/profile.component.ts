import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  student = {
    uid: 'S101',
    name: 'Sahil Dilip Mane',
    email: 'sahilmane@gmail.com',
    phone: '9876543210',
    address: 'Pune, Maharashtra',
    gender: 'Male',
    batch: 'Batch-1',
    group: 'Group-2',
  };

  updateProfile() {
    alert('Profile updated successfully!');
    console.log('Updated Student:', this.student);
  }
}
