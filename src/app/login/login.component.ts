import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLoginEntity: FormLogin = new FormLogin();
  username: String = '';
  message: String = 'Tài khoản hoặc mật khẩu không chính xác.';
  status: String = 'success';
  @ViewChild('formLoginEntitys')
  formLogin!: NgForm;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.formLoginEntity);
    this.loginService.login(this.formLoginEntity).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
          localStorage.setItem('username', res.username);
          localStorage.setItem('status', res.status);
          // this.username = res.username;
          if (res.role === 'teacher') {
            this.router.navigate(['/teacher/home']);
          } else {
            console.log(localStorage.getItem('role'));
            this.router.navigate(['/student/register-subject']);
          }
        } else {
          this.status=res.status
          localStorage.setItem('status', res.status);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
export class FormLogin {
  username: String = '';
  password: String = '';
}
