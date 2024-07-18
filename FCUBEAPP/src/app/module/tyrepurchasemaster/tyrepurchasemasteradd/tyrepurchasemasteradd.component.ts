import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tyrepurchasemastermodel } from 'src/app/models/tyrepurchasemastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TyrePurchaseMasterService } from 'src/app/services/tyrepurchasemaster.service';
import {Tyrepurchaseinnergridmodel } from 'src/app/models/tyrepurchaseinnergridmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tyrepurchasemasteradd',
  templateUrl: './tyrepurchasemasteradd.component.html',
  styleUrls: ['./tyrepurchasemasteradd.component.css']
})
export class TyrepurchasemasteraddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  userSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  modelList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  tyrepurchaseinnergridmodel = new Tyrepurchaseinnergridmodel();


  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedTyrePurchaseMasterDetail = new Tyrepurchasemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyrepurchasemastermodel: Tyrepurchasemastermodel, 
    private tyrePurchaseMasterService: TyrePurchaseMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.tyrepurchasemastermodel = new Tyrepurchasemastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "New Tyre Purchase");
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
    this.fromDate = today.toLocaleDateString('en-CA').toString();
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();

    this.getBrandList();
    this.getVendorList();
    this.getBranchList();
    this.getModelList();
 
      this.selectedTyrePurchaseMasterDetail = this.tyrePurchaseMasterService.getTyrePurchaseMasterDetails();
      this.formUser = this.formBuilder.group({
        branchCode  : new FormControl('',[Validators.required]),
        purchaseDate  : new FormControl('',[Validators.required]),
        purchaseType  : new FormControl('',[Validators.required]),
        noVendor    : new FormControl('',),
        vendorId      : new FormControl('',),
        vendorName : new FormControl('',),
        vendorAddress   : new FormControl('',),
        vendorGstNo     : new FormControl('',[Validators.required]),
        vendorInvNo       : new FormControl('',[Validators.required]),
        vendorInvDt         : new FormControl('',[Validators.required]),
        tyreSacCode           : new FormControl('',[Validators.required]),
        gstType             : new FormControl('',),
        totalTyresAmt               : new FormControl('',),
        totalCgstAmt                 : new FormControl('',),
        totalSgstAmt                 : new FormControl('',),
        totalIgstAmt  : new FormControl('',),
        totalAmt  : new FormControl('',),
        roundOff  : new FormControl('',),
        netAmount  : new FormControl('',),
        remarks  : new FormControl('',),
        pmtType  : new FormControl('',),
        neftPmt  : new FormControl('',),
        creditAc  : new FormControl('',),
        chequeNo  : new FormControl('',),
        chequeDate  : new FormControl('',),
        findocid  : new FormControl('',),
        findocidJV  : new FormControl('',),
        refDocAttachedImage  : new FormControl('',),
        yearID  : new FormControl('',),
        
       
        tyrePurchaseList: this.formBuilder.array([this.createTyreArray()]),
   
      });
      if (this.selectedTyrePurchaseMasterDetail.purchaseMasterID  != '') {
        setTimeout(() => {
          this.formUser.patchValue(this.selectedTyrePurchaseMasterDetail);
          this.formUser.patchValue({
            purchaseDate: this.commonService.formatDate(this.selectedTyrePurchaseMasterDetail.purchaseDate),
            chequeDate: this.commonService.formatDate(this.selectedTyrePurchaseMasterDetail.chequeDate),
            vendorInvDt: this.commonService.formatDate(this.selectedTyrePurchaseMasterDetail.vendorInvDt),
            //vendorId: this.vendorList.find(e => e.dataId == this.selectedTyrePurchaseMasterDetail.vendorId),
          })
          this.getTyrePurchaseMasterInnerGridList();
        }, 2000);  
      }
    }
    get f() { return this.formUser.controls; }
