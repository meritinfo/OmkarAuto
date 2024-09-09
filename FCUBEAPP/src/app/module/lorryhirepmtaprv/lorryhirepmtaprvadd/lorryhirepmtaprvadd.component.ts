import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Lorryhirereqmodel } from 'src/app/models/lorryhirereqmodel';
import { LorryhirereqService } from 'src/app/services/lorryhirereq.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-lorryhirepmtaprvadd',
  templateUrl: './lorryhirepmtaprvadd.component.html',
  styleUrls: ['./lorryhirepmtaprvadd.component.css']
})
export class LorryhirepmtaprvaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  editMode = false;

  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  challanId: string = "";
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  selectedLorryhirereqDetails = new Lorryhirereqmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private lorryhirereqmodel: Lorryhirereqmodel,private requestmodel:Requestmodel, 
    private toasterService: ToastrService,private lorryhirereqService: LorryhirereqService, 
    private commonService: CommonService) {
    this.lorryhirereqmodel = new Lorryhirereqmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Lorry Hire Extra Payment Approval");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    var userData = sessionStorage.getItem('uid')?.toString();
    
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   

    this.getBranchList();
    this.getYearList(); 

    this.selectedLorryhirereqDetails = this.lorryhirereqService.getLorryhireReqDetails();

    this.formUser = this.formBuilder.group({
      reqBranch: new FormControl('',[Validators.required]),
      reqDate: new FormControl('',[Validators.required]),
      chYear: new FormControl('',[Validators.required]),
      challanBranch: new FormControl('',[Validators.required]),
      challanNo: new FormControl('',[Validators.required]),    
      appRejDate: new FormControl(this.loginDate,[Validators.required]),
      appRejRemarks: new FormControl('',[Validators.required]),
      extraHamali: new FormControl('',),
      extraDeten: new FormControl('',),
      extraOthers: new FormControl('',),
      extraOthers2: new FormControl('',),
      extraOthers3: new FormControl('',),  
      extraHamaliApp: new FormControl('',),
      extraDetenApp: new FormControl('',),
      extraOthersApp: new FormControl('',),
      extraOthers2App: new FormControl('',),
      extraOthers3App: new FormControl('',),
      remarks: new FormControl('',),
    });

    setTimeout(() => {
      this.formUser.controls["reqBranch"].disable();
      this.formUser.controls["reqDate"].disable();
      this.formUser.controls["chYear"].disable();
      this.formUser.controls["challanBranch"].disable();
      this.formUser.controls["challanNo"].disable();
      this.formUser.controls["extraHamali"].disable();
      this.formUser.controls["extraDeten"].disable();
      this.formUser.controls["extraOthers"].disable();
      this.formUser.controls["extraOthers2"].disable();
      this.formUser.controls["extraOthers3"].disable();
      this.formUser.controls["remarks"].disable();

      if (this.selectedLorryhirereqDetails.id != '') {
        this.formUser.patchValue(this.selectedLorryhirereqDetails);
        this.formUser.patchValue({
          reqDate:this.commonService.formatDate(this.selectedLorryhirereqDetails.reqDate),
          appRejDate:this.commonService.formatDate(this.selectedLorryhirereqDetails.finalApprDt),
        })   
        this.challanId = this.selectedLorryhirereqDetails.challanId;   
        this.editMode = true;
      }
    }, 2000);    
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  }    

  exit(): void {
    this.route.navigate(['/lhextrapmtapprlist']);
  }

  deleteextrapmtreq(): void {
    if(this.selectedLorryhirereqDetails.id != '' ){
      this.requestmodel.strRequest = this.selectedLorryhirereqDetails.id;
      if (confirm("Are you sure, you want to delete this?")) {
            this.lorryhirereqService.lorryhireAprvDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/lhextrapmtapprlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

 
  submitextrapmtreqForm(): void {
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
    this.formSubmitted = true;
    var totext = 0;
    if(selectedData.extraHamaliApp!=""){
      totext = totext + parseFloat(selectedData.extraHamaliApp)
    }
    if(selectedData.extraDetenApp!=""){
      totext = totext + parseFloat(selectedData.extraDetenApp)
    }
    if(selectedData.extraOthersApp!=""){
      totext = totext + parseFloat(selectedData.extraOthersApp)
    }
    if(selectedData.extraOthers2App!=""){
      totext = totext + parseFloat(selectedData.extraOthers2App)
    }
    if(selectedData.extraOthers3App!=""){
      totext = totext + parseFloat(selectedData.extraOthers3App)
    }
    var aprv = 'N';
    if (totext >0){
      aprv = 'Y';
    }
   
    this.lorryhirereqmodel.id = this.selectedLorryhirereqDetails.id ;
    this.lorryhirereqmodel.extraHamaliApp = selectedData.extraHamaliApp;
    this.lorryhirereqmodel.extraDetenApp = selectedData.extraDetenApp;
    this.lorryhirereqmodel.extraOthersApp = selectedData.extraOthersApp;
    this.lorryhirereqmodel.extraOthers2App = selectedData.extraOthers2App;
    this.lorryhirereqmodel.extraOthers3App = selectedData.extraOthers3App;
    this.lorryhirereqmodel.finalApprYn = aprv;
    this.lorryhirereqmodel.finalApprBy = this.loggedInUserID;
    this.lorryhirereqmodel.appRejRemarks = selectedData.appRejRemarks.toString().toUpperCase();

    this.lorryhirereqService.lorryhireAprvSubmitted(this.lorryhirereqmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/lhextrapmtapprlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
  }
}




