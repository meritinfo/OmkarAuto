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
import { ConsignmentService } from 'src/app/services/consignment.service';

@Component({
  selector: 'app-dprvehiplacedadd',
  templateUrl: './dprvehiplacedadd.component.html',
  styleUrls: ['./dprvehiplacedadd.component.css']
})
export class DprvehiplacedaddComponent {
  loggedInUserID: string = '';
  dprid: string = '';
  branch: string = '';
  year: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
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
  createdBy: string = "";
  modifiedBy: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedDprDetails = new Dprvehiplacedmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private dprvehiplacedmodel: Dprvehiplacedmodel,private lrentryService: ConsignmentService,
    private dprService: DprService, private dprmodel:Dprmodel,
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    

    var dprid = sessionStorage.getItem('dprid')?.toString();
    if (typeof dprid !== 'undefined' && dprid !== null && dprid !== '') {
      this.dprid = dprid;
    }
    else {      
      this.route.navigate(['/dprindentlist']);
    }
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getVehicleList();
    this.getBrokerList();
    this.getEmpList();


    this.formUser = this.formBuilder.group({
      dprDate  : new FormControl('',),
      partyName : new FormControl('',),
      fromPlace  : new FormControl('',),
      toPlace : new FormControl('',),
      vehicleEngagedBy : new FormControl('',),
      brokerId : new FormControl('',[Validators.required]),
      vehicleNo : new FormControl('',[Validators.required]),
      vehOwnerName : new FormControl('',[Validators.required]),
      vehAdd1 : new FormControl('',),
      vehAdd2 : new FormControl('',),
      ownerPan : new FormControl('',),
      vehOwnerMobile : new FormControl('',),
      vehInsValidDate : new FormControl('',),
      vehFitValidDate : new FormControl('',),
      vehPermitValidDate : new FormControl('',),
      driverName : new FormControl('',),
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
    this.formUser.controls['fromPlace'].disable(); 
    this.formUser.controls['toPlace'].disable(); 
    this.formUser.controls['advanceAmt'].disable(); 
    this.formUser.controls['balanceAmt'].disable(); 

    setTimeout(() => {        
      if (this.dprid != '') {        
        this.requestmodel.strRequest = this.dprid;
        this.dprvehiplacedService.getDprVehiPlacedDetails(this.requestmodel).subscribe((res) => {
          this.selectedDprDetails = res;
          this.formUser.patchValue(this.selectedDprDetails);  
          this.formUser.patchValue({
            dprDate: this.commonService.formatDate(this.selectedDprDetails.dprDate),
            vehFitValidDate: this.commonService.formatDate(this.selectedDprDetails.vehFitValidDate),
            vehInsValidDate: this.commonService.formatDate(this.selectedDprDetails.vehInsValidDate),
            vehPermitValidDate: this.commonService.formatDate(this.selectedDprDetails.vehPermitValidDate),
            brokerId: this.brokerList.find(e => e.dataId ==this.selectedDprDetails.brokerId),
          });            
          this.getDprInnerGridList();
          this.createdBy = this.selectedDprDetails.createdBy + " " + this.selectedDprDetails.createdDate;
          this.modifiedBy = this.selectedDprDetails.modifiedBy + " " + this.selectedDprDetails.modifiedDate;
        });
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
        this.formArray.controls[i].get("dprDtlId")?.setValue(res.dprDtls[i].dprDtlId);
        this.formArray.controls[i].get("fromStn")?.setValue(res.dprDtls[i].fromStn);
        this.formArray.controls[i].get("toStn")?.setValue(res.dprDtls[i].toStn);
        this.formArray.controls[i].get("gcNoteNo")?.setValue(res.dprDtls[i].gcNoteNo);
        if(res.dprDtls[i].mainGcYN==""){
          this.formArray.controls[i].get("mainGcYN")?.setValue("Y");
        }
        else{
          this.formArray.controls[i].get("mainGcYN")?.setValue(res.dprDtls[i].mainGcYN);
        }
        this.formArray.controls[i].get("specialRemarks")?.setValue(res.dprDtls[i].specialRemarks);
        this.formArray.controls[i].get("fromStn")?.disable();
        this.formArray.controls[i].get("toStn")?.disable();
        //this.formArray.controls[i].get("gcNoteNo")?.disable();
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      dprDtlId: ['', []],
      fromStn: ['', []],
      toStn: ['', []],
      gcNoteNo: ['', []],
      mainGcYN:['', []],
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

  
  selectEvent(item: any) {
    // do something with selected item
   // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  chkLrDuplicate(i: number){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.arrayList[i].gcNoteNo==""){
      this.toasterService.warning("GC Note No should not be Blank");
      return;
    }  
    else{
      for (var j=0; j<selectedData.arrayList.length;j++){
        if(i!=j && selectedData.arrayList[i].gcNoteNo.toString().toUpperCase()==selectedData.arrayList[j].gcNoteNo.toString().toUpperCase()){
          this.toasterService.warning("GC Note No Already Entered in Grid");
          return;
        }
      }
      this.requestmodel.strRequest = this.branch;
      this.requestmodel.strRequest1 = selectedData.arrayList[i].gcNoteNo.toString().toUpperCase();
      this.lrentryService.checkDuplicateLr(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
       else{
          this.toasterService.warning(this.responseDetails.message);
          return
        }
      });
    }   
  }

  genLrNo(){
    this.requestmodel.strRequest = this.branch;
    this.requestmodel.strRequest1 = this.year;
    this.lrentryService.genLrNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        var lrno = parseInt(res.message);
        var selectedDataVal = this.formUser.getRawValue();

        for (var i = 0; i < selectedDataVal.arrayList.length; i++) { 
          this.formArray.controls[i].get("gcNoteNo")?.setValue(lrno.toString());
          lrno = lrno + 1;
        }
      }
      else{
        this.toasterService.warning(res.message)
      }
    });
  }


