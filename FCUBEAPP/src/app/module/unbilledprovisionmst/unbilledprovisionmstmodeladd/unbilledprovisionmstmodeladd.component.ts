
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import {UnbillprovisionmstList } from 'src/app/models/unbillprovisionmstlist';
import {Unbilledprovisionmstmodel } from 'src/app/models/unbillprovisionmst';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { UnbilledProvisionMstService } from 'src/app/services/unbilledprovisionmst.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-unbilledprovisionmstmodeladd',
  templateUrl: './unbilledprovisionmstmodeladd.component.html',
  styleUrls: ['./unbilledprovisionmstmodeladd.component.css']
})
export class UnbilledprovisionmstmodeladdComponent {

    loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  ptype: string = '';
  formProvision!: FormGroup;
  keywordLocation = 'dataName';
    docDetails = new Reportmodel();

  formSubmitted = false;
  responseDetails = new Responsemodel();
  selectedUnbilledprovisionmstDetails = new Unbilledprovisionmstmodel();
  Driversalarysearch = new Pagerequestwithdatesmodel();
  creditacList: Dropdownmodel[] = [];
  creditacListNew: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  editMode = false;
  createmode  = true;
  createStatus = false;
  customStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  searchenable = true;

  constructor(private unbilledprovisionmstmodel: Unbilledprovisionmstmodel, 
    private commonService: CommonService,  
    private route: Router,private unbilledProvisionMstService: UnbilledProvisionMstService, 
    private formBuilder: FormBuilder, private toasterService: ToastrService,
    private sharedService: SharedService,private requestmodel:Requestmodel) {
    this.unbilledprovisionmstmodel = new Unbilledprovisionmstmodel();

}

ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Unbilled Provision"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 1);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
        
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

    }
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }
    
    this.sharedService.loading = true;

    this.selectedUnbilledprovisionmstDetails = this.unbilledProvisionMstService.getunBillProvisionDetails();
    this.formProvision = this.formBuilder.group({
     
      provisionDate : new FormControl(this.loginDate,[Validators.required]),
     // fromDt: new FormControl(this.fromDate,[Validators.required]),
   
  
      selectedAll: new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
  
   // this.getCreditAcList2("B");
    
   // this.formDriverSalaryStatement.controls['driverSalStmtNo'].disable();   

 
    setTimeout(() => {
      this.createmode = true;
      if (this.selectedUnbilledprovisionmstDetails.id != '') {
        this.formProvision.patchValue(this.selectedUnbilledprovisionmstDetails);  
    
        this.formProvision.patchValue({
          provisionDate :    this.commonService.formatDate(this.selectedUnbilledprovisionmstDetails.provisionDate), 
       
        });
        this.editMode = true;
        this.customStatus = true;
        this.searchenable = false;

        this.getUnBilledProvisionInnerGridList();  

       // this.formDriverSalaryStatement.controls['transDt'].disable();   
    
      }      
    }, 2000);

    this.sharedService.loading = false;    
  }
  

  get f() { return this.formProvision.controls; }

  get formArray() {
    return this.formProvision.get("arrayList") as FormArray;
  }

   searchStatement(): void {
    var selectedDataValue = this.formProvision.getRawValue();
    this.docDetails.fromDate = selectedDataValue.provisionDate;
    this.docDetails.filterStr = this.year;

    this.unbilledProvisionMstService.getprovisionSearchList(this.docDetails).subscribe((res: Unbilledprovisionmstmodel) => {
      this.unbilledprovisionmstmodel = res;
      this.formArray.clear();      
      for (var i = 0; i < res.unBillProvisionDtlList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("id")?.setValue(res.unBillProvisionDtlList[i].id);
        this.formArray.controls[i].get("branchCode")?.setValue(res.unBillProvisionDtlList[i].branchCode);
        this.formArray.controls[i].get("partyCode")?.setValue(res.unBillProvisionDtlList[i].partyCode);
        this.formArray.controls[i].get("amount")?.setValue(res.unBillProvisionDtlList[i].amount);
        this.formArray.controls[i].get("branchName")?.setValue(res.unBillProvisionDtlList[i].branchName);
        
        this.formArray.controls[i].get("partyName")?.setValue(res.unBillProvisionDtlList[i].partyName);
     
       // this.formArray.controls[i].get("vehicleMasterId")?.disable();
      //  this.formArray.controls[i].get("driverMasterId")?.disable();

      }
    });
  }


   createInitialArray() {
    return this.formBuilder.group({
      id:  ['', []],
      branchCode :  ['', []],
        partyCode :  ['', []],
      amount:  ['', []],
         branchName:  ['', []],
           partyName:  ['', []],
     
    }); 
  }

   getUnBilledProvisionInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedUnbilledprovisionmstDetails.id;
    this.unbilledProvisionMstService.getRatesMasterNewInnerGridList(this.requestmodel).subscribe((res) => {
      this.unbilledprovisionmstmodel = res;
     
      this.formArray.clear();      
      for (var i = 0; i < res.unBillProvisionDtlList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("id")?.setValue(res.unBillProvisionDtlList[i].id);
        this.formArray.controls[i].get("branchCode")?.setValue(res.unBillProvisionDtlList[i].branchCode );
         this.formArray.controls[i].get("partyCode")?.setValue(res.unBillProvisionDtlList[i].partyCode );
                  this.formArray.controls[i].get("partyName")?.setValue(res.unBillProvisionDtlList[i].partyName );
                  this.formArray.controls[i].get("branchName")?.setValue(res.unBillProvisionDtlList[i].branchName );
        this.formArray.controls[i].get("amount")?.setValue(res.unBillProvisionDtlList[i].amount );
   

      //  this.formArray.controls[i].get("vehicleMasterId")?.disable();
     //   this.formArray.controls[i].get("driverMasterId")?.disable();
      //  this.formArray.controls[i].get("vehicleNo")?.disable();
   

      }
    });    
  }

    provisionDelete(): void {
    if(this.selectedUnbilledprovisionmstDetails.id != '' ){
     this.requestmodel.strRequest =this.selectedUnbilledprovisionmstDetails.id
      if (confirm("Are you sure, you want to delete this?")) {
            this.unbilledProvisionMstService.unbillprovisionDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(res.status){
              this.toasterService.success(this.responseDetails.message);
              this.formProvision.reset();
              this.route.navigate(['/unbillprovision']);
            }
            else{
              this.toasterService.success(this.responseDetails.message);
            }
        });
      }
    }
  }  

  exit(): void {
    this.route.navigate(['/unbillprovision']);
  }    
  
