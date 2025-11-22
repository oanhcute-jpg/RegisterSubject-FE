import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { SubjectServiceService } from '../service/subject-service.service';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();
  closeResult = '';
  employeeList: any = [];
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService,
    private subjectService: SubjectServiceService
  ) {}
  @ViewChild('employeeForm')
  employeeForm!: NgForm;

  ngOnInit(): void {
    this.getAllSubject();
  }
  getAllSubject() {
    this.subjectService.getAllSubject().subscribe((data) => {
      this.employeeList = data;
    });
  }
  async getAllEmployee() {
    this.httpProvider.getAllEmployee().subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.employeeList = resultData;
          }
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.employeeList = [];
            }
          }
        }
      }
    );
  }
  AddEmployee() {
    const modalEl = document.getElementById('user-form-modal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  addSubject(isValid: any) {
    // this.isSubmitted = true;
    if (isValid) {
      console.log(this.addEmployeeForm);
      this.subjectService.createSubject(this.addEmployeeForm).subscribe(
        async (data) => {
          if (data != null) {
            var resultData = data;

            if (resultData != null) {
              //  this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      );
    }
    this.subjectService.getAllSubject().subscribe((data) => {
      this.employeeList = data;
    });
    window.location.reload();
  }
  deleteById(id: any) {
    this.subjectService.deleteSubject(id).subscribe(() => {
      this.getAllSubject();
    });
    window.location.reload();
  }
}
export class employeeForm {
  name: String = '';
  code: String = '';
  teacherName: String = '';
  roomName: String = '';
  credits: any = '';
  studentNumberMax: any = '';
  department: String = '';
  // description: String = '';
  // registrationStart: String = '';
  // registrationEnd: String = '';
  startDate: String = '';
  endDate: String = '';
  createdDate: String = '';
  updatedDate: String = '';
  userCreated: String = '';
  dayOfWeek: String = '';
  lessonStart: any = '';
  lessonEnd: any = '';
}