  onVehicalChange(e:any){
    var truckno = e.target.value;
    if(truckno!=""){
      this.requestmodel.strRequest = truckno;
      this.requestmodel.strRequest1 = this.loggedInUserID;
      this.dprvehiplacedService.getVehicleDetails(this.requestmodel).subscribe((res) => {
        this.selectedDprDetails = res; 
        var vehInsValidDate = this.selectedDprDetails.vehInsValidDate;
        var vehFitValidDate = this.selectedDprDetails.vehFitValidDate;
        var vehPermitValidDate = this.selectedDprDetails.vehPermitValidDate;
        
        vehInsValidDate     = vehInsValidDate    =="NA"? "": vehInsValidDate  ; 
        vehFitValidDate     = vehFitValidDate    =="NA"? "": vehFitValidDate   ;
        vehPermitValidDate  = vehPermitValidDate =="NA"? "": vehPermitValidDate;
        
        if(vehInsValidDate!=""){
          vehInsValidDate = this.commonService.formatDate(vehInsValidDate);
        }
        if(vehFitValidDate!=""){
          vehFitValidDate = this.commonService.formatDate(vehFitValidDate);
        }
        if(vehPermitValidDate!=""){
          vehPermitValidDate = this.commonService.formatDate(vehPermitValidDate);
        }

        this.formUser.patchValue({
          vehOwnerName: this.selectedDprDetails.vehOwnerName,
          vehAdd1 : this.selectedDprDetails.vehAdd1,
          vehAdd2 : this.selectedDprDetails.vehAdd2,
          ownerPan : this.selectedDprDetails.ownerPan,
          vehOwnerMobile : this.selectedDprDetails.vehOwnerMobile,
          vehInsValidDate : vehInsValidDate,
          vehFitValidDate : vehFitValidDate,
          vehPermitValidDate : vehPermitValidDate,
        });         
      });
    }
  }


