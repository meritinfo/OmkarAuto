import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Tyreregrouprecdmastermodel } from 'src/app/models/tyreregrouprecdmastermodel';
import { TyreregrouprecdService } from 'src/app/services/tyreregrouprecd.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-tyreregrouprecdadd',
  templateUrl: './tyreregrouprecdadd.component.html',
  styleUrls: ['./tyreregrouprecdadd.component.css']
})

export class TyreregrouprecdaddComponent {
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
  showGrid= false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  tyreregrouprecdmodel = new Tyreregrouprecdmastermodel();
  attatchFile: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedTyreregrouprecdMasterDetail = new Tyreregrouprecdmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyreregrouprecdmastermodel: Tyreregrouprecdmastermodel, 
    private tyreregrouprecdService: TyreregrouprecdService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.tyreregrouprecdmastermodel = new Tyreregrouprecdmastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Receive from Rethread");
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
 
    this.selectedTyreregrouprecdMasterDetail = this.tyreregrouprecdService.getTyreregrouprecdMasterDetails();
    this.formUser = this.formBuilder.group({
      branchCode : new FormControl(this.branch,[Validators.required]),
      recdDate : new FormControl(this.loginDate,[Validators.required]),
      vendorId : new FormControl('',),
      vendorBillNo : new FormControl('',),
      vendorBillDt : new FormControl(this.loginDate,[Validators.required]),
      totalAmt : new FormControl('',[Validators.required]),
      cgstPct: new FormControl('',),
      cgstAmt : new FormControl('',),
      sgstPct: new FormControl('',),
      sgstAmt : new FormControl('',),
      igstPct: new FormControl('',),
      igstAmt : new FormControl('',),
      otherAmt : new FormControl('',),
      roundOffAmt : new FormControl('',),
      netBillAmt : new FormControl('',[Validators.required]),
      remarks : new FormControl('',),
      pmtType : new FormControl('M',[Validators.required]),
      creditAc : new FormControl('',),
      chequeNo : new FormControl('',),
      chequeDt : new FormControl('',),

      arrayList: this.formBuilder.array([this.createTyreArray()]),
    });
    
    this.getBrandList();
    this.getVendorList();
    this.getBranchList();
    this.getCreditAcList('M');

    this.formUser.controls["totalAmt"].disable();
    this.formUser.controls["sgstAmt"].disable();   
    this.formUser.controls["cgstAmt"].disable();  
    this.formUser.controls["igstAmt"].disable();  
    this.formUser.controls["netBillAmt"]?.disable();  
    this.formUser.controls["branchCode"].disable();

