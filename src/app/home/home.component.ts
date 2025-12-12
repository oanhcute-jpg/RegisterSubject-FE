import { Component, Input, OnInit, Type, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { SubjectServiceService } from '../service/subject-service.service';
import * as bootstrap from 'bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();
  subjectResp: SubjectResp = new SubjectResp();
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

  isSubmitted: boolean = false;
  ngOnInit(): void {
    // this.getAllEmployee();
    this.subjectService.getAllSubject(this.subjectResp).subscribe((data) => {
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

  // AddEmployee() {
  //   this.router.navigate(['AddEmployee']);
  // }
  AddEmployee() {
    const modalEl = document.getElementById('user-form-modal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  deleteEmployeeConfirmation(employee: any) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.deleteEmployee(employee);
        },
        (reason) => {}
      );
  }

  deleteEmployee(employee: any) {
    this.httpProvider.deleteEmployeeById(employee.id).subscribe(
      (data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            this.getAllEmployee();
          }
        }
      },
      (error: any) => {}
    );
  }
  addSubject(isValid: any) {
    this.isSubmitted = true;
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
    this.subjectService.getAllSubject(this.subjectResp).subscribe((data) => {
      this.employeeList = data;
    });
    window.location.reload();
  }
}
export class SubjectResp {
  search: String = '';
  pageSize: any;
  page: any;
}
export class employeeForm {
  name: String = '';
  code: String = '';
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