  onLorryHireChange(){
    var selectedDataVal= this.formUser.getRawValue();
    var lorryHire = 0;
    var advanceAmt = 0;
    var balanceAmt = 0;
    var ratePerTon = 0;
         
    if (typeof selectedDataVal.lorryHire !== 'undefined' && selectedDataVal.lorryHire !== null && selectedDataVal.lorryHire !== '') {
      lorryHire = parseFloat(selectedDataVal.lorryHire) ;
    }
    if (typeof selectedDataVal.advanceAmt !== 'undefined' && selectedDataVal.advanceAmt !== null && selectedDataVal.advanceAmt !== '') {
      advanceAmt = parseFloat(selectedDataVal.advanceAmt);
    }
    if (typeof selectedDataVal.challanChrgWt !== 'undefined' && selectedDataVal.challanChrgWt !== null && selectedDataVal.challanChrgWt !== '') {
      ratePerTon = Math.round(lorryHire / parseFloat(selectedDataVal.challanChrgWt)) ;
    }

    balanceAmt = lorryHire - advanceAmt

    this.formUser.patchValue({
      balanceAmt: balanceAmt,
      ratePerTon: ratePerTon,
    });   
  }

  onAdvChange(){
    var selectedDataVal= this.formUser.getRawValue();
    var lorryHire = 0;
    var advance1 = 0;
    var advance2 = 0;
    var advance3 = 0;
    var advanceAmt = 0;
    var balanceAmt = 0;
        
    if (typeof selectedDataVal.lorryHire !== 'undefined' && selectedDataVal.lorryHire !== null && selectedDataVal.lorryHire !== '') {
      lorryHire = parseFloat(selectedDataVal.lorryHire);
    }
    if (typeof selectedDataVal.advance1 !== 'undefined' && selectedDataVal.advance1 !== null && selectedDataVal.advance1 !== '') {
      advance1 = parseFloat(selectedDataVal.advance1);
    }
    if (typeof selectedDataVal.advance2 !== 'undefined' && selectedDataVal.advance2 !== null && selectedDataVal.advance2 !== '') {
      advance2 = parseFloat(selectedDataVal.advance2);
    }
    if (typeof selectedDataVal.advance3 !== 'undefined' && selectedDataVal.advance3 !== null && selectedDataVal.advance3 !== '') {
      advance3 = parseFloat(selectedDataVal.advance3);
    }

    advanceAmt = advance1 + advance2 + advance3;

    balanceAmt = lorryHire - advanceAmt;

    this.formUser.patchValue({
      advanceAmt: advanceAmt,
      balanceAmt: balanceAmt,
    });   
  }

  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getVehicleList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  
  getBrokerList(): void {
    this.commonService.getBrokerList().subscribe((res) => {
      this.brokerList = res;
    });
  }

  getEmpList(): void {
    this.commonService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }  


  exit(): void {
    this.route.navigate(['/dprindentlist']);
  }

