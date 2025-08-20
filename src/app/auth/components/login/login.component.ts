import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Updated minlength to 6
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Login Request Called");
      const payload = this.loginForm.value;
      this.authService.loginUser(payload).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          alert("Login Successful");
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', res.data.username);
          if (res.data.role == 'admin') {
            this.router.navigate(['admin']);
          } else if (res.data.role == 'student') {
            this.router.navigate(['student']);
          } else if (res.data.role == 'mentor') {
            this.router.navigate(['mentor']);
          }
          console.log(localStorage.getItem('token') + " " + localStorage.getItem('username'));
        }
      });
    }
  }
}