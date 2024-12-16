import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Tyreactivatemastermodel } from 'src/app/models/tyreactivatemastermodel';
import { TyreactivateService } from 'src/app/services/tyreactivate.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-tyreativateadd',
  templateUrl: './tyreativateadd.component.html',
  styleUrls: ['./tyreativateadd.component.css']
})
export class TyreativateaddComponent {
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
  formSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];  
  brandList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  positionList: Dropdownmodel[] = [];
  tyreList: Dropdownmodel[] = [];
  tyreactivate = new Tyreactivatemastermodel();
  refDocAttachedImage: string = "";
  totTyres:string = "";
  actTyres:string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedTyreactivateDetail = new Tyreactivatemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyreactivateService: TyreactivateService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Activate Tyres");
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
 
    this.selectedTyreactivateDetail = this.tyreactivateService.getTyreactivateMasterDetails();


    this.formUser = this.formBuilder.group({
      branchCode : new FormControl(this.branch,[Validators.required]),
      activateDate : new FormControl(this.loginDate,[Validators.required]),
      vehicleMasterid  : new FormControl('',[Validators.required]),
      refNo : new FormControl('',),
      kmr : new FormControl('',),
      inspectedBy : new FormControl('',),
      fittedBy : new FormControl('',),
      tyreAmt : new FormControl('',[Validators.required]),
      othAmt : new FormControl('',),
      netAmt : new FormControl('',[Validators.required]),
      remarks : new FormControl('',),      

      arrayList: this.formBuilder.array([this.createTyreArray()]),
    });
    
    this.getBrandList();
    this.getBranchList();
    this.getVehicleNoList();
    //this.getTyreNo();
    this.getTyrePositionList();

    this.formUser.controls["tyreAmt"].disable();
    this.formUser.controls["netAmt"].disable();
    this.formUser.controls["branchCode"].disable();

    if (this.selectedTyreactivateDetail.activateMasterID  != '') {
      setTimeout(() => {
        this.requestmodel.strRequest = ""; 
        this.requestmodel.strRequest1 = ""; 
        this.tyreactivateService.getBrandTyreNoList(this.requestmodel).subscribe((res) => {
          this.tyreList = res;
        });
      }, 1500);  
    }

    if (this.selectedTyreactivateDetail.activateMasterID  != '') {
      setTimeout(() => {
        this.formUser.patchValue(this.selectedTyreactivateDetail);
        this.formUser.patchValue({
          activateDate: this.commonService.formatDate(this.selectedTyreactivateDetail.activateDate),
          vehicleMasterid: this.vehicleList.find(e => e.dataId == this.selectedTyreactivateDetail.vehicleMasterid),
        }) 
        this.getVehicleTyreNos(this.selectedTyreactivateDetail.vehicleMasterid);
        this.getTyreActivateInnerGridList();
        this.editMode =true;
      }, 3000);  
    }
  }

  get f() { return this.formUser.controls; }

  get formTyreArray() {
    return this.formUser.get("arrayList") as FormArray;    
  }

  selectEvent(item: any) {
    // do something with selected item
    this.getVehicleTyrePositionList(item.dataId);
    this.getVehicleTyreNos(item.dataId);
  }

  selectTyreEvent(i: number, item: any) {
    // do something with selected item
    this.requestmodel.strRequest = item.dataId; 
    this.tyreactivateService.getTyreNoCostAmt(this.requestmodel).subscribe((res) => {
      this.responseDetails = res;
      if(res.status){       
        this.formTyreArray.controls[i].get("tyreCostAmt")?.setValue(res.message);  
      } 
      else{
        this.formTyreArray.controls[i].get("tyreCostAmt")?.setValue("");  
      }   
      this.onAmtChange();
    });
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
      tyrePosID: [''],
      tyreCostAmt: [''],
      remarks: [''],
    });
  }

  getBrandList(): void {
    this.commonService.getTyreBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }
  
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getTyrePositionList(): void {
    this.commonService.getTyrePositionList().subscribe((res) => {
      this.positionList = res;
    });
  }
  
  getVehicleTyrePositionList(veh: string): void {
    this.requestmodel.strRequest = veh
    this.tyreactivateService.getVehicleTyrePositionList(this.requestmodel).subscribe((res) => {
      this.positionList = res;
    });
  }

  getVehicleTyreNos(veh: string): void {
    this.requestmodel.strRequest = veh; 
    this.tyreactivateService.getVehicleNoOfTyres(this.requestmodel).subscribe((res) => {
      this.totTyres = res.dataName;
      this.actTyres = res.dataId;
    });
  }

  getTyreActivateInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTyreactivateDetail.activateMasterID; 
    this.tyreactivateService.getTyreactivateMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.tyreactivate = res;
      for (var i = 0; i < res.tyreActivateDtlList.length; i++) {
        this.formTyreArray.push(this.createTyreArray());        
        this.formTyreArray.controls[i].get("brandId")?.setValue(res.tyreActivateDtlList[i].brandId);
        this.formTyreArray.controls[i].get("tyreId")?.setValue(this.tyreList.find(e=> e.dataId == res.tyreActivateDtlList[i].tyreId));  
        this.formTyreArray.controls[i].get("tyrePosID")?.setValue(res.tyreActivateDtlList[i].tyrePosID); 
        this.formTyreArray.controls[i].get("tyreCostAmt")?.setValue(res.tyreActivateDtlList[i].tyreCostAmt);  
        this.formTyreArray.controls[i].get("remarks")?.setValue(res.tyreActivateDtlList[i].remarks);  
      }     
    });
  }

  onAmtChange(){
    var totalTyresAmt = 0;
    var netTyreAmount = 0;
    
    var selectedDate = this.formUser.getRawValue();

    for (var i = 0; i < this.formTyreArray.controls.length; i++) {
      if (selectedDate.arrayList[i].tyreCostAmt!="") {
        totalTyresAmt = totalTyresAmt + parseFloat(selectedDate.arrayList[i].tyreCostAmt);   
      }
    }  

    netTyreAmount = totalTyresAmt ;

    if(selectedDate.othAmt!="") {
      netTyreAmount = netTyreAmount + parseFloat(selectedDate.othAmt);
    }
   
    this.formUser.patchValue({
      tyreAmt : totalTyresAmt.toFixed(2),
      netAmt: netTyreAmount.toFixed(2),
    });
  }  

  addItem(i: number): void {    
    if (this.formTyreArray.value[i].brandId != "" && this.formTyreArray.value[i].tyreId!="" && 
                this.formTyreArray.value[i].tyrePosID!="") {
      this.formTyreArray.push(this.createTyreArray());       
    } 
    else {
      this.toastrService.warning("Please Enter Tyre Activate Details");
    }
  }
  
  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formTyreArray.removeAt(index);  
    this.onAmtChange();
  }
  }  

  getTyreNo(j: number,e: any){   
    this.requestmodel.strRequest = e.target.value; 
    this.requestmodel.strRequest1 = ""; 
    this.tyreactivateService.getBrandTyreNoList(this.requestmodel).subscribe((res) => {
      this.tyreList = res;
    });
  }
  
  tyreActivateDelete(): void {
    if(this.selectedTyreactivateDetail.activateMasterID  != '' ){
     this.requestmodel.strRequest = this.selectedTyreactivateDetail.activateMasterID; 
      if (confirm("Are you sure, you want to delete this?")) {
          this.tyreactivateService.TyreactivateMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/tyreactivatelist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
    
  exit(): void {
    this.route.navigate(['/tyreactivatelist']);
  }   
    
  submitTyreActivateForm(): void {
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

    if (selectedDataValue.vehicleMasterid.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Invalid Vehicle");
      return;
    }

    this.tyreactivate.activateMasterID = this.selectedTyreactivateDetail.activateMasterID ;
    this.tyreactivate.branchCode= selectedDataValue.branchCode.toString();
    this.tyreactivate.activateDate = selectedDataValue.activateDate;
    this.tyreactivate.refNo = selectedDataValue.refNo;
    this.tyreactivate.vehicleMasterid  = selectedDataValue.vehicleMasterid?selectedDataValue.vehicleMasterid.dataId:"";
    this.tyreactivate.kmr  = selectedDataValue.kmr.toString();
    this.tyreactivate.inspectedBy  = selectedDataValue.inspectedBy.toString().toUpperCase();
    this.tyreactivate.fittedBy = selectedDataValue.fittedBy.toString().toUpperCase();
    this.tyreactivate.tyreAmt  = selectedDataValue.tyreAmt.toString();
    this.tyreactivate.othAmt  = selectedDataValue.othAmt?selectedDataValue.othAmt.toString():"";
    this.tyreactivate.netAmt  = selectedDataValue.netAmt.toString();
    this.tyreactivate.remarks  = selectedDataValue.remarks.toString().toUpperCase();    
    this.tyreactivate.yearID = this.year;
    this.tyreactivate.loggedInUser = this.loggedInUserID;
    this.tyreactivate.tyreActivateDtlList = [];

    if(selectedDataValue.netAmt=="" || parseFloat(selectedDataValue.netAmt)==0 ){
      this.toastrService.warning("Net Amount should not be zero");
      return;
    }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (this.formTyreArray.value[i].brandId == "" || this.formTyreArray.value[i].tyreId=="" ||
        this.formTyreArray.value[i].tyrePosID=="") {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        var dupl = this.tyreactivate.tyreActivateDtlList.find(e=> e.tyreId == selectedDataValue.arrayList[i].tyreId.dataId) 
        if(dupl){
          this.toastrService.warning("Duplicate Tyre No Entered");
          return;
        }
        this.tyreactivate.tyreActivateDtlList.push({
          'activateMasterID': "",
          'activateDate': "",
          'vehicleMasterid': "",
          'brandId': selectedDataValue.arrayList[i].brandId,
          'tyreId': selectedDataValue.arrayList[i].tyreId.dataId,
          'tyrePosID': selectedDataValue.arrayList[i].tyrePosID,
          'tyreCostAmt': selectedDataValue.arrayList[i].tyreCostAmt.toString(),
          'remarks': selectedDataValue.arrayList[i].remarks.toString().toUpperCase(),
        }) 
      }   
    }   
    if(this.tyreactivate.tyreActivateDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
    const foundDuplicateName = this.tyreactivate.tyreActivateDtlList.find((data, index) => {
      return this.tyreactivate.tyreActivateDtlList.find((x, ind) => x.tyrePosID === data.tyrePosID && index !== ind);
    })
    if (foundDuplicateName) {
      this.toastrService.warning("Duplicate Tyre Position in details grid not allowed");
      return;
    }
    if((this.tyreactivate.tyreActivateDtlList.length + parseInt(this.actTyres)) > (parseInt(this.totTyres) + 1)){
      this.toastrService.warning("Total No of Active Tyres should be less than Total No Of Tyres");
      return;
    }
          
    this.formSubmitted = true;
    this.tyreactivateService.tyreactivateMasterSubmitted(this.tyreactivate).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/tyreactivatelist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
}