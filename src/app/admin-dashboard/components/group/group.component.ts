import { Component } from '@angular/core';

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {
  groups = [
    {
      id: 1,
      batch: 'Batch-1',
      title: 'Attendance Management System',
      description: 'Web app for attendance tracking.',
      students: ['Sahil Dilip Mane', 'Sudhir Vedprakash Maurya', 'Sakshi Vijay Mashalkar', 'Aarya Kumar'],
    },
    {
      id: 2,
      batch: 'Batch-2',
      title: 'E-Commerce Portal',
      description: 'Online shop for electronics.',
      students: ['Kartik Maurya', 'Kruten Lohar', 'Rohit Sharma', 'Anjali Patil'],
    },
  ];

  isGroupFormVisible = false;
  editingGroup: any = null;

  groupForm = {
    batch: '',
    title: '',
    description: '',
    students: '',
  };

  openGroupForm() {
    this.isGroupFormVisible = true;
    this.editingGroup = null;
    this.groupForm = { batch: '', title: '', description: '', students: '' };
  }

  editGroup(group: any) {
    this.isGroupFormVisible = true;
    this.editingGroup = group;
    this.groupForm = {
      batch: group.batch,
      title: group.title,
      description: group.description,
      students: group.students.join(', '),
    };
  }

  submitGroupForm() {
    if (this.editingGroup) {
      this.editingGroup.batch = this.groupForm.batch;
      this.editingGroup.title = this.groupForm.title;
      this.editingGroup.description = this.groupForm.description;
      this.editingGroup.students = this.groupForm.students.split(',').map((s) => s.trim());
    } else {
      const newGroup = {
        id: this.groups.length + 1,
        batch: this.groupForm.batch,
        title: this.groupForm.title,
        description: this.groupForm.description,
        students: this.groupForm.students.split(',').map((s) => s.trim()),
      };
      this.groups.push(newGroup);
    }
    this.closeGroupForm();
  }

  deleteGroup(id: number) {
    this.groups = this.groups.filter((g) => g.id !== id);
  }

  closeGroupForm() {
    this.isGroupFormVisible = false;
  }
}
