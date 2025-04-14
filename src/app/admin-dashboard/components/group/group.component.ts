import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import GroupModel from '../../model/Group';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  standalone: false
})
export class GroupComponent implements OnInit {

  groups: any[] = [];

  students: any[] = [];
  selectedStudents: any[] = [];

  batch: any[] = [];

  isFormVisible = false;
  editingGroup: any | null ;

  groupForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminDashboardService) {
    this.groupForm = this.fb.group({
      projectTitle: ['', Validators.required],
      projectDescription: ['', Validators.required],
      batchName: ['', Validators.required],
      
    });
  }

  toggleStudentSelection(student: any) {
    const index = this.selectedStudents.indexOf(student);
    if (index === -1) {
      this.selectedStudents.push(student);
    } else {
      this.selectedStudents.splice(index, 1);
    }
    console.log(this.selectedStudents);
  }
  isStudentSelected(student: any): boolean {
    return this.selectedStudents.includes(student);
  }

  getAllGroups() {
    this.adminService.getAllGroups().subscribe((res: any) => {
      this.groups = res.data;
      console.log(res);
    });
  }

  getAllBatches() {
    this.adminService.getBatches().subscribe((res: any) => {
      this.batch = res.data;
      console.log(res);
    }
    );
  }

  ngOnInit(): void {
    this.getAllGroups();
    this.getAllBatches();
    this.groupForm.get('batchName')?.valueChanges.subscribe((value) => {
      this.toggleBatch(value);
    })
  }

  getStudentsByBatchAndGroupNull(batchName: string) {
    this.adminService.getStudentsByBatchAndGroupNull(batchName).subscribe((res: {data : any[]}) => {
      this.students = res.data;
      console.log(res);
    }
    );
  }

  

  toggleBatch(batchName:string){
    if(this.editingGroup){
      console.log("yes");

    }else{
      this.getStudentsByBatchAndGroupNull(batchName);
      console.log("Students of Batch : "+batchName+" & Group Null are fetched successfully");
    }
  }

  

  openForm() {
    this.isFormVisible = true;
    this.editingGroup = null;
    this.getAllBatches();
    this.groupForm.reset();
  }

  editGroup(groupId:string) {
    // const group = this.groups[index];
    // this.isFormVisible = true;
    // this.editingGroup = index;
    // this.groupForm.setValue({
    //   batch: group.batch,
    //   title: group.title,
    //   description: group.description,
    //   students: group.students.join(', '),
    // });
    this.groupForm.reset();
    this.getAllBatches();
    this.adminService.getGroupById(groupId).subscribe((res: any) => {
      if(res.status){
        this.isFormVisible = true;
      this.editingGroup = res.data;
      console.log(this.editingGroup);
      this.groupForm.setValue({
        projectTitle: this.editingGroup.projectTitle,
        projectDescription: this.editingGroup.projectDescription,
        batchName: this.editingGroup.batchName,
      });
      this.groupForm.get('batchName')?.disable();
      for (let student of res.data.students) {
        this.selectedStudents.push(student.uid);
      }
      this.adminService.getStudentsByBatchAndGroupNullOrGroupId(this.editingGroup.batchName, groupId).subscribe((res: {data : any[]}) => {
        this.students = res.data;
      });
      this.isFormVisible = true;
   }
}
  );
  }

  submitForm() {
    if (this.groupForm.invalid) return;
    this.groupForm.get('batchName')?.enable();
    const formData = this.groupForm.value;

    if (this.editingGroup !== null) {
      // this.groups[this.editingGroup] = groupData;
      this.adminService.editGroup(this.editingGroup.groupId, formData, this.selectedStudents).subscribe((res: any) => {
        if(res.status){
          console.log(res);
          alert("Group Edited Successfully");
          this.getAllGroups();
        }
      }
      );
    } else {
      this.adminService.addGroup(formData, this.selectedStudents).subscribe((res: any) => {
        if(res.status){
          console.log(res);
          alert("Group Created Successfully");
          this.getAllGroups();
        }
      }
      );
    }
  
    
    this.closeForm();
  }

  deleteGroup(groupId:string) {
    this.adminService.deleteGroup(groupId).subscribe((res: any) => {
      if(res.status){
        console.log(res);
        alert("Group Deleted Successfully");
      }
    }
    );
    this.getAllGroups();
  }

  closeForm() {
    this.isFormVisible = false;
  }
}
