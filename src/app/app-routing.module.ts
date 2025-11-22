import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HomeComponent } from './home/home.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterSubjectComponent } from './register-subject/register-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'teacher/home', pathMatch: 'full' },

      // Teacher route
      {
        path: 'teacher/home',
        component: AddSubjectComponent,
        canActivate: [RoleGuard],
        data: { roles: ['teacher'] }
      },

      // Student routes
      {
        path: 'student/calendar',
        component: CalendarComponent,
        canActivate: [RoleGuard],
        data: { roles: ['student'] }
      },
      {
        path: 'student/register-subject',
        component: RegisterSubjectComponent,
        canActivate: [RoleGuard],
        data: { roles: ['student'] }
      },

      // Employee routes (ví dụ chỉ ADMIN)
      {
        path: 'ViewEmployee/:employeeId',
        component: ViewEmployeeComponent,
        canActivate: [RoleGuard],
        data: { roles: ['teacher'] }
      },
      {
        path: 'AddEmployee',
        component: AddEmployeeComponent,
        canActivate: [RoleGuard],
        data: { roles: ['teacher'] }
      },
      {
        path: 'add-subject',
        component: AddSubjectComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'teacher'] } // tùy bạn
      },
      {
        path: 'EditEmployee/:employeeId',
        component: EditEmployeeComponent,
        canActivate: [RoleGuard],
        data: { roles: ['teacher'] }
      },
    ],
  },

  // Auth
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
     scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
  })],
  
  exports: [RouterModule],
})
export class AppRoutingModule {}
