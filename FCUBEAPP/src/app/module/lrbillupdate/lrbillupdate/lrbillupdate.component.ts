
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { Billsmastersearchlistmodel } from 'src/app/models/billsmastersearchlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillsMasterService } from 'src/app/services/billsmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

@Component({
  selector: 'app-lrbillupdate',
  templateUrl: './lrbillupdate.component.html',
  styleUrls: ['./lrbillupdate.component.css']
})
export class LrbillupdateComponent {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  minDate : string = '';
  maxDate : string = '';
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  formBillsMaster!: FormGroup;
  keywordLocation = 'dataName';
  supp = false;
  canCancelBill = false;
  //Driversalarysearch = new Pagerequestwithdatesmodel();
  billsmastersearchmodel = new Pagerequestwithdatesmodel();
  seriesDoc: string = "";
  billsmastersearchlistmodel = new Billsmastersearchlistmodel();
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  showButton = true;
  

  formSubmitted = false;
  selectedBillsmasterDetails = new Billsmastermodel();
  responseDetails = new Responsemodel();
  usertriprightsmodel = new Usertriprightsmodel();

  constructor(private billsmastermodel: Billsmastermodel, private commonService: CommonService, 
    private billsMasterService: BillsMasterService, private route: Router, 
    private formBuilder: FormBuilder,private sharedService: SharedService, 
    private cashReceiptEntryService: CashReceiptEntryService,
    private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.billsmastermodel = new Billsmastermodel();  
    }  
    ngOnInit(): void {
      this.sharedService.loading = true;   
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
          .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (MAIN)"));
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
      else {
        this.route.navigate(['/']);
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
     
   
    this.selectedBillsmasterDetails = this.billsMasterService.getBillsMasterDetails();
    this.formBillsMaster = this.formBuilder.group({
      gcNoteNo: new FormControl('',),
   
     billNo: new FormControl('0',),
    });
    setTimeout(() => {
      this.createmode = true;
     
  
      if (this.selectedBillsmasterDetails.billsMasterId != '') {
      

        this.formBillsMaster.patchValue(this.selectedBillsmasterDetails); 
        this.formBillsMaster.patchValue({
       //   billNo:  this.selectedBillstatementDetails.bill_StmtNo, 
        //  billSeries :this.selectedBillstatementDetails.seriesCode, 
         
       
        })
      
        

        
     
        this.editMode = true;
      }   
    }, 2000);
    this.sharedService.loading = false;    
  }
     
  exit(): void {
    this.route.navigate(['/billstatementlist']);
  } 
  saveLrBillsDetails(): void {
    this.formSubmitted = true;
    if (this.formBillsMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formBillsMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedDataValue = this.formBillsMaster.getRawValue();

  //  this.billsmastermodel.billsMasterId = this.selectedBillsmasterDetails.billsMasterId != '' ? this.selectedBillsmasterDetails.billsMasterId : '';
  //  this.billsmastermodel.masterID = this.selectedBillsmasterDetails.masterID ;
    this.requestmodel.strRequest = selectedDataValue.gcNoteNo;
    this.requestmodel.strRequest1 = selectedDataValue.billNo;
  // this.billsmastermodel.billNo = '1'
 

 
    
    this.billsMasterService.updateBillLrDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formBillsMaster.reset();
        this.route.navigate(['/billstatementlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

}

   