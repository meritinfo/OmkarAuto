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
  selector: 'app-unbilledprovisionmstadd',
  templateUrl: './unbilledprovisionmstadd.component.html',
  styleUrls: ['./unbilledprovisionmstadd.component.css']
})
export class UnbilledprovisionmstaddComponent {
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
  selectedUnbilledprovision = new Unbilledprovisionmstmodel();
  Driversalarysearch = new Pagerequestwithdatesmodel();
  creditacList: Dropdownmodel[] = [];
  creditacListNew: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  editMode = false;
  createStatus = false;
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
    
        
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

    }
    
    this.sharedService.loggedInStatus = true;
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = this.commonService.getCurrentFiscalYear(this.loginDate).eDate.toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    this.sharedService.loading = true;

    this.selectedUnbilledprovision = this.unbilledProvisionMstService.getunBillProvisionDetails();
    this.formProvision = this.formBuilder.group({     
      provisionDate : new FormControl(this.maxDate,[Validators.required]),  
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });

    this.formArray.controls[0].get("branchName")?.disable();
    this.formArray.controls[0].get("partyName")?.disable();
    this.formArray.controls[0].get("amount")?.disable();   
    this.formProvision.controls["provisionDate"]?.disable();

    setTimeout(() => {
      if (this.selectedUnbilledprovision.id != '') {
        this.formProvision.patchValue(this.selectedUnbilledprovision);      
        this.formProvision.patchValue({
          provisionDate: this.commonService.formatDate(this.selectedUnbilledprovision.provisionDate),       
        });
        this.editMode = true;
        this.searchenable = false;
        this.getUnBilledProvisionInnerGridList();  
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
        this.formArray.controls[i].get("branchCode")?.setValue(res.unBillProvisionDtlList[i].branchCode);
        this.formArray.controls[i].get("partyCode")?.setValue(res.unBillProvisionDtlList[i].partyCode);
        this.formArray.controls[i].get("amount")?.setValue(res.unBillProvisionDtlList[i].amount);
        this.formArray.controls[i].get("branchName")?.setValue(res.unBillProvisionDtlList[i].branchName);        
        this.formArray.controls[i].get("partyName")?.setValue(res.unBillProvisionDtlList[i].partyName);

        this.formArray.controls[i].get("branchName")?.disable();
        this.formArray.controls[i].get("partyName")?.disable();  
        this.formArray.controls[i].get("amount")?.disable();  
      }
    });
  }


   createInitialArray() {
    return this.formBuilder.group({
      branchCode :  ['', []],
      partyCode :  ['', []],
      amount:  ['', []],
      branchName:  ['', []],
      partyName:  ['', []],     
    }); 
  }

  getUnBilledProvisionInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedUnbilledprovision.id;
    this.unbilledProvisionMstService.getRatesMasterNewInnerGridList(this.requestmodel).subscribe((res) => {
      this.unbilledprovisionmstmodel = res;
     
      this.formArray.clear();      
      for (var i = 0; i < res.unBillProvisionDtlList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("branchCode")?.setValue(res.unBillProvisionDtlList[i].branchCode );
        this.formArray.controls[i].get("partyCode")?.setValue(res.unBillProvisionDtlList[i].partyCode );
        this.formArray.controls[i].get("partyName")?.setValue(res.unBillProvisionDtlList[i].partyName );
        this.formArray.controls[i].get("branchName")?.setValue(res.unBillProvisionDtlList[i].branchName );
        this.formArray.controls[i].get("amount")?.setValue(res.unBillProvisionDtlList[i].amount );   

        this.formArray.controls[i].get("branchName")?.disable();
        this.formArray.controls[i].get("partyName")?.disable();   
        this.formArray.controls[i].get("amount")?.disable();  
      }
    });    
  }

  provisionDelete(): void {
    if(this.selectedUnbilledprovision.id != '' ){
     this.requestmodel.strRequest =this.selectedUnbilledprovision.id
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
    this.unbilledprovisionmstmodel.id = this.selectedUnbilledprovision.id ;
    this.unbilledprovisionmstmodel.provisionDate = selectedDataValue.provisionDate;  
    this.unbilledprovisionmstmodel.yearId = this.year;
    this.unbilledprovisionmstmodel.loggedInUser = this.loggedInUserID;

    this.unbilledprovisionmstmodel.unBillProvisionDtlList = [];

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].branchCode == "" || 
          selectedDataValue.arrayList[i].partyCode == ""  || selectedDataValue.arrayList[i].amount=="") {
        this.toasterService.warning("Please Enter  Detail");
        return;
      } 
      else{        
        this.unbilledprovisionmstmodel.unBillProvisionDtlList.push({
          'id':"",
          'branchCode' : selectedDataValue.arrayList[i].branchCode,
          'partyCode' :   selectedDataValue.arrayList[i].partyCode,
          'amount' :  selectedDataValue.arrayList[i].amount.toString() ,
          'branchName' :  "",
          'partyName' :  "",
        }) 
      }
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


  

