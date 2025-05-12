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
  selector: 'app-consignmentllpupdate',
  templateUrl: './consignmentllpupdate.component.html',
  styleUrls: ['./consignmentllpupdate.component.css']
})

export class ConsignmentllpupdateComponent {
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
    
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  branchList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  freightList: Dropdownmodel[] = [];
    gstByList: Dropdownmodel[] = [];
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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
        if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
          this.dashboard = dashboard;
        }
        if(!this.viewStatus){      
          this.route.navigate([this.dashboard]);
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
    this.getFreightList();
    this.getGstByList();
    this.formSubmitted = false;

    this.sharedService.loading = false;
    
    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl(this.branch, [Validators.required]),
      gcNoteNo  : new FormControl('', [Validators.required]),
      billingStatus: new FormControl('', [Validators.required]),
      vehicleNo: new FormControl('', [Validators.required]),
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
      //rateType : new FormControl('',),   
      gstBy : new FormControl('',[Validators.required]),
      //rateRs : new FormControl('',),   
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
      gstType: new FormControl('',[Validators.required]), 
      // sgstPct: new FormControl('',),   
      sgstAmt: new FormControl('',),   
      // cgstPct : new FormControl('',),   
      cgstAmt: new FormControl('',),   
      // igstPct: new FormControl('',),   
      igstAmt: new FormControl('',),   
      nonGstAmt1 : new FormControl('',),   
      nonGstAmt1Desc: new FormControl('',),   
      nonGstAmt2: new FormControl('',),   
      nonGstAmt2Desc: new FormControl('',),   
      gtotalRs : new FormControl('',),      
      ulReportingDateTime : new FormControl('',), 
      deliveryDateTime : new FormControl('',),      
      ulDetentionDays : new FormControl('',),     
      arrayGstList: this.formBuilder.array([this.createGstArray()])  , 
    });
    this.formUser.controls['bookingPlace'].disable();
    this.formUser.controls['bookingDate'].disable();  
    this.formUser.controls['fromPlace'].disable();  
    this.formUser.controls['toPlace'].disable();
    this.formUser.controls['noPackages'].disable(); 
    this.formUser.controls['actualWt'].disable();   
    this.formUser.controls['cnorName'].disable();  
    this.formUser.controls['cneeName'].disable();  
    this.formUser.controls['ulDetentionDays'].disable();  
    
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
      
  }

  get f() { return this.formUser.controls; }  
  
  get formGstArray() {
    return this.formUser.get("arrayGstList") as FormArray;
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
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
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

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
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

  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }

  getFreightList(): void {
    this.commonService.getFreightList().subscribe((res) => {
      this.freightList = res;
    });
  }
  
  getConsignmentDetails(e: any) { 
    this.formUser.patchValue({
      bookingDate : "",
      billingStatus: "",
      vehicleNo:"",
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
      gstType:  "", 
      // sgstPct:  "", 
      sgstAmt:  "", 
      // cgstPct :  "", 
      cgstAmt:  "", 
      // igstPct:  "", 
      igstAmt:  "", 
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
            vehicleNo: this.lrmodel.invoiceNo,
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
            gstType:  this.lrmodel.gstType, 
            // sgstPct:  this.lrmodel.sgstPct ,
            sgstAmt:  this.lrmodel.sgstAmt ,
            // cgstPct:  this.lrmodel.cgstPct ,
            cgstAmt:  this.lrmodel.cgstAmt ,
            // igstPct:  this.lrmodel.igstPct ,
            igstAmt:  this.lrmodel.igstAmt ,
            nonGstAmt1 :  this.lrmodel.nonGstAmt1 ,
            nonGstAmt1Desc:  this.lrmodel.nonGstAmt1Desc ,
            nonGstAmt2:  this.lrmodel.nonGstAmt2 ,
            nonGstAmt2Desc:  this.lrmodel.nonGstAmt2Desc ,
            gtotalRs :  this.lrmodel.gtotalRs ,
            ulReportingDateTime :  this.commonService.formatDate(this.lrmodel.ulReportingDateTime ),
            deliveryDateTime :  this.commonService.formatDate(this.lrmodel.deliveryDateTime ),
            ulDetentionDays :  this.lrmodel.ulDetentionDays ,
          });
          this.getLrInnerGridList();
          this.whatsappPOD1 = Constants.UploadFolderPath + 'Lr/whatsappPOD1/' + this.selectedLrDetails.whatsappPOD1;
          this.whatsappPOD2 = Constants.UploadFolderPath + 'Lr/whatsappPOD2/' + this.selectedLrDetails.whatsappPOD2;
          this.modifiedBy = this.selectedLrDetails.modifiedBy ;      
        }
      });
      this.sharedService.loading = false;
  }

  getLrInnerGridList(): void {
    this.requestmodel.strRequest = this.lrmodel.consignmentID;
    var gsttype = this.lrmodel.gstType;
    this.lrentryService.getLrInnerGridList(this.requestmodel).subscribe((res) => {
      if((res.gstList?res.gstList.length:0)>0){
        this.formGstArray.clear();
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
      }
    });
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
    var selectedData = this.formUser.getRawValue();
    for (var i = 0; i < selectedData.arrayGstList.length; i++) {
        this.formGstArray.controls[i].get("sgstPct")?.setValue("0");
        this.formGstArray.controls[i].get("cgstPct")?.setValue("0");
        this.formGstArray.controls[i].get("igstPct")?.setValue("0");

        this.formGstArray.controls[i].get("sgstPct")?.disable();
        this.formGstArray.controls[i].get("cgstPct")?.disable();
        this.formGstArray.controls[i].get("igstPct")?.disable(); 

      if (gsttype == "IG") {  
        this.formGstArray.controls[i].get("igstPct")?.enable();  
      }     
      else if (gsttype == "SC")  {     
        this.formGstArray.controls[i].get("sgstPct")?.enable();
        this.formGstArray.controls[i].get("cgstPct")?.enable();
      }   
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
      this.formGstArray.controls[j].get("linkColumn")?.setValue(res.linkColumn);
      this.formGstArray.controls[j].get("sgstPct")?.setValue("0");
      this.formGstArray.controls[j].get("cgstPct")?.setValue("0");
      this.formGstArray.controls[j].get("igstPct")?.setValue("0"); 

      if (selectedData.gstType == "IG") {  
        this.formGstArray.controls[j].get("igstPct")?.setValue(res.igstPct);  
      }     
      else if (selectedData.gstType  == "SC")  {     
        this.formGstArray.controls[j].get("sgstPct")?.setValue(res.sgstPct);
        this.formGstArray.controls[j].get("cgstPct")?.setValue(res.cgstPct);
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
      this.formGstArray.removeAt(index); 
      this.calculateAmount();   
    }
  }

  
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

    var gstType = "NA";
    if(selectedDataValue.gstBy=="F"){
      gstType = selectedDataValue.gstType;
    }
    this.cnmodel.consignmentID = this.lrmodel.consignmentID;           
    this.cnmodel.productId = selectedDataValue.productId.toString();
    this.cnmodel.poNo = selectedDataValue.poNo.toString();
    this.cnmodel.shipmentNo = selectedDataValue.shipmentNo.toString();
    this.cnmodel.billingStatus = selectedDataValue.billingStatus;  
    this.cnmodel.vehicleNo = selectedDataValue.vehicleNo;  
    this.cnmodel.billingParty = selectedDataValue.party ?  selectedDataValue.party.dataId : "0";  
    this.cnmodel.rateType = selectedDataValue.rateType ? selectedDataValue.rateType : "0"; 
    this.cnmodel.gstBy = selectedDataValue.gstBy ? selectedDataValue.gstBy : "0"; 
    this.cnmodel.gstType=gstType;
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
    this.cnmodel.igstAmt =  selectedDataValue.igstAmt.toString(); 
    this.cnmodel.sgstAmt =  selectedDataValue.sgstAmt.toString(); 
    this.cnmodel.cgstAmt =  selectedDataValue.cgstAmt.toString(); 
    this.cnmodel.yearId = this.year;
    this.cnmodel.loggedInUser = this.loggedInUserID;
    this.cnmodel.gstList = [];

    var igst = 0;
    var sgst = 0;
    var cgst = 0;
    var gstarr = selectedDataValue.arrayGstList

    for (var i = 0; i < gstarr.length; i++) {
      if (gstarr[i].freightId != "" && gstarr[i].amount != "") {
        if(gstarr[i].sgstAmt!=""){
          sgst = parseFloat(gstarr[i].sgstAmt);
        } 
        if(gstarr[i].cgstAmt!=""){
          cgst = parseFloat(gstarr[i].cgstAmt);
        } 
        if(gstarr[i].igstAmt!=""){
          igst = parseFloat(gstarr[i].igstAmt);
        }
      
        this.cnmodel.gstList.push({
          'consignmentID': '',
          'freightId': gstarr[i].freightId,
          'remarks': gstarr[i].remarks.toString().toUpperCase(),
          'rateType':gstarr[i].rateType.toString(),
          'rate': gstarr[i].rate.toString(),
          'amount': gstarr[i].amount.toString(),
          'sgstPct': gstarr[i].sgstPct.toString(),
          'sgstAmt': gstarr[i].sgstAmt.toString(),
          'cgstPct': gstarr[i].cgstPct.toString(),
          'cgstAmt': gstarr[i].cgstAmt.toString(),
          'igstPct': gstarr[i].igstPct.toString(),
          'igstAmt': gstarr[i].igstAmt.toString(),
          'totalAmt': gstarr[i].totalAmt.toString(),
          'linkColumn': '',
        });
      }
    }
    
    if(igst > 0){
      this.cnmodel.gstBy = "F";
      this.cnmodel.gstType = "IG";
    }
    if(sgst > 0 || cgst > 0){
      this.cnmodel.gstBy = "F";
      this.cnmodel.gstType = "SC";
    }

    
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