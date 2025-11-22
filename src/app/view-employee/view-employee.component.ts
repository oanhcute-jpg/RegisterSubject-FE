import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { WebApiService } from '../service/web-api.service';
import { SubjectServiceService } from '../service/subject-service.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employeeId: any;
  employeeDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService, private subjectService : SubjectServiceService) { }
  
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];      
    this.getSubjectbyId();
  }

  getSubjectbyId() {       
    this.subjectService.getSubjectById(this.employeeId).subscribe((data : any) => {      
      console.log(data)
      if (data != null ) {
        var resultData = data;
        if (resultData) {
          this.employeeDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

}