    if (this.selectedTyreregrouprecdMasterDetail.regroupRecdMasterID  != '') {
      setTimeout(() => {
        this.attachmentInput = Constants.UploadFolderPath + 'tyreRegroupRecd/attatchFile/' + this.selectedTyreregrouprecdMasterDetail.attatchFile;
        this.formUser.patchValue(this.selectedTyreregrouprecdMasterDetail);
        this.formUser.patchValue({
          recdDate: this.commonService.formatDate(this.selectedTyreregrouprecdMasterDetail.recdDate),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedTyreregrouprecdMasterDetail.vendorId),
          vendorBillDt: this.commonService.formatDate(this.selectedTyreregrouprecdMasterDetail.vendorBillDt),
          chequeDt: this.commonService.formatDate(this.selectedTyreregrouprecdMasterDetail.chequeDt),
        })        
       
        this.getTyreRegroupRecdInnerGridList();
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
      selected:[''],
      regroupIssueDtlId: [''],
      brandId: [''],
      tyreId: [''],
      regroupDoneYN: ['Y'],
      regroupAmount: ['0'],
      remarks: [''],
    });
  }

  getBrandList(): void {
    this.commonService.getTyreBrandList().subscribe((res) => {
      this.brandList = res;
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

  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.formUser.patchValue({
      chequeNo: "",
      chequeDt: this.loginDate,
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
  }
    
  getTyreRegroupRecdInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTyreregrouprecdMasterDetail.regroupRecdMasterID; 
    this.tyreregrouprecdService.getTyreregrouprecdMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.tyreregrouprecdmodel = res;
      for (var i = 0; i < res.tyreRegroupRecdDtlList.length; i++) {
        this.formTyreArray.push(this.createTyreArray());
        this.formTyreArray.controls[i].get("regroupIssueDtlId")?.setValue(res.tyreRegroupRecdDtlList[i].regroupIssueDtlId);
        this.formTyreArray.controls[i].get("brandId")?.setValue(res.tyreRegroupRecdDtlList[i].brandId);
        this.formTyreArray.controls[i].get("tyreId")?.setValue(res.tyreRegroupRecdDtlList[i].tyreId);  
        this.formTyreArray.controls[i].get("regroupDoneYN")?.setValue(res.tyreRegroupRecdDtlList[i].regroupDoneYN); 
        this.formTyreArray.controls[i].get("regroupAmount")?.setValue(res.tyreRegroupRecdDtlList[i].regroupAmount);  
        this.formTyreArray.controls[i].get("remarks")?.setValue(res.tyreRegroupRecdDtlList[i].remarks); 
        this.formTyreArray.controls[i].get("selected")?.setValue('Y'); 
      }     
    });
  }

  searchStatement(): void { 
    var selectedDataVal=this.formUser.getRawValue();
    if (!selectedDataVal.vendorId.dataId) {
      this.toastrService.warning(" Please Select Vendor");  
      return; 
    }   
    else{
      this.formUser.controls["vendorId"].disable();
      this.requestmodel.strRequest = selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
      this.tyreregrouprecdService.getTyreregrouprecdMasterSearchList(this.requestmodel).subscribe((res) => {
        this.formTyreArray.clear();
        this.tyreregrouprecdmodel = res;
        this.showGrid = true;
        for (var i = 0; i < res.tyreRegroupRecdDtlList.length; i++) {
          this.formTyreArray.push(this.createTyreArray());
          this.formTyreArray.controls[i].get("regroupIssueDtlId")?.setValue(res.tyreRegroupRecdDtlList[i].regroupIssueDtlId);
          this.formTyreArray.controls[i].get("brandId")?.setValue(res.tyreRegroupRecdDtlList[i].brandId);
          this.formTyreArray.controls[i].get("tyreId")?.setValue(res.tyreRegroupRecdDtlList[i].tyreId);  
          this.formTyreArray.controls[i].get("regroupAmount")?.setValue("0");  
        }     
      });
    } 
  }

  onCheked(i:number,e:any){
    if(e.target.checked){
      this.formTyreArray.controls[i].get("regroupAmount")?.enable();
    }
    else{
      this.formTyreArray.controls[i].get("regroupAmount")?.disable();
    }
  }

  onRegroupAmt(){ 
    var totalAmt = 0;   
    var selectedDataValue = this.formUser.getRawValue();
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].selected) {
        if(selectedDataValue.arrayList[i].regroupAmount!=''){
          totalAmt = totalAmt + parseFloat(selectedDataValue.arrayList[i].regroupAmount);
        }
      }   
    } 
    this.formUser.patchValue({
      totalAmt : totalAmt.toFixed(2),
    });
    this.onPctChange();
  }

  onPctChange(){
    var totalAmt = 0;
    var sgstAmt = 0;
    var cgstAmt = 0;
    var igstAmt = 0;
    var netBillAmt = 0;    
    
    var selectedDataValue = this.formUser.getRawValue();
    
    if(selectedDataValue.totalAmt!="") {
      totalAmt = parseFloat(selectedDataValue.totalAmt);
      if(selectedDataValue.sgstPct!="") {
        sgstAmt = totalAmt * parseFloat(selectedDataValue.sgstPct)/100;
      }
      if(selectedDataValue.cgstPct!="") {
        cgstAmt = totalAmt * parseFloat(selectedDataValue.cgstPct)/100;
      }
      if(selectedDataValue.igstPct!="") {
        igstAmt = totalAmt * parseFloat(selectedDataValue.igstPct)/100;
      }
      netBillAmt = totalAmt + sgstAmt + cgstAmt + igstAmt;
    }
    if(selectedDataValue.otherAmt!="") {
      netBillAmt = netBillAmt + parseFloat(selectedDataValue.otherAmt);
    }
    if(selectedDataValue.roundOffAmt!="") {
      netBillAmt = netBillAmt + parseFloat(selectedDataValue.roundOffAmt);
    }
   
    this.formUser.patchValue({
      sgstAmt: sgstAmt.toFixed(2),
      cgstAmt: cgstAmt.toFixed(2),
      igstAmt: igstAmt.toFixed(2),
      netBillAmt: netBillAmt.toFixed(2),
    });
  }  
    
  tyreMasterDelete(): void {
    if(this.selectedTyreregrouprecdMasterDetail.regroupRecdMasterID  != '' ){
     this.requestmodel.strRequest =this.selectedTyreregrouprecdMasterDetail.regroupRecdMasterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.tyreregrouprecdService.tyreregrouprecdMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
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
    
  submitTyreMasterForm(): void {
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

    if (selectedDataValue.vendorId.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Invalid Vendor");
      return;
    }   

    this.tyreregrouprecdmodel.regroupRecdMasterID = this.selectedTyreregrouprecdMasterDetail.regroupRecdMasterID ;
    this.tyreregrouprecdmodel.branchCode= selectedDataValue.branchCode.toString();
    this.tyreregrouprecdmodel.recdDate = selectedDataValue.purchaseDate;
    this.tyreregrouprecdmodel.vendorId = selectedDataValue.vendorId?selectedDataValue.vendorId.dataId:"";
    this.tyreregrouprecdmodel.vendorBillNo = selectedDataValue.vendorBillNo.toString().toUpperCase();
    this.tyreregrouprecdmodel.vendorBillDt = selectedDataValue.vendorBillDt;  
    this.tyreregrouprecdmodel.totalAmt = selectedDataValue.totalAmt.toString();
    this.tyreregrouprecdmodel.sgstPct = selectedDataValue.sgstPct.toString();
    this.tyreregrouprecdmodel.sgstAmt = selectedDataValue.sgstAmt.toString();
    this.tyreregrouprecdmodel.cgstPct = selectedDataValue.cgstPct.toString();
    this.tyreregrouprecdmodel.cgstAmt = selectedDataValue.cgstAmt.toString();
    this.tyreregrouprecdmodel.igstPct = selectedDataValue.igstPct.toString();
    this.tyreregrouprecdmodel.igstAmt = selectedDataValue.igstAmt.toString();
    this.tyreregrouprecdmodel.otherAmt = selectedDataValue.otherAmt.toString();
    this.tyreregrouprecdmodel.roundOffAmt = selectedDataValue.roundOffAmt.toString();
    this.tyreregrouprecdmodel.netBillAmt = selectedDataValue.netBillAmt.toString();
    this.tyreregrouprecdmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.tyreregrouprecdmodel.pmtType = selectedDataValue.pmtType.toString();
    this.tyreregrouprecdmodel.creditAc = selectedDataValue.creditAc.toString();
    this.tyreregrouprecdmodel.chequeNo = selectedDataValue.chequeNo.toString();
    this.tyreregrouprecdmodel.chequeDt = selectedDataValue.chequeDate?selectedDataValue.chequeDate:'';
    this.tyreregrouprecdmodel.yearID = this.year;
    this.tyreregrouprecdmodel.loggedInUser = this.loggedInUserID;
    this.tyreregrouprecdmodel.tyreRegroupRecdDtlList = [];

    if(selectedDataValue.netBillAmt=="" || parseFloat(selectedDataValue.netBillAmt)==0 ){
      this.toastrService.warning("Net Bill Amount should not be zero");
      return;
    }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].selected) {
        this.tyreregrouprecdmodel.tyreRegroupRecdDtlList.push({
          'regroupRecdMasterID': "",
          'brandId':  selectedDataValue.arrayList[i].brandId,
          'tyreId': selectedDataValue.arrayList[i].tyreId,
          'regroupDoneYN':selectedDataValue.arrayList[i].regroupDoneYN,
          'regroupAmount': selectedDataValue.arrayList[i].regroupAmount.toString(),
          'remarks': selectedDataValue.arrayList[i].remarks.toString().toUpperCase(),
          'regroupIssueDtlId': selectedDataValue.arrayList[i].regroupIssueDtlId.toString(),
        }) 
      }   
    } 

    if(this.tyreregrouprecdmodel.tyreRegroupRecdDtlList.length == 0){
      this.toastrService.warning("Please Select atleast one Record in Details");
      return;
    }

    let formData = new FormData();
    formData.append('attatchFile', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.tyreregrouprecdmodel));  
  
    this.tyreregrouprecdService.tyreregrouprecdMasterSubmitted(formData).subscribe((res: Responsemodel) => {
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