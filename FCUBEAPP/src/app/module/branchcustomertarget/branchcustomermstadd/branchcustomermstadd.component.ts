
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import {BranchCustomerTargetService } from 'src/app/services/branchcustomertargetmst.service';
import {Branchcustomertargetmodel } from 'src/app//models/branchcustomertargetmstmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-branchcustomermstadd',
  templateUrl: './branchcustomermstadd.component.html',
  styleUrls: ['./branchcustomermstadd.component.css']
})
export class BranchcustomermstaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  ledgerAcList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vehicleGrpList: Dropdownmodel[] = [];
  formRatesMaster!: FormGroup;
  selectedbranchmastertargetnew = new Branchcustomertargetmodel();
  branchcustomermstmodel = new Branchcustomertargetmodel();
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  responseDetails = new Responsemodel();
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  loginDate: string = '';

  selectedCustomerTargetDetail = new Branchcustomertargetmodel();
  
  constructor(private branchcustomertargetmodel: Branchcustomertargetmodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private branchCustomerTargetService: BranchCustomerTargetService,
    private toasterService: ToastrService) {
    this.branchcustomertargetmodel = new Branchcustomertargetmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Branch/Customer Targets");      
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    
    this.sharedService.loggedInStatus = true;
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    this.formRatesMaster = this.formBuilder.group({
      yearId: new FormControl('', [Validators.required]),
      branchCode: new FormControl('', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])  
    });
 
    this.sharedService.loading=true;
    this.getBranchList();
    this.getBankAcList();
    this.getYearList();
    this.selectedbranchmastertargetnew = this.branchCustomerTargetService.getBranchCustomerDetails();

    setTimeout(() => {
      if (this.selectedbranchmastertargetnew.id!= '') {    
        this.formRatesMaster.patchValue(this.selectedbranchmastertargetnew);
        this.editMode = true;
        this.formRatesMaster.controls['branchCode'].disable();
        this.formRatesMaster.controls['yearId'].disable();
        this.formRatesArray.controls[0].get("accountId")?.disable();
        this. getCustomerTargetInnerGridList();
      }
    }, 2000);
    this.sharedService.loading=false;
  }

  get f() { return this.formRatesMaster.controls; }

  get formRatesArray() {
    return this.formRatesMaster.get("arrayList") as FormArray;    
    }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }
  createInitialArray() {
    return this.formBuilder.group({
      dtlId : ['', []],
      id : ['', []],
      yearId : ['', []],
      branchCode  : ['', []],
      accountId   : ['', []],
      targetAmt    : ['', []],
    });
  }

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  addItem(index: number): void {
    var selectedDataVal= this.formRatesMaster.getRawValue()
    if (this.formRatesArray.value[index].accountId!= "" && this.formRatesArray.value[index].targetAmt!= "") 
    {
      this.formRatesArray.push(this.createInitialArray()); 
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }  
  }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  getBankAcList(): void {
    this.commonService.getSubledgerAcList().subscribe((res) => {
      this.ledgerAcList = res;
    });
  }

  getCustomerTargetInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedbranchmastertargetnew.id; 
    this.branchCustomerTargetService.getBranchCustomertargetInnerGridList(this.requestmodel).subscribe((res) => {
      this.formRatesArray.clear();
      this.branchcustomertargetmodel = res;
      for (var i = 0; i < res.branchCustomerTargetDtlList.length; i++) {
        this.formRatesArray.push(this.createInitialArray());
        this.formRatesArray.controls[i].get("dtlId")?.setValue(res.branchCustomerTargetDtlList[i].dtlId);
        this.formRatesArray.controls[i].get("id")?.setValue(res.branchCustomerTargetDtlList[i].id);  
        this.formRatesArray.controls[i].get("yearId")?.setValue(res.branchCustomerTargetDtlList[i].yearId);
        this.formRatesArray.controls[i].get("branchCode")?.setValue(res.branchCustomerTargetDtlList[i].branchCode);  
        this.formRatesArray.controls[i].get("accountId")?.setValue(res.branchCustomerTargetDtlList[i].accountId);   
        this.formRatesArray.controls[i].get("targetAmt")?.setValue(res.branchCustomerTargetDtlList[i].targetAmt);   
        this.formRatesArray.controls[i].get("accountId")?.disable();
      }       
    });
  }

  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  }   

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this?")) {
      this.formRatesArray.removeAt(index);
      if (this.formRatesArray.length==1){
        this.formRatesMaster.controls['rateForStateOrToPlace'].enable();
      }
    }
  }


  deleteBranchCustomerForm(): void {
    if (this.selectedbranchmastertargetnew.id != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedbranchmastertargetnew.id;
      if (confirm("Are you sure, you want to delete this?")) {
        this.branchCustomerTargetService.branchCustomerTargetDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formRatesMaster.reset();
            this.route.navigate(['/branchcusttarget']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }    
        });
      }
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/branchcusttarget']);
  }

  submitBranchCustomerForm(): void {
    if (this.formRatesMaster.invalid) {
      this.toasterService.warning("Please enter mandatory fields");
      const controls = this.formRatesMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          // Convert camelCase key to readable format
          const readableName = name.replace(/([A-Z])/g, ' $1');
          const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);
          this.toasterService.warning(titleCaseName + " field is invalid");
        }
      }
      return;
    }    
    var selectedDataVal=this.formRatesMaster.getRawValue();   
    this.branchcustomertargetmodel.id = this.selectedbranchmastertargetnew.id ;
    this.branchcustomertargetmodel.yearId = selectedDataVal.yearId;
    this.branchcustomertargetmodel.branchCode  = selectedDataVal.branchCode;
    this.branchcustomertargetmodel.loggedInUser = this.loggedInUserID; 
    this.branchcustomertargetmodel.branchCustomerTargetDtlList = [];
    if(selectedDataVal.arrayList.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      this.sharedService.loading=false;
      return;
    }

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if(selectedDataVal.arrayList[i].accountId!='' || selectedDataVal.arrayList[i].targetAmt !=''){
        this.branchcustomertargetmodel.branchCustomerTargetDtlList.push({
          'dtlId': '',
          'id': '',
          'yearId': selectedDataVal.yearId,
          'branchCode': selectedDataVal.branchCode,
          'accountId': selectedDataVal.arrayList[i].accountId,
          'targetAmt': selectedDataVal.arrayList[i].targetAmt ,        
        });
      }
    }

    const found = this.branchcustomertargetmodel.branchCustomerTargetDtlList.some(el => el.targetAmt === '');
    if (found) {
      this.toasterService.warning("Target Amt cannot be Empty in details grid");
      this.sharedService.loading=false;
      return;
    }
    const foundDuplicateName = this.branchcustomertargetmodel.branchCustomerTargetDtlList.find((data, index) => {
      return this.branchcustomertargetmodel.branchCustomerTargetDtlList.find((x, ind) => x.accountId === data.accountId && index !== ind);
    });
    if (foundDuplicateName) {
      this.toasterService.warning(" Account in details grid not allowed");
      this.sharedService.loading=false;
      return;
    }    

    this.formSubmitted = true;
    this.sharedService.loading=true;
    this.branchCustomerTargetService.branchCustomerTargetSubmitted(this.branchcustomertargetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formRatesMaster.reset();
        this.route.navigate(['/branchcusttarget']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }    
    });
        
    this.sharedService.loading=false;
  }

}