  submitDprVehiDetails(): void {
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

    if (selectedDataVal.brokerId.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Broker is Invalid");
      return;
    }
    
    this.dprvehiplacedmodel.vehiclePlacedId = "";
    this.dprvehiplacedmodel.dprId = this.dprid?this.dprid:"";
    this.dprvehiplacedmodel.vehicleEngagedBy = selectedDataVal.vehicleEngagedBy?selectedDataVal.vehicleEngagedBy.toString():"";
    this.dprvehiplacedmodel.brokerId = selectedDataVal.brokerId?selectedDataVal.brokerId.dataId:"";
    this.dprvehiplacedmodel.vehicleNo = selectedDataVal.vehicleNo.toString();
    this.dprvehiplacedmodel.vehOwnerName = selectedDataVal.vehOwnerName?selectedDataVal.vehOwnerName.toString().toUpperCase():"";
    this.dprvehiplacedmodel.vehAdd1 = selectedDataVal.vehAdd1? selectedDataVal.vehAdd1.toString().toUpperCase():"";
    this.dprvehiplacedmodel.vehAdd2 = selectedDataVal.vehAdd2?selectedDataVal.vehAdd2.toString().toUpperCase():"";
    this.dprvehiplacedmodel.ownerPan = selectedDataVal.ownerPan?selectedDataVal.ownerPan.toString().toUpperCase():"";
    this.dprvehiplacedmodel.vehOwnerMobile = selectedDataVal.vehOwnerMobile?selectedDataVal.vehOwnerMobile.toString():"";
    this.dprvehiplacedmodel.vehInsValidDate = selectedDataVal.vehInsValidDate?selectedDataVal.vehInsValidDate.toString():"";
    this.dprvehiplacedmodel.vehFitValidDate = selectedDataVal.vehFitValidDate?selectedDataVal.vehFitValidDate.toString():"";
    this.dprvehiplacedmodel.vehPermitValidDate = selectedDataVal.vehPermitValidDate?selectedDataVal.vehPermitValidDate.toString():"";
    this.dprvehiplacedmodel.driverName = selectedDataVal.driverName?selectedDataVal.driverName.toString().toUpperCase():"";
    this.dprvehiplacedmodel.driverMob1 = selectedDataVal.driverMob1?selectedDataVal.driverMob1.toString():"";
    this.dprvehiplacedmodel.challanChrgWt = selectedDataVal.challanChrgWt?selectedDataVal.challanChrgWt.toString():"";
    this.dprvehiplacedmodel.ratePerTon = selectedDataVal.ratePerTon?selectedDataVal.ratePerTon.toString():"";
    this.dprvehiplacedmodel.lorryHire = selectedDataVal.lorryHire?selectedDataVal.lorryHire.toString():"";
    this.dprvehiplacedmodel.advance1 = selectedDataVal.advance1?selectedDataVal.advance1.toString():"";
    this.dprvehiplacedmodel.advance2 = selectedDataVal.advance2?selectedDataVal.advance2.toString():"";
    this.dprvehiplacedmodel.advance3 = selectedDataVal.advance3?selectedDataVal.advance3.toString():"";
    this.dprvehiplacedmodel.advanceAmt = selectedDataVal.advanceAmt?selectedDataVal.advanceAmt.toString():"";
    this.dprvehiplacedmodel.balanceAmt = selectedDataVal.balanceAmt?selectedDataVal.balanceAmt.toString():"";
    this.dprvehiplacedmodel.assignToStaff = selectedDataVal.assignToStaff?selectedDataVal.assignToStaff.toString():"";
    this.dprvehiplacedmodel.loggedInUser = this.loggedInUserID;  
    
    this.dprvehiplacedmodel.dprDtls = [];

    if(selectedDataVal.arrayList.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      return;
    }
    var maincnt = 0;      
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {   
      if(selectedDataVal.arrayList[i].mainGcYN=='Y'){
        maincnt = maincnt +1
      }   
    }
    if(maincnt==1){
        //ignore
    } 
    else{
      this.toasterService.warning("should be 1 Main Lr");
      return;
    }

    var chkDuplicate = true;

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {   
      if(!selectedDataVal.arrayList[i].gcNoteNo){
        this.toasterService.warning("GcNote No Should Not be Empty");
        return;
      }
      if(selectedDataVal.arrayList[i].gcNoteNo==''){
        this.toasterService.warning("GcNote No Should Not be Empty");
        return;
      }
      if(selectedDataVal.arrayList[i].mainGcYN==''){
        this.toasterService.warning("MainGcYN No Should Not be Empty");
        return;
      }
      this.requestmodel.strRequest = this.branch;
      this.requestmodel.strRequest1 = selectedDataVal.arrayList[i].gcNoteNo;
      this.lrentryService.checkDuplicateLr(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
       else{
          this.toasterService.warning(this.responseDetails.message);
          chkDuplicate = false;
        }
      });
           

      this.dprvehiplacedmodel.dprDtls.push({
        'dprDtlId': selectedDataVal.arrayList[i].dprDtlId,
        'dprId': '',
        'fromPlace': '',
        'toPlace': '',
        'fromStn': '',
        'toStn': '',
        'gcNoteNo':selectedDataVal.arrayList[i].gcNoteNo.toString().toUpperCase(),
        'mainGcYN':selectedDataVal.arrayList[i].mainGcYN.toString().toUpperCase(),
        'specialRemarks': selectedDataVal.arrayList[i].specialRemarks.toString().toUpperCase(),
      });
    }

    this.sharedService.loading=true;
    setTimeout(() => {     
      if(chkDuplicate){        
        this.formSubmitted = true;
        this.dprvehiplacedService.dprVehiPlacedSubmitted(this.dprvehiplacedmodel).subscribe((res: Responsemodel) => {
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
      }
    }, 2000);    
    this.sharedService.loading=false;
  }
}





