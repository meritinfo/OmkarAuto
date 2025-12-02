import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboardcust',
  templateUrl: './dashboardcust.component.html',
  styleUrls: ['./dashboardcust.component.css']
})

export class DashboardcustComponent implements OnInit {
  custTopAdmin: Requestmodel[] = [];
  custTopInt: Requestmodel[] = [];
  custBottomAdmin: Requestmodel[] = [];
  custBottomInt: Requestmodel[] = [];
  
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 5,
    sortColumn: 'fromPlace',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }

  selectedUserID: string = '';
  dashboard: string = '';
  year: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  constructor(private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private toasterService: ToastrService
  ) {
  }

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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.formUser = this.formBuilder.group({
      pageSize: new FormControl('5',[Validators.required]),
      turnover: new FormControl('10000',[Validators.required]),
      adminInt: new FormControl('5',[Validators.required]),
      dayAfterInt:new FormControl('30',[Validators.required]),
      interest:new FormControl('18',[Validators.required]),
    });   
    
    this.getDashboardCustomer();
  }  

  get f() { return this.formUser.controls; }


  getDashboardCustomer(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var selectedData = this.formUser.getRawValue();
    this.filter.pageNumber = 1;
    this.filter.pageSize = parseInt(selectedData.pageSize);
    this.filter.search = selectedData.turnover;
    this.filter.filterStr = selectedData.adminInt;
    this.filter.filterStr1 = selectedData.dayAfterInt;
    this.filter.filterStr2 = selectedData.interest;
    this.filter.filterStr3 = this.year;
    
    this.getDashboardTopAdminCustomer();
    this.getDashboardBottomAdminCustomer();   
    this.getDashboardTopIntCustomer();
    this.getDashboardBottomIntCustomer();    

  }

  getDashboardTopAdminCustomer(){
    this.filter.sortColumn = "GrossPct";
    this.filter.sortOrder = "asc";
   
    this.commonService.getDashboardCustomer(this.filter).subscribe((res) => {
      this.custTopAdmin = res;
    }); 
  }
  getDashboardBottomAdminCustomer(){
    this.filter.sortColumn = "GrossPct";
    this.filter.sortOrder = "desc";
   
    this.commonService.getDashboardCustomer(this.filter).subscribe((res) => {
      this.custBottomAdmin = res;
    }); 
  }
  getDashboardTopIntCustomer(){
    this.filter.sortColumn = "NetAmount";
    this.filter.sortOrder = "asc";
   
    this.commonService.getDashboardCustomer(this.filter).subscribe((res) => {
      this.custTopInt = res;
    });    
  }  
  getDashboardBottomIntCustomer(){
    this.filter.sortColumn = "NetAmount";
    this.filter.sortOrder = "desc";
   
    this.commonService.getDashboardCustomer(this.filter).subscribe((res) => {
      this.custBottomInt = res;
    });    
  }
}
