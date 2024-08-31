import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Tyresalesmastermodel } from 'src/app/models/tyresalesmastermodel';
import { TyresalesService } from 'src/app/services/tyresales.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';

import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-tyresalesadd',
  templateUrl: './tyresalesadd.component.html',
  styleUrls: ['./tyresalesadd.component.css']
})

export class TyresalesaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  customerid = '';
  minDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  editMode= false;
  userSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];  
  brandList: Dropdownmodel[] = [];
  customerList: Dropdownmodel[] = [];
  tyreList: Dropdownmodel[] = [];
  tyresalesmastermodel = new Tyresalesmastermodel();

  selectedTyresalesDetail = new Tyresalesmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyresalesService: TyresalesService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Sales/Disposal of Tyres");
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
 
    this.selectedTyresalesDetail = this.tyresalesService.getTyresalesMasterDetails();
    this.formUser = this.formBuilder.group({
      branchCode : new FormControl(this.branch,[Validators.required]),
      transDate : new FormControl(this.loginDate,[Validators.required]),
      saleIncharge : new FormControl('',),
      nonCustomer : new FormControl('',),
      customerId  : new FormControl('',),
      customerName : new FormControl('',),  
      customerAdd : new FormControl('',),  
      customerGstNo: new FormControl('',),  
      pmtType: new FormControl('',),  
      gstType : new FormControl('',),  
      tyreAmount: new FormControl('',[Validators.required]),
      sgstPct : new FormControl('',),  
      sgstAmt : new FormControl('',),  
      cgstPct : new FormControl('',),  
      cgstAmt: new FormControl('',),  
      igstPct : new FormControl('',),  
      igstAmt : new FormControl('',),  
      totalAmount: new FormControl('',[Validators.required]),
      roundOff: new FormControl('',),  
      netAmount : new FormControl('',[Validators.required]),
      remarks : new FormControl('',),  
      approvedYN: new FormControl('',),  
      arrayList: this.formBuilder.array([this.createTyreArray()]),
    });
    
    this.getBrandList();
    this.getBranchList();
    this.getCustomerList();

    this.formUser.controls["tyreAmount"].disable();
    this.formUser.controls["sgstAmt"].disable();   
    this.formUser.controls["cgstAmt"].disable();  
    this.formUser.controls["igstAmt"].disable();  
    this.formUser.controls["totalAmount"]?.disable(); 
    this.formUser.controls["netAmount"]?.disable();  
    this.formUser.controls["branchCode"].disable();
    this.formUser.controls['customerName'].disable(); 

    if (this.selectedTyresalesDetail.masterID  != '') {
      setTimeout(() => {
        this.formUser.patchValue(this.selectedTyresalesDetail);
        this.formUser.patchValue({
          transDate: this.commonService.formatDate(this.selectedTyresalesDetail.transDate),
          customerId: this.customerList.find(e => e.dataId == this.selectedTyresalesDetail.customerId),
          nonCustomer:""
        })   
        if(this.selectedTyresalesDetail.nonCustomer=="Y"){
          this.formUser.patchValue({
            nonCustomer:"Y"
          })   
        }
        this.getSalesInnerGridList();
        this.editMode =true;
      }, 2000);  
    }
  }

  get f() { return this.formUser.controls; }

  get formTyreArray() {
    return this.formUser.get("arrayList") as FormArray;    
  }

  selectEvent(item: any) {
    this.getCustomerDetails(item.dataId);
//this.customerid =item.dataId;
//this.getCustomerDetails();
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  createTyreArray() {
    return this.formBuilder.group({
      brandId: [''],
      tyreId: [''],
      tyreAmt: [''],
      remarks: [''],
    });
  }

  getBrandList(): void {
    this.commonService.getBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }
  
  getCustomerList(): void {
    this.commonService.getCustomerList().subscribe((res) => {
      this.customerList = res;
    });
  }  

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  getCustomerDetails(e: any): void {
   

    this.requestmodel.strRequest = e;

    this.commonService.getCustomerDetails( this.requestmodel).subscribe((res) => {
      this.tyresalesmastermodel = res;
      this.formUser.patchValue({
       // customerId: "",
        customerName: this.tyresalesmastermodel.customerName,
        customerAdd: this.tyresalesmastermodel.customerAdd,
       // customerGstNo:""
      })
    });
  }

  onnonCustomer(e: any) {
    this.formUser.patchValue({
      customerId: "",
      customerName:"",
      customerAdd:"",
      customerGstNo:""
    })

    if (e.target.checked){     
      this.formUser.controls['customerId'].disable(); 
      this.formUser.controls['customerName'].enable();       
    }
    else {          
      this.formUser.controls['customerId'].enable(); 
      this.formUser.controls['customerName'].disable(); 
    }
  }

  changeGstType(e: any) {
    console.log(e.target.value);
    var gsttype = e.target.value;   
    this.formUser.patchValue({
      sgstPct:"0",
      cgstPct:"0",
      igstPct:"0",
      sgstAmt:"0",
      cgstAmt:"0",
      igstAmt:"0",
    }) 

    if (gsttype == "I") {   
      this.formUser.controls['sgstPct'].disable();  
      this.formUser.controls['cgstPct'].disable(); 
      this.formUser.controls['igstPct'].enable();  
    }    
    else if (gsttype == "S" || gsttype == "C")  {   
      this.formUser.controls['sgstPct'].enable();  
      this.formUser.controls['cgstPct'].enable(); 
      this.formUser.controls['igstPct'].disable();  
    }
    else{    
      this.formUser.controls['sgstPct'].disable();  
      this.formUser.controls['cgstPct'].disable(); 
      this.formUser.controls['igstPct'].disable();   
    } 
  }
  
  calAmt(){ 
    var tyreAmount = 0;   
    var selectedDataValue = this.formUser.getRawValue();
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(selectedDataValue.arrayList[i].tyreAmt!=''){
        tyreAmount = tyreAmount + parseFloat(selectedDataValue.arrayList[i].tyreAmt);
      }
    }   
    this.formUser.patchValue({
      tyreAmount : tyreAmount.toFixed(2),
    });
    this.onPctChange();
  }

  onPctChange(){
    var tyreAmount = 0;
    var sgstAmt = 0;
    var cgstAmt = 0;
    var igstAmt = 0;
    var totalAmount = 0;    
    var netAmount = 0;    
    
    var selectedDataValue = this.formUser.getRawValue();
    
    if(selectedDataValue.tyreAmount!="") {
      tyreAmount = parseFloat(selectedDataValue.tyreAmount);
      if(selectedDataValue.sgstPct!="") {
        sgstAmt = tyreAmount * parseFloat(selectedDataValue.sgstPct)/100;
      }
      if(selectedDataValue.cgstPct!="") {
        cgstAmt = tyreAmount * parseFloat(selectedDataValue.cgstPct)/100;
      }
      if(selectedDataValue.igstPct!="") {
        igstAmt = tyreAmount * parseFloat(selectedDataValue.igstPct)/100;
      }
      totalAmount = tyreAmount + sgstAmt + cgstAmt + igstAmt;
    }
    if(selectedDataValue.roundOff!="") {
      netAmount = totalAmount + parseFloat(selectedDataValue.roundOff);
    }
   
    this.formUser.patchValue({
      sgstAmt: sgstAmt.toFixed(2),
      cgstAmt: cgstAmt.toFixed(2),
      igstAmt: igstAmt.toFixed(2),
      totalAmount :totalAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
    });
  }  

  getSalesInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTyresalesDetail.masterID; 
    this.tyresalesService.getTyresalesMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.tyresalesmastermodel = res;
      for (var i = 0; i < res.tyreSalesDtlList.length; i++) {
        this.formTyreArray.push(this.createTyreArray());
        this.formTyreArray.controls[i].get("brandId")?.setValue(res.tyreSalesDtlList[i].brandId);
        this.formTyreArray.controls[i].get("tyreId")?.setValue(res.tyreSalesDtlList[i].tyreId);  
        this.formTyreArray.controls[i].get("tyreAmt")?.setValue(res.tyreSalesDtlList[i].tyreAmt);  
        this.formTyreArray.controls[i].get("remarks")?.setValue(res.tyreSalesDtlList[i].remarks);  
      }     
    });
  }
  
  addItem(i: number): void {    
    if (this.formTyreArray.value[i].brandId != "" && this.formTyreArray.value[i].tyreId!="" ) {
      this.formTyreArray.push(this.createTyreArray());       
    } 
    else {
      this.toastrService.warning("Please Enter Tyre Details");
    }
  }
  
  removeItem(index: number) {
    this.formTyreArray.removeAt(index);  
  }  

  getTyreNo(j: number,e: any){   
    this.requestmodel.strRequest = e.target.value; 
    this.requestmodel.strRequest1 = "S" ; 
    this.tyresalesService.getScrapTyreNoList(this.requestmodel).subscribe((res) => {
      this.tyreList = res;
    });
  }
  
  tyresaleDelete(): void {
    if(this.selectedTyresalesDetail.masterID  != '' ){
     this.requestmodel.strRequest = this.selectedTyresalesDetail.masterID; 
      if (confirm("Are you sure, you want to delete this?")) {
          this.tyresalesService.tyresalesMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/tyresalelist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
    
  exit(): void {
    this.route.navigate(['/tyresalelist']);
  }   
    
  submitsaleForm(): void {
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

    if(selectedDataValue.nonCustomer){
      if (selectedDataValue.customerName=="") {
        this.toastrService.warning(" Please enter Customer Name");   
        return;
      }
    }
    else{
      if (selectedDataValue.customerId.dataId) {
        //ignore
      }
      else{
        this.toastrService.warning(" Invalid Customer");
        return;
      }
    }

    this.tyresalesmastermodel.masterID = this.selectedTyresalesDetail.masterID;
    this.tyresalesmastermodel.branchCode= selectedDataValue.branchCode.toString();
    this.tyresalesmastermodel.transDate = selectedDataValue.transDate;
    this.tyresalesmastermodel.saleIncharge = selectedDataValue.saleIncharge;
    this.tyresalesmastermodel.nonCustomer = selectedDataValue.nonCustomer?"Y":"N";    
    this.tyresalesmastermodel.customerId = selectedDataValue.customerId?selectedDataValue.customerId.dataId:"";
    this.tyresalesmastermodel.customerName = selectedDataValue.customerName.toString().toUpperCase();
    this.tyresalesmastermodel.customerAdd = selectedDataValue.customerAdd.toString().toUpperCase();
    this.tyresalesmastermodel.customerGstNo = selectedDataValue.customerGstNo.toString().toUpperCase();
    this.tyresalesmastermodel.gstType = selectedDataValue.gstType;
    this.tyresalesmastermodel.tyreAmount = selectedDataValue.tyreAmount.toString();
    this.tyresalesmastermodel.sgstPct = selectedDataValue.sgstPct.toString();
    this.tyresalesmastermodel.sgstAmt = selectedDataValue.sgstAmt.toString();
    this.tyresalesmastermodel.cgstPct = selectedDataValue.cgstPct.toString();
    this.tyresalesmastermodel.cgstAmt = selectedDataValue.cgstAmt.toString();
    this.tyresalesmastermodel.igstPct = selectedDataValue.igstPct.toString();
    this.tyresalesmastermodel.igstAmt = selectedDataValue.igstAmt.toString();
    this.tyresalesmastermodel.totalAmount = selectedDataValue.totalAmount.toString();
    this.tyresalesmastermodel.roundOff = selectedDataValue.roundOff.toString();
    this.tyresalesmastermodel.netAmount = selectedDataValue.netAmount.toString();
    this.tyresalesmastermodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.tyresalesmastermodel.pmtType = selectedDataValue.pmtType.toString();
    this.tyresalesmastermodel.yearID = this.year;
    this.tyresalesmastermodel.loggedInUser = this.loggedInUserID;
    this.tyresalesmastermodel.tyreSalesDtlList = [];
    
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (this.formTyreArray.value[i].brandId == "" || this.formTyreArray.value[i].tyreId=="" ) {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        var dupl = this.tyresalesmastermodel.tyreSalesDtlList.find(e=> e.tyreId == selectedDataValue.arrayList[i].tyreId) 
        if(dupl){
          this.toastrService.warning("Duplicate Tyre No Entered");
          return;
        }
        this.tyresalesmastermodel.tyreSalesDtlList.push({
          'masterID': "",
          'transDate': "",
          'brandId': selectedDataValue.arrayList[i].brandId,
          'tyreId': selectedDataValue.arrayList[i].tyreId,
          'tyreAmt': selectedDataValue.arrayList[i].tyreAmt.toString(),
          'remarks':selectedDataValue.arrayList[i].remarks.toString().toUpperCase(),
          'branchCode':selectedDataValue.branchCode.toString(),
          'yearID':this.year,
        }) 
      }   
    }   

    if(this.tyresalesmastermodel.tyreSalesDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
          
    this.tyresalesService.tyresalesMasterSubmitted(this.tyresalesmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/tyresalelist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
}