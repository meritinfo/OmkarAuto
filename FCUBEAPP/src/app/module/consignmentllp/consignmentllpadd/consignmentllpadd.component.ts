import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-consignmentllpadd',
  templateUrl: './consignmentllpadd.component.html',
  styleUrls: ['./consignmentllpadd.component.css']
})
export class ConsignmentllpaddComponent {

  formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  bdate: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  newDate: string = '';
  noPackages:string = '';
  seriesLength:string = '';

  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  
  branchList: Dropdownmodel[] = [];
  gstByList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  
  rateList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];
  freightList: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  classList: Dropdownmodel[] = [];
  businessByList: Dropdownmodel[] = [];
  cnorCneeList: Dropdownmodel[] = [];
  seriesList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  eWayBillDetails = new Ewaybillmodel();
  selectedLrDetails = new Consignmentmodel();
  keywordLocation = 'dataName';
  createdBy : string = "";
  modifiedBy: string = "";
  showFreightDtls = false;

  step1Active = true;
  step2Active = false;
  step3Active = false;
  
  attach1: string = "";
  
  @ViewChild('attachInput', {
    static: true
  }) attachInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private lrmodel: Consignmentmodel, private lrentryService: ConsignmentService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private reportmodel: Reportmodel,
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
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
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
        
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    
    this.selectedLrDetails = this.lrentryService.getConsignmentDetails();

    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl(this.branch, [Validators.required]),
      seriesCode: new FormControl('', [Validators.required]),
      gcNoteNo  : new FormControl('', [Validators.required]),
      bookingDate : new FormControl(this.loginDate, [Validators.required]),
      bookingStatus : new FormControl('TBB', [Validators.required]),
      ewayBillEntryType : new FormControl('A', [Validators.required]),
      ewayBillNo : new FormControl('', [Validators.required]),
      ewayBillDate : new FormControl('', [Validators.required]),
      ewayBillExpDate: new FormControl(''),
      invoiceNo        : new FormControl('', ),
      invoiceDate : new FormControl('', ),
      invoiceValue : new FormControl('0', ),
      declaredValue : new FormControl('',),    
      fromPlace : new FormControl('', [Validators.required]),    
      toPlace : new FormControl('', [Validators.required]),    
      kms : new FormControl('0',),
      ownTruck : new FormControl('',),    
      truckNo : new FormControl('', [Validators.required]),    
      billingParty : new FormControl('', [Validators.required]),
      billingBranch : new FormControl(this.branch, [Validators.required]),
      businessBranch : new FormControl(this.branch, [Validators.required]),
      cnorId : new FormControl('',),    
      cnorName : new FormControl('', [Validators.required]),
      cnorAdd1 : new FormControl('',),    
      cnorAdd2 : new FormControl('',),    
      cnorAdd3 : new FormControl('',),    
      cnorPin : new FormControl('',),    
      cnorGst : new FormControl('', ),
      cnorMobile : new FormControl('',),    
      cnorEmail : new FormControl('',),  
      cneeId : new FormControl('',),      
      cneeName : new FormControl('', [Validators.required]),
      cneeAdd1 : new FormControl('',),    
      cneeAdd2 : new FormControl('',),    
      cneeAdd3 : new FormControl('',),    
      cneePin : new FormControl('',),    
      cneeGst : new FormControl('',),
      cneeMobile : new FormControl('', ),
      cneeEmail : new FormControl('',),    
      shipmentNo : new FormControl('',),    
      shipmentDt : new FormControl('',),    
      classId : new FormControl('', [Validators.required]),
      productId : new FormControl('', [Validators.required]),
      productDesc : new FormControl('',),    
      hsnSac : new FormControl('',),    
      noPackages : new FormControl('',),    
      looseFlag : new FormControl('',),    
      weightType : new FormControl('MT',), 
      actualWt : new FormControl('',),   
      chargewt : new FormControl('',),    
      wtDesc :new FormControl('',),    
      vehicleTypeId :new FormControl('', [Validators.required]),
      privateMark : new FormControl('',),
      gstBy : new FormControl('N',[Validators.required]),
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
      gstType : new FormControl('NA', [Validators.required]),  
      //sgstPct : new FormControl('',),    
      sgstAmt : new FormControl('',),    
      //cgstPct : new FormControl('',),    
      cgstAmt : new FormControl('',),     
      //igstPct : new FormControl('',),   
      igstAmt : new FormControl('',),  
      nonGstAmt1 : new FormControl('',),  
      nonGstAmt1Desc : new FormControl('',),  
      nonGstAmt2 : new FormControl('',),  
      nonGstAmt2Desc : new FormControl('',), 
      gtotalRs : new FormControl('',), 
      vehicleInDt: new FormControl('',),
      vehicleInTime: new FormControl('',),
      vehicleOutDt: new FormControl('',),
      vehicleOutTime: new FormControl('',),
      generalRemarks : new FormControl('',), 
      businessBy : new FormControl('',),    
      gcSlNo : new FormControl('',),   
      containerNo : new FormControl('',), 
      arrayList: this.formBuilder.array([this.createInitialArray()])  , 
      arrayGstList: this.formBuilder.array([this.createGstArray()])  , 
    });

    
    this.sharedService.loading = true;
   // this.getSeriesList();
    this.getUserRights();
    this.getBranchList();
    this.getGstByList();
    this.getRateList();
    this.getContentList();
    this.getLocationList();
    this.getClassList();
    this.getBusiByList();
    this.getVehicleNoList();
    this.getBillingPartyList();
    this.getVehTypes();
    this.getCnorCneeList();
    this.getFreightList();
    this.getCnNoLength();    
    this.getSeriesList(this.branch);

    this.sharedService.loading = false;

    this.formUser.controls["bookingPlace"].disable();
    this.formUser.controls["gcNoteNo"].disable();
    this.formGstArray.controls[0].get("amount")?.disable();
    this.formGstArray.controls[0].get("sgstPct")?.disable();
    this.formGstArray.controls[0].get("cgstPct")?.disable();
    this.formGstArray.controls[0].get("igstPct")?.disable();
    this.formUser.controls['ewayBillExpDate'].disable(); 
    // this.formUser.controls['sgstPct'].disable();
    // this.formUser.controls['cgstPct'].disable();  
    // this.formUser.controls['igstPct'].disable();  
    this.formUser.controls['sgstAmt'].disable();
    this.formUser.controls['cgstAmt'].disable();  
    this.formUser.controls['igstAmt'].disable();   
    this.formUser.controls['freightRs'].disable(); 
    this.formUser.controls['statisticalRs'].disable(); 
    this.formUser.controls['fovRs'].disable(); 
    this.formUser.controls['doorCollRs'].disable();  
    this.formUser.controls['handlingRs'].disable(); 
    this.formUser.controls['loadingDetnRs'].disable(); 
    this.formUser.controls['enrouteRs'].disable(); 
    this.formUser.controls['miscRs'].disable(); 
    this.formUser.controls['doorDelRs'].disable(); 
    this.formUser.controls['unLoadingRs'].disable(); 
    this.formUser.controls['unLoadingDetnRs'].disable(); 
    this.formUser.controls['extrasRS'].disable(); 
    this.formUser.controls['othersRs'].disable(); 
    this.formUser.controls['subTotalRs'].disable(); 
    this.formUser.controls['gtotalRs'].disable(); 
         
 
    this.formGstArray.controls[0].get("sgstAmt")?.disable();
    this.formGstArray.controls[0].get("cgstAmt")?.disable();
    this.formGstArray.controls[0].get("igstAmt")?.disable();  
    this.formGstArray.controls[0].get("totalAmt")?.disable();  

    setTimeout(() => {
      if (this.selectedLrDetails.consignmentID != '') { 
        this.attach1 = Constants.UploadFolderPath + 'Lr/attachedfile/' + this.selectedLrDetails.attachedfile;
        this.formUser.patchValue(this.selectedLrDetails);
        
        var str = this.selectedLrDetails.gcSlNo;
          
        var x = "";
        if(str.length<parseInt(this.seriesLength)){
          if (this.seriesLength == "1") x = ("0" + str).slice(-1);
          if (this.seriesLength == "2") x = ("00" + str).slice(-2);
          if (this.seriesLength == "3") x = ("000" + str).slice(-3);
          if (this.seriesLength == "4") x = ("0000" + str).slice(-4);
          if (this.seriesLength == "5") x = ("00000" + str).slice(-5);
          if (this.seriesLength == "6") x = ("000000" + str).slice(-6); 
        } 
        else{
          x = str;
        }             
       

        this.formUser.patchValue({
          seriesCode: this.selectedLrDetails.gcSeries,
          gcSlNo:x,
          bookingDate: this.commonService.formatDate(this.selectedLrDetails.bookingDate) ,
          ewayBillDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillDate),
          ewayBillExpDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillExpDate),
          invoiceDate : this.commonService.formatDate(this.selectedLrDetails.invoiceDate),   
          shipmentDt : this.commonService.formatDate(this.selectedLrDetails.shipmentDt),   
          fromPlace: this.locationList.find(e => e.dataId == this.selectedLrDetails.fromPlace),
          toPlace: this.locationList.find(e => e.dataId == this.selectedLrDetails.toPlace), 
          billingParty : this.partyList.find(e => e.dataId == this.selectedLrDetails.billingParty),   
          businessBy : this.businessByList.find(e => e.dataId == this.selectedLrDetails.businessBy),           
          cnorId: this.cnorCneeList.find(e => e.dataId == this.selectedLrDetails.cnorId),
          cneeId: this.cnorCneeList.find(e => e.dataId == this.selectedLrDetails.cneeId),         
          vehicleInDt:  this.commonService.formatDate(this.selectedLrDetails.vehicleInDt),           
          vehicleOutDt:  this.commonService.formatDate(this.selectedLrDetails.vehicleOutDt),             
        })      
        this.formUser.controls['seriesCode'].disable();
        this.formUser.controls['gcSlNo'].disable();
        
        if(this.selectedLrDetails.ownTruck=='N'){
          this.formUser.patchValue({
            ownTruck: ''             
          })  
        }        
        this.formUser.controls['gcNoteNo'].disable();    
        this.getLrInnerGridList();   
        this.editMode = true;  
        this.createdBy = this.selectedLrDetails.createdBy + " " + this.selectedLrDetails.createdDate;
        this.modifiedBy = this.selectedLrDetails.modifiedBy + " " + this.selectedLrDetails.modifiedDate;      
        
        this.changeEWay(this.selectedLrDetails.ewayBillEntryType);
      }
      else{
        this.changeEWay('A');
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
  
  get formGstArray() {
    return this.formUser.get("arrayGstList") as FormArray;
  }
  
  createInitialArray() {
    return this.formBuilder.group({
      ewayBillNo: ['', []],
      ewayBillDate: ['', []],
      ewayBillExpDate: ['', []],
      invNo: ['', []],
      invDate: ['', []],
      invValue: ['0', []],
    });
  }

  createGstArray() {
    return this.formBuilder.group({
      freightId: ['', []],
      linkColumn: ['', []],
      remarks: ['', []],
      rateType : ['NA', []],   
      rate : ['', []],
      amount: ['', []],
      sgstPct: ['', []],
      sgstAmt: ['', []],
      cgstPct: ['', []],
      cgstAmt: ['', []],
      igstPct: ['', []],
      igstAmt: ['', []],
      totalAmt: ['', []],
    });
  }
  
  getLrInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedLrDetails.consignmentID;
    var gsttype = this.selectedLrDetails.gstType;
    this.lrentryService.getLrInnerGridList(this.requestmodel).subscribe((res) => {
      this.lrmodel = res;
      this.formArray.clear();
      this.formGstArray.clear();
   
      if(res.gstList.length==0){        
        this.formGstArray.push(this.createGstArray());
      }
      for (var i = 0; i < res.invList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("ewayBillNo")?.setValue(res.invList[i].ewayBillNo);
        this.formArray.controls[i].get("ewayBillDate")?.setValue(this.commonService.formatDate(res.invList[i].ewayBillDate));
        this.formArray.controls[i].get("ewayBillExpDate")?.setValue(this.commonService.formatDate(res.invList[i].ewayBillExpDate));
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
      for (var i = 0; i < res.gstList.length; i++) {
        this.formGstArray.push(this.createGstArray());
        this.formGstArray.controls[i].get("freightId")?.setValue(res.gstList[i].freightId);
        this.formGstArray.controls[i].get("rateType")?.setValue(res.gstList[i].rateType);
        this.formGstArray.controls[i].get("rate")?.setValue(res.gstList[i].rate);
        this.formGstArray.controls[i].get("amount")?.setValue(res.gstList[i].amount);
        this.formGstArray.controls[i].get("sgstPct")?.setValue(res.gstList[i].sgstPct);
        this.formGstArray.controls[i].get("sgstAmt")?.setValue(res.gstList[i].sgstAmt);
        this.formGstArray.controls[i].get("cgstPct")?.setValue(res.gstList[i].cgstPct);
        this.formGstArray.controls[i].get("cgstAmt")?.setValue(res.gstList[i].cgstAmt);
        this.formGstArray.controls[i].get("igstPct")?.setValue(res.gstList[i].igstPct);
        this.formGstArray.controls[i].get("igstAmt")?.setValue(res.gstList[i].igstAmt);
        this.formGstArray.controls[i].get("totalAmt")?.setValue(res.gstList[i].totalAmt);
        this.formGstArray.controls[i].get("remarks")?.setValue(res.gstList[i].remarks);
        this.formGstArray.controls[i].get("linkColumn")?.setValue(res.gstList[i].linkColumn);

        this.formGstArray.controls[i].get("freightId")?.disable();
        this.formGstArray.controls[i].get("amount")?.disable();
        this.formGstArray.controls[i].get("sgstPct")?.disable();
        this.formGstArray.controls[i].get("sgstAmt")?.disable();
        this.formGstArray.controls[i].get("cgstPct")?.disable();
        this.formGstArray.controls[i].get("cgstAmt")?.disable();
        this.formGstArray.controls[i].get("igstPct")?.disable();
        this.formGstArray.controls[i].get("igstAmt")?.disable();
        this.formGstArray.controls[i].get("totalAmt")?.disable();
        this.formGstArray.controls[i].get("remarks")?.disable();        
        
        if (gsttype == "IG") {  
          this.formGstArray.controls[i].get("igstPct")?.enable();  
        }     
        else if (gsttype == "SC")  {     
          this.formGstArray.controls[i].get("sgstPct")?.enable();
          this.formGstArray.controls[i].get("cgstPct")?.enable();
        }   
      }      
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;     
      this.formUser.patchValue({
        bookingPlace: this.branch
      });     
    });
  }

  getGstByList(): void {
    this.commonService.getGstByList().subscribe((res) => {
      this.gstByList = res;
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

  
  getUserRights(): void {
    this.requestmodel.strRequest = this.loggedInUserID;
    this.commonService.getUserRights(this.requestmodel).subscribe((res) => {
      if(res.showFreightDtls=="Y"){
        this.showFreightDtls = true;
      } 
    });
  }

  getCnorCneeList(): void {
    this.commonService.GetCneeCnorList().subscribe((res) => {
      this.cnorCneeList = res;
    });
  }

  getFreightList(): void {
    this.commonService.getFreightList().subscribe((res) => {
      this.freightList = res;
    });
  }
  getSeriesList(b:string): void {
    this.requestmodel.strRequest = "L";
    this.requestmodel.strRequest1 = b;
    this.commonService.getSeriesllpList(this.requestmodel).subscribe((res) => {
      
      this.seriesList = res;
    });
  }
  
  getCnNoLength(){
    this.commonService.getCnNoLength().subscribe((res: Responsemodel) => {
      if(res.status){
        this.seriesLength= res.message;
      }
    });
  }

  onSeriesChangeLLP() {
    var selectedData = this.formUser.getRawValue();
    this.requestmodel.strRequest = selectedData.bookingPlace;
    this.requestmodel.strRequest1 = this.year;
    this.requestmodel.strRequest2 = selectedData.seriesCode;

    if(selectedData.seriesCode==""){
      this.toastrService.warning("Please select Series Code");
      this.formUser.patchValue({
        gcSlNo: "",
        gcNoteNo: ""
      });
      return;
    }
    else{
      this.lrentryService.getLrNoLLP(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formUser.patchValue({
            gcSlNo: this.responseDetails.message,
            gcNoteNo: selectedData.seriesCode+this.responseDetails.message
          });
        }
       else{
          this.toastrService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            gcSlNo: "",
            gcNoteNo: ""
          });
        }
      });
    }    
  }


  chkLrDuplicateLLP(){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.gcSlNo==""){
      this.toastrService.warning(" gc sl no should not be Blank");
      this.formUser.patchValue({
    
        gcNoteNo: "",
      });

      return;
    }
    else{
      this.reportmodel.filterStr = selectedData.bookingPlace;
      this.reportmodel.filterStr1 = selectedData.gcSlNo;
      this.reportmodel.filterStr2 = selectedData.seriesCode;
      this.reportmodel.filterStr3 = this.year;
      this.lrentryService.checkDuplicateLrLLP(this.reportmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          var str = selectedData.gcSlNo;
          
          var x = "";
          if(str.length<parseInt(this.seriesLength)){
            if (this.seriesLength == "1") x = ("0" + str).slice(-1);
            if (this.seriesLength == "2") x = ("00" + str).slice(-2);
            if (this.seriesLength == "3") x = ("000" + str).slice(-3);
            if (this.seriesLength == "4") x = ("0000" + str).slice(-4);
            if (this.seriesLength == "5") x = ("00000" + str).slice(-5);
            if (this.seriesLength == "6") x = ("000000" + str).slice(-6); 
          } 
          else{
            x = str;
          }             
         

          
          this.formUser.patchValue({
            gcSlNo: x,
            gcNoteNo: selectedData.seriesCode + x,
          });
        }
       else{
          this.toastrService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            gcNoteNo:"",
            gcSlNo:"",
          }); 
        }
      });
    }   
  }


  chkTruckNo() {
    var selectedData = this.formUser.getRawValue();
    if (selectedData.truckNo==""){
      this.toastrService.warning("Vehicle No should not be Blank");
      return;
    }
    if(selectedData.ownTruck)
    {
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
      
  changeGstType(e: any) {
    console.log(e.target.value);
    var gsttype = e.target.value; 
    var selectedData = this.formUser.getRawValue();
    for (var i = 0; i < selectedData.arrayGstList.length; i++) {
      this.formGstArray.controls[i].get("sgstPct")?.setValue("0");
      this.formGstArray.controls[i].get("cgstPct")?.setValue("0");
      this.formGstArray.controls[i].get("igstPct")?.setValue("0");
      this.formGstArray.controls[i].get("sgstAmt")?.setValue("0");
      this.formGstArray.controls[i].get("cgstAmt")?.setValue("0");
      this.formGstArray.controls[i].get("igstAmt")?.setValue("0");        
    }    
           

    this.formUser.patchValue({
      freightRs: 0,
      statisticalRs: 0,
      fovRs: 0,
      doorCollRs : 0,
      handlingRs: 0,
      loadingDetnRs: 0,
      enrouteRs: 0,
      miscRs: 0,
      doorDelRs : 0,
      unLoadingRs : 0,
      unLoadingDetnRs: 0,
      extrasRS : 0,
      othersRs : 0,
      nonGstAmt1 : 0,
      nonGstAmt2: 0,
      subTotalRs: 0,
      gtotalRs: 0,
    }); 

  }

  onFreightChange(j:number){
    var selectedData = this.formUser.getRawValue();
    var freightId = selectedData.arrayGstList[j].freightId;

    for (var i = 0; i < selectedData.arrayGstList.length; i++) {  
      if(i!=j && freightId == selectedData.arrayGstList[i].freightId){
        this.formGstArray.controls[j].get("freightId")?.setValue("");
        this.toastrService.warning("Frieght Desc already exists in grid");
        return;
      }
    }
    this.requestmodel.strRequest = freightId;
    this.lrentryService.getFreightGstDetails(this.requestmodel).subscribe((res) => {
      this.formGstArray.controls[j].get("freightId")?.disable();
      this.formGstArray.controls[j].get("amount")?.enable();
      this.formUser.controls["gstType"].disable();
      
      this.formGstArray.controls[j].get("linkColumn")?.setValue(res.linkColumn);
      this.formGstArray.controls[j].get("sgstPct")?.setValue("0");
      this.formGstArray.controls[j].get("cgstPct")?.setValue("0");
      this.formGstArray.controls[j].get("igstPct")?.setValue("0"); 

      this.formGstArray.controls[j].get("sgstPct")?.disable();
      this.formGstArray.controls[j].get("cgstPct")?.disable();
      this.formGstArray.controls[j].get("igstPct")?.disable(); 

      if (selectedData.gstType == "IG") {  
        this.formGstArray.controls[j].get("igstPct")?.setValue(res.igstPct); 
        this.formGstArray.controls[j].get("igstPct")?.enable();   
      }     
      else if (selectedData.gstType  == "SC")  {     
        this.formGstArray.controls[j].get("sgstPct")?.setValue(res.sgstPct);
        this.formGstArray.controls[j].get("cgstPct")?.setValue(res.cgstPct);
        this.formGstArray.controls[j].get("sgstPct")?.enable();
        this.formGstArray.controls[j].get("cgstPct")?.enable();
      }   
      
    });
  }

  onRateChange(i:number,e:any){    
    this.formGstArray.controls[i].get("amount")?.setValue("0");
    this.formGstArray.controls[i].get("rate")?.setValue("0");
    if(e.target.value=="NA"){      
      this.formGstArray.controls[i].get("rate")?.disable();
      this.formGstArray.controls[i].get("amount")?.enable();
    }
    else{
      this.formGstArray.controls[i].get("rate")?.enable();
      this.formGstArray.controls[i].get("amount")?.disable();
    }
  }

  calAmount(i:number){    
    var selectedData = this.formUser.getRawValue();
    var rate = selectedData.arrayGstList[i].rate!=""?parseFloat(selectedData.arrayGstList[i].rate):0;
    var amt = 0;
    if(selectedData.arrayGstList[i].rateType=="RT"){
      var chrgWt = selectedData.chargewt!=""?parseFloat(selectedData.chargewt):0;
      amt = chrgWt * rate;
    }
    if(selectedData.arrayGstList[i].rateType=="RF"){
      amt = rate;
    }    
    this.formGstArray.controls[i].get("amount")?.setValue(amt);
    this.calculateAmount();
  }

  calculateAmount(){
    var selectedData = this.formUser.getRawValue();
    var linkColumn = "";
    var amount = 0, totalAmt = 0;
    var sgstPct = 0, sgstAmt = 0;
    var cgstPct = 0, cgstAmt = 0;
    var igstPct = 0, igstAmt = 0;
    var totsgst = 0;
    var totcgst = 0;
    var totigst = 0;
    this.formUser.patchValue({
      freightRs: 0,
      statisticalRs: 0,
      fovRs: 0,
      doorCollRs : 0,
      handlingRs: 0,
      loadingDetnRs: 0,
      enrouteRs: 0,
      miscRs: 0,
      doorDelRs : 0,
      unLoadingRs : 0,
      unLoadingDetnRs: 0,
      extrasRS : 0,
      othersRs : 0,
    }); 

    for (var i = 0; i < selectedData.arrayGstList.length; i++) {  
      if(selectedData.arrayGstList[i].amount==""){
        this.toastrService.warning("Amount in the grid should not be blank");
        return;
      }
      else if(selectedData.arrayGstList[i].linkColumn==""){
        this.toastrService.warning("Assign Link Column");
        return;
      }
      else{
        linkColumn = selectedData.arrayGstList[i].linkColumn;
        amount = parseFloat(selectedData.arrayGstList[i].amount);
        sgstPct = parseFloat(selectedData.arrayGstList[i].sgstPct);
        cgstPct = parseFloat(selectedData.arrayGstList[i].cgstPct);
        igstPct = parseFloat(selectedData.arrayGstList[i].igstPct);

        sgstAmt = amount * sgstPct /100;
        cgstAmt = amount * cgstPct /100;
        igstAmt = amount * igstPct /100;

        totsgst = totsgst + sgstAmt;
        totcgst = totcgst + cgstAmt;
        totigst = totigst + igstAmt;

        totalAmt = amount + sgstAmt + cgstAmt + igstAmt;

        this.formGstArray.controls[i].get("sgstAmt")?.setValue(sgstAmt.toFixed(2));
        this.formGstArray.controls[i].get("cgstAmt")?.setValue(cgstAmt.toFixed(2));
        this.formGstArray.controls[i].get("igstAmt")?.setValue(igstAmt.toFixed(2));
        this.formGstArray.controls[i].get("totalAmt")?.setValue(totalAmt.toFixed(2));

        var linkAmt = this.formUser.controls[linkColumn]?.value;

        amount = (linkAmt!=""? parseFloat(linkAmt):0)+ amount;

        this.formUser.controls[linkColumn].setValue(amount.toFixed(2));
      }
    }  
    this.formUser.patchValue({
      sgstAmt : totsgst.toFixed(2),
      cgstAmt: totcgst.toFixed(2),
      igstAmt: totigst.toFixed(2),
    });

    this.calculateTotalAmount();   
  }

  calculateTotalAmount(){    
    var selectedData = this.formUser.getRawValue();
    var subTotalRs = 0, gtotalRs = 0;

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
    var nonGstAmt1 = selectedData.nonGstAmt1?selectedData.nonGstAmt1 != ""? parseFloat(selectedData.nonGstAmt1) : 0: 0;
    var nonGstAmt2 = selectedData.nonGstAmt2?selectedData.nonGstAmt2 != ""? parseFloat(selectedData.nonGstAmt2) : 0: 0;
    var sgstAmt = selectedData.sgstAmt?selectedData.sgstAmt != ""? parseFloat(selectedData.sgstAmt) : 0: 0;
    var cgstAmt = selectedData.cgstAmt?selectedData.cgstAmt != ""? parseFloat(selectedData.cgstAmt) : 0: 0;
    var igstAmt = selectedData.igstAmt?selectedData.igstAmt != ""? parseFloat(selectedData.igstAmt) : 0: 0;
   
    subTotalRs = freightRs + statisticalRs + fovRs + doorCollRs + handlingRs +
                    loadingDetnRs + enrouteRs + miscRs + doorDelRs + unLoadingRs +
                    unLoadingDetnRs + extrasRS + othersRs;
   
    gtotalRs = subTotalRs + sgstAmt + cgstAmt + igstAmt +
                  nonGstAmt1 + nonGstAmt2;
   
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
             // this.formArray.controls[0].get("ewayBillDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date)));
             this.formArray.controls[0].get("ewayBillDate")?.setValue(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date));
              this.formArray.controls[0].get("ewayBillExpDate")?.setValue(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date));
              this.formArray.controls[0].get("invNo")?.setValue(this.eWayBillDetails.result.message.document_number);
              this.formArray.controls[0].get("invDate")?.setValue(this.commonService.formatDate(this.eWayBillDetails.result.message.document_date));
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
    this.formArray.controls[0].get("ewayBillDate")?.setValue(selectedDataValue.ewayBillDate);
    this.formArray.controls[0].get("ewayBillExpDate")?.setValue(selectedDataValue.ewayBillExpDate);
    this.formArray.controls[0].get("invNo")?.setValue(selectedDataValue.invoiceNo);
    this.formArray.controls[0].get("invDate")?.setValue(selectedDataValue.invoiceDate);
    this.formArray.controls[0].get("invValue")?.setValue(selectedDataValue.invoiceValue);
  }

  selectCnorEvent(item: any) {
    // do something with selected item
    this.requestmodel.strRequest = item.dataId;        
    this.commonService.getCnorCneeDetails(this.requestmodel).subscribe((res: any) => {
      this.formUser.patchValue({       
        cnorName: item.dataName,
        cnorAdd1: res.cneeAdd1,
        cnorAdd2: res.cneeAdd2,
        cnorAdd3: res.cneeAdd3,   
        cnorPin: res.cneePin,   
        cnorGst:  res.cneeGst,  
        cnorMobile:  res.cneeMobile,
        cnorEmail:  res.cneeEmail, 
      });
    })
  }

  selectCneeEvent(item: any) {
    // do something with selected item
    this.requestmodel.strRequest = item.dataId;        
    this.commonService.getCnorCneeDetails(this.requestmodel).subscribe((res: any) => {
      this.formUser.patchValue({  
        cneeName: item.dataName,
        cneeAdd1: res.cneeAdd1,
        cneeAdd2: res.cneeAdd2,
        cneeAdd3: res.cneeAdd3,    
        cneePin: res.cneePin,   
        cneeGst: res.cneeGst,   
        cneeMobile: res.cneeMobile,
        cneeEmail: res.cneeEmail,
      });
    })
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
    if (this.formArray.value[index].invNo != "" && this.formArray.value[index].invDate != "" 
    && this.formArray.value[index].invValue != "") {
      this.formArray.push(this.createInitialArray()); 
    }
    else {
      this.toastrService.warning("Please select Required Fields ");
      return;
    } 
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formArray.removeAt(index);   }
  }
 
  addGstItem(i: number): void {
    var selectedDataVal= this.formUser.getRawValue();

    if (selectedDataVal.arrayGstList[i].freightId != "" && selectedDataVal.arrayGstList[i].amount != "") {
      this.formGstArray.push(this.createGstArray());  
      
      this.formGstArray.controls[i+1].get("sgstPct")?.setValue("0");
      this.formGstArray.controls[i+1].get("cgstPct")?.setValue("0");
      this.formGstArray.controls[i+1].get("igstPct")?.setValue("0");
      
      this.formGstArray.controls[i+1].get("sgstPct")?.disable();
      this.formGstArray.controls[i+1].get("cgstPct")?.disable();
      this.formGstArray.controls[i+1].get("igstPct")?.disable();  
      this.formGstArray.controls[i+1].get("sgstAmt")?.disable();
      this.formGstArray.controls[i+1].get("cgstAmt")?.disable();
      this.formGstArray.controls[i+1].get("igstAmt")?.disable();  
      this.formGstArray.controls[i+1].get("totalAmt")?.disable();  

      if (selectedDataVal.gstType == "IG") {  
        this.formGstArray.controls[i+1].get("igstPct")?.enable(); 
      }    
      else if (selectedDataVal.gstType == "SC")  {     
        this.formGstArray.controls[i+1].get("sgstPct")?.enable();
        this.formGstArray.controls[i+1].get("cgstPct")?.enable();
      }
    }
    else {
      this.toastrService.warning("Please select Required Fields ");
      return;
    } 
  }

  removeGstItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formGstArray.removeAt(index);   }
  }

  changeEWay(selectedValue: string) {
    if (selectedValue === "E") {
      //Remove field validation
      this.formUser.controls['ewayBillNo'].clearValidators();
      this.formUser.controls['ewayBillDate'].clearValidators();
      this.formUser.controls['ewayBillExpDate'].clearValidators();
      this.formUser.controls['truckNo'].clearValidators();
      this.formUser.controls['productId'].clearValidators();
      this.formUser.controls['invoiceNo'].enable();
      this.formUser.controls['invoiceDate'].enable();
      this.formUser.controls['invoiceValue'].enable();
    
    }
    if (selectedValue === "M" || selectedValue === "A") {
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillDate'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillExpDate'].setValidators([Validators.required]);
      this.formUser.controls['truckNo'].setValidators([Validators.required]);
      this.formUser.controls['productId'].setValidators([Validators.required]);

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
    this.formUser.controls['truckNo'].updateValueAndValidity();
    this.formUser.controls['productId'].updateValueAndValidity();
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
   
      this.route.navigate(['/consignmentllp']);
    
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
    var gstType = "NA";
    if(selectedDataValue.gstBy=="F"){
      gstType = selectedDataValue.gstType;
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
    this.lrmodel.businessBy = selectedDataValue.businessBy?selectedDataValue.businessBy.dataId:"0";
    this.lrmodel.businessBranch = selectedDataValue.businessBranch;
    this.lrmodel.cnorId = selectedDataValue.cnorId? selectedDataValue.cnorId.dataId : "0";
    this.lrmodel.cnorName = selectedDataValue.cnorName?selectedDataValue.cnorName.toString().toUpperCase():"";
    this.lrmodel.cnorAdd1 = selectedDataValue.cnorAdd1?selectedDataValue.cnorAdd1.toString().toUpperCase():"";
    this.lrmodel.cnorAdd2 = selectedDataValue.cnorAdd2?selectedDataValue.cnorAdd2.toString().toUpperCase():"";
    this.lrmodel.cnorAdd3 = selectedDataValue.cnorAdd3?selectedDataValue.cnorAdd3.toString().toUpperCase():"";
    this.lrmodel.cnorPin = selectedDataValue.cnorPin?selectedDataValue.cnorPin.toString():"";
    this.lrmodel.cnorEmail = selectedDataValue.cnorEmail;
    this.lrmodel.cnorMobile = selectedDataValue.cnorMobile;
    this.lrmodel.cnorGst = selectedDataValue.cnorGst;
    this.lrmodel.cneeId = selectedDataValue.cneeId? selectedDataValue.cneeId.dataId : "0";
    this.lrmodel.cneeName = selectedDataValue.cneeName?selectedDataValue.cneeName.toString().toUpperCase():"";
    this.lrmodel.cneeAdd1 = selectedDataValue.cneeAdd1?selectedDataValue.cneeAdd1.toString().toUpperCase():"";
    this.lrmodel.cneeAdd2 =  selectedDataValue.cneeAdd2?selectedDataValue.cneeAdd2.toString().toUpperCase():"";
    this.lrmodel.cneeAdd3 =  selectedDataValue.cneeAdd3?selectedDataValue.cneeAdd3.toString().toUpperCase():"";
    this.lrmodel.cneePin = selectedDataValue.cneePin?selectedDataValue.cneePin.toString():"";
    this.lrmodel.cneeEmail = selectedDataValue.cneeEmail;
    this.lrmodel.cneeMobile = selectedDataValue.cneeMobile;
    this.lrmodel.cneeGst = selectedDataValue.cneeGst;
    this.lrmodel.shipmentNo = selectedDataValue.shipmentNo;
    this.lrmodel.shipmentDt = selectedDataValue.shipmentDt;
    this.lrmodel.classId = selectedDataValue.classId;
    this.lrmodel.productId = selectedDataValue.productId;
    this.lrmodel.productDesc = selectedDataValue.productDesc?selectedDataValue.productDesc.toString():"";    
    this.lrmodel.hsnSac = "";
    this.lrmodel.noPackages = selectedDataValue.noPackages.toString();
    this.lrmodel.looseFlag = "N";
    this.lrmodel.weightType = selectedDataValue.weightType;
    this.lrmodel.actualWt = selectedDataValue.actualWt?selectedDataValue.actualWt.toString():"";
    this.lrmodel.senderWt = selectedDataValue.actualWt?selectedDataValue.actualWt.toString():"";
    this.lrmodel.chargewt = selectedDataValue.chargewt?selectedDataValue.chargewt.toString():"";
    this.lrmodel.wtDesc = "";  
    this.lrmodel.vehicleTypeId = selectedDataValue.vehicleTypeId; 
    this.lrmodel.privateMark = "";  
    this.lrmodel.bulkYN = "";  
    this.lrmodel.loadLength = "";  
    this.lrmodel.loadWidth ="";  
    this.lrmodel.loadHeight = "";  
    this.lrmodel.loadCFT = "";  
    this.lrmodel.rateType = "";  
    this.lrmodel.rateDesc = "";  
    this.lrmodel.gstBy = selectedDataValue.gstBy;  
    this.lrmodel.gstType = gstType;   
    this.lrmodel.rateRs = selectedDataValue.rateRs ? selectedDataValue.rateRs.toString() : "0";
    this.lrmodel.freightRs = selectedDataValue.freightRs ? selectedDataValue.freightRs.toString() : "0";
    this.lrmodel.statisticalRs = selectedDataValue.statisticalRs ? selectedDataValue.statisticalRs.toString() : "0";
    this.lrmodel.fovRs= selectedDataValue.fovRs ? selectedDataValue.fovRs.toString() : "0";
    this.lrmodel.doorCollRs = selectedDataValue.doorCollRs ? selectedDataValue.doorCollRs.toString() : "0";
    this.lrmodel.handlingRs = selectedDataValue.handlingRs ? selectedDataValue.handlingRs.toString() : "0";    
    this.lrmodel.loadingDetnRs= selectedDataValue.loadingDetnRs ? selectedDataValue.loadingDetnRs.toString() : "0";
    this.lrmodel.enrouteRs = selectedDataValue.enrouteRs ? selectedDataValue.enrouteRs : "0";
    this.lrmodel.miscRs = selectedDataValue.miscRs ? selectedDataValue.miscRs.toString() : "0";
    this.lrmodel.doorDelRs = selectedDataValue.doorDelRs ? selectedDataValue.doorDelRs.toString() : "0";
    this.lrmodel.unLoadingRs = selectedDataValue.unLoadingRs ? selectedDataValue.unLoadingRs.toString() : "0";
    this.lrmodel.unLoadingDetnRs = selectedDataValue.unLoadingDetnRs ? selectedDataValue.unLoadingDetnRs.toString() : "0";
    this.lrmodel.extrasRS = selectedDataValue.extrasRS ? selectedDataValue.extrasRS.toString() : "0";
    this.lrmodel.othersRs = selectedDataValue.othersRs ? selectedDataValue.othersRs.toString() : "0";
    this.lrmodel.subTotalRs = selectedDataValue.subTotalRs ? selectedDataValue.subTotalRs.toString() : "0"; 
    this.lrmodel.nonGstAmt1  = selectedDataValue.nonGstAmt1 ? selectedDataValue.nonGstAmt1.toString() : "0"; 
    this.lrmodel.nonGstAmt1Desc  = selectedDataValue.nonGstAmt1Desc?selectedDataValue.nonGstAmt1Desc.toString().toUpperCase():"";
    this.lrmodel.nonGstAmt2  = selectedDataValue.nonGstAmt2 ? selectedDataValue.nonGstAmt2.toString() : "0"; 
    this.lrmodel.nonGstAmt2Desc  = selectedDataValue.nonGstAmt2Desc?selectedDataValue.nonGstAmt2Desc.toString().toUpperCase():"";
    this.lrmodel.generalRemarks = selectedDataValue.generalRemarks?selectedDataValue.generalRemarks.toString().toUpperCase():"";
    this.lrmodel.gtotalRs = selectedDataValue.gtotalRs?selectedDataValue.gtotalRs.toString():"";
    this.lrmodel.vehicleInDt= selectedDataValue.vehicleInDt?selectedDataValue.vehicleInDt.toString():"";
    this.lrmodel.vehicleInTime= selectedDataValue.vehicleInTime?selectedDataValue.vehicleInTime.toString():"";
    this.lrmodel.vehicleOutDt= selectedDataValue.vehicleOutDt?selectedDataValue.vehicleOutDt.toString():"";
    //this.lrmodel.gcSlNo= selectedDataValue.vehicleOutDt?selectedDataValue.vehicleOutDt.toString():"";
    this.lrmodel.gcSlNo = selectedDataValue.gcSlNo; 
    this.lrmodel.gcSeries = selectedDataValue.seriesCode; 
    this.lrmodel.cgstAmt = selectedDataValue.cgstAmt.toString(); 
    this.lrmodel.sgstAmt = selectedDataValue.sgstAmt.toString(); 
    this.lrmodel.igstAmt = selectedDataValue.igstAmt.toString(); 
    this.lrmodel.nonGstAmt2 = selectedDataValue.nonGstAmt2.toString(); 
    this.lrmodel.nonGstAmt1 = selectedDataValue.nonGstAmt1.toString(); 
    
    this.lrmodel.containerNo = selectedDataValue.containerNo.toUpperCase().toString(); 
    this.lrmodel.vehicleOutTime= selectedDataValue.vehicleOutTime?selectedDataValue.vehicleOutTime.toString():"";
    this.lrmodel.yearId = this.year;
    this.lrmodel.loggedInUser = this.loggedInUserID;

    this.lrmodel.invList = [];
    this.lrmodel.gstList = [];

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].invNo != "" ) {
        // if (selectedDataValue.arrayList[i].invDate != "" ) {
        //   this.bdate =  selectedDataValue.arrayList[i].invDate;

        // }else{
        //   this.bdate = selectedDataValue.bookingDate;

        // }

        this.lrmodel.invList.push({
          'consignmentID': '',
          'ewayBillNo': selectedDataValue.arrayList[i].ewayBillNo,
          'ewayBillDate': selectedDataValue.arrayList[i].ewayBillDate,
          'ewayBillExpDate': selectedDataValue.arrayList[i].ewayBillExpDate,
          'invoiceNo': selectedDataValue.arrayList[i].invNo,
         'invoiceDate': selectedDataValue.arrayList[i].invDate,
      // 'invoiceDate':  this.bdate,
          'invoiceValue': selectedDataValue.arrayList[i].invValue,
          'deliveryNo': '',
        });
      }
    }

    for (var i = 0; i < selectedDataValue.arrayGstList.length; i++) {
      if (selectedDataValue.arrayGstList[i].freightId != "" && selectedDataValue.arrayGstList[i].amount != "") {
        this.lrmodel.gstList.push({
          'consignmentID': '',
          'freightId': selectedDataValue.arrayGstList[i].freightId,
          'remarks': selectedDataValue.arrayGstList[i].remarks.toString().toUpperCase(),
          'rateType':selectedDataValue.arrayGstList[i].rateType.toString(),
          'rate':selectedDataValue.arrayGstList[i].rate.toString(),
          'amount': selectedDataValue.arrayGstList[i].amount.toString(),
          'sgstPct': selectedDataValue.arrayGstList[i].sgstPct.toString(),
          'sgstAmt': selectedDataValue.arrayGstList[i].sgstAmt.toString(),
          'cgstPct': selectedDataValue.arrayGstList[i].cgstPct.toString(),
          'cgstAmt': selectedDataValue.arrayGstList[i].cgstAmt.toString(),
          'igstPct': selectedDataValue.arrayGstList[i].igstPct.toString(),
          'igstAmt': selectedDataValue.arrayGstList[i].igstAmt.toString(),
          'totalAmt': selectedDataValue.arrayGstList[i].totalAmt.toString(),
          'linkColumn': '',
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
        this.route.navigate(['/consignmentllp']);
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