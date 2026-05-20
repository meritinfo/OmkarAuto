import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customerprofitlossrpt',
  templateUrl: './customerprofitlossrpt.component.html',
  styleUrls: ['./customerprofitlossrpt.component.css']
})
export class CustomerprofitlossrptComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string =""; 

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
  year: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  constructor(private route: Router, private formBuilder: FormBuilder, 
    private commonService: CommonService, private toasterService: ToastrService
  ) {
  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Customer Profit/Loss");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
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

    this.formUser = this.formBuilder.group({
      turnover: new FormControl('10000',[Validators.required]),
      adminInt: new FormControl('5',[Validators.required]),
      dayAfterInt:new FormControl('30',[Validators.required]),
      interest:new FormControl('18',[Validators.required]),
    });       
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
    this.filter.search = selectedData.turnover;
    this.filter.filterStr = selectedData.adminInt;
    this.filter.filterStr1 = selectedData.dayAfterInt;
    this.filter.filterStr2 = selectedData.interest;
    this.filter.filterStr3 = this.year;

    this.commonService.getCustomerProfitLossRptExcel(this.filter).subscribe(resp => {      
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "Customer" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }
}
