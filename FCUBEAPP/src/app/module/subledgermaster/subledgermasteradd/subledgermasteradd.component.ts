
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subledgermodel } from 'src/app/models/subledgermodel';
import { SubledgerService } from 'src/app/services/subledger.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-subledgermasteradd',
  templateUrl: './subledgermasteradd.component.html',
  styleUrls: ['./subledgermasteradd.component.css']
})
export class SubledgermasteraddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  gridview = false; 
  dashboard: string ="";
  
  editMode= false;
  formSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  ledgerAcList: Dropdownmodel[] = [];
  
  subledgermodel = new Subledgermodel();

  selectedSubLedgerMasterDetail = new Subledgermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private subledgermastermodel: Subledgermodel, 
    private subledgerService:SubledgerService, 
    private sharedService : SharedService,
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.subledgermastermodel = new Subledgermodel();

  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Sub Ledger Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
        
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    this.selectedSubLedgerMasterDetail = this.subledgerService.getSubLedgerMasterDetails();
    this.formUser = this.formBuilder.group({
      ledgerAc : new FormControl('',[Validators.required]),  
      createOrPredefined : new FormControl('',[Validators.required]),
      preDefinedQuery: new FormControl('',),
      arrayList: this.formBuilder.array([this.createSubArray()]),
    }); 

    this.getLedgerAc();

    setTimeout(() => {   
      if (this.selectedSubLedgerMasterDetail.subLedgerId  != '') {    
        this.formUser.patchValue(this.selectedSubLedgerMasterDetail);  
        if(this.selectedSubLedgerMasterDetail.createOrPredefined =='P'){  
          this.gridview =false;
        }
        else{
          this.gridview =true;
          this.getSubledgerInnerGridList();
        } 
        this.editMode =true;
      }
    }, 2000);  
  }
  
  getLedgerAc(): void {
    this.commonService.getSubledgerAcList().subscribe((res) => {
      this.ledgerAcList = res;
    });
  }

  get f() { return this.formUser.controls; }

  get formSubArray() {
    return this.formUser.get("arrayList") as FormArray;    
  }
  
  createSubArray() {
    return this.formBuilder.group({
      subLedgerId: [''],
      ledgerAc: [''],
      subLedgerDesc: [''],
    });
  }

  addItem(i: number): void {    
    var selectedDate = this.formUser.getRawValue();
    if (this.formSubArray.value[i].subLedgerDesc != ""  ) {
      this.formSubArray.push(this.createSubArray());
    
    } 
    else {
      this.toastrService.warning("Please Enter  Details");
    }
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formSubArray.removeAt(index);  
    }
  }  

  changePreType(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue =='P'){  
      this.gridview =false;
    }
    else{
      this.gridview =true;
    }
  }
  
  ledgerMasterDelete(): void {
    if(this.selectedSubLedgerMasterDetail.subLedgerId  != '' ){
      this.requestmodel.strRequest = this.selectedSubLedgerMasterDetail.subLedgerId 
      if (confirm("Are you sure, you want to delete this?")) {
        this.subledgerService.subLedgerMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/subledgerlist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
  
  exit(): void {
    this.route.navigate(['/subledgerlist']);
  }  

  getSubledgerInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedSubLedgerMasterDetail.subLedgerId; 
    this.subledgerService.getSubledgerMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formSubArray.clear();
      this.subledgermodel = res;
      for (let i = 0; i < res.subLedgerMasterDtlList.length; i++) {
        this.formSubArray.push(this.createSubArray());
        this.formSubArray.controls[i].get("subLedgerId")?.setValue(res.subLedgerMasterDtlList[i].subLedgerId);
        this.formSubArray.controls[i].get("ledgerAc")?.setValue(res.subLedgerMasterDtlList[i].ledgerAc);  
        this.formSubArray.controls[i].get("subLedgerDesc")?.setValue(res.subLedgerMasterDtlList[i].subLedgerDesc); 
      }     
    });
  }

  submitSubLedgerMasterForm(): void {
 if (this.formUser.invalid) {
  this.toastrService.warning("Please enter mandatory fields");

  const controls = this.formUser.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toastrService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}

    var selectedDataValue = this.formUser.getRawValue();
  
    this.subledgermodel.subLedgerId = this.selectedSubLedgerMasterDetail.subLedgerId ;
    this.subledgermodel.ledgerAc= selectedDataValue.ledgerAc;
    this.subledgermodel.createOrPredefined = selectedDataValue.createOrPredefined;
    this.subledgermodel.preDefinedQuery = selectedDataValue.preDefinedQuery
    this.subledgermodel.loggedInUser=  this.loggedInUserID;

    this.subledgermodel.subLedgerMasterDtlList = [];
    
    if(selectedDataValue.createOrPredefined=="C"){
      var arr = selectedDataValue.arrayList;
      for (let i = 0; i < arr.length; i++) {
        if ((arr[i].subLedgerDesc?arr[i].subLedgerDesc:"") == "" && 
              (arr[i].ledgerAc?arr[i].ledgerAc:"")=="") {
          this.toastrService.warning("Please Enter Details Properly");
          return;
        } 
        else{
          this.subledgermodel.subLedgerMasterDtlList.push({
            'subLedgerId': "",
            'ledgerAc': selectedDataValue.ledgerAc,
            'subLedgerDesc': arr[i].subLedgerDesc.toString().toUpperCase(),                
          }) 
        }   
      }
      if(this.subledgermodel.subLedgerMasterDtlList.length==0){
        this.toastrService.warning("Please enter atleast one Record in Details");
        return;
      }
    }
    else{
      if(selectedDataValue.preDefinedQuery==""){
        this.toastrService.warning("Please select Pre-Defined");
        return;
      }
    }
  
    this.formSubmitted = true;

    this.subledgerService.subledgerMasterSubmitted(this.subledgermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/subledgerlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    }); 
  }  

}

  