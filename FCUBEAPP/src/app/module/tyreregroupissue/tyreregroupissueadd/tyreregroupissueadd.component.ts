import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Tyreregroupissuemastermodel } from 'src/app/models/tyreregroupissuemastermodel';
import { TyreregroupissueService } from 'src/app/services/tyreregroupissue.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-tyreregroupissueadd',
  templateUrl: './tyreregroupissueadd.component.html',
  styleUrls: ['./tyreregroupissueadd.component.css']
})
export class TyreregroupissueaddComponent {
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
  vendorList: Dropdownmodel[] = [];
  tyreList: Dropdownmodel[] = [];
  tyreregroupissue = new Tyreregroupissuemastermodel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedTyreregroupissueDetail = new Tyreregroupissuemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyreregroupissueService: TyreregroupissueService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Issue for Rethread");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;


 
    this.selectedTyreregroupissueDetail = this.tyreregroupissueService.getTyreregroupissueMasterDetails();
    this.formUser = this.formBuilder.group({
      branchCode : new FormControl(this.branch,[Validators.required]),
      regroupIssDate : new FormControl(this.loginDate,[Validators.required]),
      vendorId  : new FormControl('',[Validators.required]),
      issueIncharge : new FormControl('',),
      remarks : new FormControl('',),      

      arrayList: this.formBuilder.array([this.createTyreArray()]),
    });
    
    this.getBrandList();
    this.getBranchList();
    this.getVendorList();

    this.formUser.controls["branchCode"].disable();

    if (this.selectedTyreregroupissueDetail.regroupIssMasterID  != '') {
      setTimeout(() => {
        this.formUser.patchValue(this.selectedTyreregroupissueDetail);
        this.formUser.patchValue({
          regroupIssDate: this.commonService.formatDate(this.selectedTyreregroupissueDetail.regroupIssDate),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedTyreregroupissueDetail.vendorId),
        })      
        this.getRegroupIssInnerGridList();
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


  getRegroupIssInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedTyreregroupissueDetail.regroupIssMasterID; 
    this.tyreregroupissueService.getTyreregroupissueMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.tyreregroupissue = res;
      for (var i = 0; i < res.tyreRegroupIssueDtlList.length; i++) {
        this.formTyreArray.push(this.createTyreArray());
        this.formTyreArray.controls[i].get("brandId")?.setValue(res.tyreRegroupIssueDtlList[i].brandId);
        this.formTyreArray.controls[i].get("tyreId")?.setValue(this.tyreList.find(e=> e.dataId == res.tyreRegroupIssueDtlList [i].tyreId));
        this.formTyreArray.controls[i].get("remarks")?.setValue(res.tyreRegroupIssueDtlList[i].remarks);  
      }     
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
  
  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formTyreArray.removeAt(index);  
  }
  }  

  getTyreNo(j: number,e: any){   
    this.requestmodel.strRequest = e.target.value; 
    this.requestmodel.strRequest1 = "I" ; 
    this.tyreregroupissueService.getBrandTyreNoList(this.requestmodel).subscribe((res) => {
      this.tyreList = res;
    });
  }
  
  tyreRegroupIssueDelete(): void {
    if(this.selectedTyreregroupissueDetail.regroupIssMasterID  != '' ){
     this.requestmodel.strRequest = this.selectedTyreregroupissueDetail.regroupIssMasterID; 
      if (confirm("Are you sure, you want to delete this?")) {
          this.tyreregroupissueService.tyreregroupissueMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/tyrerethreadisslist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
    
  exit(): void {
    this.route.navigate(['/tyrerethreadisslist']);
  }   
    
  submitRegroupIssueForm(): void {
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

    this.tyreregroupissue.regroupIssMasterID = this.selectedTyreregroupissueDetail.regroupIssMasterID ;
    this.tyreregroupissue.branchCode= selectedDataValue.branchCode.toString();
    this.tyreregroupissue.regroupIssDate = selectedDataValue.regroupIssDate;
    this.tyreregroupissue.vendorId  = selectedDataValue.vendorId?selectedDataValue.vendorId.dataId:"";
    this.tyreregroupissue.issueIncharge  = selectedDataValue.issueIncharge.toString().toUpperCase();
    this.tyreregroupissue.remarks  = selectedDataValue.remarks.toString().toUpperCase();    
    this.tyreregroupissue.yearID = this.year;
    this.tyreregroupissue.loggedInUser = this.loggedInUserID;
    this.tyreregroupissue.tyreRegroupIssueDtlList = [];
    
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (this.formTyreArray.value[i].brandId == "" || this.formTyreArray.value[i].tyreId=="" ) {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        var dupl = this.tyreregroupissue.tyreRegroupIssueDtlList.find(e=> e.tyreId == selectedDataValue.arrayList[i].tyreId.dataId) 
        if(dupl){
          this.toastrService.warning("Duplicate Tyre No Entered");
          return;
        }
        this.tyreregroupissue.tyreRegroupIssueDtlList.push({
          'regroupIssMasterID': "",
          'regroupIssDate': "",
          'brandId': selectedDataValue.arrayList[i].brandId,
          'tyreId': selectedDataValue.arrayList[i].tyreId?selectedDataValue.arrayList[i].tyreId.dataId:"",
          'remarks':selectedDataValue.arrayList[i].remarks.toString().toUpperCase(),
          'branchCode':selectedDataValue.branchCode.toString(),
          'yearID':this.year,
        }) 
      }   
    }   

    if(this.tyreregroupissue.tyreRegroupIssueDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
          
    this.formSubmitted = true;
    this.tyreregroupissueService.tyreregroupissueMasterSubmitted(this.tyreregroupissue).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/tyrerethreadisslist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
}