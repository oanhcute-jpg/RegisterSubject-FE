import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { SubjectServiceService } from '../service/subject-service.service';
import { NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { an, dA } from '@fullcalendar/core/internal-common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();
  subjectResp: SubjectResp = new SubjectResp();
  closeResult = '';
  employeeList: any = [];
  modalInstance: any;
  items: any[] = []; // danh sách đầy đủ
  pagedItems: any[] = []; // danh sách hiển thị theo trang

  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalPagesArr: number[] = [];
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService,
    private subjectService: SubjectServiceService
  ) {}
  // @ViewChild('employeeForm')
  @ViewChild('userFormModal') userFormModalRef!: ElementRef;
  employeeForm!: NgForm;
  editingId?: any;
  mode: 'add' | 'edit' | 'view' = 'add';
  pageNumber=0;
  ngOnInit(): void {
   
    // this.items =this.getAllSubject();;  // dữ liệu của bạn
  
    this.getAllSubject();
     this.setupPagination()
  }
  // ngAfterViewInit(): void {
  //   // tạo instance modal bootstrap
  //   if (this.userFormModalRef) {
  //     this.modalInstance = new bootstrap.Modal(
  //       this.userFormModalRef.nativeElement,
  //       {
  //         backdrop: 'static', // không đóng khi click backdrop
  //         keyboard: false,
  //       }
  //     );
  //   }
  // }

  ngOnDestroy(): void {
    if (this.modalInstance) {
      this.modalInstance.dispose();
    }
  }
  getAllSubject() {
    this.subjectResp = {
      search: '',
      pageSize: 8,
      page: this.pageNumber,
    };
    this.subjectService.getAllSubject(this.subjectResp).subscribe((data) => {
    
      this.employeeList = data.subjectResponse;
      this.totalPages=data.pageSize
          this.setupPagination();
      this.items = data.subjectResponse;
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
  resetForm() {
    // reset model
    this.addEmployeeForm = {
      id: null,
      name: '',
      code: '',
      teacherName: '',
      roomName: '',
      credits: '',
      studentNumberMax: '',
      department: '',
      startDate: '',
      endDate: '',
      createdDate: '',
      updatedDate: '',
      userCreated: '',
      dayOfWeek: '',
      lessonStart: '',
      lessonEnd: '',
      classPeriodNumber: null,
    };

    // reset trạng thái form (touched, dirty…)
    if (this.employeeForm) {
      this.employeeForm.resetForm();
    }
  }
  // reset trạng thái form (touched, dirty…)

  AddEmployee() {
    this.mode = 'add';
    const modalEl = document.getElementById('userFormModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
  openPopup() {
    // this.mode = 'add';
    const modalEl = document.getElementById('userFormModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  closeModal() {
    const modalEl = document.getElementById('userFormModal');
    if (modalEl) {
      // console.log("aaaa")
      const modal = new bootstrap.Modal(modalEl);

      modal.hide();
      this.resetForm();
    }
  }

  openEditModal(subject: employeeForm) {
    this.mode = 'edit';

    this.editingId = subject.id;
    // clone data để tránh thay đổi object gốc trước khi submit
    console.log(subject);
    this.addEmployeeForm = { ...subject };
    console.log(this.addEmployeeForm);
    this.openPopup();
  }
  onSubmit(form: NgForm) {
    if (form.invalid) return;
  }
  addSubject(isValid: any) {
    // this.isSubmitted = true;
    if (!isValid) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
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
  // deleteById(id: any) {
  //     if (confirm(`Bạn có chắc chắn muốn xoá môn học này không ?`)) {
  //   this.subjectService.deleteSubject(id).subscribe(() => {
  //     this.getAllSubject();
  //   });
  // }
  //   window.location.reload();
  // }
deleteById(id: any) {
  Swal.fire({
    title: 'Xác nhận xoá',
    text: 'Bạn có chắc chắn muốn xoá môn học này không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xoá',
    cancelButtonText: 'Huỷ',
  }).then((result) => {
    if (result.isConfirmed) {
 this.subjectService.deleteSubject(id).subscribe({
  next: () => {
    console.log('DELETE NEXT');
    window.location.reload();
  },
  error: (err) => {
    this.getAllSubject()
    console.error('DELETE ERROR', err);
  },
  complete: () => {
    console.log('DELETE COMPLETE');
  }
});
    }
  });
}  setupPagination() {
    // this.totalPages = Math.ceil(this.items.length / this.pageSize);
    // console.log(this.totalPages)
    this.totalPagesArr = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
      console.log(this.totalPagesArr)
    this.loadPage();
  }

  loadPage() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    this.pagedItems = this.items.slice(start, end);
  }
  toggleRegister(employee: any) {
 this.subjectService.openRegister(employee).subscribe(() => {
      this.getAllSubject();
    });

  if (employee.isRegister) {
    console.log('Đã mở đăng kí');
  } else {
    console.log('Đã đóng đăng kí');
  }

  // TODO: gọi API backend cập nhật trạng thái
}

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber=page-1
    console.log(this.pageNumber)
    this.currentPage = page;
    this.loadPage();
    this.getAllSubject()
  }
}
export class SubjectResp {
  search: String = '';
  pageSize: any;
  page: any;
}
export class employeeForm {
  id: any;
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
  classPeriodNumber: any;
}
