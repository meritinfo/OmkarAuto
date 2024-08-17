import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tyrepurchasemastermodel } from 'src/app/models/tyrepurchasemastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TyrePurchaseMasterService } from 'src/app/services/tyrepurchasemaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';


@Component({
  selector: 'app-tyrepurchasemasteradd',
  templateUrl: './tyrepurchasemasteradd.component.html',
  styleUrls: ['./tyrepurchasemasteradd.component.css']
})
export class TyrepurchasemasteraddComponent {
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
  branchList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  modelList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  tyrepurchasemodel = new Tyrepurchasemastermodel();
  refDocAttachedImage: string = "";

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
 
    this.selectedTyrePurchaseMasterDetail = this.tyrePurchaseMasterService.getTyrePurchaseMasterDetails();
    this.formUser = this.formBuilder.group({
      branchCode : new FormControl(this.branch,[Validators.required]),
      purchaseDate : new FormControl(this.loginDate,[Validators.required]),
      purchaseType : new FormControl('N',[Validators.required]),
      noVendor  : new FormControl('',),
      vendorId : new FormControl('',),
      vendorName : new FormControl('',),
      vendorAddress : new FormControl('',),
      vendorGstNo : new FormControl('',[Validators.required]),
      vendorInvNo : new FormControl('',[Validators.required]),
      vendorInvDt : new FormControl('',[Validators.required]),
      tyreSacCode : new FormControl('',[Validators.required]),
      gstType : new FormControl('NA',),
      totalTyresAmt : new FormControl('',[Validators.required]),
      totalCgstAmt : new FormControl('',),
      totalSgstAmt : new FormControl('',),
      totalIgstAmt : new FormControl('',),
      totalAmt : new FormControl('',[Validators.required]),
      roundOff : new FormControl('',),
      netAmount : new FormControl('',[Validators.required]),
      remarks : new FormControl('',),
      pmtType : new FormControl('M',[Validators.required]),
      neftPmt : new FormControl('',[Validators.required]),
      creditAc : new FormControl('',),
      chequeNo : new FormControl('',),
      chequeDate : new FormControl('',),

      arrayList: this.formBuilder.array([this.createTyreArray()]),
    });
    
    this.getBrandList();
    this.getVendorList();
    this.getBranchList();
    this.getModelList();
    this.getCreditAcList('M');

    this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
    this.formTyreArray.controls[0].get("cgstAmt")?.disable();  
    this.formTyreArray.controls[0].get("igstAmt")?.disable();  
    this.formTyreArray.controls[0].get("sgstPct")?.disable();   
    this.formTyreArray.controls[0].get("cgstPct")?.disable();  
    this.formTyreArray.controls[0].get("igstPct")?.disable();   
    this.formTyreArray.controls[0].get("netTyreAmount")?.disable();  

    this.formUser.controls["totalTyresAmt"].disable();
    this.formUser.controls["totalCgstAmt"].disable();
    this.formUser.controls["totalSgstAmt"].disable();
    this.formUser.controls["totalIgstAmt"].disable();
    this.formUser.controls["totalAmt"].disable();
    this.formUser.controls["netAmount"].disable();
    this.formUser.controls['vendorName'].disable(); 
    this.formUser.controls["branchCode"].disable();