saveStatementDetails(): void {
    this.formSubmitted = true;
    if (this.formProvision.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formProvision.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var selectedDataValue = this.formProvision.getRawValue();
    this.unbilledprovisionmstmodel.id = this.selectedUnbilledprovisionmstDetails.id ;
    this.unbilledprovisionmstmodel.provisionDate = selectedDataValue.provisionDate;

  
    this.unbilledprovisionmstmodel.yearId = this.year;
    this.unbilledprovisionmstmodel.loggedInUser = this.loggedInUserID;
   
    for (var i = 0; i < selectedDataValue.arrayList.length ; i++) {
     // this.unbilledprovisionmstmodel.unBillProvisionDtlList[i].id = "";
      this.unbilledprovisionmstmodel.unBillProvisionDtlList[i].id =this.selectedUnbilledprovisionmstDetails.id
      this.unbilledprovisionmstmodel.unBillProvisionDtlList[i].branchCode  = selectedDataValue.arrayList[i].branchCode ;
            this.unbilledprovisionmstmodel.unBillProvisionDtlList[i].partyCode  = selectedDataValue.arrayList[i].partyCode ;
        this.unbilledprovisionmstmodel.unBillProvisionDtlList[i].amount  = selectedDataValue.arrayList[i].amount ;
    //  this.unbilledprovisionmstmodel.driverSalaryListData[i].lastTripDt = selectedDataValue.arrayList[i].lastTripDt;
    //  this.driversalarystatementmodel.driverSalaryListData[i].fromDt = selectedDataValue.fromDt;

    }

    this.unbilledProvisionMstService.unbillprovisionSubmitted(this.unbilledprovisionmstmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(res.status){
        this.toasterService.success(this.responseDetails.message);
        this.formProvision.reset();
        this.route.navigate(['/unbillprovision']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }
}


  

