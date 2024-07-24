import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Tyredeactivatemastermodel } from 'src/app/models/tyredeactivatemastermodel';
import { TyredeactivateService } from 'src/app/services/tyredeactivate.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-tyredeativateadd',
  templateUrl: './tyredeativateadd.component.html',
  styleUrls: ['./tyredeativateadd.component.css']
})
export class TyredeativateaddComponent {
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
  vehicleList: Dropdownmodel[] = [];
  positionList: Dropdownmodel[] = [];
  tyreList: Dropdownmodel[] = [];
  tyredeactivate = new Tyredeactivatemastermodel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedTyredeactivateDetail = new Tyredeactivatemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyredeactivateService: TyredeactivateService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "De-Activate Tyres");
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
 
    this.selectedTyredeactivateDetail = this.tyredeactivateService.getTyredeactivateMasterDetails();
    this.formUser = this.formBuilder.group({
      branchCode : new FormControl(this.branch,[Validators.required]),
      deActivateDate : new FormControl(this.loginDate,[Validators.required]),
      vehicleMasterid  : new FormControl('',[Validators.required]),
      refNo : new FormControl('',),
      kmr : new FormControl('',),
      inspectedBy : new FormControl('',),
      removedBy : new FormControl('',),
      usableTyreAmt : new FormControl('',[Validators.required]),
      remarks : new FormControl('',),      

      arrayList: this.formBuilder.array([this.createTyreArray()]),
    });
    
    this.getBrandList();
    this.getBranchList();
    this.getVehicleNoList();

    this.formUser.controls["usableTyreAmt"].disable();

    if (this.selectedTyredeactivateDetail.deActivateMasterID  != '') {
      setTimeout(() => {
        this.formUser.patchValue(this.selectedTyredeactivateDetail);
        this.formUser.patchValue({
          deActivateDate: this.commonService.formatDate(this.selectedTyredeactivateDetail.deActivateDate),
          vehicleMasterid: this.vehicleList.find(e => e.dataId == this.selectedTyredeactivateDetail.vehicleMasterid),
        })      
        this.getTyreDeActivateInnerGridList();
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
      removeStatus: ['DAC'],
      usableAmount: [''],
      remarks: [''],
    });
  }

  getBrandList(): void {
    this.commonService.getBrandList().subscribe((res) => {
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

  getTyreDeActivateInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTyredeactivateDetail.deActivateMasterID; 
    this.tyredeactivateService.getTyredeactivateMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.tyredeactivate = res;
      for (var i = 0; i < res.tyreDeActivateDtlList.length; i++) {
        this.formTyreArray.push(this.createTyreArray());
        this.formTyreArray.controls[i].get("brandId")?.setValue(res.tyreDeActivateDtlList[i].brandId);
        this.formTyreArray.controls[i].get("tyreId")?.setValue(res.tyreDeActivateDtlList[i].tyreId);  
        this.formTyreArray.controls[i].get("removeStatus")?.setValue(res.tyreDeActivateDtlList[i].removeStatus); 
        this.formTyreArray.controls[i].get("usableAmount")?.setValue(res.tyreDeActivateDtlList[i].usableAmount);  
        this.formTyreArray.controls[i].get("remarks")?.setValue(res.tyreDeActivateDtlList[i].remarks);  
      }     
    });
  }

  onAmtChange(){
    var totalTyresAmt = 0;
    
    var selectedDate = this.formUser.getRawValue();

    for (var i = 0; i < this.formTyreArray.controls.length; i++) {
      if (selectedDate.arrayList[i].tyreCostAmt!="") {
        totalTyresAmt = totalTyresAmt + parseFloat(selectedDate.arrayList[i].usableAmount);   
      }
    }  
   
    this.formUser.patchValue({
      usableTyreAmt : totalTyresAmt.toFixed(2),
    });
  }  

  addItem(i: number): void {    
    if (this.formTyreArray.value[i].brandId != "" && this.formTyreArray.value[i].tyreId!="" ) {
      this.formTyreArray.push(this.createTyreArray());       
    } 
    else {
      this.toastrService.warning("Please Enter Tyre De-Activate Details");
    }
  }
  
  removeItem(index: number) {
    this.formTyreArray.removeAt(index);  
  }  

  getTyreNo(j: number,e: any){   
    this.requestmodel.strRequest = e.target.value; 
    this.tyredeactivateService.getBrandActTyreNoList(this.requestmodel).subscribe((res) => {
      this.tyreList = res;
    });
  }
  
  tyreDeActivateDelete(): void {
    if(this.selectedTyredeactivateDetail.deActivateMasterID  != '' ){
     this.requestmodel.strRequest = this.selectedTyredeactivateDetail.deActivateMasterID; 
      if (confirm("Are you sure, you want to delete this?")) {
          this.tyredeactivateService.TyredeactivateMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/tyredeactlist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
    
  exit(): void {
    this.route.navigate(['/tyredeactlist']);
  }   
    
  submitTyreDeActivateForm(): void {
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

    if (selectedDataValue.vehicleMasterid.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Invalid Vehicle");
      return;
    }

    this.tyredeactivate.deActivateMasterID = this.selectedTyredeactivateDetail.deActivateMasterID ;
    this.tyredeactivate.branchCode= selectedDataValue.branchCode.toString();
    this.tyredeactivate.deActivateDate = selectedDataValue.deActivateDate;
    this.tyredeactivate.refNo = selectedDataValue.refNo;
    this.tyredeactivate.vehicleMasterid  = selectedDataValue.vehicleMasterid?selectedDataValue.vehicleMasterid.dataId:"";
    this.tyredeactivate.kmr  = selectedDataValue.kmr.toString();
    this.tyredeactivate.inspectedBy  = selectedDataValue.inspectedBy.toString().toUpperCase();
    this.tyredeactivate.removedBy = selectedDataValue.removedBy.toString().toUpperCase();
    this.tyredeactivate.usableTyreAmt  = selectedDataValue.usableTyreAmt.toString();
    this.tyredeactivate.remarks  = selectedDataValue.remarks.toString().toUpperCase();    
    this.tyredeactivate.yearID = this.year;
    this.tyredeactivate.loggedInUser = this.loggedInUserID;
    this.tyredeactivate.tyreDeActivateDtlList = [];

    if(selectedDataValue.usableTyreAmt == "" || parseFloat(selectedDataValue.usableTyreAmt)==0 ){
      this.toastrService.warning("Net Amount should not be zero");
      return;
    }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (this.formTyreArray.value[i].brandId == "" || this.formTyreArray.value[i].tyreId=="" ) {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        var dupl = this.tyredeactivate.tyreDeActivateDtlList.find(e=> e.tyreId == selectedDataValue.arrayList[i].tyreId) 
        if(dupl){
          this.toastrService.warning("Duplicate Tyre No Entered");
          return;
        }
        this.tyredeactivate.tyreDeActivateDtlList.push({
          'deActivateMasterID': "",
          'deActivateDate': "",
          'vehicleMasterid': "",
          'brandId': selectedDataValue.arrayList[i].brandId,
          'tyreId': selectedDataValue.arrayList[i].tyreId,
          'removeStatus': selectedDataValue.arrayList[i].removeStatus,
          'usableAmount': selectedDataValue.arrayList[i].usableAmount.toString(),
          'remarks': selectedDataValue.arrayList[i].remarks.toString().toUpperCase(),
        }) 
      }   
    }   

    if(this.tyredeactivate.tyreDeActivateDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
          
    this.tyredeactivateService.tyredeactivateMasterSubmitted(this.tyredeactivate).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/tyredeactlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
}