import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Getkmsmodel } from 'src/app/models/getkmsmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Consignmentlistmodel } from 'src/app/models/consignmentlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { UserService } from 'src/app/services/user.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { kmsmodel } from 'src/app/models/kmsmodel';
import { Dslmodel } from 'src/app/models/dslmodel';
import { Adbluetobemodel } from 'src/app/models/adbluetobemodel';
import { GetDslmodel } from 'src/app/models/getdslmodel';
import { Datemodel } from 'src/app/models/datemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Tripkmsmodel } from 'src/app/models/tripkmsmodel';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

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
  ewayBillExpDate:string = '';
  noPackages:string = '';

  formSubmitted = false;

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

  step1Active = true;
  step2Active = false;
  step3Active = false;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private lrmodel: Consignmentmodel, private lrentryService: ConsignmentService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private requestmodel: Requestmodel) {
    this.lrmodel = new Consignmentmodel();
  }

  ngOnInit(): void {
    
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
    this.getRateList();
    this.getContentList();
    this.getLocationList();
    this.getClassList();
    this.getBusiByList();
    this.getVehicleNoList();
    this.getBillingPartyList();
    this.getVehTypes();

    this.sharedService.loading = false;
    
    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl(this.branch, [Validators.required]),
      gcNoteNo  : new FormControl('', [Validators.required]),
      bookingDate : new FormControl(this.loginDate, [Validators.required]),
      bookingStatus : new FormControl('TBB', [Validators.required]),
      ewayBillEntryType : new FormControl('A', [Validators.required]),
      ewayBillNo : new FormControl('', [Validators.required]),
      ewayBillDate : new FormControl('', [Validators.required]),
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
      billingBranch : new FormControl('', [Validators.required]),
      businessBranch : new FormControl('', [Validators.required]),
      cnorName : new FormControl('', [Validators.required]),
      cnorAdd1 : new FormControl('',),    
      cnorAdd2 : new FormControl('',),    
      cnorAdd3 : new FormControl('',),    
      cnorPin : new FormControl('',),    
      cnorGst : new FormControl('', [Validators.required]),
      cnorMobile : new FormControl('',),    
      cnorEmail : new FormControl('',),    
      cneeName : new FormControl('', [Validators.required]),
      cneeAdd1 : new FormControl('',),    
      cneeAdd2 : new FormControl('',),    
      cneeAdd3 : new FormControl('',),    
      cneePin : new FormControl('',),    
      cneeGst : new FormControl('', [Validators.required]),
      cneeMobile : new FormControl('', [Validators.required]),
      cneeEmail : new FormControl('',),    
      shipmentNo : new FormControl('',),    
      shipmentDt : new FormControl('',),    
      deliveryNo : new FormControl('',),    
      deliveryDt : new FormControl('',),    
      poNo : new FormControl('',),    
      poDt : new FormControl('',),    
      riskBy : new FormControl('',),    
      insCoName :new FormControl('',),    
      insPolicyNo : new FormControl('',),    
      insValidDt : new FormControl('',),    
      insuredValue : new FormControl('',),    
      classId : new FormControl('', [Validators.required]),
      productId : new FormControl('', [Validators.required]),
      productDesc : new FormControl('',),    
      hsnSac : new FormControl('',),    
      noPackages : new FormControl('',),    
      looseFlag : new FormControl('',),    
      weightType : new FormControl('',),    
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
      rateType : new FormControl('',),    
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
      gstType : new FormControl('',),    
      gstPct : new FormControl('',),    
      sgstAmt : new FormControl('',),    
      cgstAmt : new FormControl('',),    
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

    this.changeEWay('A');
    this.onBranchChange();
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
    this.commonService.getVehicleNoList().subscribe((res) => {
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
    this.commonService.getVehicleList().subscribe((res) => {
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

    // this.lrentryService.getLrNo(this.requestmodel).subscribe((res: Responsemodel) => {
    //   this.responseDetails = res;
    //   if (this.responseDetails.status) {
    //     this.formUser.patchValue({
    //       gcNoteNo: this.responseDetails.message
    //     });
    //   }
    //  else{
    //     this.toastrService.warning(this.responseDetails.message);
    //   }
    // });
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
              this.formUser.controls['ewayBillType'].disable();
              this.eWayBillDetails.result = result;

              this.formUser.patchValue({
                ewayBillDate: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date),
                ewayBillExpDate: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date),
                invoiceDt: this.commonService.formatDate(this.eWayBillDetails.result.message.document_date),
                invoiceNo: this.eWayBillDetails.result.message.document_number,
                goodsValue: this.eWayBillDetails.result.message.total_invoice_value.toString(),
               
                cnorName: this.eWayBillDetails.result.message.legal_name_of_consignor,
                cneeName: this.eWayBillDetails.result.message.legal_name_of_consignee,
                cneeAdd1: this.eWayBillDetails.result.message.address1_of_consignee,
                cneeAdd2: this.eWayBillDetails.result.message.address2_of_consignor,
                cneeAdd3: this.eWayBillDetails.result.message.place_of_consignee,
                cnorGst: this.eWayBillDetails.result.message.gstin_of_consignor,                
                cneeGst: this.eWayBillDetails.result.message.gstin_of_consignee,
                vehicleNo: this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number,
              });
              this.formArray.controls[0].get("ewayBillNo")?.setValue(this.eWayBillDetails.result.message.eway_bill_number);
              this.formArray.controls[0].get("ewayBillDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date)));
              this.formArray.controls[0].get("ewayBillExpDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date)));
              this.formArray.controls[0].get("invNo")?.setValue(this.eWayBillDetails.result.message.document_number);
              this.formArray.controls[0].get("invDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.document_date)));
              this.formArray.controls[0].get("invValue")?.setValue(this.eWayBillDetails.result.message.total_invoice_value.toString());
              this.formArray.controls[0].get("invNo")?.disable();
              this.formArray.controls[0].get("invDate")?.disable();
              this.formArray.controls[0].get("invValue")?.disable();              
              this.formArray.push(this.createInitialArray());
            }
            else{              
              this.toastrService.warning("Please Enter Valid Eway bill no");  
              this.formUser.patchValue({
                ewayBillDate: "",
                ewayBillExpDate:  "",
                invoiceDt: "",
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
    if(query.length>2){
      return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
    }
    else{
      return partyList;
    }
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
    if (selectedValue === "A") {
      //Remove field validation
      this.formUser.controls['fromPlace'].clearValidators();
      this.formUser.controls['toPlace'].clearValidators();
      this.formUser.controls['cnorName'].clearValidators();
      this.formUser.controls['cneeName'].clearValidators();
      this.formUser.controls['productId'].clearValidators();
      this.formUser.controls['rateType'].clearValidators();
      this.formUser.controls['declaredValue'].clearValidators();
      this.formUser.controls['cnorInvDate'].clearValidators();

      //required
      this.formUser.controls['billingParty'].setValidators([Validators.required]);
      this.formUser.controls['truckNo'].setValidators([Validators.required]);
      this.formUser.controls['fromPlace'].setValidators([Validators.required]);
      this.formUser.controls['toPlace'].setValidators([Validators.required]);
      this.formUser.controls['productId'].setValidators([Validators.required]);
      this.formUser.controls['rateType'].setValidators([Validators.required]);

      //Disable field
      this.formUser.controls['cnorName'].disable();
      this.formUser.controls['cnorAdr'].disable();
      this.formUser.controls['cnorAdr1'].disable();
      this.formUser.controls['cnorStateCode'].disable();
      this.formUser.controls['cnorPincode'].disable();
      this.formUser.controls['cnorGstNo'].disable();
      this.formUser.controls['cneeName'].disable();
      this.formUser.controls['cneeAdr'].disable();
      this.formUser.controls['cneeAdr1'].disable();
      this.formUser.controls['cneeStateCode'].disable();
      this.formUser.controls['cneePincode'].disable();
      this.formUser.controls['cneeGstNo'].disable();
      this.formUser.controls['kms'].disable();
      this.formUser.controls['ewayBillDate'].disable();
      this.formUser.controls['declaredValue'].disable();
      this.formUser.controls['cnorInvDate'].disable();
      //this.formUser.controls['noPackages'].disable();
    }
    if (selectedValue === "M" || selectedValue === "E") {
      //Add field validation
      this.formUser.controls['fromPlace'].setValidators([Validators.required]);
      this.formUser.controls['toPlace'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['cnorName'].setValidators([Validators.required]);
      this.formUser.controls['cnorGstNo'].setValidators([Validators.required]);
      this.formUser.controls['cneeName'].setValidators([Validators.required]);
      this.formUser.controls['cneeGstNo'].setValidators([Validators.required]);
      this.formUser.controls['cnorInvNo'].setValidators([Validators.required]);
      this.formUser.controls['declaredValue'].setValidators([Validators.required]);
      this.formUser.controls['productId'].setValidators([Validators.required]);
      this.formUser.controls['rateType'].setValidators([Validators.required]);
      this.formUser.controls['billingParty'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['truckNo'].setValidators([Validators.required]);
      this.formUser.controls['noPackages'].setValidators([Validators.required]);

      //Enable fieldcnorName']
      this.formUser.controls['fromPlace'].enable();
      this.formUser.controls['toPlace'].enable();
      this.formUser.controls['cnorName'].enable();
      this.formUser.controls['cnorAdr'].enable();
      this.formUser.controls['cnorAdr1'].enable();
      this.formUser.controls['cnorStateCode'].enable();
      this.formUser.controls['cnorPincode'].enable();
      this.formUser.controls['cnorGstNo'].enable();
      this.formUser.controls['cneeName'].enable();
      this.formUser.controls['cneeAdr'].enable();
      this.formUser.controls['cneeAdr1'].enable();
      this.formUser.controls['cneeStateCode'].enable();
      this.formUser.controls['cneePincode'].enable();
      this.formUser.controls['cneeGstNo'].enable();
      this.formUser.controls['kms'].enable();
      this.formUser.controls['ewayBillDate'].enable();
      this.formUser.controls['ewayBillNo'].enable();
      this.formUser.controls['truckNo'].enable();
      this.formUser.controls['declaredValue'].enable();
      this.formUser.controls['cnorInvDate'].enable();
      this.formUser.controls['noPackages'].enable();

    }

    this.formUser.controls['fromPlace'].updateValueAndValidity();
    this.formUser.controls['toPlace'].updateValueAndValidity();
    this.formUser.controls['cnorName'].updateValueAndValidity();
    this.formUser.controls['cneeName'].updateValueAndValidity();
    this.formUser.controls['productId'].updateValueAndValidity();
    this.formUser.controls['rateType'].updateValueAndValidity();
    this.formUser.controls['billingParty'].updateValueAndValidity();
    this.formUser.controls['cnorInvDate'].updateValueAndValidity();
    this.formUser.controls['cnorInvNo'].updateValueAndValidity();
    this.formUser.controls['declaredValue'].updateValueAndValidity();
    this.formUser.controls['truckNo'].updateValueAndValidity();
    this.formUser.controls['cneeGstNo'].updateValueAndValidity();
    this.formUser.controls['cnorGstNo'].updateValueAndValidity();
    this.formUser.controls['ewayBillNo'].updateValueAndValidity();

  }

  submitLrDetailsForm(): void {
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
    this.lrmodel.bookingPlace = this.branch;
    this.lrmodel.gcNoteNo = selectedDataValue.gcNoteNo;
    this.lrmodel.bookingStatus = selectedDataValue.bookingStatus;
    this.lrmodel.bookingDate = selectedDataValue.bookingDate;
    // this.lrmodel.divType = selectedDataValue.divType;
    // this.lrmodel.delType = selectedDataValue.delType;
    // this.lrmodel.businessBy = selectedDataValue.businessBy.dataId;
    this.lrmodel.ewayBillNo = selectedDataValue.ewayBillNo;
    this.lrmodel.ewayBillDate = selectedDataValue.ewayBillDate;
    this.lrmodel.ewayBillExpDate = this.ewayBillExpDate;
    this.lrmodel.fromPlace = selectedDataValue.fromPlace.dataId;
    this.lrmodel.toPlace = selectedDataValue.toPlace.dataId;
    this.lrmodel.kms = selectedDataValue.kms;
    this.lrmodel.truckNo = selectedDataValue.truckNo;
    // this.lrmodel.clientType = selectedDataValue.clientType;
    // this.lrmodel.jobNo = selectedDataValue.jobNo;
    // this.lrmodel.jobId = selectedDataValue.jobNo==""?"": this.jobDetails.jobId;
    // this.lrmodel.jobBranch = selectedDataValue.jobNo==""?"": this.jobDetails.branch;
    // this.lrmodel.packingType = selectedDataValue.packingType;
    // this.lrmodel.vehType = selectedDataValue.vehType;
    this.lrmodel.billingParty = selectedDataValue.billingParty ? selectedDataValue.billingParty.dataId : "0";
    // this.lrmodel.billingStn = selectedDataValue.billingStn;
    // this.lrmodel.cnorName = selectedDataValue.cnorName;
    // this.lrmodel.cnorAdr = selectedDataValue.cnorAdr;
    // this.lrmodel.cnorAdr1 = selectedDataValue.cnorAdr1;
    // this.lrmodel.cnorStateCode = selectedDataValue.cnorStateCode;
    // this.lrmodel.cnorPincode = selectedDataValue.cnorPincode.toString();
    // this.lrmodel.cnorEmail = selectedDataValue.cnorEmail;
    // this.lrmodel.cnorMobile = selectedDataValue.cnorMobile;
    // this.lrmodel.cnorGstNo = selectedDataValue.cnorGstNo;
    // this.lrmodel.cnorInvNo = selectedDataValue.cnorInvNo;
    // this.lrmodel.cnorInvDate = selectedDataValue.cnorInvDate;
    this.lrmodel.declaredValue = selectedDataValue.declaredValue;
    // this.lrmodel.cneeName = selectedDataValue.cneeName;
    // this.lrmodel.cneeAdr = selectedDataValue.cneeAdr;
    // this.lrmodel.cneeAdr1 = selectedDataValue.cneeAdr1;
    // this.lrmodel.cneeStateCode = selectedDataValue.cneeStateCode;
    // this.lrmodel.cneePincode = selectedDataValue.cneePincode.toString();
    // this.lrmodel.cneeEmail = selectedDataValue.cneeEmail;
    // this.lrmodel.cneeMobile = selectedDataValue.cneeMobile;
    // this.lrmodel.cneeGstNo = selectedDataValue.cneeGstNo;
    this.lrmodel.shipmentNo = selectedDataValue.shipmentNo;
    // this.lrmodel.loadLength = selectedDataValue.loadLength;
    // this.lrmodel.loadWidth = selectedDataValue.loadWidth;
    // this.lrmodel.loadHeight = selectedDataValue.loadHeight;
    this.lrmodel.productId = selectedDataValue.productId;
    this.lrmodel.noPackages = selectedDataValue.noPackages;
    this.lrmodel.actualWt = selectedDataValue.actualWt;
    this.lrmodel.chargewt = selectedDataValue.chargewt;
    this.lrmodel.rateRs = selectedDataValue.rateRs ? selectedDataValue.rateRs : "0";
    this.lrmodel.freightRs = selectedDataValue.freightRs ? selectedDataValue.freightRs : "0";
    this.lrmodel.statisticalRs = selectedDataValue.statisticalRs ? selectedDataValue.statisticalRs : "0";
    this.lrmodel.generalRemarks = selectedDataValue.generalRemarks;
    this.lrmodel.subTotalRs = selectedDataValue.subTotalRs.toString();
    this.lrmodel.gtotalRs = selectedDataValue.gtotalRs.toString();
    this.lrmodel.rateType = selectedDataValue.rateType;
    this.lrmodel.yearId = this.year;
    this.lrmodel.loggedInUser = this.loggedInUserID;
    // this.lrentryService.LrDetailsSubmitted(this.lrmodel).subscribe((res: Responsemodel) => {
    //   this.responseDetails = res;
    //   if (res.status) {
    //     this.toastrService.success(this.responseDetails.message);
    //     this.formUser.reset();
    //     this.route.navigate(['/lrlistview']);
    //   }
    //   else {
    //     this.toastrService.warning(this.responseDetails.message);
    //   }
    // });

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