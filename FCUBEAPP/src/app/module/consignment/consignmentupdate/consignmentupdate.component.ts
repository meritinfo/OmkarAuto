import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Consignmentupdatemodel } from 'src/app/models/consignmentupdatemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-consignmentupdate',
  templateUrl: './consignmentupdate.component.html',
  styleUrls: ['./consignmentupdate.component.css']
})
export class ConsignmentupdateComponent {
  formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  newDate: string = '';
  whatsappPOD1: string = '';
  whatsappPOD2: string = '';
  partyList: Dropdownmodel[] = [];
  dashboard:string = ''; 
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  branchList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  delvDetnDays: string="";
  hamali: string="";
  detiontion: string="";
  others1: string="";
  others2: string="";
  totExt: string="";
  modifiedBy: string = "";

  responseDetails = new Responsemodel();
  selectedLrDetails = new Consignmentmodel();
  keywordLocation = 'dataName';

  @ViewChild('whatsappPOD1Input', {
    static: true
  }) whatsappPOD1Input: any;
  
  @ViewChild('whatsappPOD2Input', {
    static: true
  }) whatsappPOD2Input: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private lrmodel: Consignmentmodel,  private cnmodel: Consignmentupdatemodel,private lrentryService: ConsignmentService,
    private commonService: CommonService, private sharedService: SharedService,
    private toastrService: ToastrService, private requestmodel: Requestmodel) {
    this.lrmodel = new Consignmentmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Update Consignment for Bill");
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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
  

    this.sharedService.loading = true;
    this.getBranchList();
    this.getRateList();
    this.getLocationList();
    this.getBillingPartyList();
    this.getContentList();
    this.formSubmitted = false;

    this.sharedService.loading = false;
    
    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl(this.branch, [Validators.required]),
      gcNoteNo  : new FormControl('', [Validators.required]),
      billingStatus: new FormControl('', [Validators.required]),
      bookingDate : new FormControl('', ),
      fromPlace : new FormControl('',),    
      toPlace : new FormControl('', ), 
      poNo:new FormControl('', ), 
      shipmentNo:new FormControl('', ), 
      noPackages : new FormControl('',),  
      actualWt : new FormControl('',),   
      chargewt : new FormControl('',),   
      cnorName: new FormControl('',), 
      cneeName: new FormControl('',),
      party: new FormControl('',[Validators.required]),
      rateType : new FormControl('',),   
      gstBy : new FormControl('',),   
      rateRs : new FormControl('',),   
      freightRs : new FormControl('',),   
      statisticalRs : new FormControl('',),   
      fovRs: new FormControl('',),   
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
      freightNarr: new FormControl('',),   
      statisticalNarr: new FormControl('',),   
      fovNarr: new FormControl('',),   
      doorCollNarr: new FormControl('',),   
      handlingNarr: new FormControl('',),   
      loadingDetnNarr: new FormControl('',),   
      enrouteNarr: new FormControl('',),   
      miscNarr: new FormControl('',),   
      doorDelNarr: new FormControl('',),   
      unLoadingNarr: new FormControl('',),   
      unloadingDetenNarr: new FormControl('',),   
      extrasNarr: new FormControl('',),   
      othersNarr: new FormControl('',),   
      subTotalRs : new FormControl('',),   
      productId : new FormControl('', ),
      // gstType: new FormControl('',),   
      // sgstPct: new FormControl('',),   
      // sgstAmt: new FormControl('',),   
      // cgstPct : new FormControl('',),   
      // cgstAmt: new FormControl('',),   
      // igstPct: new FormControl('',),   
      // igstAmt: new FormControl('',),   
      nonGstAmt1 : new FormControl('',),   
      nonGstAmt1Desc: new FormControl('',),   
      nonGstAmt2: new FormControl('',),   
      nonGstAmt2Desc: new FormControl('',),   
      gtotalRs : new FormControl('',),      
      ulReportingDateTime : new FormControl('',), 
      deliveryDateTime : new FormControl('',),      
      ulDetentionDays : new FormControl('',),     
    });
    this.formUser.controls['rateType'].disable(); 
    this.formUser.controls['rateRs'].disable(); 
    this.formUser.controls['freightRs'].disable();  
    this.formUser.controls['bookingPlace'].disable();
    this.formUser.controls['bookingDate'].disable();  
    this.formUser.controls['fromPlace'].disable();  
    this.formUser.controls['toPlace'].disable();
    this.formUser.controls['noPackages'].disable(); 
    this.formUser.controls['actualWt'].disable();   
    this.formUser.controls['cnorName'].disable();  
    this.formUser.controls['cneeName'].disable();  
    this.formUser.controls['subTotalRs'].disable(); 
    this.formUser.controls['gtotalRs'].disable(); 
    this.formUser.controls['ulDetentionDays'].disable();  

    this.getUserRights();
    
      
  }

  get f() { return this.formUser.controls; }  

  
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

  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }

  getUserRights(): void {
    this.requestmodel.strRequest = this.loggedInUserID;
    this.commonService.getUserRights(this.requestmodel).subscribe((res) => {
      if(res.updateCnFreight=="Y"){
        this.formUser.controls['freightRs'].enable();   
        this.formUser.controls['rateType'].enable(); 
        this.formUser.controls['rateRs'].enable(); 
      } 
      else{        
        this.formUser.controls['freightRs'].disable(); 
        this.formUser.controls['rateType'].disable(); 
        this.formUser.controls['rateRs'].disable();  
      }     
    });
  }
  
  getConsignmentDetails(e: any) { 
    this.formUser.patchValue({
      bookingDate : "",
      billingStatus: "",
      fromPlace : "",
      toPlace :  "",   
      poNo:"",
      shipmentNo:"",  
      noPackages :  "",
      actualWt :  "", 
      chargewt :  "", 
      cnorName:  "", 
      cneeName:  "", 
      party:  "", 
      rateType :  "", 
      gstBy :  "", 
      rateRs :  "", 
      freightRs :  "", 
      statisticalRs :  "", 
      fovRs:  "", 
      doorCollRs :  "", 
      handlingRs :  "", 
      loadingDetnRs :  "", 
      enrouteRs :  "", 
      miscRs :  "", 
      doorDelRs :  "", 
      unLoadingRs :  "", 
      unLoadingDetnRs :  "", 
      extrasRS :  "", 
      othersRs :  "", 
      freightNarr:  "", 
      statisticalNarr:  "", 
      fovNarr:  "", 
      doorCollNarr:  "", 
      handlingNarr:  "", 
      loadingDetnNarr:  "", 
      enrouteNarr:  "", 
      miscNarr:  "", 
      doorDelNarr:  "", 
      unLoadingNarr:  "", 
      unloadingDetenNarr:  "", 
      extrasNarr:  "", 
      othersNarr:  "", 
      subTotalRs :  "", 
      // gstType:  "", 
      // sgstPct:  "", 
      // sgstAmt:  "", 
      // cgstPct :  "", 
      // cgstAmt:  "", 
      // igstPct:  "", 
      // igstAmt:  "", 
      nonGstAmt1 :  "", 
      nonGstAmt1Desc:  "", 
      nonGstAmt2:  "", 
      nonGstAmt2Desc:  "", 
      gtotalRs :  "", 
      ulReportingDateTime:  "", 
      deliveryDateTime:  "", 
      ulDetentionDays :  "", 
    });

      this.sharedService.loading = true;
      this.requestmodel.strRequest = this.branch;
      this.requestmodel.strRequest1 = e.target.value; 
       this.lrentryService.getConsignmentDetailsForUpdate(this.requestmodel).subscribe((res:Consignmentmodel) => {
        this.lrmodel = res;
        var cn = this.lrmodel.fromPlace;
        if (typeof cn === 'undefined' || cn === null || cn === '') {
          this.toastrService.warning("LR No Doesn't Exists ");
          this.formUser.patchValue({
            gcNoteNo : "",
          });    
          return;
        }
        else{
          this.delvDetnDays = this.lrmodel.insPolicyNo;          
          this.hamali= this.lrmodel.tdsDeducted;        
          this.detiontion= this.lrmodel.deduction1;        
          this.others1= this.lrmodel.deduction2;        
          this.others2= this.lrmodel.deduction3;        
          this.totExt= this.lrmodel.extrasRecd1;        
          this.formUser.patchValue({
            bookingDate :   this.commonService.formatDate(this.lrmodel.bookingDate),
            billingStatus:this.lrmodel.billingStatus,
            fromPlace : this.lrmodel.fromPlace,
            toPlace :  this.lrmodel.toPlace, 
            poNo :  this.lrmodel.poNo,
            shipmentNo: this.lrmodel.poNo,
            noPackages :  this.lrmodel.noPackages,
            actualWt :  this.lrmodel.actualWt, 
            chargewt :  this.lrmodel.chargewt, 
            cnorName:  this.lrmodel.cnorName,
            cneeName:  this.lrmodel.cneeName, 
            party: this.partyList.find(x => x.dataId == this.lrmodel.billingParty), 
            rateType :  this.lrmodel.rateType, 
            gstBy :  this.lrmodel.gstBy, 
            rateRs :  this.lrmodel.rateRs, 
            freightRs :  this.lrmodel.freightRs, 
            statisticalRs :  this.lrmodel.statisticalRs, 
            fovRs:  this.lrmodel.fovRs ,
            doorCollRs :  this.lrmodel.doorCollRs, 
            handlingRs :  this.lrmodel.handlingRs, 
            loadingDetnRs :  this.lrmodel.loadingDetnRs, 
            enrouteRs :  this.lrmodel.enrouteRs, 
            miscRs :  this.lrmodel.miscRs, 
            doorDelRs :  this.lrmodel.doorDelRs, 
            unLoadingRs :  this.lrmodel.unLoadingRs, 
            unLoadingDetnRs :  this.lrmodel.unLoadingDetnRs, 
            extrasRS :  this.lrmodel.extrasRS, 
            othersRs :  this.lrmodel.othersRs, 
            freightNarr:  this.lrmodel.freightNarr, 
            statisticalNarr:  this.lrmodel.statisticalNarr, 
            fovNarr:  this.lrmodel.fovNarr, 
            doorCollNarr:  this.lrmodel.doorCollNarr, 
            handlingNarr:  this.lrmodel.handlingNarr,
            loadingDetnNarr:  this.lrmodel.loadingDetnNarr, 
            enrouteNarr:  this.lrmodel.enrouteNarr, 
            miscNarr:  this.lrmodel.miscNarr, 
            doorDelNarr:  this.lrmodel.doorDelNarr, 
            unLoadingNarr:  this.lrmodel.unLoadingNarr, 
            unloadingDetenNarr:  this.lrmodel.unloadingDetenNarr, 
            extrasNarr:  this.lrmodel.extrasNarr, 
            othersNarr:  this.lrmodel.othersNarr, 
            subTotalRs :  this.lrmodel.subTotalRs, 
            productId: this.lrmodel.productId, 
            // gstType:  this.lrmodel.gstType, 
            // sgstPct:  this.lrmodel.sgstPct ,
            // sgstAmt:  this.lrmodel.sgstAmt ,
            // cgstPct:  this.lrmodel.cgstPct ,
            // cgstAmt:  this.lrmodel.cgstAmt ,
            // igstPct:  this.lrmodel.igstPct ,
            // igstAmt:  this.lrmodel.igstAmt ,
            nonGstAmt1 :  this.lrmodel.nonGstAmt1 ,
            nonGstAmt1Desc:  this.lrmodel.nonGstAmt1Desc ,
            nonGstAmt2:  this.lrmodel.nonGstAmt2 ,
            nonGstAmt2Desc:  this.lrmodel.nonGstAmt2Desc ,
            gtotalRs :  this.lrmodel.gtotalRs ,
            ulReportingDateTime :  this.commonService.formatDate(this.lrmodel.ulReportingDateTime ),
            deliveryDateTime :  this.commonService.formatDate(this.lrmodel.deliveryDateTime ),
            ulDetentionDays :  this.lrmodel.ulDetentionDays ,
          });
          this.whatsappPOD1 = Constants.UploadFolderPath + 'Lr/whatsappPOD1/' + this.selectedLrDetails.whatsappPOD1;
          this.whatsappPOD2 = Constants.UploadFolderPath + 'Lr/whatsappPOD2/' + this.selectedLrDetails.whatsappPOD2;
          this.modifiedBy = this.selectedLrDetails.modifiedBy ;      
        }
      });
      this.sharedService.loading = false;
  }

  calcDetDays(){    
    var selectedData = this.formUser.getRawValue();
    
    let deliveryDateTime = new Date(selectedData.deliveryDateTime);
    let ulReportingDateTime = new Date(selectedData.ulReportingDateTime);
    let differenceInTime =  deliveryDateTime.getTime() - ulReportingDateTime.getTime();
    var ulDetentionDays = Math.floor((differenceInTime / (1000 * 3600 * 24)));
    this.formUser.patchValue({
      ulDetentionDays: ulDetentionDays
    })
  }
      
  changeGstType(e: any) {
    console.log(e.target.value);
    var gsttype = e.target.value; 
   
    if (gsttype == "I" ) {   
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
    var nonGstAmt1 = selectedData.nonGstAmt1 != ""? parseFloat(selectedData.nonGstAmt1) : 0;
    var nonGstAmt2 = selectedData.nonGstAmt2 != ""? parseFloat(selectedData.nonGstAmt2) : 0;
   
    subTotalRs = freightRs + statisticalRs + fovRs + doorCollRs + handlingRs +
                    loadingDetnRs + enrouteRs + miscRs + doorDelRs + unLoadingRs +
                    unLoadingDetnRs + extrasRS + othersRs
   
    // var igst = 0;
    // var sgst = 0;
    // var cgst = 0;
    // if(selectedData.igstPct!=0){
    //   igst = parseFloat(selectedData.igstPct)
    // }
    // if(selectedData.sgstPct!=0){
    //   sgst = parseFloat(selectedData.sgstPct)
    // }
    // if(selectedData.cgstPct!=0){
    //   cgst = parseFloat(selectedData.cgstPct)
    // }

    // if (selectedData.gstType == "I") {   
    //   selectedData.igstPct 
    //   this.formUser.patchValue({
    //     sgstPct:"",
    //     cgstPct:"",
    //     igstPct: igst,
    //     sgstAmt:"",
    //     cgstAmt:"",
    //     igstAmt: Math.round((subTotalRs * igst)/100).toFixed(2),
    //   });   
    // }    
    // else if (selectedData.gstType == "S")  {    
    //   this.formUser.patchValue({
    //     sgstPct: sgst,
    //     cgstPct: cgst,
    //     igstPct: "",
    //     sgstAmt: Math.round((subTotalRs * sgst)/100).toFixed(2),
    //     cgstAmt: Math.round((subTotalRs * cgst)/100).toFixed(2),
    //     igstAmt: "",
    //   });     
    // }
    // else{
    //   this.formUser.patchValue({
    //     sgstPct:"",
    //     cgstPct:"",
    //     igstPct:"",
    //     sgstAmt:"",
    //     cgstAmt:"",
    //     igstAmt:"",
    //   });   
    // }    
    // gtotalRs = subTotalRs + 
    // Math.round((subTotalRs * igst)/100) + Math.round((subTotalRs * sgst)/100) + Math.round((subTotalRs * cgst)/100)
    // + nonGstAmt1 + nonGstAmt2

    gtotalRs = subTotalRs + nonGstAmt1 + nonGstAmt2

    this.formUser.patchValue({
      subTotalRs: subTotalRs.toFixed(2),
      gtotalRs: gtotalRs.toFixed(2),
    });
  }  

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  
  selectEvent(item: any) {
    // do something with selected item
  }
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
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


  
  exit(): void {
      this.route.navigate([this.dashboard]);
  }

  updateLrDetailsForm(): void {
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
    if(selectedDataValue.ulReportingDateTime.toString()=="" && selectedDataValue.deliveryDateTime.toString()!="")
    {      
      this.toastrService.warning("Please Enter Both Unloading & Delivery Dates");
      return;
    }
    if(selectedDataValue.ulReportingDateTime.toString()!="" && selectedDataValue.deliveryDateTime.toString()=="")
    {      
      this.toastrService.warning("Please Enter Both Unloading & Delivery Dates");
      return;
    }
    
    if (selectedDataValue.party.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning("Party is Invalid");
      return;
    }

    this.cnmodel.consignmentID = this.lrmodel.consignmentID;           
    this.cnmodel.productId = selectedDataValue.productId.toString();
    this.cnmodel.poNo = selectedDataValue.poNo.toString();
    this.cnmodel.shipmentNo = selectedDataValue.shipmentNo.toString();
    this.cnmodel.billingStatus = selectedDataValue.billingStatus;  
    this.cnmodel.billingParty = selectedDataValue.party ?  selectedDataValue.party.dataId : "0";  
    this.cnmodel.rateType = selectedDataValue.rateType ? selectedDataValue.rateType : "0"; 
    this.cnmodel.gstBy = selectedDataValue.gstBy ? selectedDataValue.gstBy : "0"; 
    this.cnmodel.rateRs = selectedDataValue.rateRs ? selectedDataValue.rateRs : "0";
    this.cnmodel.freightRs = selectedDataValue.freightRs ? selectedDataValue.freightRs : "0";
    this.cnmodel.freightNarr= selectedDataValue.freightNarr  ? selectedDataValue.freightNarr.toString().toUpperCase() : "";
    this.cnmodel.statisticalRs = selectedDataValue.statisticalRs ? selectedDataValue.statisticalRs : "0";
    this.cnmodel.statisticalNarr= selectedDataValue.statisticalNarr ? selectedDataValue.statisticalNarr.toString().toUpperCase() : "";
    this.cnmodel.fovRs= selectedDataValue.fovRs ? selectedDataValue.fovRs : "0";
    this.cnmodel.fovNarr= selectedDataValue.fovNarr ? selectedDataValue.fovNarr.toString().toUpperCase() : "";
    this.cnmodel.doorCollRs = selectedDataValue.doorCollRs ? selectedDataValue.doorCollRs : "0";
    this.cnmodel.doorCollNarr= selectedDataValue.doorCollNarr ? selectedDataValue.doorCollNarr.toString().toUpperCase() : "";
    this.cnmodel.handlingRs = selectedDataValue.handlingRs ? selectedDataValue.handlingRs : "0";   
    this.cnmodel.handlingNarr= selectedDataValue.handlingNarr ? selectedDataValue.handlingNarr.toString().toUpperCase() : "";   
    this.cnmodel.loadingDetnRs= selectedDataValue.loadingDetnRs ;
    this.cnmodel.loadingDetnNarr= selectedDataValue.loadingDetnNarr? selectedDataValue.loadingDetnNarr.toString().toUpperCase() : "";
    this.cnmodel.enrouteRs = selectedDataValue.enrouteRs ? selectedDataValue.enrouteRs : "0";
    this.cnmodel.enrouteNarr= selectedDataValue.enrouteNarr? selectedDataValue.enrouteNarr.toString().toUpperCase() : "";
    this.cnmodel.miscRs = selectedDataValue.miscRs ? selectedDataValue.miscRs : "0";
    this.cnmodel.miscNarr= selectedDataValue.miscNarr ? selectedDataValue.miscNarr.toString().toUpperCase() : "";
    this.cnmodel.doorDelRs = selectedDataValue.doorDelRs ? selectedDataValue.doorDelRs : "0";
    this.cnmodel.doorDelNarr= selectedDataValue.doorDelNarr? selectedDataValue.doorDelNarr.toString().toUpperCase() : "";
    this.cnmodel.unLoadingRs = selectedDataValue.unLoadingRs ? selectedDataValue.unLoadingRs : "0";
    this.cnmodel.unLoadingNarr= selectedDataValue.unLoadingNarr ? selectedDataValue.unLoadingNarr.toString().toUpperCase() : "";
    this.cnmodel.unLoadingDetnRs = selectedDataValue.unLoadingDetnRs ? selectedDataValue.unLoadingDetnRs : "0";
    this.cnmodel.unloadingDetenNarr= selectedDataValue.unloadingDetenNarr  ? selectedDataValue.unloadingDetenNarr.toString().toUpperCase() : ""; 
    this.cnmodel.extrasRS = selectedDataValue.extrasRS ? selectedDataValue.extrasRS : "0";
    this.cnmodel.extrasNarr= selectedDataValue.extrasNarr ? selectedDataValue.extrasNarr.toString().toUpperCase() : "";  
    this.cnmodel.othersRs = selectedDataValue.othersRs ? selectedDataValue.othersRs : "0";
    this.cnmodel.othersNarr= selectedDataValue.othersNarr ? selectedDataValue.othersNarr.toString().toUpperCase() : "";;
    this.cnmodel.subTotalRs = selectedDataValue.subTotalRs ? selectedDataValue.subTotalRs : "0"; 
    this.cnmodel.nonGstAmt1  = selectedDataValue.nonGstAmt1 ? selectedDataValue.nonGstAmt1 : "0"; 
    this.cnmodel.nonGstAmt1Desc  = selectedDataValue.nonGstAmt1Desc ? selectedDataValue.nonGstAmt1Desc : "0"; 
    this.cnmodel.nonGstAmt2  = selectedDataValue.nonGstAmt2 ? selectedDataValue.nonGstAmt2 : "0"; 
    this.cnmodel.nonGstAmt2Desc  = selectedDataValue.nonGstAmt2Desc  ? selectedDataValue.nonGstAmt2Desc : "0"; 
    this.cnmodel.gtotalRs = selectedDataValue.gtotalRs.toString();
    this.cnmodel.ulReportingDateTime = selectedDataValue.ulReportingDateTime.toString();
    this.cnmodel.deliveryDateTime = selectedDataValue.deliveryDateTime.toString();
    this.cnmodel.ulDetentionDays = selectedDataValue.ulDetentionDays.toString();
    this.cnmodel.yearId = this.year;
    this.cnmodel.loggedInUser = this.loggedInUserID;

    
    this.sharedService.loading = true;
    let formData = new FormData();
    formData.append('whatsappPOD1', this.whatsappPOD1Input.nativeElement.files[0]);
    formData.append('whatsappPOD2', this.whatsappPOD2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.cnmodel));
          
    this.lrentryService.updateConsignmentDetails(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (res.status) {
        this.formUser.reset();
        this.toastrService.success(this.responseDetails.message);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
      
      this.formUser.patchValue({
        bookingPlace : this.branch,
      });   
    });

    this.sharedService.loading = false;
  }

}