    if (this.selectedTyrePurchaseMasterDetail.purchaseMasterID  != '') {
      setTimeout(() => {
        this.refDocAttachedImage = Constants.UploadFolderPath + 'tyrePurchase/refDocAttachedImage/' + this.selectedTyrePurchaseMasterDetail.refDocAttachedImage;
        this.formUser.patchValue(this.selectedTyrePurchaseMasterDetail);
        this.formUser.patchValue({
          purchaseDate: this.commonService.formatDate(this.selectedTyrePurchaseMasterDetail.purchaseDate),
          chequeDate: this.commonService.formatDate(this.selectedTyrePurchaseMasterDetail.chequeDate),
          vendorInvDt: this.commonService.formatDate(this.selectedTyrePurchaseMasterDetail.vendorInvDt),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedTyrePurchaseMasterDetail.vendorId),
        })        
        this.formUser.patchValue({
          neftPmt: "",
        })
        if (this.selectedTyrePurchaseMasterDetail.pmtType == 'B'){
          this.formUser.controls['neftPmt'].enable();
          if (this.selectedTyrePurchaseMasterDetail.neftPmt=='N'){
            this.formUser.controls['chequeNo'].setValidators([Validators.required]);
            this.formUser.controls['chequeDate'].setValidators([Validators.required]);  
            this.formUser.controls['chequeNo'].enable();      
            this.formUser.controls['chequeDate'].enable(); 
          }
          else {
            this.formUser.controls['chequeNo'].clearValidators();      
            this.formUser.controls['chequeDate'].clearValidators(); 
            this.formUser.controls['chequeNo'].disable();      
            this.formUser.controls['chequeDate'].disable(); 
            this.formUser.patchValue({
              neftPmt: "Y",
            })
          }
        }
        else {
          this.formUser.controls['neftPmt'].disable();
          this.formUser.controls['chequeNo'].disable();
          this.formUser.controls['chequeDate'].disable();
          this.formUser.controls['chequeNo'].clearValidators();      
          this.formUser.controls['chequeDate'].clearValidators(); 
        }               
        
        this.formUser.controls['chequeNo'].updateValueAndValidity();
        this.formUser.controls['chequeDate'].updateValueAndValidity(); 

        if (this.selectedTyrePurchaseMasterDetail.noVendor=='Y'){     
          this.formUser.controls['vendorId'].disable();   
          this.formUser.controls['vendorName'].enable(); 
          this.formUser.patchValue({
            vendorId: "",
            noVendor: "Y",
          })
        }
        else {          
          this.formUser.controls['vendorId'].enable(); 
          this.formUser.controls['vendorName'].disable(); 
          this.formUser.patchValue({
            noVendor: "",
          })
        }   
        this.getTyrePurchaseMasterInnerGridList();
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

  createTyreArray() {
    return this.formBuilder.group({
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
    });
  }

  getBrandList(): void {
    this.commonService.getBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }
  getModelList(): void {
    this.commonService.getModelList().subscribe((res) => {
      this.modelList = res;
    });
  }
  getVendorList(): void {
    this.commonService.getVendorList().subscribe((res) => {
      this.vendorList = res;
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
        noVendor: "Y",
        vendorName:"",
      })
    }
    else {          
      this.formUser.controls['vendorId'].enable(); 
      this.formUser.controls['vendorName'].disable(); 
      this.formUser.patchValue({
        vendorId: "",
        noVendor: "",
        vendorName:"",
      })
    }
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

  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
      this.formUser.patchValue({
        creditAc: this.creditAcList[0].dataId ,
      });
    });
    if (pmttp == 'B'){
      this.formUser.controls['neftPmt'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDate'].enable();
    }
    else {
      this.formUser.controls['neftPmt'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDate'].disable();
    }
  }

  onNeftChk(e:any){
    if(e.target.checked){
      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDate'].clearValidators(); 
      this.formUser.controls['chequeNo'].disable();      
      this.formUser.controls['chequeDate'].disable(); 
    }
    else{      
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDate'].setValidators([Validators.required]);  
      this.formUser.controls['chequeNo'].enable();      
      this.formUser.controls['chequeDate'].enable(); 
    }
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();    
  }
    
  getTyrePurchaseMasterInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTyrePurchaseMasterDetail.purchaseMasterID; 
    this.tyrePurchaseMasterService.getTyrePurchaseMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.tyrepurchasemodel = res;
      for (var i = 0; i < res.tyrePurchaseDtlList.length; i++) {
        this.formTyreArray.push(this.createTyreArray());
        this.formTyreArray.controls[i].get("brandID")?.setValue(res.tyrePurchaseDtlList[i].brandID);
        this.formTyreArray.controls[i].get("tyreNo")?.setValue(res.tyrePurchaseDtlList[i].tyreNo);  
        this.formTyreArray.controls[i].get("tyrePattern")?.setValue(res.tyrePurchaseDtlList[i].tyrePattern); 
        this.formTyreArray.controls[i].get("tyreModel")?.setValue(res.tyrePurchaseDtlList[i].tyreModel);  
        this.formTyreArray.controls[i].get("tyreAmount")?.setValue(res.tyrePurchaseDtlList[i].tyreAmount);   
        this.formTyreArray.controls[i].get("sgstPct")?.setValue(res.tyrePurchaseDtlList[i].sgstPct);  
        this.formTyreArray.controls[i].get("sgstAmt")?.setValue(res.tyrePurchaseDtlList[i].sgstAmt);    
        this.formTyreArray.controls[i].get("cgstPct")?.setValue(res.tyrePurchaseDtlList[i].cgstPct);  
        this.formTyreArray.controls[i].get("cgstAmt")?.setValue(res.tyrePurchaseDtlList[i].cgstAmt);   
        this.formTyreArray.controls[i].get("igstPct")?.setValue(res.tyrePurchaseDtlList[i].igstPct);  
        this.formTyreArray.controls[i].get("igstAmt")?.setValue(res.tyrePurchaseDtlList[i].igstAmt);  
        this.formTyreArray.controls[i].get("netTyreAmount")?.setValue(res.tyrePurchaseDtlList[i].netTyreAmount);  
        this.formTyreArray.controls[i].get("estLifeKM")?.setValue(res.tyrePurchaseDtlList[i].estLifeKM);  
      
        this.formTyreArray.controls[i].get("sgstAmt")?.disable();   
        this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
        this.formTyreArray.controls[i].get("igstAmt")?.disable();  

        if (this.selectedTyrePurchaseMasterDetail.gstType == "I") {   
          this.formTyreArray.controls[i].get("sgstPct")?.disable();   
          this.formTyreArray.controls[i].get("cgstPct")?.disable();  
          this.formTyreArray.controls[i].get("igstPct")?.enable();  
        }    
        else if (this.selectedTyrePurchaseMasterDetail.gstType == "S" || this.selectedTyrePurchaseMasterDetail.gstType == "C")  {      
          this.formTyreArray.controls[i].get("sgstPct")?.enable();   
          this.formTyreArray.controls[i].get("cgstPct")?.enable();  
          this.formTyreArray.controls[i].get("igstPct")?.disable();  
        }
        else{              
          this.formTyreArray.controls[i].get("sgstPct")?.disable();   
          this.formTyreArray.controls[i].get("cgstPct")?.disable();  
          this.formTyreArray.controls[i].get("igstPct")?.disable();  
        } 
        this.formTyreArray.controls[i].get("netTyreAmount")?.disable();          
      }     
    });
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

      if (gsttype == "I") {   
        this.formTyreArray.controls[i].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i].get("igstPct")?.enable();  
      }    
      else if (gsttype == "S" || gsttype == "C")  {      
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
    this.onPctChange()
  }


  onPctChange(){
    var totalTyresAmt = 0;
    var totalCgstAmt = 0;
    var totalSgstAmt = 0;
    var totalIgstAmt = 0;
    var totalAmt = 0;
    var netAmount = 0;
    var tyreAmount = 0;
    var sgstAmt = 0;
    var cgstAmt = 0;
    var igstAmt = 0;
    var netTyreAmount = 0;
    
    var selectedDate = this.formUser.getRawValue();

    for (var i = 0; i < this.formTyreArray.controls.length; i++) {
      this.formTyreArray.controls[i].get("sgstAmt")?.setValue("");
      this.formTyreArray.controls[i].get("cgstAmt")?.setValue("");
      this.formTyreArray.controls[i].get("igstAmt")?.setValue("");
      if (selectedDate.arrayList[i].tyreAmount!="") {
        tyreAmount = parseFloat(selectedDate.arrayList[i].tyreAmount);
        netTyreAmount = tyreAmount;
        if(selectedDate.arrayList[i].sgstPct!="") {
          sgstAmt = tyreAmount * parseFloat(selectedDate.arrayList[i].sgstPct)/100;
          totalSgstAmt = totalSgstAmt + sgstAmt;
          netTyreAmount = netTyreAmount + sgstAmt;
          this.formTyreArray.controls[i].get("sgstAmt")?.setValue(sgstAmt.toFixed(2));
        }
        if(selectedDate.arrayList[i].cgstPct!="") {
          cgstAmt = tyreAmount * parseFloat(selectedDate.arrayList[i].cgstPct)/100;
          totalCgstAmt = totalCgstAmt + cgstAmt;
          netTyreAmount = netTyreAmount + cgstAmt;
          this.formTyreArray.controls[i].get("cgstAmt")?.setValue(cgstAmt.toFixed(2));
        }
        if(selectedDate.arrayList[i].igstPct!="") {
          igstAmt = tyreAmount * parseFloat(selectedDate.arrayList[i].igstPct)/100;
          totalIgstAmt = totalIgstAmt + igstAmt;
          netTyreAmount = netTyreAmount + igstAmt;
          this.formTyreArray.controls[i].get("igstAmt")?.setValue(igstAmt.toFixed(2));
        }        
        this.formTyreArray.controls[i].get("netTyreAmount")?.setValue(netTyreAmount.toFixed(2));
        totalTyresAmt = totalTyresAmt +  tyreAmount;
        totalAmt = totalAmt + netTyreAmount;
      }
    }  
    netAmount = totalAmt ;
    if(selectedDate.roundOff!="") {
      netAmount = netAmount + parseFloat(selectedDate.roundOff);
    }
   
    this.formUser.patchValue({
      totalTyresAmt : totalTyresAmt.toFixed(2),
      totalCgstAmt: totalCgstAmt.toFixed(2),
      totalSgstAmt: totalSgstAmt.toFixed(2),
      totalIgstAmt: totalIgstAmt.toFixed(2),
      totalAmt: totalAmt.toFixed(2),
      netAmount: netAmount.toFixed(2),
    });
  }  

  addItem(i: number): void {    
    var selectedDate = this.formUser.getRawValue();
    if (this.formTyreArray.value[i].brandID != "" && this.formTyreArray.value[i].tyreAmount!="" ) {
      this.formTyreArray.push(this.createTyreArray());
      
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
      this.formTyreArray.controls[i+1].get("netTyreAmount")?.disable();     
    } 
    else {
      this.toastrService.warning("Please Enter Tyre Details");
    }
  }
  
  removeItem(index: number) {
    this.formTyreArray.removeAt(index);  
  }  

  chkTyreNoDuplicate(j: number,e: any){
    var tyreno= e.target.value;    
    var selectedDate = this.formUser.getRawValue();

    for (var i = 0; i < this.formTyreArray.controls.length; i++) {
      if(j!=i && tyreno == selectedDate.arrayList[i].tyreNo ){
        this.toastrService.warning("Tyre No already exists in grid");           
        this.formTyreArray.controls[j].get("tyreNo")?.setValue("");
        return;
      }        
    }
    this.requestmodel.strRequest = tyreno;
    this.tyrePurchaseMasterService.chkTyreNoDuplicate(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else {
        this.toastrService.warning(this.responseDetails.message);        
        this.formTyreArray.controls[j].get("tyreNo")?.setValue("");
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
    
  exit(): void {
    this.route.navigate(['/tyrepurchaselist']);
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

    if(selectedDataValue.noVendor){
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
    this.tyrepurchasemastermodel.purchaseMasterID = this.selectedTyrePurchaseMasterDetail.purchaseMasterID ;
    this.tyrepurchasemastermodel.branchCode= selectedDataValue.branchCode.toString();
    this.tyrepurchasemastermodel.purchaseDate = selectedDataValue.purchaseDate;
    this.tyrepurchasemastermodel.purchaseType = selectedDataValue.purchaseType;
    this.tyrepurchasemastermodel.noVendor = selectedDataValue.noVendor?"Y":"N";
    this.tyrepurchasemastermodel.vendorId = selectedDataValue.vendorId?selectedDataValue.vendorId.dataId:"";
    this.tyrepurchasemastermodel.vendorName = selectedDataValue.vendorName.toString()==""?selectedDataValue.vendorId.dataName:selectedDataValue.vendorName.toString().toUpperCase();
    this.tyrepurchasemastermodel.vendorAddress = selectedDataValue.vendorAddress?selectedDataValue.vendorAddress.toString().toUpperCase():"";
    this.tyrepurchasemastermodel.vendorGstNo = selectedDataValue.vendorGstNo.toString().toUpperCase();
    this.tyrepurchasemastermodel.vendorInvNo = selectedDataValue.vendorInvNo.toString().toUpperCase();
    this.tyrepurchasemastermodel.vendorInvDt = selectedDataValue.vendorInvDt;  
    this.tyrepurchasemastermodel.tyreSacCode = selectedDataValue.tyreSacCode.toString().toUpperCase();
    this.tyrepurchasemastermodel.gstType = selectedDataValue.gstType.toString().toUpperCase();
    this.tyrepurchasemastermodel.totalTyresAmt = selectedDataValue.totalTyresAmt.toString();
    this.tyrepurchasemastermodel.totalSgstAmt = selectedDataValue.totalSgstAmt.toString();
    this.tyrepurchasemastermodel.totalCgstAmt = selectedDataValue.totalCgstAmt.toString();
    this.tyrepurchasemastermodel.totalIgstAmt = selectedDataValue.totalIgstAmt.toString();
    this.tyrepurchasemastermodel.totalAmt = selectedDataValue.totalAmt.toString();
    this.tyrepurchasemastermodel.roundOff = selectedDataValue.roundOff.toString();
    this.tyrepurchasemastermodel.netAmount = selectedDataValue.netAmount.toString();
    this.tyrepurchasemastermodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.tyrepurchasemastermodel.pmtType = selectedDataValue.pmtType.toString();
    this.tyrepurchasemastermodel.neftPmt = selectedDataValue.neftPmt?"Y":"N";
    this.tyrepurchasemastermodel.creditAc = selectedDataValue.creditAc.toString();
    this.tyrepurchasemastermodel.chequeNo = selectedDataValue.chequeNo.toString();
    this.tyrepurchasemastermodel.chequeDate = selectedDataValue.chequeDate;
    this.tyrepurchasemastermodel.yearID = this.year;
    this.tyrepurchasemastermodel.loggedInUser = this.loggedInUserID;
    this.tyrepurchasemastermodel.tyrePurchaseDtlList = [];

    if(selectedDataValue.netAmount=="" || parseFloat(selectedDataValue.netAmount)==0 ){
      this.toastrService.warning("Total Net Amount should not be zero");
      return;
    }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].brandID == "" || selectedDataValue.arrayList[i].tyreAmount=="" ) {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        this.tyrepurchasemastermodel.tyrePurchaseDtlList.push({
          'tyreId': "",
          'purchaseMasterID': "",
          'purchaseDate': selectedDataValue.purchaseDate,
          'brandID': selectedDataValue.arrayList[i].brandID,
          'tyreNo': selectedDataValue.arrayList[i].tyreNo,
          'tyrePattern': selectedDataValue.arrayList[i].tyrePattern,
          'tyreModel': selectedDataValue.arrayList[i].tyreModel,
          'tyreAmount': selectedDataValue.arrayList[i].tyreAmount.toString(),
          'sgstPct': selectedDataValue.arrayList[i].sgstPct.toString(),
          'sgstAmt': selectedDataValue.arrayList[i].sgstAmt.toString(),
          'cgstAmt': selectedDataValue.arrayList[i].cgstAmt.toString(),
          'cgstPct': selectedDataValue.arrayList[i].cgstPct.toString(),
          'igstPct': selectedDataValue.arrayList[i].igstPct.toString(),
          'igstAmt': selectedDataValue.arrayList[i].igstAmt.toString(),
          'netTyreAmount': selectedDataValue.arrayList[i].netTyreAmount.toString(),
          'estLifeKM': selectedDataValue.arrayList[i].estLifeKM.toString(),
        }) 
      }   
    } 
    
    if(this.tyrepurchasemastermodel.tyrePurchaseDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }

    let formData = new FormData();
    formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.tyrepurchasemastermodel));  
  
    this.tyrePurchaseMasterService.tyrePurchaseMasterSubmitted(formData).subscribe((res: Responsemodel) => {
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