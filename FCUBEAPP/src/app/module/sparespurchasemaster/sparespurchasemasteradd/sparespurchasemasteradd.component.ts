
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Sparespurchasemastermodel } from 'src/app/models/sparespurchasemastermodel';
import { CommonService } from 'src/app/services/common.service';
import { SparesPurchaseMasterService } from 'src/app/services/sparespurchasemaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-sparespurchasemasteradd',
  templateUrl: './sparespurchasemasteradd.component.html',
  styleUrls: ['./sparespurchasemasteradd.component.css']
})

export class SparespurchasemasteraddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  editMode= false;
  userSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  sparesList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  modelList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  sparespurchasemodel = new Sparespurchasemastermodel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedSparesPurchaseMasterDetail = new Sparespurchasemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private sparespurchasemastermodel: Sparespurchasemastermodel, 
    private sparesPurchaseMasterService: SparesPurchaseMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.sparespurchasemastermodel = new Sparespurchasemastermodel();
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Spares/Lubes Purchase Entry");
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
    this.fromDate = today.toLocaleDateString('en-CA').toString();
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
 
    this.selectedSparesPurchaseMasterDetail = this.sparesPurchaseMasterService.getSparesPurchaseMasterDetails();
    this.formUser = this.formBuilder.group({
      transDate : new FormControl(this.loginDate,[Validators.required]),
      nonVendor : new FormControl('',),  
      vendorId : new FormControl('',),
      vendorInvDt : new FormControl(this.loginDate,),
      vendorInvNo : new FormControl('',),
      vendorName : new FormControl('',),
      vendorAddress : new FormControl('',[Validators.required]),
      vendorState : new FormControl('',),
      vendorGstNo : new FormControl('',),
      gstType : new FormControl('NA',),
      totItemAmount : new FormControl('',[Validators.required]),
      totSgstAmt : new FormControl('',),
      totCgstAmt : new FormControl('',),
      totIgstAmt : new FormControl('',),
      totItemNetAmount : new FormControl('',[Validators.required]),
      otherAmount : new FormControl('',),
      roundOff : new FormControl('',),
      netAmount : new FormControl('',),
      remarks : new FormControl('',),
      pmtType : new FormControl('',[Validators.required]),
      creditAc : new FormControl('',),     
       chequeDate : new FormControl('',),
      // linkFtmId : new FormControl('',),
      // linkJVFtmId : new FormControl('',),
      // auditedYN : new FormControl('',),
      // auditDate : new FormControl('',),
      refDocAttachedImage : new FormControl('',),
      //branchCode : new FormControl('',),   

      arrayList: this.formBuilder.array([this.createSparesArray()]),
    }); 

    this.getBrandList();
    this.getVendorList();
    this.getBranchList();
    this.getStateList();
    this.getSparesList();
    //this.getCreditAcList('');

    this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
    this.formTyreArray.controls[0].get("cgstAmt")?.disable();  
    this.formTyreArray.controls[0].get("igstAmt")?.disable();  
    this.formTyreArray.controls[0].get("sgstPct")?.disable();   
    this.formTyreArray.controls[0].get("cgstPct")?.disable();  
    this.formTyreArray.controls[0].get("igstPct")?.disable();   
    this.formTyreArray.controls[0].get("netAmount")?.disable(); 
    this.formTyreArray.controls[0].get("itemAmount")?.disable(); 

    this.formUser.controls["totItemAmount"].disable();
    this.formUser.controls["totCgstAmt"].disable();
    this.formUser.controls["totSgstAmt"].disable();
    this.formUser.controls["totIgstAmt"].disable();
    this.formUser.controls["netAmount"].disable();  
    this.formUser.controls['totItemNetAmount'].disable(); 

    if (this.selectedSparesPurchaseMasterDetail.spTransId  != '') {
      setTimeout(() => {
        this.refDocAttachedImage = Constants.UploadFolderPath + 'sparesPurchase/refDocAttachedImage/' + this.selectedSparesPurchaseMasterDetail.refDocAttachedImage;
        this.formUser.patchValue(this.selectedSparesPurchaseMasterDetail);
        this.formUser.patchValue({
          transDate: this.commonService.formatDate(this.selectedSparesPurchaseMasterDetail.transDate),
          chequeDate: this.commonService.formatDate(this.selectedSparesPurchaseMasterDetail.chequeDate),
          vendorInvDt: this.commonService.formatDate(this.selectedSparesPurchaseMasterDetail.vendorInvDt),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedSparesPurchaseMasterDetail.vendorId),
        })  
        this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
        this.formTyreArray.controls[0].get("cgstAmt")?.disable();  
        this.formTyreArray.controls[0].get("igstAmt")?.disable();  
        this.formTyreArray.controls[0].get("sgstPct")?.disable();   
        this.formTyreArray.controls[0].get("cgstPct")?.disable();  
        this.formTyreArray.controls[0].get("igstPct")?.disable();   
        this.formTyreArray.controls[0].get("netAmount")?.disable(); 
        this.formTyreArray.controls[0].get("itemAmount")?.disable();       
                  
        if (this.selectedSparesPurchaseMasterDetail.nonVendor=='Y'){     
          this.formUser.controls['vendorId'].disable();   
          this.formUser.controls['vendorName'].enable(); 
          this.formUser.patchValue({
            vendorId: "",
            nonVendor: "Y",
          })
        }
        else {          
          this.formUser.controls['vendorId'].enable(); 
          this.formUser.controls['vendorName'].disable(); 
          this.formUser.patchValue({
            nonVendor: "",
          })
        }   
      
        this.getSparesPurchaseMasterInnerGridList();
        this.editMode =true;
      }, 2000);  
    }
  }

  get f() { return this.formUser.controls; }

  get formTyreArray() {
  return this.formUser.get("arrayList") as FormArray;    
  }

  selectEvent(item: any) {
    // do something with selected item
     this.formUser.patchValue({
      vendorName: item.dataName
    })
    this.requestmodel.strRequest = item.dataId;
    this.commonService.getVendorDetails(this.requestmodel).subscribe((res) => {
      this.formUser.patchValue({
        vendorAddress: res.strRequest,
        vendorGstNo: res.strRequest1,
      })
    });  

  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.formUser.patchValue({
      neftPmt : "",
      chequeNo: "",
      chequeDate: this.loginDate,
    });
    
    this.getCreditAcList(selectedValue);
  }
  getBrandList(): void {
    this.commonService.getSparesBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }
  getSparesList(): void {
    this.commonService.getSparesList().subscribe((res) => {
      this.sparesList = res;
    });
  }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  onNoVendor(e: any) {
    if (e.target.checked){     
      this.formUser.controls['vendorId'].disable(); 
      this.formUser.controls['vendorName'].enable(); 
      this.formUser.patchValue({
        vendorId: "",
        nonVendor: "Y",
        vendorName:"",
      })
    }
    else {          
      this.formUser.controls['vendorId'].enable(); 
      this.formUser.controls['vendorName'].disable(); 
      this.formUser.patchValue({
        vendorId: "",
        nonVendor: "",
        vendorName:"",
      })
    }
  }
  getVendorList(): void {
    this.commonService.getVendorList().subscribe((res) => {
      this.vendorList = res;
    });
  }  
  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;      
    });
    
    if (pmttp == 'B'){
      this.formUser.controls['chequeDate'].enable();
    }
    else {
      this.formUser.controls['chequeDate'].disable();
    }
  }


  createSparesArray() {
    return this.formBuilder.group({
      spTransDtlId: [''],
      spTransId: [''],
      transDate: [''],
      spareLubId: [''],
      brandId: [''],
      itemQty: [''],
      itemRate: [''],
      itemAmount: [''],
      sgstPct: [''],
      sgstAmt: [''],
      cgstPct: [''],
      cgstAmt: [''],
      igstPct: [''],
      igstAmt: [''],
      netAmount: [''],
      remarks: [''],
    });
  }
  getSparesPurchaseMasterInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedSparesPurchaseMasterDetail.spTransId; 
    this.sparesPurchaseMasterService.getSparesPurchaseMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.sparespurchasemastermodel = res;
      for (var i = 0; i < res.sparesPurchaseDtlList.length; i++) {
        this.formTyreArray.push(this.createSparesArray());
        this.formTyreArray.controls[i].get("spTransDtlId")?.setValue(res.sparesPurchaseDtlList[i].spTransDtlId);
        this.formTyreArray.controls[i].get("spTransId")?.setValue(res.sparesPurchaseDtlList[i].spTransId);  
        this.formTyreArray.controls[i].get("transDate")?.setValue(res.sparesPurchaseDtlList[i].transDate); 
        this.formTyreArray.controls[i].get("spareLubId")?.setValue(res.sparesPurchaseDtlList[i].spareLubId);  
        this.formTyreArray.controls[i].get("brandId")?.setValue(res.sparesPurchaseDtlList[i].brandId);   
        this.formTyreArray.controls[i].get("itemQty")?.setValue(res.sparesPurchaseDtlList[i].itemQty);  
        this.formTyreArray.controls[i].get("itemRate")?.setValue(res.sparesPurchaseDtlList[i].itemRate);    
        this.formTyreArray.controls[i].get("itemAmount")?.setValue(res.sparesPurchaseDtlList[i].itemAmount);  
        this.formTyreArray.controls[i].get("sgstPct")?.setValue(res.sparesPurchaseDtlList[i].sgstPct);   
        this.formTyreArray.controls[i].get("sgstAmt")?.setValue(res.sparesPurchaseDtlList[i].sgstAmt);  
        this.formTyreArray.controls[i].get("cgstPct")?.setValue(res.sparesPurchaseDtlList[i].cgstPct);  
        this.formTyreArray.controls[i].get("cgstAmt")?.setValue(res.sparesPurchaseDtlList[i].cgstAmt);  
        this.formTyreArray.controls[i].get("igstPct")?.setValue(res.sparesPurchaseDtlList[i].igstPct);  
        this.formTyreArray.controls[i].get("igstAmt")?.setValue(res.sparesPurchaseDtlList[i].igstAmt);  
        this.formTyreArray.controls[i].get("netAmount")?.setValue(res.sparesPurchaseDtlList[i].netAmount); 
        this.formTyreArray.controls[i].get("remarks")?.setValue(res.sparesPurchaseDtlList[i].remarks); 
      
        this.formTyreArray.controls[i].get("sgstAmt")?.disable();   
        this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
        this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
        this.formTyreArray.controls[0].get("netAmount")?.disable(); 
        this.formTyreArray.controls[0].get("itemAmount")?.disable();   

        if (this.selectedSparesPurchaseMasterDetail.gstType == "I") {   
          this.formTyreArray.controls[i].get("sgstPct")?.disable();   
          this.formTyreArray.controls[i].get("cgstPct")?.disable();  
          this.formTyreArray.controls[i].get("igstPct")?.enable();  
        }    
        else if (this.selectedSparesPurchaseMasterDetail.gstType == "S" || this.selectedSparesPurchaseMasterDetail.gstType == "C")  {      
          this.formTyreArray.controls[i].get("sgstPct")?.enable();   
          this.formTyreArray.controls[i].get("cgstPct")?.enable();  
          this.formTyreArray.controls[i].get("igstPct")?.disable();  
        }
        else{              
          this.formTyreArray.controls[i].get("sgstPct")?.disable();   
          this.formTyreArray.controls[i].get("cgstPct")?.disable();  
          this.formTyreArray.controls[i].get("igstPct")?.disable();  
        } 
      }     
    });
  }

  addItem(i: number): void {    
    var selectedDate = this.formUser.getRawValue();
    if (this.formTyreArray.value[i].spareLubId != "" && this.formTyreArray.value[i].brandId!="" ) {
      this.formTyreArray.push(this.createSparesArray());
      
    this.formTyreArray.controls[i+1].get("sgstAmt")?.disable();   
    this.formTyreArray.controls[i+1].get("cgstAmt")?.disable();  
    this.formTyreArray.controls[i+1].get("igstAmt")?.disable();  
      
      if (selectedDate.gstType == "I") {   
        this.formTyreArray.controls[i+1].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i+1].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i+1].get("igstPct")?.enable();  
      }    
      else if (selectedDate.gstType == "S" || selectedDate.gstType == "C")  {      
        this.formTyreArray.controls[i+1].get("sgstPct")?.enable();   
        this.formTyreArray.controls[i+1].get("cgstPct")?.enable();  
        this.formTyreArray.controls[i+1].get("igstPct")?.disable();  
      }
      else{              
        this.formTyreArray.controls[i+1].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i+1].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i+1].get("igstPct")?.disable();  
      } 
    } 
    else {
      this.toastrService.warning("Please Enter  Spares Details");
    }
  }

  removeItem(index: number) {
    this.formTyreArray.removeAt(index);  
  }  

  sparesMasterDelete(): void {
    if(this.selectedSparesPurchaseMasterDetail.spTransId  != '' ){
    this.requestmodel.strRequest =this.selectedSparesPurchaseMasterDetail.spTransId 
      if (confirm("Are you sure, you want to delete this?")) {
            this.sparesPurchaseMasterService.SparesPurchaseMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/sparespurchaselist']);
            }
            else {
              this.toastrService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }
    
  exit(): void {
    this.route.navigate(['/sparespurchaselist']);
  }  

  changeGstType(e: any) {
    console.log(e.target.value);
    var gsttype = e.target.value;   
    for (var i = 0; i < this.formTyreArray.controls.length; i++) { 
      this.formTyreArray.controls[i].get("sgstPct")?.setValue("0");
      this.formTyreArray.controls[i].get("cgstPct")?.setValue("0");
      this.formTyreArray.controls[i].get("igstPct")?.setValue("0");
      this.formTyreArray.controls[i].get("sgstAmt")?.setValue("0");
      this.formTyreArray.controls[i].get("cgstAmt")?.setValue("0");
      this.formTyreArray.controls[i].get("igstAmt")?.setValue("0"); 
      this.formTyreArray.controls[i].get("itemAmt")?.setValue("0"); 

      if (gsttype == "I") {   
        this.formTyreArray.controls[i].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i].get("igstPct")?.enable();  
        this.formUser.controls['vendorGstNo'].setValidators([Validators.required]);
      }    
      else if (gsttype == "S" || gsttype == "C")  {      
        this.formTyreArray.controls[i].get("sgstPct")?.enable();   
        this.formTyreArray.controls[i].get("cgstPct")?.enable();  
        this.formTyreArray.controls[i].get("igstPct")?.disable();  
        this.formUser.controls['vendorGstNo'].setValidators([Validators.required]);
      }
      else{              
        this.formTyreArray.controls[i].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i].get("igstPct")?.disable(); 
        this.formUser.controls['vendorGstNo'].clearValidators();  
       

      } 
      this.formUser.controls['vendorGstNo'].updateValueAndValidity(); 
    }    
    this.onPctChange()
  }


  onPctChange(){
    var totalItemAmt = 0;
    var totalCgstAmt = 0;
    var totalSgstAmt = 0;
    var totalIgstAmt = 0;
    var totalAmt = 0;
    var totItemNetAmount = 0;
    var itemAmount = 0;
    var itemRate = 0;
    var itemQty = 0;
    var totalItemAmt = 0;
    var sgstAmt = 0;
    var cgstAmt = 0;
    var igstAmt = 0;
    var netAmount = 0;
    
    var selectedDate = this.formUser.getRawValue();

    for (var i = 0; i < this.formTyreArray.controls.length; i++) {
      this.formTyreArray.controls[i].get("sgstAmt")?.setValue("");
      this.formTyreArray.controls[i].get("cgstAmt")?.setValue("");
      this.formTyreArray.controls[i].get("igstAmt")?.setValue("");


      if (selectedDate.arrayList[i].itemRate!="") {
        itemAmount= parseFloat(selectedDate.arrayList[i].itemQty) * parseFloat(selectedDate.arrayList[i].itemRate);
        this.formTyreArray.controls[i].get("itemAmount")?.setValue(itemAmount.toFixed(2));
      
        totalItemAmt = totalItemAmt+itemAmount;
        if(selectedDate.arrayList[i].sgstPct!="") {
          sgstAmt = itemAmount * parseFloat(selectedDate.arrayList[i].sgstPct)/100;
          totalSgstAmt = totalSgstAmt + sgstAmt;
          netAmount = netAmount + sgstAmt;
          this.formTyreArray.controls[i].get("sgstAmt")?.setValue(sgstAmt.toFixed(2));
        }
        if(selectedDate.arrayList[i].cgstPct!="") {
          cgstAmt = itemAmount * parseFloat(selectedDate.arrayList[i].cgstPct)/100;
          totalCgstAmt = totalCgstAmt + cgstAmt;
          netAmount = netAmount + cgstAmt;
          this.formTyreArray.controls[i].get("cgstAmt")?.setValue(cgstAmt.toFixed(2));
        }
        if(selectedDate.arrayList[i].igstPct!="") {
          igstAmt = itemAmount * parseFloat(selectedDate.arrayList[i].igstPct)/100;
          totalIgstAmt = totalIgstAmt + igstAmt;
          netAmount = netAmount + igstAmt;
          this.formTyreArray.controls[i].get("igstAmt")?.setValue(igstAmt.toFixed(2));
        }      
        netAmount = sgstAmt + cgstAmt+igstAmt+ itemAmount;  
        this.formTyreArray.controls[i].get("netAmount")?.setValue(netAmount.toFixed(2));
      
        totItemNetAmount = totItemNetAmount+ netAmount;
      }
    }  
    netAmount = totItemNetAmount ;
    if(selectedDate.roundOff!="") {
      netAmount = netAmount + parseFloat(selectedDate.roundOff);
    }
    if(selectedDate.otherAmount!="") {
      netAmount = netAmount + parseFloat(selectedDate.otherAmount);
    }
  
  
    this.formUser.patchValue({
      totItemAmount : totalItemAmt.toFixed(2),
      totCgstAmt: totalCgstAmt.toFixed(2),
      totSgstAmt: totalSgstAmt.toFixed(2),
      totIgstAmt: totalIgstAmt.toFixed(2),
      totalAmt: totalAmt.toFixed(2),
      netAmount: netAmount.toFixed(2),
      totItemNetAmount: totItemNetAmount.toFixed(2),
    });
  }  

  submitSparesPurchaseMasterForm(): void {
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + "Fields is Invalid");   
        }
      }
      return;
    }

    var selectedDataValue = this.formUser.getRawValue();

    if(selectedDataValue.nonVendor){
      if (selectedDataValue.vendorName=="") {
        this.toastrService.warning(" Please enter Vendor Name");   
        return;
      }
    }
    else{
      if (selectedDataValue.vendorId.dataId) {
        //ignore
      }
      else{
        this.toastrService.warning(" Invalid Vendor");
        return;
      }
    }
    
  this.sparespurchasemastermodel.spTransId = this.selectedSparesPurchaseMasterDetail.spTransId ;
  this.sparespurchasemastermodel.transDate= selectedDataValue.transDate;
  this.sparespurchasemastermodel.nonVendor = selectedDataValue.nonVendor?"Y":"N";
  this.sparespurchasemastermodel.vendorId= selectedDataValue.vendorId.dataId?selectedDataValue.vendorId.dataId:'';
  this.sparespurchasemastermodel.vendorInvDt= selectedDataValue.vendorInvDt;
  this.sparespurchasemastermodel.vendorInvNo= selectedDataValue.vendorInvNo;
  this.sparespurchasemastermodel.vendorName= selectedDataValue.vendorName.toString()==""?selectedDataValue.vendorId.dataName:selectedDataValue.vendorName.toString().toUpperCase();
  this.sparespurchasemastermodel.vendorAddress= selectedDataValue.vendorAddress.toString().toUpperCase(),
  this.sparespurchasemastermodel.vendorState= selectedDataValue.vendorState;
  this.sparespurchasemastermodel.vendorGstNo= selectedDataValue.vendorGstNo.toString().toUpperCase();
  this.sparespurchasemastermodel.gstType= selectedDataValue.gstType;
  this.sparespurchasemastermodel.totItemAmount= selectedDataValue.totItemAmount.toString();;
  this.sparespurchasemastermodel.totSgstAmt= selectedDataValue.totSgstAmt.toString();;
  this.sparespurchasemastermodel.totCgstAmt= selectedDataValue.totCgstAmt.toString();;
  this.sparespurchasemastermodel.totIgstAmt= selectedDataValue.totIgstAmt.toString();;
  this.sparespurchasemastermodel.totItemNetAmount= selectedDataValue.totItemNetAmount;
  this.sparespurchasemastermodel.otherAmount= selectedDataValue.otherAmount.toString();;
  this.sparespurchasemastermodel.roundOff= selectedDataValue.roundOff.toString();
  this.sparespurchasemastermodel.netAmount= selectedDataValue.netAmount.toString();;
  this.sparespurchasemastermodel.remarks= selectedDataValue.remarks;
  this.sparespurchasemastermodel.pmtType= selectedDataValue.pmtType;
  this.sparespurchasemastermodel.creditAc= selectedDataValue.creditAc;
  this.sparespurchasemastermodel.chequeDate= selectedDataValue.chequeDate;
  this.sparespurchasemastermodel.refDocAttachedImage= selectedDataValue.refDocAttachedImage;
  //
  //this.sparespurchasemastermodel.branchCode= selectedDataValue.branchCode;
  this.sparespurchasemastermodel.branchCode= this.branch ;
  this.sparespurchasemastermodel.yearID= this.year;
  this.sparespurchasemastermodel.loggedInUser=  this.loggedInUserID;

  this.sparespurchasemastermodel.sparesPurchaseDtlList = [];
    if(selectedDataValue.netAmount=="" || parseFloat(selectedDataValue.netAmount)==0 ){
      this.toastrService.warning("Total Net Amount should not be zero");
      return;
    }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].spareLubId == "" || selectedDataValue.arrayList[i].brandId=="" ) {
        this.toastrService.warning("Please Enter Spare And Brand In Detail");
        return;
      } 
      else{
        this.sparespurchasemastermodel.sparesPurchaseDtlList.push({
          'spTransDtlId': "",
          'spTransId': "",
          'transDate': selectedDataValue.transDate,
          'spareLubId': selectedDataValue.arrayList[i].spareLubId,
          'brandId': selectedDataValue.arrayList[i].brandId,
          'itemQty': selectedDataValue.arrayList[i].itemQty,
          'itemRate': selectedDataValue.arrayList[i].itemRate,
          'itemAmount': selectedDataValue.arrayList[i].itemAmount,
          'sgstPct': selectedDataValue.arrayList[i].sgstPct,
          'sgstAmt': selectedDataValue.arrayList[i].sgstAmt,
          'cgstPct': selectedDataValue.arrayList[i].sgstPct,
          'cgstAmt': selectedDataValue.arrayList[i].cgstAmt,
          'igstPct': selectedDataValue.arrayList[i].igstPct,
          'igstAmt': selectedDataValue.arrayList[i].igstAmt,
          'netAmount': selectedDataValue.arrayList[i].netAmount,
          'remarks': selectedDataValue.arrayList[i].remarks,        
        }) 
      }   
    } 
    
    if(this.sparespurchasemastermodel.sparesPurchaseDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }

    let formData = new FormData();
    this.userSubmitted = true;
    formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.sparespurchasemastermodel));  

    this.sparesPurchaseMasterService.sparesPurchaseMasterSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/sparespurchaselist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
} 


