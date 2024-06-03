import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Challanmastermodel } from 'src/app/models/challanmastermodel';
import { ChallanmasterService } from 'src/app/services/challanmaster.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';
import { Panvalidapiresultmodel } from 'src/app/models/panvalidapiresultmodel';

@Component({
  selector: 'app-challanmasteradd',
  templateUrl: './challanmasteradd.component.html',
  styleUrls: ['./challanmasteradd.component.css']
})
export class ChallanmasteraddComponent {
  formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  newDate: string = '';
  noPackages:string = '';

  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  selectedChallanDetails = new Challanmastermodel();
  panDetails = new Panvalidapiresultmodel();
  keywordLocation = 'dataName';
  photo1: string = "";
  photo2: string = "";
  photo3: string = "";
  truckDriverImage: string = "";

  step1Active = true;
  step2Active = false;
  step3Active = false;
  
  @ViewChild('photo1Input', {
    static: true
  }) photo1Input: any;

  @ViewChild('photo2Input', {
    static: true
  }) photo2Input: any;

  @ViewChild('photo3Input', {
    static: true
  }) photo3Input: any;

  @ViewChild('truckDriverImageInput', {
    static: true
  }) truckDriverImageInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private challanmodel: Challanmastermodel, private challanmasterService: ChallanmasterService,
    private commonService: CommonService,  private sharedService: SharedService,
    private lrentryService: ConsignmentService,
    private toastrService: ToastrService, private requestmodel: Requestmodel) {
    this.challanmodel = new Challanmastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Challan Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
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
    today.setMonth(month - 1);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   

    this.sharedService.loading = true;
    this.getBranchList();
    this.getLocationList();
    this.getVehTypes();
    this.getBrokerList();
    this.getEmpList();  
    this.getYearList(); 

    this.sharedService.loading = false;
    
    this.selectedChallanDetails = this.challanmasterService.getChallanDetails();

    this.formUser = this.formBuilder.group({
      challanBranch: new FormControl(this.branch, [Validators.required]),
      challanNo: new FormControl('', [Validators.required]),
      challanDateTime: new FormControl(this.loginDate, [Validators.required]),
      chStatus: new FormControl('TBB', [Validators.required]),
      lrNo: new FormControl('',),
      challanFromStn: new FormControl('', [Validators.required]),
      challanToStn: new FormControl('', [Validators.required]),
      distanceKms: new FormControl('',),
      mainChallanBranch: new FormControl('', [Validators.required]),
      mainChallanNo: new FormControl('', [Validators.required]),
      truckNo: new FormControl('', [Validators.required]),
      ownTruckYN: new FormControl('',),
      brokerId: new FormControl('', [Validators.required]),
      brokerMblNo: new FormControl('',),    
      vehicleType: new FormControl('', [Validators.required]),    
      vehicleMake: new FormControl('',),    
      vehicleModel: new FormControl('',),
      engineNo: new FormControl('',),    
      chassisNo: new FormControl('', ),    
      vehicleOwnerName: new FormControl('',),
      vehicleOwnerAdd1: new FormControl('',),
      vehicleOwnerAdd2: new FormControl('',),
      vehicleOwnerPanNo: new FormControl('',),
      vehicleOwnerMblNo: new FormControl('',),    
      vehicleInsDetails: new FormControl('',),    
      panValid: new FormControl('',),    
      aadharLinked: new FormControl('',),    
      itFiled: new FormControl('',),
      permitValid: new FormControl('',),   
      driverName : new FormControl('',),   
      driverAddress: new FormControl('',),    
      driverLicNo: new FormControl('',),
      driverLicIssuedAt: new FormControl('',),    
      driverLicValid: new FormControl('',),    
      driverMblNo: new FormControl('',),    
      engagedBy: new FormControl('',),    
      loadedBy: new FormControl('',),
      unLoadingBy: new FormControl('',),
      declarationYN: new FormControl('',),    
      odcLength: new FormControl('',),    
      odcWidth: new FormControl('',),   
      odcHeight: new FormControl('',),
      odcCFT: new FormControl('',),
      totPkgs: new FormControl('',),    
      totActWt: new FormControl('',),    
      totChrgWt: new FormControl('',),    
      ratePerTon: new FormControl('',),    
      lorryHire: new FormControl('',),    
      extraHire1: new FormControl('',),    
      extraHire2: new FormControl('',),    
      extraHire3: new FormControl('',),    
      deduction1: new FormControl('',),    
      deduction2: new FormControl('',),
      subTotal: new FormControl('',),    
      tdsPct: new FormControl('',),    
      tdsAmt: new FormControl('',),    
      totalHire: new FormControl('',),    
      cashAdvance: new FormControl('',),    
      cardAdvance: new FormControl('',),    
      totalAdvance: new FormControl('',),    
      balance: new FormControl('',),    
      balancePayAt: new FormControl('',),    
      generalRemarks: new FormControl('',[Validators.required]),   
      modifyRemarks: new FormControl('',),    
      arrayList: this.formBuilder.array([this.createInitialArray()])  , 
    });

    this.formUser.controls["challanBranch"].disable();
    this.formUser.controls["subTotal"].disable();
    this.formUser.controls["tdsPct"].disable();
    this.formUser.controls["tdsAmt"].disable();
    this.formUser.controls["totalHire"].disable();
    this.formUser.controls["totalAdvance"].disable();
    this.formUser.controls["balance"].disable();
    this.formUser.controls["modifyRemarks"].disable();
    this.formUser.controls["panValid"].disable();  
    this.formUser.controls["aadharLinked"].disable();  
    this.formUser.controls["declarationYN"].disable();  
    this.formUser.controls["totPkgs"].disable();  
    this.formUser.controls["totActWt"].disable();  

    
    this.formArray.controls[0].get("consignmentId")?.disable();
    this.formArray.controls[0].get("fplace")?.disable();
    this.formArray.controls[0].get("tplace")?.disable();
    this.formArray.controls[0].get("bookingDate")?.disable();

    if (this.selectedChallanDetails.challanId != '') {
      this.photo1 = Constants.UploadFolderPath + 'challan/photo1/' + this.selectedChallanDetails.photo1;
      this.photo1 = Constants.UploadFolderPath + 'challan/photo2/' + this.selectedChallanDetails.photo2;
      this.photo1 = Constants.UploadFolderPath + 'challan/photo3/' + this.selectedChallanDetails.photo3;
      this.photo1 = Constants.UploadFolderPath + 'challan/truckDriverImage/' + this.selectedChallanDetails.truckDriverImage;
      this.formUser.patchValue(this.selectedChallanDetails);
      this.formUser.patchValue({
        challanDateTime: this.commonService.formatDate(this.selectedChallanDetails.challanDateTime) ,
        driverLicValid : this.commonService.formatDate(this.selectedChallanDetails.driverLicValid),
        challanFromStn: this.locationList.find(e => e.dataId == this.selectedChallanDetails.challanFromStn),
        challanToStn: this.locationList.find(e => e.dataId == this.selectedChallanDetails.challanToStn), 
        brokerId : this.brokerList.find(e => e.dataId == this.selectedChallanDetails.brokerId),           
      })   
      
      if(this.selectedChallanDetails.panValid=="Y"){
        this.formUser.patchValue({
          panValid: "Y"         
        })   
      }
      else{
        this.formUser.patchValue({
          panValid: ""         
        })   
      }
      if(this.selectedChallanDetails.aadharLinked=="Y"){
        this.formUser.patchValue({
          aadharLinked: "Y"         
        })   
      }
      else{
        this.formUser.patchValue({
          aadharLinked: ""         
        })   
      }
      if(this.selectedChallanDetails.declarationYN=="Y"){
        this.formUser.patchValue({
          declarationYN: "Y"         
        })   
      }
      else{
        this.formUser.patchValue({
          declarationYN: ""         
        })   
      }

      this.formUser.controls['challanNo'].disable();  
      this.formUser.controls["modifyRemarks"].enable();   
      this.getChallanInnerGridList();   
      this.editMode = true;     
    }   
    this.sharedService.loading = false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }
  
  createInitialArray() {
    return this.formBuilder.group({
      gcYear: ['', []],
      gcBook: ['', []],
      gcNoteNo: ['', []],
      consignmentId: ['', []],
      fplace: ['', []],
      tplace: ['', []],
      bookingDate: ['', []],
      challanPkgs: ['', []],
      challanWT: ['', []],
    });
  }

  
  getChallanInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedChallanDetails.challanId;
    this.challanmasterService.getChallanInnerGridList(this.requestmodel).subscribe((res) => {
      this.challanmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.challanDtls.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("gcYear")?.setValue(res.challanDtls[i].gcYear);
        this.formArray.controls[i].get("gcBook")?.setValue(res.challanDtls[i].gcBook);
        this.formArray.controls[i].get("gcNoteNo")?.setValue(res.challanDtls[i].gcNoteNo);
        this.formArray.controls[i].get("consignmentId")?.setValue(res.challanDtls[i].consignmentId);
        this.formArray.controls[i].get("fplace")?.setValue(res.challanDtls[i].fplace);
        this.formArray.controls[i].get("tplace")?.setValue(res.challanDtls[i].tplace);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.challanDtls[i].bookingDate));
        this.formArray.controls[i].get("challanPkgs")?.setValue(res.challanDtls[i].challanPkgs);
        this.formArray.controls[i].get("challanWT")?.setValue(res.challanDtls[i].challanWT);
        
        this.formArray.controls[i].get("gcYear")?.disable();
        this.formArray.controls[i].get("gcBook")?.disable();
        this.formArray.controls[i].get("gcNoteNo")?.disable();
        this.formArray.controls[i].get("consignmentId")?.disable();
        this.formArray.controls[i].get("fplace")?.disable();
        this.formArray.controls[i].get("tplace")?.disable();
        this.formArray.controls[i].get("bookingDate")?.disable();
      }      
      this.formArray.push(this.createInitialArray());      
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
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

  getVehTypes(): void {
    this.commonService.getVehicleList().subscribe((res) => {
      this.vehicalType = res;
    });
  }
  
  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      this.formUser.patchValue({
        affectYear:this.yearList[0].dataId,
      }) 
   });
  }    

  onBranchChange() {
    var selectedData = this.formUser.getRawValue();
    if (selectedData.bookingPlace==""){
      this.requestmodel.strRequest = this.branch;
    }
    else{
      this.requestmodel.strRequest = selectedData.bookingPlace;
    }

    this.challanmasterService.getChallanNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formUser.patchValue({
          challanNo: this.responseDetails.message
        });
      }
     else{
        this.toastrService.warning(this.responseDetails.message);
      }
    });
  }

  chkChallanDuplicate(){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.gcNoteNo==""){
      this.toastrService.warning("GC Note No should not be Blank");
      return;
    }
    else{
      this.requestmodel.strRequest = selectedData.bookingPlace;
      this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.challanmasterService.checkDuplicateChallan(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toastrService.warning(this.responseDetails.message);
        }
      });
    }   
  }

  onGcNoteChange(i:number,e: any) {
    var selectedData = this.formUser.getRawValue();
    this.requestmodel.strRequest = selectedData.bookingPlace;
    this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.challanmasterService.getConsignmentId(this.requestmodel).subscribe((res: Challanmastermodel) => {
      this.challanmodel = res;
      if (this.responseDetails.status) {       
        this.formArray.controls[i].get("consignmentId")?.setValue(res.challanDtls[0].consignmentId);
        this.formArray.controls[i].get("fplace")?.setValue(res.challanDtls[0].fplace);
        this.formArray.controls[i].get("tplace")?.setValue(res.challanDtls[0].tplace);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.challanDtls[0].bookingDate));
        this.formArray.controls[i].get("challanPkgs")?.setValue(res.challanDtls[0].challanPkgs);
        this.formArray.controls[i].get("challanWT")?.setValue(res.challanDtls[0].challanWT);
        
        this.formArray.controls[i].get("gcYear")?.disable();
        this.formArray.controls[i].get("gcBook")?.disable();
        this.formArray.controls[i].get("gcNoteNo")?.disable();
        this.formArray.controls[i].get("consignmentId")?.disable();
        this.formArray.controls[i].get("fplace")?.disable();
        this.formArray.controls[i].get("tplace")?.disable();
        this.formArray.controls[i].get("bookingDate")?.disable();
      }
      else{
        this.formArray.controls[i].get("gcNoteNo")?.setValue("");
        this.toastrService.warning(this.responseDetails.message);
      }
    });
  }

  onPkgsChange(){
    var totPkgs = 0
    var selectedDataValue = this.formUser.getRawValue();
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(selectedDataValue.arrayList[i].challanPkgs!="") {
        totPkgs = totPkgs + parseFloat(selectedDataValue.arrayList[i].challanPkgs);
      }         
    }
    this.formUser.patchValue({
      totPkgs: totPkgs,
    });
  }

  onActWtChange(){
    var totActWt = 0
    var selectedDataValue = this.formUser.getRawValue();
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(selectedDataValue.arrayList[i].challanWT!="") {
        totActWt = totActWt + parseFloat(selectedDataValue.arrayList[i].challanWT);
      }         
    }
    this.formUser.patchValue({
      totActWt: totActWt,
    });
  }

  onOwnerPanChange() {
    var pan = this.formUser.value.vehicleOwnerPanNo ;
    var regexp = new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')
    var test = regexp.test(pan);
    var tdsPct = 0;

    if(pan == "PANNOTREQD"){
      tdsPct = 0;
    }
    else if(pan == "NOVALIDPAN"){
      tdsPct = 20;
    }
    else if(pan.length!=10){
      this.toastrService.warning("PAN No should be 10 characters...!");
      return;
    }
    else if(!test){
      this.toastrService.warning("Invalid PAN No...!");
      return;
    }
    else{
      this.requestmodel.strRequest = pan;
      this.challanmasterService.getPanValidDetails(this.requestmodel).subscribe((res: Panvalidapiresultmodel) => {
        this.panDetails = res;
        var panValid = "";
        var aadharLinked = "";
        if (this.panDetails.result.number!="") { 
          if(this.panDetails.result.isValid){
            panValid= "Y";
          }
          if(this.panDetails.result.aadhaarSeedingStatusCode=="Y"){
            aadharLinked="Y";
          }
          var ch = pan.substring(3, 4) ;
          if(ch == "P" || ch == "H"){
            if(panValid == "Y" && aadharLinked == "Y"){
              this.formUser.controls["declarationYN"].enable();  
              tdsPct = 1;
            }
            else{
              tdsPct = 20;
            }
          }
          else{
            if(panValid == "Y"){
              tdsPct = 2;
            }
            else{
              tdsPct = 20;
            }
          }

          this.formUser.patchValue({
            panValid: panValid,
            aadharLinked: aadharLinked,
            vehicleOwnerName: this.panDetails.result.name,
            tdsPct: tdsPct
          });  
        }
        else{          
          this.toastrService.warning("Invalid PAN No...!");
          return;
        }
      }); 
    }

    setTimeout(() => {
      this.calculateTotalAmount();
    }, 300);
  }

  onDeclareChk(e: any) {
    if (e.target.checked) {
      this.formUser.patchValue({       
        tdsPct: 0
      }); 
    }
    else {
      this.formUser.patchValue({       
        tdsPct: 20
      }); 
    }
    this.calculateTotalAmount();
  }

  onStatusChange(e: any) {
    if (e.target.value == "I") {
      this.formUser.controls['mainChallanBranch'].setValidators([Validators.required]);
      this.formUser.controls['mainChallanNo'].setValidators([Validators.required]);     
    }
    else{
      this.formUser.controls['mainChallanBranch'].clearValidators();
      this.formUser.controls['mainChallanNo'].clearValidators();
    }
    this.formUser.controls['mainChallanBranch'].updateValueAndValidity();
    this.formUser.controls['mainChallanNo'].updateValueAndValidity();
  }

  chkTruck(e: any) {
    if(e.target.checked){
      var selectedData = this.formUser.getRawValue();
      if (selectedData.truckNo==""){
        this.toastrService.warning("Vehicle No should not be Blank");
        return;
      }
      else{
        this.requestmodel.strRequest = selectedData.truckNo;
        this.lrentryService.checkVehicleNo(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            //ignore
          }
         else{
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }   
    }
  }      
  
  calculateTotalAmount(){
    var subTotal = 0;
    var tdsAmt = 0;
    var totalHire = 0;
    var totalAdvance = 0;
    var balance = 0;
    var selectedDataValue = this.formUser.getRawValue();

    var lorryHire = selectedDataValue.lorryHire!= ""? parseFloat(selectedDataValue.lorryHire) : 0;
    var extraHire1 = selectedDataValue.extraHire1!= ""? parseFloat(selectedDataValue.extraHire1 ) : 0;
    var extraHire2 = selectedDataValue.extraHire2!= ""? parseFloat(selectedDataValue.extraHire2) : 0;
    var extraHire3 = selectedDataValue.extraHire3!= ""? parseFloat(selectedDataValue.extraHire3) : 0;
    var deduction1 = selectedDataValue.deduction1!= ""? parseFloat(selectedDataValue.deduction1) : 0;
    var deduction2 = selectedDataValue.deduction2!= ""? parseFloat(selectedDataValue.deduction2 ) : 0;
    var tdsPct = selectedDataValue.tdsPct!= ""? parseFloat(selectedDataValue.tdsPct) : 0;
    var cashAdvance = selectedDataValue.cashAdvance!= ""? parseFloat(selectedDataValue.cashAdvance) : 0;
    var cardAdvance = selectedDataValue.cardAdvance!= ""? parseFloat(selectedDataValue.cardAdvance) : 0;

    subTotal = lorryHire + extraHire1 + extraHire2 + extraHire3 - deduction1 - deduction2
   
    if(tdsPct>0){
      tdsAmt = Math.round((subTotal * tdsPct)/100)
    }

    totalHire = totalHire + tdsAmt;
    totalAdvance = cashAdvance + cardAdvance;
    balance = totalHire - totalAdvance;
    this.formUser.patchValue({
      subTotal: subTotal.toFixed(2),
      tdsAmt: tdsAmt.toFixed(2),
      totalHire: totalHire.toFixed(2),
      totalAdvance: totalAdvance.toFixed(2),
      balance: balance.toFixed(2),
    });
  }  
  
  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // do something with selected item
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));    
  };

  getDetails(){
    var selectedData = this.formUser.getRawValue();
    this.requestmodel.strRequest = selectedData.lrNo;
    if(selectedData.lrNo==""){
      this.toastrService.warning("Please Enter LR No ");
      return;
    }
    this.challanmasterService.getDetails(this.requestmodel).subscribe((res: Challanmastermodel) => {    
      this.selectedChallanDetails = res
      this.formUser.patchValue(this.selectedChallanDetails);
      this.formUser.patchValue({
        driverLicValid : this.commonService.formatDate(this.selectedChallanDetails.driverLicValid),
        challanFromStn: this.locationList.find(e => e.dataId == this.selectedChallanDetails.challanFromStn),
        challanToStn: this.locationList.find(e => e.dataId == this.selectedChallanDetails.challanToStn), 
        brokerId : this.brokerList.find(e => e.dataId == this.selectedChallanDetails.brokerId),           
      })  

      if (res.challanDtls.length>0) {      
        this.formArray.controls[0].get("gcYear")?.setValue(res.challanDtls[0].gcYear);
        this.formArray.controls[0].get("gcBook")?.setValue(res.challanDtls[0].gcBook);
        this.formArray.controls[0].get("gcNoteNo")?.setValue(res.challanDtls[0].gcNoteNo);
        this.formArray.controls[0].get("consignmentId")?.setValue(res.challanDtls[0].consignmentId);
        this.formArray.controls[0].get("fplace")?.setValue(res.challanDtls[0].fplace);
        this.formArray.controls[0].get("tplace")?.setValue(res.challanDtls[0].tplace);
        this.formArray.controls[0].get("bookingDate")?.setValue(this.commonService.formatDate(res.challanDtls[0].bookingDate));
        this.formArray.controls[0].get("challanPkgs")?.setValue(res.challanDtls[0].challanPkgs);
        this.formArray.controls[0].get("challanWT")?.setValue(res.challanDtls[0].challanWT);
        
        this.formArray.controls[0].get("gcYear")?.disable();
        this.formArray.controls[0].get("gcBook")?.disable();
        this.formArray.controls[0].get("gcNoteNo")?.disable();
        this.formArray.controls[0].get("consignmentId")?.disable();
        this.formArray.controls[0].get("fplace")?.disable();
        this.formArray.controls[0].get("tplace")?.disable();
        this.formArray.controls[0].get("bookingDate")?.disable();
      }
      if(this.selectedChallanDetails.vehicleOwnerPanNo==""){
        this.formUser.patchValue({        
          tdsPct: 20
        });  
      }
      else{
        this.onOwnerPanChange();
      }    

      setTimeout(() => {
        this.calculateTotalAmount();
      }, 300);
    });
  }


  addItem(index: number): void {
    if (this.formArray.value[index].consignmentId != "" && this.formArray.value[index].challanPkgs != "" 
      && this.formArray.value[index].challanWT != "") {
      this.formArray.push(this.createInitialArray()); 
    }
    else {
      this.toastrService.warning("Please select Required Fields ");
      return;
    } 
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);   
  }
 
  deleteChallanForm(): void {
    if(this.selectedChallanDetails.challanId != '' ){      
      this.sharedService.loading = true;
      this.requestmodel.strRequest =this.selectedChallanDetails.challanId;
      if (confirm("Are you sure, you want to delete this?")) {
            this.challanmasterService.challanDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/challanlist']);
            }
            else {
              this.toastrService.warning(this.responseDetails.message);
            }    
        });
      }      
      this.sharedService.loading = false;
    }
  }

  exit(): void {
    this.route.navigate(['/challanlist']);
  }

  submitChallanForm(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }

    var selectedDataValue = this.formUser.getRawValue();

    if (selectedDataValue.challanFromStn.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataValue.challanToStn.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" To Place is Invalid");
      return;
    }

    if (selectedDataValue.brokerId.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Broker is Invalid");
      return;
    }
    if(selectedDataValue.declarationYN){
      if(this.photo1Input.nativeElement.files[0]){
        //ignore
      }
      else{
        this.toastrService.warning("Declaration Doc Is Mandatory");
        return;
      }
    }


    this.sharedService.loading = true;
    this.challanmodel.challanId = this.selectedChallanDetails.challanId;
    this.challanmodel.challanBranch= selectedDataValue.challanBranch;
    this.challanmodel.challanNo= selectedDataValue.challanNo;
    this.challanmodel.challanDateTime= selectedDataValue.challanDateTime;
    this.challanmodel.chStatus= selectedDataValue.chStatus;
    this.challanmodel.challanFromStn= selectedDataValue.challanFromStn?selectedDataValue.challanFromStn.dataId:"";
    this.challanmodel.challanToStn= selectedDataValue.challanToStn?selectedDataValue.challanToStn.dataId:"";
    this.challanmodel.distanceKms= selectedDataValue.distanceKms;
    this.challanmodel.mainChallanBranch= selectedDataValue.mainChallanBranch;
    this.challanmodel.mainChallanNo= selectedDataValue.mainChallanNo;
    this.challanmodel.truckNo= selectedDataValue.truckNo;
    this.challanmodel.ownTruckYN= selectedDataValue.ownTruckYN?"Y":"N";
    this.challanmodel.brokerId= selectedDataValue.brokerId?selectedDataValue.brokerId.dataId:"";
    this.challanmodel.brokerMblNo= selectedDataValue.brokerMblNo;
    this.challanmodel.vehicleType= selectedDataValue.vehicleType;
    this.challanmodel.vehicleMake= selectedDataValue.vehicleMake;
    this.challanmodel.vehicleModel= selectedDataValue.vehicleModel;
    this.challanmodel.engineNo= selectedDataValue.engineNo;
    this.challanmodel.chassisNo= selectedDataValue.chassisNo;
    this.challanmodel.vehicleOwnerName= selectedDataValue.vehicleOwnerName;
    this.challanmodel.vehicleOwnerAdd1= selectedDataValue.vehicleOwnerAdd1;
    this.challanmodel.vehicleOwnerAdd2= selectedDataValue.vehicleOwnerAdd2;
    this.challanmodel.vehicleOwnerPanNo= selectedDataValue.vehicleOwnerPanNo;
    this.challanmodel.vehicleOwnerMblNo= selectedDataValue.vehicleOwnerMblNo;
    this.challanmodel.vehicleInsDetails= selectedDataValue.vehicleInsDetails;
    this.challanmodel.panValid= selectedDataValue.panValid?"Y":"N";
    this.challanmodel.aadharLinked= selectedDataValue.aadharLinked?"Y":"N";
    this.challanmodel.itFiled= selectedDataValue.itFiled?"Y":"N";
    this.challanmodel.permitValid= selectedDataValue.permitValid?"Y":"N";
    this.challanmodel.driverAddress= selectedDataValue.driverAddress
    this.challanmodel.driverLicNo= selectedDataValue.driverLicNo
    this.challanmodel.driverLicIssuedAt= selectedDataValue.driverLicIssuedAt
    this.challanmodel.driverLicValid= selectedDataValue.driverLicValid
    this.challanmodel.driverMblNo= selectedDataValue.driverMblNo
    this.challanmodel.engagedBy= selectedDataValue.engagedBy
    this.challanmodel.loadedBy= selectedDataValue.loadedBy
    this.challanmodel.unLoadingBy= selectedDataValue.unLoadingBy
    this.challanmodel.declarationYN= selectedDataValue.declarationYN?"Y":"N";
    this.challanmodel.odcLength= selectedDataValue.odcLength
    this.challanmodel.odcWidth= selectedDataValue.odcWidth
    this.challanmodel.odcHeight= selectedDataValue.odcHeight
    this.challanmodel.odcCFT= selectedDataValue.odcCFT
    this.challanmodel.totPkgs= selectedDataValue.totPkgs? selectedDataValue.totPkgs : "0"; 
    this.challanmodel.totActWt= selectedDataValue.totActWt? selectedDataValue.totActWt : "0"; 
    this.challanmodel.totChrgWt= selectedDataValue.totChrgWt? selectedDataValue.totChrgWt : "0"; 
    this.challanmodel.ratePerTon= selectedDataValue.ratePerTon? selectedDataValue.ratePerTon : "0"; 
    this.challanmodel.lorryHire= selectedDataValue.lorryHire? selectedDataValue.lorryHire : "0"; 
    this.challanmodel.extraHire1= selectedDataValue.extraHire1? selectedDataValue.extraHire1 : "0"; 
    this.challanmodel.extraHire2= selectedDataValue.extraHire2? selectedDataValue.extraHire2 : "0"; 
    this.challanmodel.extraHire3= selectedDataValue.extraHire3? selectedDataValue.extraHire3 : "0"; 
    this.challanmodel.deduction1= selectedDataValue.deduction1? selectedDataValue.deduction1 : "0"; 
    this.challanmodel.deduction2= selectedDataValue.deduction2? selectedDataValue.deduction2 : "0"; 
    this.challanmodel.subTotal= selectedDataValue.subTotal? selectedDataValue.subTotal : "0"; 
    this.challanmodel.tdsPct= selectedDataValue.tdsPct? selectedDataValue.tdsPct : "0"; 
    this.challanmodel.tdsAmt= selectedDataValue.tdsAmt? selectedDataValue.tdsAmt : "0"; 
    this.challanmodel.totalHire= selectedDataValue.totalHire? selectedDataValue.totalHire : "0"; 
    this.challanmodel.cashAdvance= selectedDataValue.cashAdvance? selectedDataValue.cashAdvance : "0"; 
    this.challanmodel.cardAdvance= selectedDataValue.cardAdvance? selectedDataValue.cardAdvance : "0"; 
    this.challanmodel.totalAdvance= selectedDataValue.totalAdvance? selectedDataValue.totalAdvance : "0"; 
    this.challanmodel.balance = selectedDataValue.balance? selectedDataValue.balance : "0"; 
    this.challanmodel.balancePayAt= selectedDataValue.balancePayAt;
    this.challanmodel.generalRemarks = selectedDataValue.generalRemarks.toString().toUpperCase();
    this.challanmodel.modifyRemarks = selectedDataValue.modifyRemarks.toString().toUpperCase();
    this.challanmodel.yearId = this.year;
    this.challanmodel.loggedInUser = this.loggedInUserID;

    this.challanmodel.challanDtls = [];

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].consignmentId != "" && selectedDataValue.arrayList[i].challanPkgs != "" 
        && selectedDataValue.arrayList[i].challanWT != "") {
        this.challanmodel.challanDtls.push({
          'challanId': '',
          'gcYear': selectedDataValue.arrayList[i].gcYear,
          'gcBook': selectedDataValue.arrayList[i].gcBook,
          'gcNoteNo': selectedDataValue.arrayList[i].gcNoteNo,
          'consignmentId': selectedDataValue.arrayList[i].consignmentId,
          'fplace':"",
          'tplace':"",
          'bookingDate':"",
          'challanPkgs': selectedDataValue.arrayList[i].challanPkgs,
          'challanWT': selectedDataValue.arrayList[i].challanWT,
          'yearId': '',
        });
      }
    }
    
    let formData = new FormData();
    formData.append('photo1', this.photo1Input.nativeElement.files[0]);
    formData.append('photo2', this.photo2Input.nativeElement.files[0]);
    formData.append('photo3', this.photo3Input.nativeElement.files[0]);
    formData.append('truckDriverImage', this.truckDriverImageInput.nativeElement.files[0]);

    formData.append('datadetails', JSON.stringify(this.challanmodel));

     
    this.challanmasterService.challanDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (res.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/challanlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
    });

    this.sharedService.loading = false;
  }

  nextStep(index: number): void {
    if (index === 1) {
      this.step1Active = true;
      this.step2Active = false;
      this.step3Active = false;
    }
    if (index === 2) {
      this.step1Active = false;
      this.step2Active = true;
      this.step3Active = false;
    }
    if (index === 3) {
      this.step1Active = false;
      this.step2Active = false;
      this.step3Active = true;
    }
  }

}