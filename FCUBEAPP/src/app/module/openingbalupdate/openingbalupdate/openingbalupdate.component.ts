import { Component } from '@angular/core';

import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Consolidateopenballistmodel } from 'src/app/models/consolidateopenballistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ConsolidatedopnbalService } from 'src/app/services/consolidatedopnbal.service';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-openingbalupdate',
  templateUrl: './openingbalupdate.component.html',
  styleUrls: ['./openingbalupdate.component.css']
})
export class OpeningbalupdateComponent {
   loggedInUserID: string = '';
  formBankRecEntry!: FormGroup;
  formSubmitted = false;
  year: string = '';
  yearList:Dropdownmodel[]=[];
  balList: Consolidateopenballistmodel = new Consolidateopenballistmodel();
  responseDetails = new Responsemodel();
  request = new Requestmodel()
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  constructor(private route: Router, private formBuilder: FormBuilder,
     private sharedService: SharedService,
    private consolidatedopnbalService: ConsolidatedopnbalService,
    private toasterService: ToastrService, private commonService: CommonService) {
}
 ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Carry Forward Opening");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    
      this.sharedService.loggedInStatus = true;
        var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var userData2 = sessionStorage.getItem('yearID')?.toString();
    if (typeof userData2 !== 'undefined' && userData2 !== null && userData2 !== '') {
      this.year = userData2;
    }
    else {
      this.route.navigate(['/']);
    }
    this.getYearList();

  }

  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  } 
  updateForm(): void {    
    this.sharedService.loading = true;
    this.request.strRequest = this.year; 
    this.consolidatedopnbalService.updateOpeningBal(this.request).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message); 
        this.route.navigate([this.dashboard]);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
    this.sharedService.loading = false;
  }
}




