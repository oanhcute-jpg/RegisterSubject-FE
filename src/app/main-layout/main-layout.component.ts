import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private router:Router) { }
username: string | null = null;
  role: string = '';


ngOnInit(): void {
    this.role = localStorage.getItem('role') || ''; // hoặc lấy từ service
  this.username = localStorage.getItem("username");
  // console.log(localStorage.getItem("username"))
}
registerSubject(){
  this.router.navigate(['/student/register-subject']);
}
home(){
  this.router.navigate(['/Home']);
}
clendar(){
  this.router.navigate(['/student/calendar']);
}
logout(){
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
