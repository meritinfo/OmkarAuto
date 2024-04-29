import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dprvehiplacedmodel } from 'src/app/models/dprvehiplacedmodel';
import { Dprmodel } from 'src/app/models/dprmodel';
import { CommonService } from 'src/app/services/common.service';
import { DprvehiplacedService } from 'src/app/services/dprvehiplaced.service';
import { DprService } from 'src/app/services/dpr.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { VehicleFltMasterService } from 'src/app/services/vehiclefltmaster.service';


@Component({
  selector: 'app-dprvehiplacedadd',
  templateUrl: './dprvehiplacedadd.component.html',
  styleUrls: ['./dprvehiplacedadd.component.css']
})
export class DprvehiplacedaddComponent {
  loggedInUserID: string = '';
  dprid: string = '';
  branch: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedDprDetails = new Dprvehiplacedmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private dprvehiplacedmodel: Dprvehiplacedmodel,private dprService: DprService,
    private ratesMasterService: RatesMasterService,private dprmodel:Dprmodel,
    private vehicleFltMasterService:VehicleFltMasterService,
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private dprvehiplacedService: DprvehiplacedService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.selectedDprDetails = new Dprvehiplacedmodel();
  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "DPR Vehicle Placement");
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
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 10);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   

    var dprid = sessionStorage.getItem('dprid')?.toString();
    if (typeof dprid !== 'undefined' && dprid !== null && dprid !== '') {
      this.dprid = dprid;
    }
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getVehicleList();
    this.getBrokerList();


    this.formUser = this.formBuilder.group({
      dprDate  : new FormControl('',),
      partyName : new FormControl('',),
      origin  : new FormControl('',),
      destination : new FormControl('',),
      vehicleEngagedBy : new FormControl('',),
      brokerId : new FormControl('',[Validators.required]),
      vehicleNo : new FormControl('',[Validators.required]),
      vehOwnerName : new FormControl('',[Validators.required]),
      vehAdd1 : new FormControl('',),
      vehAdd2 : new FormControl('',),
      ownerPan : new FormControl('',),
      vehOwnerMobile : new FormControl('',),
      vehInsValidDate : new FormControl('',[Validators.required]),
      vehFitValidDate : new FormControl('',[Validators.required]),
      vehPermitValidDate : new FormControl('',[Validators.required]),
      driverName : new FormControl('',[Validators.required]),
      driverMob1 : new FormControl('',[Validators.required]),
      challanChrgWt : new FormControl('',[Validators.required]),
      ratePerTon : new FormControl('',[Validators.required]),
      lorryHire : new FormControl('',[Validators.required]),
      advance1 : new FormControl('',),
      advance2 : new FormControl('',),
      advance3 : new FormControl('',),
      advanceAmt : new FormControl('',),
      balanceAmt : new FormControl('',),
      assignToStaff : new FormControl('',[Validators.required]),
      vehicleRptDateTime : new FormControl('',),
      placementStatus : new FormControl('',),
      placementStatusRemarks: new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    
    this.formUser.controls['dprDate'].disable(); 
    this.formUser.controls['partyName'].disable(); 
    this.formUser.controls['origin'].disable(); 
    this.formUser.controls['destination'].disable(); 
    
    setTimeout(() => {
      if (this.dprid != '') {        
        this.getDprDetails();
      }   

      if (this.selectedDprDetails.vehiclePlacedId != '') {
        this.formUser.patchValue(this.selectedDprDetails);  
        this.formUser.patchValue({
          dprDate: this.commonService.formatDate(this.selectedDprDetails.dprDate),
        });            
        this.getDprInnerGridList();
        this.editMode = true;
      }    
    }, 2000);

    this.sharedService.loading=false;
  }

  getDprInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedDprDetails.dprId;
    this.dprService.getDprInnerGridList(this.requestmodel).subscribe((res) => {
      this.dprmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.dprDtls.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("fromStn")?.setValue(res.dprDtls[i].fromPlace);
        this.formArray.controls[i].get("toStn")?.setValue(res.dprDtls[i].toPlace);
        this.formArray.controls[i].get("specialRemarks")?.setValue(res.dprDtls[i].specialRemarks);
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      fromStn: ['', []],
      toStn: ['', []],
      gcNoteNo: ['', []],
      specialRemarks: ['', []],
    });
  }
  
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }


  onLorryHireChange(e:any){

  }

  onAdvChange(e:any){

  }

  calcTotal(){    
    var selectedDataVal= this.formUser.getRawValue();
    selectedDataVal.freightRs;
    var hamaliAmt = 0;
    var ldDetenAmt   = 0;
    var extraAmt = 0;
    var otherAmt   = 0;
    var totFreightAmt   = 0;

    if(selectedDataVal.hamaliAmt!=""){
      hamaliAmt = parseFloat(selectedDataVal.hamaliAmt);
    }
    if(selectedDataVal.ldDetenAmt!=""){
      ldDetenAmt = parseFloat(selectedDataVal.ldDetenAmt);
    }
    if(selectedDataVal.extraAmt!=""){
      extraAmt = parseFloat(selectedDataVal.extraAmt);
    }
    if(selectedDataVal.otherAmt!=""){
      otherAmt = parseFloat(selectedDataVal.otherAmt);
    }

    totFreightAmt = hamaliAmt + ldDetenAmt + extraAmt + otherAmt;

    this.formUser.patchValue({
      totFreightAmt: totFreightAmt,
    });      
  }

  addItem(index: number): void {
    var selectedDataVal= this.formUser.getRawValue()
    var fmplc = this.formArray.value[index].fromPlace?this.formArray.value[index].fromPlace.dataId:"";
    var toplc = this.formArray.value[index].toPlace?this.formArray.value[index].toPlace.dataId:""; 
    if (fmplc == "" || toplc == "" || this.formArray.value[index].specialRemarks == "") {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }      
    this.formArray.push(this.createInitialArray()); 
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);    
  }

 
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getVehicleList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  
  getBrokerList(): void {
    this.ratesMasterService.getPartyList().subscribe((res) => {
      this.brokerList = res;
    });
  }
  
  getDprDetails(): void {
    this.requestmodel.strRequest = this.dprid;
    this.dprvehiplacedService.getDprVehiPlacedDetails(this.requestmodel).subscribe((res) => {
      this.selectedDprDetails = res;
      this.formUser.patchValue(this.selectedDprDetails);  
      this.formUser.patchValue({
        dprDate: this.commonService.formatDate(this.selectedDprDetails.dprDate),
      });            
      this.getDprInnerGridList();
    });
  }

 
  deleteDprDetailsForm(): void {
    if(this.selectedDprDetails.dprId != '' ){   
      this.requestmodel.strRequest = this.selectedDprDetails.dprId 
      if (confirm("Are you sure, you want to delete this?")) {   
        this.sharedService.loading=true;
        this.dprService.dprDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/dprindentlist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
        this.sharedService.loading=false;
      }
      
    }
  }

  exit(): void {
    this.route.navigate(['/dprindentlist']);
  }

  submitDprDetails(): void {
    this.userSubmitted = true;
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
    var selectedDataVal =this.formUser.getRawValue();
    this.dprmodel.dprId = this.selectedDprDetails.dprId ;
    this.dprmodel.dprBranch = selectedDataVal.dprBranch;
    this.dprmodel.dprDate = selectedDataVal.dprDate;
    this.dprmodel.payParty = selectedDataVal.payParty?selectedDataVal.payParty.dataId:"";
    this.dprmodel.bookStatus  = selectedDataVal.bookStatus;
    this.dprmodel.origin   = selectedDataVal.origin?selectedDataVal.origin.dataId:"";
    this.dprmodel.destination  = selectedDataVal.destination?selectedDataVal.destination.dataId:"";
    this.dprmodel.vehcileTypeId  = selectedDataVal.vehcileTypeId;
    this.dprmodel.actualWt   = selectedDataVal.actualWt;
    this.dprmodel.chargeWt  = selectedDataVal.chargeWt;
    this.dprmodel.odcDimensions  = selectedDataVal.odcDimensions.toString().toUpperCase();
    this.dprmodel.rateType  = selectedDataVal.rateType;
    this.dprmodel.rateRs   = selectedDataVal.rateRs;
    this.dprmodel.freightRs  = selectedDataVal.freightRs;
    this.dprmodel.hamaliAmt  = selectedDataVal.hamaliAmt;
    this.dprmodel.hamaliDesc  = selectedDataVal.hamaliDesc.toString().toUpperCase();
    this.dprmodel.ldDetenAmt   = selectedDataVal.ldDetenAmt;
    this.dprmodel.ldDetenDesc  = selectedDataVal.ldDetenDesc.toString().toUpperCase();
    this.dprmodel.extraAmt = selectedDataVal.extraAmt;
    this.dprmodel.extraDesc  = selectedDataVal.extraDesc.toString().toUpperCase();
    this.dprmodel.otherAmt   = selectedDataVal.otherAmt;
    this.dprmodel.otherDesc   = selectedDataVal.otherDesc.toString().toUpperCase();
    this.dprmodel.totFreightAmt  = selectedDataVal.totFreightAmt;
    this.dprmodel.loggedInUserID = this.loggedInUserID;  

    
    this.dprmodel.dprDtls = [];
    if(selectedDataVal.arrayList.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      return;
    }

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      var fmplc = selectedDataVal.arrayList[i].fromPlace?selectedDataVal.arrayList[i].fromPlace.dataId:"";
      var toplc = selectedDataVal.arrayList[i].toPlace?selectedDataVal.arrayList[i].toPlace.dataId:"";     
      if(fmplc!='' && toplc !=''){
        this.dprmodel.dprDtls.push({
          'dprDtlId': '',
          'dprId': '',
          'fromPlace': fmplc,
          'toPlace': toplc,
          'gcNoteNo':"",
          'specialRemarks': selectedDataVal.arrayList[i].specialRemarks.toString().toUpperCase(),
        });
      }
    }

    this.sharedService.loading=true;
    let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.dprmodel));

    this.dprService.dprSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/dprindentlist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    this.sharedService.loading=false;
  }
}



