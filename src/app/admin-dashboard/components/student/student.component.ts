import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import StudentModel from '../../model/Student';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
[x: string]: any;
  isFormVisible: boolean = true;
  editingStudent: any | null = null;

  students: any[] = [];
  batch: any[] = [];
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminDashboardService) {
    this.studentForm = this.fb.group({

      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      batchName: ['', Validators.required],

    });
  }

  getStudents() {
    this.adminService.getAllStudent().subscribe((res: { data: any[] }) => {
      this.students = res.data;
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
      this.getStudents();
      this.getBatches();
  }

  openForm(student?: StudentModel) {
    this.getBatches();
    if (student) {
      this.studentForm.get('batchName')?.disable();
      this.editingStudent = student;
      console.log("open : "+this.editingStudent);
      this.studentForm.patchValue({
        name : this.editingStudent.name,
        email : this.editingStudent.email,
        phone: this.editingStudent.phone,
        gender: this.editingStudent.gender,
        batchName: this.editingStudent.batch.batchName
      });
    } else {
      this.studentForm.get('batchName')?.enable();
      this.editingStudent = null;
      this.studentForm.reset();
    }
    this.isFormVisible = true;
    document.body.style.overflow = 'hidden'; // Disable background scroll
  }

  closeForm() {
    this.isFormVisible = false;
    this.studentForm.reset();
    document.body.style.overflow = 'auto'; // Enable background scroll
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (this.editingStudent) {
        // Update Student
        this.adminService.editStudent(this.studentForm.value,this.editingStudent.uid).subscribe((res:any)=>{
          if(res.status){
            alert(res.message);
            console.log(res);
            this.getStudents();
          }
        });
      } else {
        // Add New Student
        // this.adminService.addStudent(this.studentForm.value);
        this.adminService.addStudent(this.studentForm.value).subscribe((res: any) => {
          if(res.status){
            alert(res.message);
            console.log(res);
            this.getStudents();
          }
         });
      }
      this.closeForm();
      
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  onDelete(uid: string) {
    this.adminService.deleteStudent(uid).subscribe((res: any) => {
      console.log(res);
      alert(res.message);
      this.getStudents();
     });
  }
}
