import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-consignmentadd',
  templateUrl: './consignmentadd.component.html',
  styleUrls: ['./consignmentadd.component.css']
})
export class ConsignmentaddComponent implements OnInit {

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
  rateList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  classList: Dropdownmodel[] = [];
  businessByList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  eWayBillDetails = new Ewaybillmodel();
  selectedLrDetails = new Consignmentmodel();
  keywordLocation = 'dataName';
  attach1: string = "";
  createdBy : string = "";
  modifiedBy: string = "";

  step1Active = true;
  step2Active = false;
  step3Active = false;
  
  @ViewChild('attachInput', {
    static: true
  }) attachInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private lrmodel: Consignmentmodel, private lrentryService: ConsignmentService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private requestmodel: Requestmodel) {
    this.lrmodel = new Consignmentmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Consignment/LR Entry");
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
    today.setMonth(month - 12);
    
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
    this.getRateList();
    this.getContentList();
    this.getLocationList();
    this.getClassList();
    this.getBusiByList();
    this.getVehicleNoList();
    this.getBillingPartyList();
    this.getVehTypes();

    this.sharedService.loading = false;
    
    this.selectedLrDetails = this.lrentryService.getConsignmentDetails();

    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl(this.branch, [Validators.required]),
      gcNoteNo  : new FormControl('', [Validators.required]),
      bookingDate : new FormControl(this.loginDate, [Validators.required]),
      bookingStatus : new FormControl('TBB', [Validators.required]),
      ewayBillEntryType : new FormControl('A', [Validators.required]),
      ewayBillNo : new FormControl('', [Validators.required]),
      ewayBillDate : new FormControl('', [Validators.required]),
      ewayBillExpDate: new FormControl(''),
      invoiceNo        : new FormControl('', [Validators.required]),
      invoiceDate : new FormControl('', [Validators.required]),
      invoiceValue : new FormControl('', [Validators.required]),
      declaredValue : new FormControl('',),    
      fromPlace : new FormControl('', [Validators.required]),    
      toPlace : new FormControl('', [Validators.required]),    
      kms : new FormControl('0',),
      ownTruck : new FormControl('',),    
      truckNo : new FormControl('', [Validators.required]),    
      billingParty : new FormControl('', [Validators.required]),
      billingBranch : new FormControl(this.branch, [Validators.required]),
      businessBranch : new FormControl(this.branch, [Validators.required]),
      cnorName : new FormControl('', [Validators.required]),
      cnorAdd1 : new FormControl('',),    
      cnorAdd2 : new FormControl('',),    
      cnorAdd3 : new FormControl('',),    
      cnorPin : new FormControl('',),    
      cnorGst : new FormControl('', ),
      cnorMobile : new FormControl('',),    
      cnorEmail : new FormControl('',),    
      cneeName : new FormControl('', ),
      cneeAdd1 : new FormControl('',),    
      cneeAdd2 : new FormControl('',),    
      cneeAdd3 : new FormControl('',),    
      cneePin : new FormControl('',),    
      cneeGst : new FormControl('',),
      cneeMobile : new FormControl('', [Validators.required]),
      cneeEmail : new FormControl('',),    
      shipmentNo : new FormControl('',),    
      shipmentDt : new FormControl('',),    
      // deliveryNo : new FormControl('',),    
      // deliveryDt : new FormControl('',),    
      // poNo : new FormControl('',),    
      // poDt : new FormControl('',),    
      // riskBy : new FormControl('',),    
      // insCoName :new FormControl('',),    
      // insPolicyNo : new FormControl('',),    
      // insValidDt : new FormControl('',),    
      // insuredValue : new FormControl('',),    
      classId : new FormControl('', [Validators.required]),
      productId : new FormControl('', [Validators.required]),
      productDesc : new FormControl('',),    
      hsnSac : new FormControl('',),    
      noPackages : new FormControl('',),    
      looseFlag : new FormControl('',),    
      weightType : new FormControl('MT',),    
      actualWt : new FormControl('',),    
      senderWt : new FormControl('',),    
      chargewt : new FormControl('',),    
      wtDesc :new FormControl('',),    
      vehicleTypeId :new FormControl('', [Validators.required]),
      privateMark : new FormControl('',),    
      bulkYN : new FormControl('',),    
      loadLength : new FormControl('',),    
      loadWidth : new FormControl('',),    
      loadHeight : new FormControl('',),    
      loadCFT : new FormControl('',),    
      rateType : new FormControl('1',),    
      rateDesc : new FormControl('',),    
      gstBy : new FormControl('',),    
      rateRs : new FormControl('',),    
      freightRs : new FormControl('',),    
      statisticalRs : new FormControl('',),    
      fovRs : new FormControl('',),    
      doorCollRs : new FormControl('',),    
      handlingRs : new FormControl('',),    
      loadingDetnRs : new FormControl('',),    
      enrouteRs : new FormControl('',),    
      miscRs : new FormControl('',),    
      doorDelRs : new FormControl('',),    
      unLoadingRs : new FormControl('',),    
      unLoadingDetnRs : new FormControl('',),    
      extrasRS : new FormControl('',),    
      othersRs : new FormControl('',),    
      subTotalRs : new FormControl('',),    
      gstType : new FormControl('N',),    
      sgstPct : new FormControl('',),    
      sgstAmt : new FormControl('',),    
      cgstPct : new FormControl('',),    
      cgstAmt : new FormControl('',),     
      igstPct : new FormControl('',),   
      igstAmt : new FormControl('',),  
      nonGstAmt1 : new FormControl('',),  
      nonGstAmt1Desc : new FormControl('',),  
      nonGstAmt2 : new FormControl('',),  
      nonGstAmt2Desc : new FormControl('',), 
      gtotalRs : new FormControl('',), 
      generalRemarks : new FormControl('',), 
      businessBy : new FormControl('',),    
      arrayList: this.formBuilder.array([this.createInitialArray()])  , 
    });

    this.formUser.controls["bookingPlace"].disable();
    this.formUser.controls['ewayBillExpDate'].disable();    
    this.formUser.controls['sgstPct'].disable();
    this.formUser.controls['cgstPct'].disable();  
    this.formUser.controls['igstPct'].disable();  
    this.formUser.controls['sgstAmt'].disable();
    this.formUser.controls['cgstAmt'].disable();  
    this.formUser.controls['igstAmt'].disable();   

    setTimeout(() => {
      if (this.selectedLrDetails.consignmentID != '') {
        this.attach1 = Constants.UploadFolderPath + 'Lr/attachedfile/' + this.selectedLrDetails.attachedfile;
        this.formUser.patchValue(this.selectedLrDetails);
        this.formUser.patchValue({
          bookingDate: this.commonService.formatDate(this.selectedLrDetails.bookingDate) ,
          ewayBillDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillDate),
          ewayBillExpDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillExpDate),
          invoiceDate : this.commonService.formatDate(this.selectedLrDetails.invoiceDate),   
          shipmentDt : this.commonService.formatDate(this.selectedLrDetails.shipmentDt),   
          fromPlace: this.locationList.find(e => e.dataId == this.selectedLrDetails.fromPlace),
          toPlace: this.locationList.find(e => e.dataId == this.selectedLrDetails.toPlace), 
          billingParty : this.partyList.find(e => e.dataId == this.selectedLrDetails.billingParty),   
          businessBy : this.businessByList.find(e => e.dataId == this.selectedLrDetails.businessBy),             
        })      
        
        if(this.selectedLrDetails.ownTruck=='Y'){
          this.formUser.patchValue({
            ownTruck: 'Y'             
          })      
        }
        else{
          this.formUser.patchValue({
            ownTruck: ''             
          })  
        }
        
        this.formUser.controls['gcNoteNo'].disable();     
        if (this.selectedLrDetails.consignmentID != '0') {
          this.getLrInnerGridList();   
          this.editMode = true;  
          this.createdBy = this.selectedLrDetails.createdBy + " " + this.selectedLrDetails.createdDate;
          this.modifiedBy = this.selectedLrDetails.modifiedBy + " " + this.selectedLrDetails.modifiedDate;      
        }
        else{    
          this.formArray.clear();
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[0].get("ewayBillNo")?.setValue(this.selectedLrDetails.ewayBillNo);
          this.formArray.controls[0].get("ewayBillDate")?.setValue(this.commonService.formatDate(this.selectedLrDetails.ewayBillDate));
          this.formArray.controls[0].get("ewayBillExpDate")?.setValue(this.selectedLrDetails.ewayBillExpDate);
          this.formArray.controls[0].get("invNo")?.setValue(this.selectedLrDetails.invoiceNo);
          this.formArray.controls[0].get("invDate")?.setValue(this.commonService.formatDate(this.selectedLrDetails.invoiceDate));
          this.formArray.controls[0].get("invValue")?.setValue(this.selectedLrDetails.invoiceValue);
          this.formArray.controls[0].get("ewayBillNo")?.disable();
          this.formArray.controls[0].get("ewayBillDate")?.disable();
          this.formArray.controls[0].get("ewayBillExpDate")?.disable();
          this.formArray.controls[0].get("invNo")?.disable();
          this.formArray.controls[0].get("invDate")?.disable();
          this.formArray.controls[0].get("invValue")?.disable();     
        }
        
        this.changeEWay(this.selectedLrDetails.ewayBillEntryType);
      }
      else{
        this.changeEWay('A');
        this.onBranchChange();
        this.formArray.controls[0].get("ewayBillNo")?.disable();
        this.formArray.controls[0].get("ewayBillDate")?.disable();
        this.formArray.controls[0].get("ewayBillExpDate")?.disable();
        this.formArray.controls[0].get("invNo")?.disable();
        this.formArray.controls[0].get("invDate")?.disable();
        this.formArray.controls[0].get("invValue")?.disable();     
      }
    }, 2000);
    
    this.sharedService.loading = false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }
  
  createInitialArray() {
    return this.formBuilder.group({
      ewayBillNo: ['', []],
      ewayBillDate: ['', []],
      ewayBillExpDate: ['', []],
      invNo: ['', []],
      invDate: ['', []],
      invValue: ['', []],
    });
  }

  
  getLrInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedLrDetails.consignmentID;
    this.lrentryService.getLrInnerGridList(this.requestmodel).subscribe((res) => {
      this.lrmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.invList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("ewayBillNo")?.setValue(res.invList[i].ewayBillNo);
        this.formArray.controls[i].get("ewayBillDate")?.setValue(this.commonService.formatDate(res.invList[i].ewayBillDate));
        this.formArray.controls[i].get("ewayBillExpDate")?.setValue(res.invList[i].ewayBillExpDate);
        this.formArray.controls[i].get("invNo")?.setValue(res.invList[i].invoiceNo);
        this.formArray.controls[i].get("invDate")?.setValue(this.commonService.formatDate(res.invList[i].invoiceDate));
        this.formArray.controls[i].get("invValue")?.setValue(res.invList[i].invoiceValue);
        this.formArray.controls[i].get("ewayBillNo")?.disable();
        this.formArray.controls[i].get("ewayBillDate")?.disable();
        this.formArray.controls[i].get("ewayBillExpDate")?.disable();
        this.formArray.controls[i].get("invNo")?.disable();
        this.formArray.controls[i].get("invDate")?.disable();
        this.formArray.controls[i].get("invValue")?.disable();     
      }        
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getRateList(): void {
    this.commonService.getRateList().subscribe((res) => {
      this.rateList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }


  getClassList(): void {
    this.commonService.getClassList().subscribe((res) => {
      this.classList = res;
    });
  }

  getBusiByList(): void {
    this.commonService.getEmpList().subscribe((res) => {
      this.businessByList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  getVehTypes(): void {
    this.commonService.getVehicleTypeList().subscribe((res) => {
      this.vehicalType = res;
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

    this.lrentryService.getLrNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formUser.patchValue({
          gcNoteNo: this.responseDetails.message
        });
      }
     else{
        this.toastrService.warning(this.responseDetails.message);
      }
    });
  }

  chkLrDuplicate(){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.gcNoteNo==""){
      this.toastrService.warning("GC Note No should not be Blank");
      return;
    }
    else{
      this.requestmodel.strRequest = selectedData.bookingPlace;
      this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.lrentryService.checkDuplicateLr(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
       else{
          this.toastrService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            gcNoteNo:"",
          }); 
        }
      });
    }   
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
            this.formUser.patchValue({
              truckNo:"",
            });   
          }
        });
      }   
    }
  }
      
  changeGstType(e: any) {
    console.log(e.target.value);
    var gsttype = e.target.value; 
   
    if (gsttype == "I") {   
      this.formUser.controls['sgstPct'].disable();
      this.formUser.controls['cgstPct'].disable();  
      this.formUser.controls['igstPct'].enable();    
      this.formUser.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"0",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"0",
      });   
    }    
    else if (gsttype == "S")  {      
      this.formUser.controls['sgstPct'].enable();
      this.formUser.controls['cgstPct'].enable();  
      this.formUser.controls['igstPct'].disable();   
      this.formUser.patchValue({
        sgstPct:"0",
        cgstPct:"0",
        igstPct:"",
        sgstAmt:"0",
        cgstAmt:"0",
        igstAmt:"",
      });     
    }
    else{
      this.formUser.controls['sgstPct'].disable();
      this.formUser.controls['cgstPct'].disable();  
      this.formUser.controls['igstPct'].disable();   
      this.formUser.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"",
      });   
    }    
    this.calculateTotalAmount()
  }

  calcFrt(){
    var selectedDataVal= this.formUser.getRawValue();
    var chargewt = 0;
    var rateRs = 0;
    var freightRs = 0;
    if(selectedDataVal.chargewt!=""){
      chargewt = parseFloat(selectedDataVal.chargewt);
    }
    if(selectedDataVal.rateRs!=""){
      rateRs = parseFloat(selectedDataVal.rateRs);
    }
    freightRs = chargewt * rateRs;

    this.formUser.patchValue({
      freightRs: freightRs.toFixed(2),
    });  
    
    this.calculateTotalAmount();
  }

  calcRate(){
    var selectedDataVal= this.formUser.getRawValue();
    var chargewt = 0;
    var rateRs = 0;
    var freightRs = 0;
    if(selectedDataVal.chargeWt!=""){
      chargewt = parseFloat(selectedDataVal.chargewt);
    }
    if(selectedDataVal.freightRs!=""){
      freightRs = parseFloat(selectedDataVal.freightRs);
    }
    if (chargewt>0){
      rateRs = freightRs / chargewt;
    }    

    this.formUser.patchValue({
      rateRs: rateRs.toFixed(2),
    });   
    
    this.calculateTotalAmount();
  }

  calculateTotalAmount(){
    var subTotalRs = 0;
    var gtotalRs = 0;
    var selectedData = this.formUser.getRawValue();

    var freightRs = selectedData.freightRs != ""? parseFloat(selectedData.freightRs) : 0;
    var statisticalRs = selectedData.statisticalRs != ""? parseFloat(selectedData.statisticalRs) : 0;
    var fovRs = selectedData.fovRs != ""? parseFloat(selectedData.fovRs) : 0;
    var doorCollRs = selectedData.doorCollRs != ""? parseFloat(selectedData.doorCollRs) : 0;
    var handlingRs = selectedData.handlingRs != ""? parseFloat(selectedData.handlingRs) : 0;
    var loadingDetnRs = selectedData.loadingDetnRs != ""? parseFloat(selectedData.loadingDetnRs) : 0;
    var enrouteRs= selectedData.enrouteRs != ""? parseFloat(selectedData.enrouteRs) : 0;
    var miscRs = selectedData.miscRs != ""? parseFloat(selectedData.miscRs) : 0;
    var doorDelRs = selectedData.doorDelRs != ""? parseFloat(selectedData.doorDelRs) : 0;
    var unLoadingRs = selectedData.unLoadingRs != ""? parseFloat(selectedData.unLoadingRs) : 0;
    var unLoadingDetnRs= selectedData.unLoadingDetnRs != ""? parseFloat(selectedData.unLoadingDetnRs) : 0;
    var extrasRS = selectedData.extrasRS != ""? parseFloat(selectedData.extrasRS) : 0;
    var othersRs = selectedData.othersRs != ""? parseFloat(selectedData.othersRs) : 0;
    var nonGstAmt1 = selectedData.nonGstAmt1 != ""? parseFloat(selectedData.nonGstAmt1) : 0;
    var nonGstAmt2 = selectedData.nonGstAmt2 != ""? parseFloat(selectedData.nonGstAmt2) : 0;
   
    subTotalRs = freightRs + statisticalRs + fovRs + doorCollRs + handlingRs +
                    loadingDetnRs + enrouteRs + miscRs + doorDelRs + unLoadingRs +
                    unLoadingDetnRs + extrasRS + othersRs
   
    var igst = 0;
    var sgst = 0;
    var cgst = 0;
    if(selectedData.igstPct!=0){
      igst = parseFloat(selectedData.igstPct)
    }
    if(selectedData.sgstPct!=0){
      sgst = parseFloat(selectedData.sgstPct)
    }
    if(selectedData.cgstPct!=0){
      cgst = parseFloat(selectedData.cgstPct)
    }

    if (selectedData.gstType == "I") {   
      selectedData.igstPct 
      this.formUser.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct: igst,
        sgstAmt:"",
        cgstAmt:"",
        igstAmt: Math.round((subTotalRs * igst)/100).toFixed(2),
      });   
    }    
    else if (selectedData.gstType == "S")  {    
      this.formUser.patchValue({
        sgstPct: sgst,
        cgstPct: cgst,
        igstPct: "",
        sgstAmt: Math.round((subTotalRs * sgst)/100).toFixed(2),
        cgstAmt: Math.round((subTotalRs * cgst)/100).toFixed(2),
        igstAmt: "",
      });     
    }
    else{
      this.formUser.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"",
      });   
    }    
    gtotalRs = subTotalRs + 
    Math.round((subTotalRs * igst)/100) + Math.round((subTotalRs * sgst)/100) + Math.round((subTotalRs * cgst)/100)
    + nonGstAmt1 + nonGstAmt2

    this.formUser.patchValue({
      subTotalRs: subTotalRs.toFixed(2),
      gtotalRs: gtotalRs.toFixed(2),
    });
  }  

  searchGSTDetails(): void {
    var selectedDataValue = this.formUser.getRawValue();
    var ewayBillNo = selectedDataValue.ewayBillNo;

    if(ewayBillNo != "") {
      this.requestmodel.strRequest = ewayBillNo;        
      this.commonService.checkEwaybillExits(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.commonService.billDetails(this.requestmodel).subscribe((res: any) => {
          var result = res.result;
            if (result.code === 200) {
              this.formUser.controls['ewayBillEntryType'].disable();
              this.eWayBillDetails.result = result;

              this.formUser.patchValue({
                ewayBillDate: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date),
                ewayBillExpDate: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date),
                invoiceDate: this.commonService.formatDate(this.eWayBillDetails.result.message.document_date),
                invoiceNo: this.eWayBillDetails.result.message.document_number,
                goodsValue: this.eWayBillDetails.result.message.total_invoice_value.toString(),
               
                cnorName: this.eWayBillDetails.result.message.legal_name_of_consignor,
                cnorAdd1: this.eWayBillDetails.result.message.address1_of_consignor,
                cnorAdd2: this.eWayBillDetails.result.message.address2_of_consignor,
                cnorAdd3: this.eWayBillDetails.result.message.place_of_consignor,    
                cnorPin: this.eWayBillDetails.result.message.pincode_of_consignor,     
                cnorGst: this.eWayBillDetails.result.message.gstin_of_consignor,   
                cneeName: this.eWayBillDetails.result.message.legal_name_of_consignee,
                cneeAdd1: this.eWayBillDetails.result.message.address1_of_consignee,
                cneeAdd2: this.eWayBillDetails.result.message.address2_of_consignee,
                cneeAdd3: this.eWayBillDetails.result.message.place_of_consignee,  
                cneePin: this.eWayBillDetails.result.message.pincode_of_consignee,               
                cneeGst: this.eWayBillDetails.result.message.gstin_of_consignee,
                truckNo: this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number,
              });
              this.formArray.controls[0].get("ewayBillNo")?.setValue(this.eWayBillDetails.result.message.eway_bill_number);
              this.formArray.controls[0].get("ewayBillDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date)));
              this.formArray.controls[0].get("ewayBillExpDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date)));
              this.formArray.controls[0].get("invNo")?.setValue(this.eWayBillDetails.result.message.document_number);
              this.formArray.controls[0].get("invDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.document_date)));
              this.formArray.controls[0].get("invValue")?.setValue(this.eWayBillDetails.result.message.total_invoice_value.toString());
              this.formArray.push(this.createInitialArray());
            }
            else{              
              this.toastrService.warning("Please Enter Valid Eway bill no");  
              this.formUser.patchValue({
                ewayBillDate: "",
                ewayBillExpDate:  "",
                invoiceDate: "",
                invoiceNo:  "",
                goodsValue:  "",               
                cnorName:  "",
                cneeName:  "",
                cneeAdd1:  "",
                cneeAdd2:  "",
                cneeAdd3:  "",
                cnorGst:  "",     
                cneeGst:  "",
                vehicleNo:  "",
              });
            }
          });
        }
        else{
          this.formUser.patchValue({
            ewayBillNo:"",
          });
          this.toastrService.warning("Eway bill no already exists in database");
          return
        }
      });
    }    
  }

  fillgrid(){    
    var selectedDataValue = this.formUser.getRawValue();
    this.formArray.controls[0].get("ewayBillNo")?.setValue(selectedDataValue.ewayBillNo);
    this.formArray.controls[0].get("ewayBillDate")?.setValue(this.commonService.formatDate(selectedDataValue.ewayBillDate));
    this.formArray.controls[0].get("ewayBillExpDate")?.setValue(this.commonService.formatDate(selectedDataValue.ewayBillExpDate));
    this.formArray.controls[0].get("invNo")?.setValue(selectedDataValue.invoiceNo);
    this.formArray.controls[0].get("invDate")?.setValue(this.commonService.formatDate(selectedDataValue.invoiceDate));
    this.formArray.controls[0].get("invValue")?.setValue(selectedDataValue.invoiceValue);
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


  addItem(index: number): void {
    var selectedDataVal= this.formUser.getRawValue();

    if (this.formArray.value[index].invNo != "" && this.formArray.value[index].invDate != "" 
    && this.formArray.value[index].invValue != "") {
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
 

  changeEWay(selectedValue: string) {
    if (selectedValue === "E") {
      //Remove field validation
      this.formUser.controls['ewayBillNo'].clearValidators();
      this.formUser.controls['ewayBillDate'].clearValidators();
      this.formUser.controls['ewayBillExpDate'].clearValidators();
      this.formUser.controls['invoiceNo'].clearValidators();
      this.formUser.controls['invoiceDate'].clearValidators();
      this.formUser.controls['invoiceValue'].clearValidators();
      this.formUser.controls['truckNo'].clearValidators();
      this.formUser.controls['productId'].clearValidators();
      this.formUser.controls['rateType'].clearValidators();
    }
    if (selectedValue === "M" || selectedValue === "A") {
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillDate'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillExpDate'].setValidators([Validators.required]);
      this.formUser.controls['invoiceNo'].setValidators([Validators.required]);
      this.formUser.controls['invoiceDate'].setValidators([Validators.required]);
      this.formUser.controls['invoiceValue'].setValidators([Validators.required]);
      this.formUser.controls['truckNo'].setValidators([Validators.required]);
      this.formUser.controls['productId'].setValidators([Validators.required]);
      this.formUser.controls['rateType'].setValidators([Validators.required]); 

      if (selectedValue === "A") {
        //Disable field
        this.formUser.controls['cnorName'].disable();
        this.formUser.controls['cnorAdd1'].disable();
        this.formUser.controls['cnorAdd2'].disable();
        this.formUser.controls['cnorAdd3'].disable();
        this.formUser.controls['cnorPin'].disable();
        this.formUser.controls['cnorGst'].disable();
        this.formUser.controls['cneeName'].disable();
        this.formUser.controls['cneeAdd1'].disable();
        this.formUser.controls['cneeAdd2'].disable();
        this.formUser.controls['cneeAdd3'].disable();
        this.formUser.controls['cneePin'].disable();
        this.formUser.controls['cneeGst'].disable();
        this.formUser.controls['kms'].disable();
        this.formUser.controls['ewayBillDate'].disable();
        this.formUser.controls['ewayBillExpDate'].disable();
        this.formUser.controls['invoiceNo'].disable();
        this.formUser.controls['invoiceDate'].disable();
        this.formUser.controls['invoiceValue'].disable();
      }
      else{
        this.formUser.controls['cnorName'].enable();
        this.formUser.controls['cnorAdd1'].enable();
        this.formUser.controls['cnorAdd2'].enable();
        this.formUser.controls['cnorAdd3'].enable();
        this.formUser.controls['cnorPin'].enable();
        this.formUser.controls['cnorGst'].enable();
        this.formUser.controls['cneeName'].enable();
        this.formUser.controls['cneeAdd1'].enable();
        this.formUser.controls['cneeAdd2'].enable();
        this.formUser.controls['cneeAdd3'].enable();
        this.formUser.controls['cneePin'].enable();
        this.formUser.controls['cneeGst'].enable();
        this.formUser.controls['kms'].enable();
        this.formUser.controls['ewayBillDate'].enable();
        this.formUser.controls['ewayBillExpDate'].enable();
        this.formUser.controls['invoiceNo'].enable();
        this.formUser.controls['invoiceDate'].enable();
        this.formUser.controls['invoiceValue'].enable();  
      }
    }
    this.formUser.controls['ewayBillNo'].updateValueAndValidity();
    this.formUser.controls['ewayBillDate'].updateValueAndValidity();
    this.formUser.controls['ewayBillExpDate'].updateValueAndValidity();
    this.formUser.controls['invoiceNo'].updateValueAndValidity();
    this.formUser.controls['invoiceDate'].updateValueAndValidity();
    this.formUser.controls['invoiceValue'].updateValueAndValidity();
    this.formUser.controls['truckNo'].updateValueAndValidity();
    this.formUser.controls['productId'].updateValueAndValidity();
    this.formUser.controls['rateType'].updateValueAndValidity();
  }

  
  deleteLrForm(): void {
    if(this.selectedLrDetails.consignmentID != '' && this.selectedLrDetails.consignmentID!='0' ){      
      this.sharedService.loading = true;
      this.requestmodel.strRequest =this.selectedLrDetails.consignmentID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.lrentryService.consignmentDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/consignmentlist']);
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
    if(this.selectedLrDetails.consignmentID=='0') {
      this.route.navigate(['/dprtempgclist']);
    }else{
      this.route.navigate(['/consignmentlist']);
    }
  }

  submitLrDetailsForm(): void {
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

    if (selectedDataValue.fromPlace.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataValue.toPlace.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" To Place is Invalid");
      return;
    }

    if (selectedDataValue.billingParty.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Billing Party is Invalid");
      return;
    }

    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.lrmodel.consignmentID = this.selectedLrDetails.consignmentID=='0'? "":this.selectedLrDetails.consignmentID;
    this.lrmodel.bookingPlace = selectedDataValue.bookingPlace;
    this.lrmodel.gcNoteNo = selectedDataValue.gcNoteNo;
    this.lrmodel.bookingDate = selectedDataValue.bookingDate;
    this.lrmodel.bookingStatus = selectedDataValue.bookingStatus;
    this.lrmodel.ewayBillEntryType = selectedDataValue.ewayBillEntryType;
    this.lrmodel.ewayBillNo = selectedDataValue.ewayBillNo;
    this.lrmodel.ewayBillDate = selectedDataValue.ewayBillDate;
    this.lrmodel.ewayBillExpDate = selectedDataValue.ewayBillExpDate;
    this.lrmodel.invoiceNo   = selectedDataValue.invoiceNo;
    this.lrmodel.invoiceDate = selectedDataValue.invoiceDate;
    this.lrmodel.invoiceValue = selectedDataValue.invoiceValue;
    this.lrmodel.declaredValue = selectedDataValue.declaredValue;    
    this.lrmodel.fromPlace = selectedDataValue.fromPlace.dataId;
    this.lrmodel.toPlace = selectedDataValue.toPlace.dataId;
    this.lrmodel.kms = selectedDataValue.kms;
    this.lrmodel.ownTruck = selectedDataValue.ownTruck?'Y':'N';;
    this.lrmodel.truckNo = selectedDataValue.truckNo;
    this.lrmodel.billingParty = selectedDataValue.billingParty ? selectedDataValue.billingParty.dataId : "0";
    this.lrmodel.billingBranch = selectedDataValue.billingBranch;
    this.lrmodel.businessBy = selectedDataValue.businessBy.dataId;
    this.lrmodel.businessBranch = selectedDataValue.businessBranch;
    this.lrmodel.cnorName = selectedDataValue.cnorName;
    this.lrmodel.cnorAdd1 = selectedDataValue.cnorAdd1;
    this.lrmodel.cnorAdd2 = selectedDataValue.cnorAdd2;
    this.lrmodel.cnorAdd3 = selectedDataValue.cnorAdd3;
    this.lrmodel.cnorPin = selectedDataValue.cnorPin.toString();
    this.lrmodel.cnorEmail = selectedDataValue.cnorEmail;
    this.lrmodel.cnorMobile = selectedDataValue.cnorMobile;
    this.lrmodel.cnorGst = selectedDataValue.cnorGst;
    this.lrmodel.cneeName = selectedDataValue.cneeName;
    this.lrmodel.cneeAdd1 = selectedDataValue.cneeAdd1;
    this.lrmodel.cneeAdd2 = selectedDataValue.cneeAdd2;
    this.lrmodel.cneeAdd3 = selectedDataValue.cneeAdd3;
    this.lrmodel.cneePin = selectedDataValue.cneePin.toString();
    this.lrmodel.cneeEmail = selectedDataValue.cneeEmail;
    this.lrmodel.cneeMobile = selectedDataValue.cneeMobile;
    this.lrmodel.cneeGst = selectedDataValue.cneeGst;
    this.lrmodel.shipmentNo = selectedDataValue.shipmentNo;
    this.lrmodel.shipmentDt = selectedDataValue.shipmentDt;
    this.lrmodel.classId = selectedDataValue.classId;
    this.lrmodel.productId = selectedDataValue.productId;
    this.lrmodel.productDesc = selectedDataValue.productDesc;
    this.lrmodel.hsnSac = "";
    this.lrmodel.noPackages = selectedDataValue.noPackages;
    this.lrmodel.looseFlag = "N";
    this.lrmodel.weightType = selectedDataValue.weightType;
    this.lrmodel.actualWt = selectedDataValue.actualWt;
    this.lrmodel.senderWt = selectedDataValue.senderWt;
    this.lrmodel.chargewt = selectedDataValue.chargewt;  
    this.lrmodel.wtDesc = "";  
    this.lrmodel.vehicleTypeId = selectedDataValue.vehicleTypeId; 
    this.lrmodel.privateMark = "";  
    this.lrmodel.bulkYN = selectedDataValue.bulkYN?'Y':'N';
    this.lrmodel.loadLength = selectedDataValue.loadLength;
    this.lrmodel.loadWidth = selectedDataValue.loadWidth;
    this.lrmodel.loadHeight = selectedDataValue.loadHeight;
    this.lrmodel.loadCFT = selectedDataValue.loadCFT;
    this.lrmodel.rateType = selectedDataValue.rateType;  
    this.lrmodel.rateDesc = "";  
    this.lrmodel.gstBy = selectedDataValue.gstBy;    
    this.lrmodel.rateRs = selectedDataValue.rateRs ? selectedDataValue.rateRs : "0";
    this.lrmodel.freightRs = selectedDataValue.freightRs ? selectedDataValue.freightRs : "0";
    this.lrmodel.statisticalRs = selectedDataValue.statisticalRs ? selectedDataValue.statisticalRs : "0";
    this.lrmodel.fovRs= selectedDataValue.fovRs ? selectedDataValue.fovRs : "0";
    this.lrmodel.doorCollRs = selectedDataValue.doorCollRs ? selectedDataValue.doorCollRs : "0";
    this.lrmodel.handlingRs = selectedDataValue.handlingRs ? selectedDataValue.handlingRs : "0";    
    this.lrmodel.loadingDetnRs= selectedDataValue.loadingDetnRs ? selectedDataValue.loadingDetnRs : "0";
    this.lrmodel.enrouteRs = selectedDataValue.enrouteRs ? selectedDataValue.enrouteRs : "0";
    this.lrmodel.miscRs = selectedDataValue.miscRs ? selectedDataValue.miscRs : "0";
    this.lrmodel.doorDelRs = selectedDataValue.doorDelRs ? selectedDataValue.doorDelRs : "0";
    this.lrmodel.unLoadingRs = selectedDataValue.unLoadingRs ? selectedDataValue.unLoadingRs : "0";
    this.lrmodel.unLoadingDetnRs = selectedDataValue.unLoadingDetnRs ? selectedDataValue.unLoadingDetnRs : "0";
    this.lrmodel.extrasRS = selectedDataValue.extrasRS ? selectedDataValue.extrasRS : "0";
    this.lrmodel.othersRs = selectedDataValue.othersRs ? selectedDataValue.othersRs : "0";
    this.lrmodel.subTotalRs = selectedDataValue.subTotalRs ? selectedDataValue.subTotalRs : "0"; 
    this.lrmodel.gstType = selectedDataValue.gstType ;
    this.lrmodel.sgstPct  = selectedDataValue.sgstPct ? selectedDataValue.sgstPct : "0"; 
    this.lrmodel.sgstAmt  = selectedDataValue.sgstAmt ? selectedDataValue.sgstAmt : "0"; 
    this.lrmodel.cgstPct  = selectedDataValue.cgstPct ? selectedDataValue.cgstPct : "0";   
    this.lrmodel.cgstAmt  = selectedDataValue.cgstAmt ? selectedDataValue.cgstAmt : "0"; 
    this.lrmodel.igstPct  = selectedDataValue.igstPct ? selectedDataValue.igstPct : "0";   
    this.lrmodel.igstAmt  = selectedDataValue.igstAmt ? selectedDataValue.igstAmt : "0"; 
    this.lrmodel.nonGstAmt1  = selectedDataValue.nonGstAmt1 ? selectedDataValue.nonGstAmt1 : "0"; 
    this.lrmodel.nonGstAmt1Desc  = selectedDataValue.nonGstAmt1Desc.toString().toUpperCase();
    this.lrmodel.nonGstAmt2  = selectedDataValue.nonGstAmt2 ? selectedDataValue.nonGstAmt2 : "0"; 
    this.lrmodel.nonGstAmt2Desc  = selectedDataValue.nonGstAmt2Desc.toString().toUpperCase();
    this.lrmodel.generalRemarks = selectedDataValue.generalRemarks.toString().toUpperCase();
    this.lrmodel.gtotalRs = selectedDataValue.gtotalRs.toString();
    this.lrmodel.yearId = this.year;
    this.lrmodel.loggedInUser = this.loggedInUserID;

    this.lrmodel.invList = [];

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].invNo != "" && selectedDataValue.arrayList[i].invDate != "" 
        && selectedDataValue.arrayList[i].invValue != "") {
        this.lrmodel.invList.push({
          'consignmentID': '',
          'ewayBillNo': selectedDataValue.arrayList[i].ewayBillNo,
          'ewayBillDate': selectedDataValue.arrayList[i].ewayBillDate,
          'ewayBillExpDate': selectedDataValue.arrayList[i].ewayBillExpDate,
          'invoiceNo': selectedDataValue.arrayList[i].invoiceNo,
          'invoiceDate': selectedDataValue.arrayList[i].invoiceDate,
          'invoiceValue': selectedDataValue.arrayList[i].invoiceValue,
          'deliveryNo': '',
        });
      }
    }

    let formData = new FormData();
    formData.append('attachedfile', this.attachInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.lrmodel));

     
    this.lrentryService.consignmentDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (res.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        if(this.selectedLrDetails.consignmentID=='0') {
          this.route.navigate(['/dprtempgclist']);
        }else{
          this.route.navigate(['/consignmentlist']);
        }
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