exit(): void {
  this.route.navigate(['/tyrepurchaselist']);
}
    createTyreArray() {
      return this.formBuilder.group({
        tyreId: [''],
        purchaseMasterID: [''],
        purchaseDate: [''],
        brandID: [''],
        tyreNo: [''],
        tyrePattern: [''],
        tyreModel: [''],
        tyreAmount: [''],
        sgstPct: [''],
        sgstAmt: [''],
        cgstPct: [''],
        cgstAmt: [''],
        igstPct: [''],
        igstAmt: [''],
        netTyreAmount: [''],
        estLifeKM: [''],
        regroupAmt: [''],
        currentTyreStatus: [''],
        currentStatusDate: [''],
        currentVehicleNo: [''],
      });
    }
    removeMiscItem(index: number) {
      this.formTyreArray.removeAt(index);
      //this.tripsheetinnergridmodel.miscList.splice(index, 1);
    
    }
    get formTyreArray() {
      return this.formUser.get("tyrePurchaseList") as FormArray;
    
    }
    getTyrePurchaseMasterInnerGridList(): void {
      // this.requestmodel.strRequest=this.selectedTyrePurchaseMasterDetail.purchaseMasterID 
      // this.tyrePurchaseMasterService.getTyrePurchaseMasterInnerGridList(this.requestmodel).subscribe((res) => {
      //   this.tyrepurchaseinnergridmodel = res;
      //    this.formTyreArray.clear();
      
    
      //   for (let misc = 0; misc < this.tyrepurchaseinnergridmodel.tyrePurchaseList.length; misc++) {
      //     this.formTyreArray.push(this.createTyreArray());
      //     this.formTyreArray.controls[misc].get("brandID")?.setValue(res.tyrePurchaseList[misc].brandID );
      //   }
        
      
       
    
      // });
      this.requestmodel.strRequest=this.selectedTyrePurchaseMasterDetail.purchaseMasterID 
      this.tyrePurchaseMasterService.getTyrePurchaseMasterInnerGridList(this.requestmodel).subscribe((res) => {
        this.formTyreArray.clear();
        this.tyrepurchaseinnergridmodel = res;
        for (var i = 0; i < res.tyrePurchaseList.length; i++) {
          this.formTyreArray.push(this.createTyreArray());
         // this.formTyreArray.controls[i].get("spareLubId")?.setValue(this.issueList.find(e => e.dataId == res.sparesLubesIssueDetailList[i].spareLubId));
          this.formTyreArray.controls[i].get("purchaseDate")?.setValue(this.commonService.formatDate(res.tyrePurchaseList[i].purchaseDate));
          this.formTyreArray.controls[i].get("brandID")?.setValue(res.tyrePurchaseList[i].brandID);
       // this.formTyreArray.controls[i].get("brandID")?.setValue(this.brandList.find(e => e.dataId == res.tyrePurchaseList[i].brandID));
          this.formTyreArray.controls[i].get("tyreNo")?.setValue(res.tyrePurchaseList[i].tyreNo);  
          this.formTyreArray.controls[i].get("tyrePattern")?.setValue(res.tyrePurchaseList[i].tyrePattern); 
          this.formTyreArray.controls[i].get("tyreModel")?.setValue(res.tyrePurchaseList[i].tyreModel);  
          this.formTyreArray.controls[i].get("tyreAmount")?.setValue(res.tyrePurchaseList[i].tyreAmount);   
          this.formTyreArray.controls[i].get("sgstPct")?.setValue(res.tyrePurchaseList[i].sgstPct);  
          this.formTyreArray.controls[i].get("sgstAmt")?.setValue(res.tyrePurchaseList[i].sgstAmt);    
          this.formTyreArray.controls[i].get("cgstPct")?.setValue(res.tyrePurchaseList[i].cgstPct);  
          this.formTyreArray.controls[i].get("cgstAmt")?.setValue(res.tyrePurchaseList[i].cgstAmt);   
          this.formTyreArray.controls[i].get("igstPct")?.setValue(res.tyrePurchaseList[i].igstPct);  
          this.formTyreArray.controls[i].get("igstAmt")?.setValue(res.tyrePurchaseList[i].igstAmt);  
          this.formTyreArray.controls[i].get("netTyreAmount")?.setValue(res.tyrePurchaseList[i].netTyreAmount);  
          this.formTyreArray.controls[i].get("estLifeKM")?.setValue(res.tyrePurchaseList[i].estLifeKM); 
          this.formTyreArray.controls[i].get("regroupAmt")?.setValue(res.tyrePurchaseList[i].regroupAmt); 
          this.formTyreArray.controls[i].get("currentTyreStatus")?.setValue(res.tyrePurchaseList[i].currentTyreStatus); 
          this.formTyreArray.controls[i].get("currentStatusDate")?.setValue(this.commonService.formatDate(res.tyrePurchaseList[i].currentStatusDate));
          this.formTyreArray.controls[i].get("currentVehicleNo")?.setValue(res.tyrePurchaseList[i].currentVehicleNo); 
        }     
      });
    }
    
    tyreMasterDelete(): void {
      if(this.selectedTyrePurchaseMasterDetail.purchaseMasterID  != '' ){
       this.requestmodel.strRequest =this.selectedTyrePurchaseMasterDetail.purchaseMasterID 
        if (confirm("Are you sure, you want to delete this?")) {
              this.tyrePurchaseMasterService.TyrePurchaseMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status) {
                this.toastrService.success(this.responseDetails.message);
                this.formUser.reset();
                this.route.navigate(['/tyrepurchaselist']);
              }
              else {
                this.toastrService.warning(this.responseDetails.message);
              }
          });
        }
      }
    }
    getBrandList(): void {
      this.commonService.getBrandList().subscribe((res) => {
        this.brandList = res;
      });
    }
    getModelList(): void {
      this.commonService.getBrandList().subscribe((res) => {
        this.modelList = res;
      });
    }
    getVendorList(): void {
      this.commonService.getVendorList().subscribe((res) => {
        this.vendorList = res;
      });
    }
    addMiscItem(index: number): void {
      if (this.formTyreArray.value[index].brandID != "" ) {
        this.formTyreArray.push(this.createTyreArray());
      } else {
        this.toastrService.warning("Please select one Location");
      }
    // if (this.formLocationArray.value[index].locId != "" ) {
       // this.formLocationArray.push(this.createLocationArray());
      //} else {
      // this.toastrService.warning("Please Enter Current record  ");
    // }
    }
    getBranchList(): void {
      this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
      });
    }
    submitTyrePurchaseMasterForm(): void {
      this.userSubmitted = true;
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
      this.tyrepurchasemastermodel.purchaseMasterID = this.selectedTyrePurchaseMasterDetail.purchaseMasterID != '' ? this.selectedTyrePurchaseMasterDetail.purchaseMasterID : '';
      this.tyrepurchasemastermodel.branchCode= selectedDataValue.branchCode;
      this.tyrepurchasemastermodel.purchaseDate = selectedDataValue.purchaseDate;
      this.tyrepurchasemastermodel.purchaseType = selectedDataValue.purchaseType;
      this.tyrepurchasemastermodel.noVendor = selectedDataValue.noVendor;
      this.tyrepurchasemastermodel.vendorId = selectedDataValue.vendorId;
      this.tyrepurchasemastermodel.vendorName = selectedDataValue.vendorName;
      this.tyrepurchasemastermodel.vendorAddress = selectedDataValue.vendorAddress;
      this.tyrepurchasemastermodel.vendorGstNo = selectedDataValue.vendorGstNo;
      this.tyrepurchasemastermodel.vendorInvNo = selectedDataValue.vendorInvNo;
      this.tyrepurchasemastermodel.vendorInvDt = selectedDataValue.vendorInvDt;
    
      this.tyrepurchasemastermodel.tyreSacCode = selectedDataValue.tyreSacCode;
      this.tyrepurchasemastermodel.gstType = selectedDataValue.gstType;
      this.tyrepurchasemastermodel.totalTyresAmt = selectedDataValue.totalTyresAmt;
      this.tyrepurchasemastermodel.totalSgstAmt = selectedDataValue.totalSgstAmt;
      this.tyrepurchasemastermodel.totalCgstAmt = selectedDataValue.totalCgstAmt;
      this.tyrepurchasemastermodel.totalIgstAmt = selectedDataValue.totalIgstAmt;
      this.tyrepurchasemastermodel.totalAmt = selectedDataValue.totalAmt;
      this.tyrepurchasemastermodel.roundOff = selectedDataValue.roundOff;
      this.tyrepurchasemastermodel.netAmount = selectedDataValue.netAmount;
      this.tyrepurchasemastermodel.remarks = selectedDataValue.remarks;
      this.tyrepurchasemastermodel.pmtType = selectedDataValue.pmtType;
      this.tyrepurchasemastermodel.neftPmt = selectedDataValue.neftPmt;
      this.tyrepurchasemastermodel.creditAc = selectedDataValue.creditAc;
      this.tyrepurchasemastermodel.remarks = selectedDataValue.remarks;
      this.tyrepurchasemastermodel.chequeNo = selectedDataValue.chequeNo;
      this.tyrepurchasemastermodel.chequeDate = selectedDataValue.chequeDate;
      this.tyrepurchasemastermodel.findocid = selectedDataValue.findocid;
      this.tyrepurchasemastermodel.findocidJV = selectedDataValue.findocidJV;
      this.tyrepurchasemastermodel.refDocAttachedImage = selectedDataValue.refDocAttachedImage;
      this.tyrepurchasemastermodel.yearID = selectedDataValue.yearID;
      if (this.formTyreArray.value != undefined) {
        for (var i = 0; i < this.formTyreArray.value.length; i++) {
          if (this.formTyreArray.value[i].brandID =='' ) {
            this.toastrService.warning("please select  brand");
            return;
          } 
          if(this.formTyreArray.value[i].brandID!=''){
            if(this.formTyreArray.value[i].brandID!=''){
          this.tyrepurchasemastermodel.tyrePurchaseDtlList.push({
            'tyreId': "",
            'purchaseMasterID': this.formTyreArray.value[i].purchaseMasterID,
            'purchaseDate': selectedDataValue.purchaseDate,
            'brandID': this.formTyreArray.value[i].brandID,
            'tyreNo': this.formTyreArray.value[i].tyreNo,
            'tyrePattern': this.formTyreArray.value[i].tyrePattern,
            'tyreModel': this.formTyreArray.value[i].tyreModel,
            'tyreAmount': this.formTyreArray.value[i].tyreAmount,
            'sgstPct': this.formTyreArray.value[i].sgstPct,
            'sgstAmt': this.formTyreArray.value[i].sgstAmt,
            'cgstAmt': this.formTyreArray.value[i].cgstAmt,
            'cgstPct': this.formTyreArray.value[i].cgstPct,
            'igstPct': this.formTyreArray.value[i].igstPct,
            'igstAmt': this.formTyreArray.value[i].igstAmt,
            'netTyreAmount': this.formTyreArray.value[i].netTyreAmount,
            'estLifeKM': this.formTyreArray.value[i].estLifeKM,
            'regroupAmt': this.formTyreArray.value[i].regroupAmt,
            'currentTyreStatus': this.formTyreArray.value[i].currentTyreStatus,
            'currentStatusDate': this.formTyreArray.value[i].currentStatusDate,
            'currentVehicleNo': this.formTyreArray.value[i].currentVehicleNo,
           // 'adbluedieselAmount': this.formAdblueArray.value[i].adbluedieselAmount
          }) 
         }
          else if(this.formTyreArray.value[i].brandID==''){
            this.toastrService.warning( "location Cannot be Empty");  
            return;
          }
        
        }
      }}
     
    
      
      let formData = new FormData();
        formData.append('attach', this.attachmentInput.nativeElement.files[0]);
        formData.append('datadetails', JSON.stringify(this.tyrepurchasemastermodel));
    
    
      this.tyrePurchaseMasterService.tyrePurchaseMasterSubmitted(this.tyrepurchasemastermodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toastrService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/tyrepurchaselist']);
        }
        else {
          this.toastrService.warning(this.responseDetails.message);
        }      
      });
    }
    
    }