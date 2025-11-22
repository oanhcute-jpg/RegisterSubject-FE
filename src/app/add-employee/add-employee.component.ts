import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { SubjectServiceService } from '../service/subject-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: employeeForm = new employeeForm();

  @ViewChild("employeeForm")
  employeeForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService,private subjectService:SubjectServiceService) { }

  ngOnInit(): void {
  }

  addSubject(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
   
      this.subjectService.createSubject(this.addEmployeeForm).subscribe(async data => {
        if (data != null ) {
    
            var resultData = data;
               console.log(resultData)
            if (resultData != null) {
            //  this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
       
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class employeeForm {
name:String=''
code:String=''
credits:any=''
studentNumberMax:any=''
department:String=''
description:String=''
registrationStart:String=''
registrationEnd:String=''
startDate:String=''
endDate:String=''
createdDate:String=''
updatedDate:String=''
userCreated:String=''

}