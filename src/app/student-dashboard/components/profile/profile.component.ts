import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentDashboardServiceService } from '../../services/student-dashboard-service.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing: boolean = false;
  studentProfile:any = {};
  uid:string ='';
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private studentDashboard: StudentDashboardServiceService) {
    this.profileForm = this.fb.group({
      uid: [{ value : '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      batchName: [{ value: '', disabled: true }, Validators.required],
      group: [{ value: '', disabled: true }, Validators.required]
    });

    this.userForm = this.fb.group({
      username: [{value:'',disabled:true}, Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
      newPassword: ['', Validators.required,Validators.minLength(10)],
    })
  }

  ngOnInit(): void {
      this.loadProfileData();
      this.userForm.get('username')?.setValue(this.uid);
      this.profileForm.disable();
  }

  loadProfileData(){
    this.uid = localStorage.getItem('username') || '';
    this.studentDashboard.getStudentProfile(this.uid).subscribe((data:any) => {
      this.studentProfile = data.data;
      this.profileForm.patchValue(
        {
          uid: this.studentProfile.uid,
          name: this.studentProfile.name,
          email: this.studentProfile.email,
          phone: this.studentProfile.phone,
          gender: this.studentProfile.gender,
          batchName: this.studentProfile.batch.batchName,
          group: this.studentProfile.group?.groupId || 'null'
        }
      );
      
    });
  }

  

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.disable();
    } else {
      this.profileForm.enable();
      this.profileForm.get('uid')?.disable();
      this.profileForm.get('batchName')?.disable();
      this.profileForm.get('group')?.disable();
    }
  }

  saveProfile() {
    
      let payload = this.profileForm.value;
      payload = {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        gender: payload.gender,
        address: payload.address,
        batchName: payload.batchName
      };
      this.studentDashboard.updateProfile(payload, this.uid).subscribe(() => {
        alert('Profile saved successfully!');
        this.toggleEdit();
        this.loadProfileData();
      });
    }
    
    changePassword(){
      if(this.userForm.valid){
        this.studentDashboard.changePassword(this.userForm.value).subscribe((data:any) => {
          alert('Password changed successfully!');
          this.userForm.reset();
        }
        );
      }
    }
  
}
