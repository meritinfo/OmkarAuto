import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtrippayments',
  templateUrl: './addtrippayments.component.html',
  styleUrls: ['./addtrippayments.component.css']
})
export class AddtrippaymentsComponent {
  loggedInUserID: string = '';
  amount: string = '';
  maxDate: string = '';
  minDate: string = '';
  loginDate: string = '';
  branch: string = '';
  year: string = '';
  ptype: string = '';
  trip: string = '';
  formTripPayment!: FormGroup;
  formSubmitted = false;
  keywordLocation = 'dataName';
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  createmode = false;
  showLoad = false;
  dashboard: string ="";
  seriesDoc: string = "";
  createdBy:string = "";
  modifiedBy:string = "";
  dslStmt:string = "";

  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];


  selectedTripPaymentsDetails = new Trippaymentsmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private trippaymentsmodel: Trippaymentsmodel, private tripPaymentsService: TripPaymentsService, 
    private commonService: CommonService, private toasterService: ToastrService,
    private sharedService: SharedService,private requestmodel:Requestmodel) {
    this.trippaymentsmodel = new Trippaymentsmodel();
  }

  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Trip Payments"));
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
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    else {
      this.route.navigate(['/']);
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    
    this.getBranchList();   
    this.getVehicleNoList();
    this.getLocationList();
    this.getTripStmtType();
    
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    console.log(this.maxDate);

    this.selectedTripPaymentsDetails = this.tripPaymentsService.getTripPaymentsDetails();

    this.formTripPayment = this.formBuilder.group({
      pmtBranch: new FormControl(this.branch , [Validators.required]),
      pmtDate: new FormControl(this.loginDate , [Validators.required]),
      paidToDesc: new FormControl('',),
      vehicleMasterID: new FormControl('', [Validators.required]),
      transType: new FormControl('', [Validators.required]),
      amountPaid: new FormControl('', [Validators.required]),
      remarks: new FormControl('',),
      pmtType: new FormControl('', [Validators.required]),
      neftPmt: new FormControl('',),
      creditAc: new FormControl('', [Validators.required]),
      chequeNo: new FormControl(''),
      chequeDate: new FormControl('', [Validators.required]),
      qtyLtrs: new FormControl('',),
      ratePerLtr: new FormControl('',),
      fromPlace: new FormControl('',),
      toPlace: new FormControl('',),
      loadMemoDt: new FormControl('',),
      loadFor: new FormControl('',),
    });
        
    if (this.selectedTripPaymentsDetails.pmtId != '') {      
      this.getCreditAcList(this.selectedTripPaymentsDetails.pmtType);  
    }

    setTimeout(() => {
      this.createmode = true;
      this.formTripPayment.controls['pmtBranch'].disable();
      this.formTripPayment.controls['fromPlace'].disable();
      this.formTripPayment.controls['toPlace'].disable();
      this.formTripPayment.controls['loadMemoDt'].disable();
      this.formTripPayment.controls['loadFor'].disable();

      if (this.selectedTripPaymentsDetails.pmtId != '') {
        this.seriesDoc = this.selectedTripPaymentsDetails.seriesDoc; 
        this.formTripPayment.patchValue(this.selectedTripPaymentsDetails);
        if(this.selectedTripPaymentsDetails.findocid!="0"){
          this.getFinDocDetails(this.selectedTripPaymentsDetails.findocid);
        }
        this.formTripPayment.patchValue({
          pmtDate:   this.commonService.formatDate(this.selectedTripPaymentsDetails.pmtDate), 
          chequeDate:  this.commonService.formatDate(this.selectedTripPaymentsDetails.chequeDate), 
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripPaymentsDetails.vehicleMasterID),
          neftPmt:  ""
        })  
        if (this.selectedTripPaymentsDetails.transType == "DL"|| this.selectedTripPaymentsDetails.transType == "AB") {
          this.formTripPayment.controls['qtyLtrs'].enable();
          this.formTripPayment.controls['ratePerLtr'].enable();
          this.formTripPayment.controls['qtyLtrs'].setValidators([Validators.required]);
          this.formTripPayment.controls['amountPaid'].clearValidators();
        }
        else {
          this.formTripPayment.controls['qtyLtrs'].disable();
          this.formTripPayment.controls['ratePerLtr'].disable();
          this.formTripPayment.controls['qtyLtrs'].clearValidators();
          this.formTripPayment.controls['amountPaid'].setValidators([Validators.required]);
        }
        this.formTripPayment.controls['qtyLtrs'].updateValueAndValidity();
        this.formTripPayment.controls['amountPaid'].updateValueAndValidity();
        
        if (this.selectedTripPaymentsDetails.pmtType == 'B'){
          this.formTripPayment.controls['neftPmt'].enable();
          if (this.selectedTripPaymentsDetails.neftPmt=='Y'){
            this.formTripPayment.controls['chequeNo'].clearValidators();      
            this.formTripPayment.controls['chequeDate'].clearValidators(); 
            this.formTripPayment.controls['chequeNo'].disable();      
            this.formTripPayment.controls['chequeDate'].disable(); 
            this.formTripPayment.patchValue({
              neftPmt:  "Y"
            })  
          }
          else {
            this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
            this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);             
          }
          this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
          this.formTripPayment.controls['chequeDate'].updateValueAndValidity();  
        }
        else {
          this.formTripPayment.controls['neftPmt'].disable();
          this.formTripPayment.controls['chequeNo'].disable();      
          this.formTripPayment.controls['chequeDate'].disable(); 
        }  
        this.createdBy = this.selectedTripPaymentsDetails.createdBy + " " + this.selectedTripPaymentsDetails.createdDate;
        this.modifiedBy = this.selectedTripPaymentsDetails.modifiedBy + " " + this.selectedTripPaymentsDetails.modifiedDate;   
        this.editMode = true;
        this.formTripPayment.controls['pmtBranch'].disable();
        this.formTripPayment.controls['transType'].disable();
        this.formTripPayment.controls['pmtBranch'].disable();
        this.formTripPayment.controls['vehicleMasterID'].disable(); 
      }  
    }, 2000);
    this.sharedService.loading = false;
  }

  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.commonService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }
 
 

  get f() { return this.formTripPayment.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  getCreditAcList2(e: any){
    this.requestmodel.strRequest = e;

    this.commonService.getCreditAcList2(this.requestmodel).subscribe((res) => {
      this.creditacList = res;   
      this.formTripPayment.patchValue({
        //creditAc:this.creditacList[0].dataId
      });  
    });
  }

  tripPaymentsDelete(): void {    
    if(this.selectedTripPaymentsDetails.pmtId != '' ){
    this.requestmodel.strRequest =this.selectedTripPaymentsDetails.pmtId
      if (confirm("Are you sure, you want to delete this?")) {
            this.tripPaymentsService.tripPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formTripPayment.reset();
              this.route.navigate(['/trippaymentlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/trippaymentlist']);
  }
  
  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
    });
    // if (pmttp == 'B'){
    //   this.formUser.controls['neftPmt'].enable();
    //   this.formUser.controls['chequeNo'].enable();
    //   this.formUser.controls['chequeDate'].enable();
    // }
    // else {
    //   this.formUser.controls['neftPmt'].disable();
    //   this.formUser.controls['chequeNo'].disable();
    //   this.formUser.controls['chequeDate'].disable();
    // }
  }

 
  getTripStmtType(): void {
    this.commonService.getTripStmtType().subscribe((res) => {
      this.dslStmt = res.strRequest;
    });
  }
   
  selectEvent(item: any) {
    this.requestmodel.strRequest = item.dataId;
    this.showLoad = false;
    this.tripPaymentsService.tripPaymentsLoadDetails(this.requestmodel).subscribe((res) => {
      this.showLoad = true;
      this.formTripPayment.controls["vehicleMasterID"].disable();
      this.formTripPayment.patchValue({
        fromPlace: res.filterStr,   
        toPlace: res.filterStr1,
        loadMemoDt: res.filterStr2,
        loadFor: res.filterStr3
      });
    });
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }  

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  changeTransType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    if (selectedValue == "DL"|| selectedValue == "AB") {
      this.formTripPayment.controls['qtyLtrs'].enable();
      this.formTripPayment.controls['ratePerLtr'].enable();
      this.formTripPayment.controls['qtyLtrs'].setValidators([Validators.required]);
      this.formTripPayment.controls['amountPaid'].clearValidators();
    }
    else {
      this.formTripPayment.controls['qtyLtrs'].disable();
      this.formTripPayment.controls['ratePerLtr'].disable();
      this.formTripPayment.controls['qtyLtrs'].clearValidators();
      this.formTripPayment.controls['amountPaid'].setValidators([Validators.required]);
    }
    this.formTripPayment.controls['qtyLtrs'].updateValueAndValidity();
    this.formTripPayment.controls['amountPaid'].updateValueAndValidity();
  }

  calculateTotalAmount() {
    let total = '';
    var selectedData = this.formTripPayment.getRawValue();
    if (selectedData.qtyLtrs!= "" && selectedData.ratePerLtr!= "") {
      var qtyLtrs = selectedData.qtyLtrs ? parseFloat(selectedData.qtyLtrs) : 0;
      var ratePerLtr = selectedData.ratePerLtr ? parseFloat(selectedData.ratePerLtr) : 0;
      var amountPaid = selectedData.paidAmount ? parseFloat(selectedData.paidAmount) : 0;
      total = (qtyLtrs * ratePerLtr).toFixed(2) ;      
    }
    this.formTripPayment.patchValue({
      amountPaid: total,    
    });
  }
 
  onNeftChk(e: any) {
    if(e.target.checked){
      this.formTripPayment.controls['chequeNo'].clearValidators();      
      this.formTripPayment.controls['chequeDate'].clearValidators();   
      this.formTripPayment.controls['chequeNo'].disable();
      this.formTripPayment.controls['chequeDate'].disable();
      this.formTripPayment.patchValue({
        chequeNo:'',
        chequeDate:'',
      });   
    }
    else {
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeNo'].enable(); 
      this.formTripPayment.controls['chequeDate'].enable();
    }
    this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
    this.formTripPayment.controls['chequeDate'].updateValueAndValidity();
  }

  changePmtType(e: any) {
    var selectedValue = e.target.value;
     
    if (selectedValue == 'B'){
      this.formTripPayment.controls['neftPmt'].enable();
      this.formTripPayment.controls['chequeNo'].enable();
      this.formTripPayment.controls['chequeDate'].enable();
    }
    else {
      this.formTripPayment.controls['neftPmt'].disable();
      this.formTripPayment.controls['chequeNo'].disable();
      this.formTripPayment.controls['chequeDate'].disable(); 
    }
   
    this.formTripPayment.patchValue({
      neftPmt : "",
      chequeNo: "",
      chequeDate: this.loginDate,
    });
    
    this.getCreditAcList(selectedValue);
  }
  
 
   
  submitTripPaymentsForm(): void {  
    if (this.formTripPayment.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formTripPayment.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
        controls[name].get
      }
      return;
    }
    var selectedDataValue = this.formTripPayment.getRawValue();

    const d3 = this.minDate?Date.parse(this.minDate):0;
    const d2 = this.maxDate?Date.parse(this.maxDate):0;
    const d4 = selectedDataValue.pmtDate?Date.parse(selectedDataValue.pmtDate):0;
    if (d3>d4 || d2<d4 ) {
      this.formTripPayment.patchValue({
        pmtDate: ''
      });
      this.toasterService.warning("Invalid pmtDate ");
      return
    }
    
    if (selectedDataValue.transType == "DA") {
      if(parseFloat(selectedDataValue.amountPaid)>0){
        //ignore
      }
      else{
        this.toasterService.warning("Please Enter Advcance Amount ");           
        return;
      }
    }
    else{
      if(parseFloat(selectedDataValue.qtyLtrs)>0){
        //ignore
      }
      else{
        this.toasterService.warning("Please Enter Qty Liters ");          
        return;
      }
    }   
    var vehilist = this.vehicleList.find(e => e.dataName == selectedDataValue.vehicleMasterID.dataName) 
    if (typeof vehilist !== 'undefined' && vehilist !== null && 
          vehilist.dataId!="" && vehilist.dataId!="0") {
        //ignore
    }
    else{
      this.toasterService.warning("Please Enter Valid Vehicle No ");          
      return;
    }
    var chqDt = this.loginDate;
    if (selectedDataValue.pmtType=="B"){
      chqDt = selectedDataValue.chequeDate == '' ? this.loginDate:selectedDataValue.chequeDate;
    }
    
    this.formSubmitted = true; 
    this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId ;
    this.trippaymentsmodel.pmtBranch = selectedDataValue.pmtBranch;
    this.trippaymentsmodel.pmtDate = selectedDataValue.pmtDate;
    this.trippaymentsmodel.paidToDesc = selectedDataValue.paidToDesc.toString().toUpperCase();    
    this.trippaymentsmodel.vehicleMasterID = selectedDataValue.vehicleMasterID?selectedDataValue.vehicleMasterID.dataId:"";
    this.trippaymentsmodel.amountPaid = selectedDataValue.amountPaid.toString();
    this.trippaymentsmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.trippaymentsmodel.pmtType = selectedDataValue.pmtType;
    this.trippaymentsmodel.transType = selectedDataValue.transType;
    this.trippaymentsmodel.neftPmt = selectedDataValue.neftPmt?"Y":"N";
    this.trippaymentsmodel.creditAc = selectedDataValue.creditAc;
    this.trippaymentsmodel.chequeNo =selectedDataValue.chequeNo;
    this.trippaymentsmodel.chequeDate = selectedDataValue.chequeDate;
    this.trippaymentsmodel.qtyLtrs = selectedDataValue.qtyLtrs;
    this.trippaymentsmodel.ratePerLtr = selectedDataValue.ratePerLtr;    
    this.trippaymentsmodel.yearId = this.year;
    this.trippaymentsmodel.loggedInUser = this.loggedInUserID;

    let formData = new FormData();
    formData.append('datadetails', JSON.stringify(this.trippaymentsmodel));
     
    this.tripPaymentsService.trippaymentSaveSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formTripPayment.reset();
        this.route.navigate(['/trippaymentlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }
}