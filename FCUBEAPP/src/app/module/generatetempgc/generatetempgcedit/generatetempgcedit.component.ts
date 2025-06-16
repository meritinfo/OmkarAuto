import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tempgcmodel } from 'src/app/models/tempgcmodel';
import { Dprmodel } from 'src/app/models/dprmodel';
import { CommonService } from 'src/app/services/common.service';
import { GeneratetempgcService } from 'src/app/services/generatetempgc.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { Constants } from 'src/app/common/constants';


@Component({
  selector: 'app-generatetempgcedit',
  templateUrl: './generatetempgcedit.component.html',
  styleUrls: ['./generatetempgcedit.component.css']
})
export class GeneratetempgceditComponent {
  loggedInUserID: string = '';
  dprid: string = '';
  branch: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  gstByList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];
  cnorCneeList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  classList: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  createdBy: string = "";
  modifiedBy: string = "";

  uploadedVehRcDoc: string = "";
  uploadedVehPanDoc: string = "";
  uploadedVehDecDoc: string = "";
  uploadedPartyInvDoc: string = "";
  uploadedLoadingSlipDoc: string = "";
  uploadedVehPhoto1Doc: string = "";
  uploadedVehPhoto2Doc: string = "";
  uploadedVehPhoto3Doc: string = "";

  @ViewChild('vehRcDocInput', {
    static: true
  }) vehRcDocInput: any;
  @ViewChild('vehPanDocInput', {
    static: true
  }) vehPanDocInput: any;
  @ViewChild('vehDecDocInput', {
    static: true
  }) vehDecDocInput: any;
  @ViewChild('partyInvDocInput', {
    static: true
  }) partyInvDocInput: any;
  @ViewChild('loadingSlipDocInput', {
    static: true
  }) loadingSlipDocInput: any;
  @ViewChild('vehPhoto1DocInput', {
    static: true
  }) vehPhoto1DocInput: any;
  @ViewChild('vehPhoto2DocInput', {
    static: true
  }) vehPhoto2DocInput: any;
  @ViewChild('vehPhoto3DocInput', {
    static: true
  }) vehPhoto3DocInput: any;

  eWayBillDetails = new Ewaybillmodel();
  searchEnable = true;

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedTempgcDetails = new Tempgcmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tempgcmodel: Tempgcmodel,
    private ratesMasterService: RatesMasterService,
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private generatetempgcService: GeneratetempgcService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.selectedTempgcDetails = new Tempgcmodel();
  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "DPR Generate Temp LR");
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

      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;


    var dprid = sessionStorage.getItem('dprid')?.toString();
    if (typeof dprid !== 'undefined' && dprid !== null && dprid !== '') {
      this.dprid = dprid;
    }
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getGstByList();
    this.getLocationList();
    this.getStateList();
    this.getClassList();
    this.getContentList();
    this.getPartyList();
    this.getEmpList();
    this.getCnorCneeList();


    this.formUser = this.formBuilder.group({
      bookingPlace  : new FormControl('',[Validators.required]),
      gcNoteNo : new FormControl('',[Validators.required]),
      bookingDate  : new FormControl('',[Validators.required]),
      bookStatus : new FormControl('',[Validators.required]),
      fromPlace : new FormControl('',),
      toPlace : new FormControl('',[Validators.required]),

      ewayBillType : new FormControl('',[Validators.required]),
      ewayBillNo : new FormControl('',[Validators.required]),
      ewayBillDate : new FormControl('',[Validators.required]),
      ewayBillExpDate : new FormControl('',[Validators.required]),
      invoiceNo : new FormControl('',[Validators.required]),
      invoiceDt : new FormControl('',[Validators.required]),
      goodsValue : new FormControl('',),

      cnorId: new FormControl('',),
      cnorName : new FormControl('',[Validators.required]),
      cnorAdd1 : new FormControl('',),
      cnorAdd2 : new FormControl('',),
      cnorAdd3 : new FormControl('',),
      cnorState : new FormControl('',),
      cnorPin : new FormControl('',),
      cnorGst : new FormControl('',),

      cneeId: new FormControl('',),
      cneeName : new FormControl('',[Validators.required]),
      cneeAdd1 : new FormControl('',),
      cneeAdd2 : new FormControl('',),
      cneeAdd3 : new FormControl('',),
      cneeState : new FormControl('',),
      cneePin : new FormControl('',),
      cneeGst : new FormControl('',),
      cneeMob : new FormControl('',[Validators.required]),

      classCode: new FormControl('',[Validators.required]),
      productCode: new FormControl('',[Validators.required]),
      noPackages: new FormControl('',[Validators.required]),
      actualWt: new FormControl('',[Validators.required]),
      chargewt: new FormControl('',[Validators.required]),
      
      vehicleInDt: new FormControl('',[Validators.required]),
      vehicleInTime: new FormControl('',[Validators.required]),
      vehicleOutDt: new FormControl('',[Validators.required]),
      vehicleOutTime: new FormControl('',[Validators.required]),

      cropDesc: new FormControl('',),

      vehicleNo : new FormControl('',[Validators.required]),
      vehOwnerName : new FormControl('',[Validators.required]),
      vehAdd1 : new FormControl('',),
      vehAdd2 : new FormControl('',),
      ownerPan : new FormControl('',),
      vehOwnerMobile : new FormControl('',),
      vehInsValidDate : new FormControl('',),
      vehFitValidDate : new FormControl('',),
      vehPermitValidDate : new FormControl('',),

      driverName : new FormControl('',[Validators.required]),
      driverMob1 : new FormControl('',[Validators.required]),
      driverLicNo:new FormControl('',),
      driverLicDt: new FormControl('',),

      payStn : new FormControl('',[Validators.required]),
      payParty : new FormControl('',[Validators.required]),
      businessby: new FormControl('',[Validators.required]),
      gstBy: new FormControl('E',[Validators.required]),

      remarks:new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()])  , 
      arraySealList: this.formBuilder.array([this.createSealArray()])    
    });
   
    this.changeEWay('A');
    

    this.formUser.controls['bookingPlace'].disable(); 
    this.formUser.controls['bookStatus'].disable(); 
    this.formUser.controls['fromPlace'].disable(); 
    this.formUser.controls['toPlace'].disable(); 

    this.selectedTempgcDetails = this.generatetempgcService.getTempgcDetails();
    
    this.formUser.controls['ewayBillNo'].disable(); 
    this.formUser.controls['gcNoteNo'].disable(); 
    this.formUser.controls['vehicleNo'].disable(); 
    

    setTimeout(() => {
        this.uploadedVehRcDoc = Constants.UploadFolderPath + 'tempGc/vehRcDoc/' + this.selectedTempgcDetails.vehRcDoc;
        this.uploadedVehPanDoc = Constants.UploadFolderPath + 'tempGc/vehPanDoc/' + this.selectedTempgcDetails.vehPanDoc;
        this.uploadedVehDecDoc = Constants.UploadFolderPath + 'tempGc/vehDecDoc/' + this.selectedTempgcDetails.vehDecDoc;
        this.uploadedPartyInvDoc = Constants.UploadFolderPath + 'tempGc/partyInvDoc/' + this.selectedTempgcDetails.partyInvDoc;
        this.uploadedLoadingSlipDoc = Constants.UploadFolderPath + 'tempGc/loadingSlipDoc/' + this.selectedTempgcDetails.loadingSlipDoc;
        this.uploadedVehPhoto1Doc = Constants.UploadFolderPath + 'tempGc/vehPhoto1Doc/' + this.selectedTempgcDetails.vehPhoto1Doc;
        this.uploadedVehPhoto2Doc = Constants.UploadFolderPath + 'tempGc/vehPhoto2Doc/' + this.selectedTempgcDetails.vehPhoto2Doc;
        this.uploadedVehPhoto3Doc = Constants.UploadFolderPath + 'tempGc/vehPhoto3Doc/' + this.selectedTempgcDetails.vehPhoto3Doc;
                
        this.formUser.patchValue(this.selectedTempgcDetails);  
        this.formUser.patchValue({
          bookingDate: this.commonService.formatDate(this.selectedTempgcDetails.bookingDate),
          vehFitValidDate: this.commonService.formatDate(this.selectedTempgcDetails.vehFitValidDate),
          vehInsValidDate: this.commonService.formatDate(this.selectedTempgcDetails.vehInsValidDate),
          vehPermitValidDate: this.commonService.formatDate(this.selectedTempgcDetails.vehPermitValidDate),
          ewayBillDate : this.commonService.formatDate(this.selectedTempgcDetails.ewayBillDate),
          ewayBillExpDate : this.commonService.formatDate(this.selectedTempgcDetails.ewayBillExpDate),
          invoiceDt : this.commonService.formatDate(this.selectedTempgcDetails.invoiceDt),          
          vehicleInDt:  this.commonService.formatDate(this.selectedTempgcDetails.vehicleInDt),           
          vehicleOutDt:  this.commonService.formatDate(this.selectedTempgcDetails.vehicleOutDt),   
          fromPlace: this.locationList.find(e => e.dataId == this.selectedTempgcDetails.fromPlace),
          toPlace: this.locationList.find(e => e.dataId == this.selectedTempgcDetails.toPlace),       
          cnorId: this.cnorCneeList.find(e => e.dataId == this.selectedTempgcDetails.cnorId),
          cneeId: this.cnorCneeList.find(e => e.dataId == this.selectedTempgcDetails.cneeId),                 
        });  
        if(this.selectedTempgcDetails.tempGcId != '' && this.selectedTempgcDetails.tempGcId != '0' ){        
          this.getTempGcInnerGridList();
          this.editMode = true;    
          this.createdBy = this.selectedTempgcDetails.createdBy + " " + this.selectedTempgcDetails.createdDate;
          this.modifiedBy = this.selectedTempgcDetails.modifiedBy + " " + this.selectedTempgcDetails.modifiedDate;      
          this.searchEnable = false;
        }
    }, 2000);

    this.sharedService.loading=false;
  }

  getTempGcInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTempgcDetails.tempGcId;
    this.generatetempgcService.getTempgcInnerGridList(this.requestmodel).subscribe((res) => {
      this.tempgcmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.invList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("invNo")?.setValue(res.invList[i].invNo);
        this.formArray.controls[i].get("invDate")?.setValue(this.commonService.formatDate(res.invList[i].invDate));
        this.formArray.controls[i].get("invValue")?.setValue(res.invList[i].invValue);
        this.formArray.controls[i].get("invNo")?.disable();
        this.formArray.controls[i].get("invDate")?.disable();
        this.formArray.controls[i].get("invValue")?.disable();
      }      
      this.formArray.push(this.createInitialArray());
      this.formSealArray.clear();
      for (var i = 0; i < res.sealList.length; i++) {
        this.formSealArray.push(this.createSealArray());
        this.formSealArray.controls[i].get("sealNo")?.setValue(res.sealList[i].sealNo);
        this.formSealArray.controls[i].get("sealNo")?.disable();
      }      
      this.formSealArray.push(this.createSealArray());
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      invNo: ['', []],
      invDate: ['', []],
      invValue: ['', []],
    });
  }

  createSealArray() {
    return this.formBuilder.group({
      sealNo: ['', []],
    });
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
        cnorState: res.cneeState,      
        cnorPin: res.cneePin,   
        cnorGst:  res.cneeGst,   
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
        cneeState: res.cneeState,      
        cneePin: res.cneePin,   
        cneeGst: res.cneeGst,   
        cneeMob: res.cneeMobile,
      });
    })
  }
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }
  get formSealArray() {
    return this.formUser.get("arraySealList") as FormArray;
  }


  changeEWay(selectedValue: string) {       

    this.formUser.controls['ewayBillNo'].enable();
    this.formUser.controls['ewayBillDate'].enable();
    this.formUser.controls['ewayBillExpDate'].enable();
    this.formUser.controls['invoiceNo'].enable();
    this.formUser.controls['invoiceDt'].enable(); 
    this.formUser.controls['goodsValue'].enable(); 
    

    this.searchEnable = false;
    if (selectedValue === "M" || selectedValue === "A") {     
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillDate'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillExpDate'].setValidators([Validators.required]);
      this.formUser.controls['invoiceNo'].setValidators([Validators.required]);
      this.formUser.controls['invoiceDt'].setValidators([Validators.required]);

      if (selectedValue === "A") {
        this.searchEnable = true;       
        this.formUser.controls['ewayBillDate'].disable();
        this.formUser.controls['ewayBillExpDate'].disable();
        this.formUser.controls['invoiceNo'].disable();
        this.formUser.controls['invoiceDt'].disable();
        this.formUser.controls['goodsValue'].disable(); 
      }
    }
    if ( selectedValue === "E") {
      this.formUser.controls['ewayBillNo'].clearValidators();
      this.formUser.controls['ewayBillDate'].clearValidators();
      this.formUser.controls['ewayBillExpDate'].clearValidators();
      this.formUser.controls['invoiceNo'].clearValidators();
      this.formUser.controls['invoiceDt'].clearValidators();

      this.searchEnable = false;
    }

    this.formUser.controls['ewayBillNo'].updateValueAndValidity();
    this.formUser.controls['ewayBillDate'].updateValueAndValidity();
    this.formUser.controls['ewayBillExpDate'].updateValueAndValidity();
    this.formUser.controls['invoiceNo'].updateValueAndValidity();
    this.formUser.controls['invoiceDt'].updateValueAndValidity();

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
              this.formArray.controls[0].get("invNo")?.setValue(this.eWayBillDetails.result.message.document_number,);
              this.formArray.controls[0].get("invDate")?.setValue(this.commonService.formatDate(this.commonService.formatDate(this.eWayBillDetails.result.message.document_date)));
              this.formArray.controls[0].get("invValue")?.setValue(this.eWayBillDetails.result.message.total_invoice_value.toString());
              this.formArray.controls[0].get("invNo")?.disable();
              this.formArray.controls[0].get("invDate")?.disable();
              this.formArray.controls[0].get("invValue")?.disable();              
              this.formArray.push(this.createInitialArray());
            }
            else{              
              this.toasterService.warning("Please Enter Valid Eway bill no");  
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
          this.toasterService.warning("Eway bill no already exists in database");
          return
        }
      });
    }    
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
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }
  getClassList(): void {
    this.commonService.getClassList().subscribe((res) => {
      this.classList = res;
    });
  }

  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }  

  getPartyList(): void {
    this.ratesMasterService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  getEmpList(): void {
    this.commonService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }
  
  getCnorCneeList(): void {
    this.commonService.GetCneeCnorList().subscribe((res) => {
      this.cnorCneeList = res;
    });
  }

  addItem(index: number): void {
    var selectedDataVal= this.formUser.getRawValue();

    if (this.formArray.value[index].invNo != "" && this.formArray.value[index].invDate != "" 
    && this.formArray.value[index].invValue != "") {
      this.formArray.push(this.createInitialArray()); 
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    } 
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formArray.removeAt(index);   }
  }
 
  deletetempgcDetailsForm(): void {
    if(this.selectedTempgcDetails.tempGcId != '' && this.selectedTempgcDetails.tempGcId != '0' ){   
      this.requestmodel.strRequest = this.selectedTempgcDetails.tempGcId;
      if (confirm("Are you sure, you want to delete this?")) {   
        this.sharedService.loading=true;
        this.generatetempgcService.tempgcDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/dprtempgclist']);
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
    this.route.navigate(['/dprtempgclist']);
  }

  submittempgcDetails(): void {
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

    this.tempgcmodel.tempGcId   = this.selectedTempgcDetails.tempGcId? this.selectedTempgcDetails.tempGcId :"";
    this.tempgcmodel.dprId      = this.selectedTempgcDetails.dprId? this.selectedTempgcDetails.dprId :"";
    this.tempgcmodel.dprDtlId   = this.selectedTempgcDetails.dprDtlId? this.selectedTempgcDetails.dprDtlId :"";
    this.tempgcmodel.vehiclePlacedId   = this.selectedTempgcDetails.vehiclePlacedId? this.selectedTempgcDetails.vehiclePlacedId :"";
    this.tempgcmodel.bookingPlace       = selectedDataVal.bookingPlace    ?selectedDataVal.bookingPlace:"";  
    this.tempgcmodel.gcNoteNo           = selectedDataVal.gcNoteNo        ?selectedDataVal.gcNoteNo:"";  
    this.tempgcmodel.bookingDate        = selectedDataVal.bookingDate     ?selectedDataVal.bookingDate:"";  
    this.tempgcmodel.bookStatus         = selectedDataVal.bookStatus      ?selectedDataVal.bookStatus:"";  
    this.tempgcmodel.fromPlace          = selectedDataVal.fromPlace       ?selectedDataVal.fromPlace.dataId:"";  
    this.tempgcmodel.toPlace            = selectedDataVal.toPlace         ?selectedDataVal.toPlace.dataId:"";  
    this.tempgcmodel.ewayBillType       = selectedDataVal.ewayBillType    ?selectedDataVal.ewayBillType:"";  
    this.tempgcmodel.ewayBillNo         = selectedDataVal.ewayBillNo      ?selectedDataVal.ewayBillNo:"";  
    this.tempgcmodel.ewayBillDate       = selectedDataVal.ewayBillDate    ?selectedDataVal.ewayBillDate:"";  
    this.tempgcmodel.ewayBillExpDate    = selectedDataVal.ewayBillExpDate ?selectedDataVal.ewayBillExpDate:"";  
    this.tempgcmodel.invoiceNo          = selectedDataVal.invoiceNo       ?selectedDataVal.invoiceNo:"";  
    this.tempgcmodel.invoiceDt          = selectedDataVal.invoiceDt       ?selectedDataVal.invoiceDt:"";  
    this.tempgcmodel.goodsValue         = selectedDataVal.goodsValue      ?selectedDataVal.goodsValue:"";  
    this.tempgcmodel.cnorId             = selectedDataVal.cnorId          ?selectedDataVal.cnorId.dataId.toString():"";  
    this.tempgcmodel.cnorName           = selectedDataVal.cnorName        ?selectedDataVal.cnorName.toString().toUpperCase()      :"";  
    this.tempgcmodel.cnorAdd1           = selectedDataVal.cnorAdd1        ?selectedDataVal.cnorAdd1.toString().toUpperCase()      :"";  
    this.tempgcmodel.cnorAdd2           = selectedDataVal.cnorAdd2        ?selectedDataVal.cnorAdd2.toString().toUpperCase()      :"";  
    this.tempgcmodel.cnorAdd3           = selectedDataVal.cnorAdd3        ?selectedDataVal.cnorAdd3.toString().toUpperCase()     :"";  
    this.tempgcmodel.cnorState          = selectedDataVal.cnorState       ?selectedDataVal.cnorState.toString().toUpperCase()     :"";  
    this.tempgcmodel.cnorPin            = selectedDataVal.cnorPin         ?selectedDataVal.cnorPin       :"";  
    this.tempgcmodel.cnorGst            = selectedDataVal.cnorGst         ?selectedDataVal.cnorGst.toString().toUpperCase()       :"";  
    this.tempgcmodel.cneeId             = selectedDataVal.cneeId          ?selectedDataVal.cneeId.dataId.toString():"";  
    this.tempgcmodel.cneeName           = selectedDataVal.cneeName        ?selectedDataVal.cneeName.toString().toUpperCase()      :"";  
    this.tempgcmodel.cneeAdd1           = selectedDataVal.cneeAdd1        ?selectedDataVal.cneeAdd1.toString().toUpperCase()      :"";  
    this.tempgcmodel.cneeAdd2           = selectedDataVal.cneeAdd2        ?selectedDataVal.cneeAdd2.toString().toUpperCase()     :"";  
    this.tempgcmodel.cneeAdd3           = selectedDataVal.cneeAdd3        ?selectedDataVal.cneeAdd3.toString().toUpperCase()      :"";  
    this.tempgcmodel.cneeState          = selectedDataVal.cneeState       ?selectedDataVal.cneeState.toString().toUpperCase()     :"";  
    this.tempgcmodel.cneePin            = selectedDataVal.cneePin         ?selectedDataVal.cneePin       :"";  
    this.tempgcmodel.cneeGst            = selectedDataVal.cneeGst         ?selectedDataVal.cneeGst.toString().toUpperCase()       :"";  
    this.tempgcmodel.cneeMob            = selectedDataVal.cneeMob         ?selectedDataVal.cneeMob       :"";  
    this.tempgcmodel.classCode          = selectedDataVal.classCode       ?selectedDataVal.classCode     :"";  
    this.tempgcmodel.productCode        = selectedDataVal.productCode     ?selectedDataVal.productCode   :"";  
    this.tempgcmodel.noPackages         = selectedDataVal.noPackages      ?selectedDataVal.noPackages    :"";  
    this.tempgcmodel.actualWt           = selectedDataVal.actualWt        ?selectedDataVal.actualWt      :"";  
    this.tempgcmodel.chargewt           = selectedDataVal.chargewt        ?selectedDataVal.chargewt      :"";  
    this.tempgcmodel.vehicleInDt        = selectedDataVal.vehicleInDt     ?selectedDataVal.vehicleInDt   :"";  
    this.tempgcmodel.vehicleInTime      = selectedDataVal.vehicleInTime   ?selectedDataVal.vehicleInTime :"";  
    this.tempgcmodel.vehicleOutDt       = selectedDataVal.vehicleOutDt    ?selectedDataVal.vehicleOutDt  :"";  
    this.tempgcmodel.vehicleOutTime     = selectedDataVal.vehicleOutTime  ?selectedDataVal.vehicleOutTime:"";  
    this.tempgcmodel.cropDesc           = selectedDataVal.cropDesc        ?selectedDataVal.cropDesc      :"";  
    this.tempgcmodel.vehicleNo          = selectedDataVal.vehicleNo       ?selectedDataVal.vehicleNo.toString().toUpperCase():"";  
    this.tempgcmodel.driverName         = selectedDataVal.driverName.toString().toUpperCase();
    this.tempgcmodel.driverMob1         = selectedDataVal.driverMob1?selectedDataVal.driverMob1:"";
    this.tempgcmodel.driverLicNo        = selectedDataVal.driverLicNo?selectedDataVal.driverLicNo.toString().toUpperCase():"";
    this.tempgcmodel.driverLicDt        = selectedDataVal.driverLicDt?selectedDataVal.driverLicDt:"";
    this.tempgcmodel.payStn             = selectedDataVal.payStn ?selectedDataVal.payStn:"";
    this.tempgcmodel.payParty           = selectedDataVal.payParty ?selectedDataVal.payParty:"";
    this.tempgcmodel.businessby         = selectedDataVal.businessby ?selectedDataVal.businessby:"";
    this.tempgcmodel.gstBy              = selectedDataVal.gstBy ?selectedDataVal.gstBy:"";
    this.tempgcmodel.remarks            = selectedDataVal.remarks ?selectedDataVal.remarks.toString().toUpperCase():"";
   
    this.tempgcmodel.loggedInUser = this.loggedInUserID;  

    this.tempgcmodel.invList = [];
    this.tempgcmodel.sealList = [];
   

    if(selectedDataVal.arrayList.length==0){
      this.toasterService.warning("Provide atleast one Invoice detail");
      return;
    }
    if(selectedDataVal.arraySealList.length==0){
      this.toasterService.warning("Provide atleast one Seal detail");
      return;
    }

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {   
      if(selectedDataVal.arrayList[i].invNo!='' && selectedDataVal.arrayList[i].invDate!='' && 
          selectedDataVal.arrayList[i].InvValue!=''){
        this.tempgcmodel.invList.push({
          'tempGcId': '',
          'invNo':selectedDataVal.arrayList[i].invNo.toString().toUpperCase(),
          'invDate':selectedDataVal.arrayList[i].invDate,
          'invValue': selectedDataVal.arrayList[i].invValue,
        });
      }
    }       

    for (var i = 0; i < selectedDataVal.arraySealList.length; i++) {   
      if(selectedDataVal.arraySealList[i].sealNo!='' ){
        this.tempgcmodel.sealList.push({
          'tempGcId': '',
          'sealNo':selectedDataVal.arraySealList[i].sealNo.toString().toUpperCase(),
        });
      }
    }   
    

    this.sharedService.loading=true;

    this.formSubmitted = true;
    
    let formData = new FormData();
    formData.append('vehRcDoc', this.vehRcDocInput.nativeElement.files[0]);
    formData.append('vehPanDoc', this.vehPanDocInput.nativeElement.files[0]);
    formData.append('vehDecDoc', this.vehDecDocInput.nativeElement.files[0]);
    formData.append('partyInvDoc', this.partyInvDocInput.nativeElement.files[0]);
    formData.append('loadingSlipDoc', this.loadingSlipDocInput.nativeElement.files[0]);
    formData.append('vehPhoto1Doc', this.vehPhoto1DocInput.nativeElement.files[0]);
    formData.append('vehPhoto2Doc', this.vehPhoto2DocInput.nativeElement.files[0]);
    formData.append('vehPhoto3Doc', this.vehPhoto3DocInput.nativeElement.files[0]);

    formData.append('datadetails', JSON.stringify(this.tempgcmodel));

    
    this.generatetempgcService.tempgcSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/dprtempgclist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    this.sharedService.loading=false;
  }
}



