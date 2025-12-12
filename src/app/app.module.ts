import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CalendarComponent } from './calendar/calendar.component';

// đăng ký plugin
import { FullCalendarModule } from '@fullcalendar/angular'; // bắt buộc
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import { RegisterSubjectComponent } from './register-subject/register-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { ConfirmDialogComponentComponent } from './confirm-dialog-component/confirm-dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ChecktokenInterceptor } from './interceptor/checktoken.interceptor';
import { ManageUserComponent } from './manage-user/manage-user.component';
// đăng ký plugin
// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   interactionPlugin,
//   timeGridPlugin
// ]);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewEmployeeComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    CalendarComponent,
    RegisterSubjectComponent,
    AddSubjectComponent,
    ConfirmDialogComponentComponent,
    LoginComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    ManageUserComponent,
  ],
  imports: [
    FullCalendarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
        {
        provide: HTTP_INTERCEPTORS,
        useClass: ChecktokenInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
