import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Dashboardmodel } from 'src/app/models/dashboardmodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-dashboardncc',
  templateUrl: './dashboardncc.component.html',
  styleUrls: ['./dashboardncc.component.css']
})
export class DashboardnccComponent {

  dashboard= new Dashboardmodel();
  request = new Requestmodel();

  preMonth: string = '';
  prvMonth: string = '';
  oldMonth: string = '';
  selectedUserID: string = '';
  loginDate: string = '';

  constructor(private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService ) 
    {   }

  ngOnInit(): void {
    
        var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.selectedUserID = userData;
    }
    if (this.selectedUserID) {
      console.log(this.selectedUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.getNccDashBoardDetails();
    
  }  

  getNccDashBoardDetails(): void {
    this.request.strRequest = new Date(this.loginDate).toISOString().slice(0,10);
    
    this.commonService.getNccDashBoardDetails(this.request).subscribe((res) => {
      this.dashboard = res;
    });
  }


}
