import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorServiceService } from '../../services/mentor-service.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  isEditing: boolean = false;
  mentorProfile:any = {};
  mentorId:string ='';
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private mentorDashboard: MentorServiceService) {
    this.profileForm = this.fb.group({
      mentorId: [{ value : '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', Validators.required],
      batchName: [{ value: '', disabled: true }, Validators.required],
      department:[{ value: '', disabled: true }, Validators.required],
      specialization:[{ value: '', disabled: true }, Validators.required]
    });

    this.userForm = this.fb.group({
      username: [{value:'',disabled:true}, Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
      newPassword: ['', Validators.required,Validators.minLength(10)],
    })
  }

  ngOnInit(): void {
      this.loadProfileData();
      this.userForm.get('username')?.setValue(this.mentorId);
      this.profileForm.disable();
  }

  loadProfileData(){
    this.mentorId = localStorage.getItem('username') || '';
    this.mentorDashboard.getMentorProfile(this.mentorId).subscribe((data:any) => {
      console.log(data.data);
      this.mentorProfile = data.data;
      this.profileForm.patchValue(
        {
          mentorId: this.mentorProfile.mentorId,
          name: this.mentorProfile.name,
          email: this.mentorProfile.email,
          contact: this.mentorProfile.contact,
          gender: this.mentorProfile.gender,
          batchName: this.mentorProfile.batch.batchName,
          department: this.mentorProfile.department,
          specialization: this.mentorProfile.specialization
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
      this.profileForm.get('mentorId')?.disable();
      this.profileForm.get('batchName')?.disable();
      this.profileForm.get('department')?.disable();
    }
  }

  saveProfile() {
    
      let payload = this.profileForm.value;
      payload = {
        "name": payload.name,
        "email": payload.email,
        "contact": payload.contact,
        "gender": payload.gender,
        "batchName": payload.batchName,
        "department": payload.department,
        "specialization": payload.specialzation
      };
      this.mentorDashboard.updateProfile(payload, this.mentorId).subscribe(() => {
        alert('Profile saved successfully!');
        this.toggleEdit();
        this.loadProfileData();
      });
    }
    
    changePassword(){
      if(this.userForm.valid){
        this.mentorDashboard.changePassword(this.userForm.value).subscribe((data:any) => {
          alert('Password changed successfully!');
          this.userForm.reset();
        }
        );
      }
    }
}
