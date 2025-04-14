import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import MentorModel from '../../model/Mentor';
import { AdminDashboardService } from '../../services/admin-dashboard.service';
 // Corrected path assuming the file is in 'models' folder

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
  standalone: false
})
export class MentorComponent implements OnInit {
  isFormVisible: boolean = false;
  editingMentor: any | null = null;
  

  mentors: any[] = [];
  batch: any[] = [];

  mentorForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminDashboardService) {
    this.mentorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      batchName: ['', Validators.required],
      department: ['', Validators.required],
      specialization: ['', Validators.required]
    });
  }

  getMentors() {
    this.adminService.getAllMentor().subscribe((res: { data: any[] }) => {
      this.mentors = res.data;
      console.log(res);
    });
  }

  getBatches() {
    this.adminService.getBatches().subscribe((res: { data: any[] }) => {
      this.batch = res.data;
      console.log(res);
    })
  }

  ngOnInit(): void {
      this.getMentors();
  }

  openForm() {
    this.isFormVisible = true;
    this.getBatches();
    this.mentorForm.reset();
  }

  closeForm() {
    this.isFormVisible = false;
  }



  onSubmit() {
    if (this.mentorForm.valid) {
      const mentorData = this.mentorForm.value;
      if (this.editingMentor) {
        this.adminService.editMentor(mentorData, this.editingMentor.mentorId).subscribe((res:any) => {
          if(res.status){
            console.log(res);
            alert(res.message);
            this.getMentors();
          }
        });
        this.editingMentor = null;
      } else {
        this.adminService.addMentor(mentorData).subscribe((res:any) => {
          if(res.status){
            console.log(res);
            alert(res.message);
            this.getMentors();
          }
        });
      }
      this.isFormVisible = false;
      this.mentorForm.reset();
    } else {
      alert('Please fill all the required fields correctly.');
    }
  }

  onEdit(mentor:any) {
    this.getBatches();
    this.editingMentor = mentor;
    this.mentorForm.patchValue({ 
      name : mentor.name,
      email : mentor.email,
      contact : mentor.contact,
      gender : mentor.gender,
      batchName : mentor.batch.batchName,
      department : mentor.department,
      specialization : mentor.specialization
    })
    this.isFormVisible = true;
  }

  onDelete(mentorId: string) {
    this.adminService.deleteMentor(mentorId).subscribe((res:any) => {
      if(res.status){
        alert(res.message);
        this.getMentors();
      }
    });
  }
}
