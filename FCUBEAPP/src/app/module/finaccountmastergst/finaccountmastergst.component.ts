import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Finaccountsmastergstmodel  } from 'src/app/models/finaccountsmastergstmodel';
import { FinsaccountmasterService } from 'src/app/services/finaccountmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-finaccountmastergst',
  templateUrl: './finaccountmastergst.component.html',
  styleUrls: ['./finaccountmastergst.component.css']
})

export class FinaccountmastergstComponent {
  loggedInUserID: string = '';
  userlogindate:string="";
  formAccountMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  keywordLocation = 'dataName';

  responseDetails = new Responsemodel();
  accountList: Dropdownmodel[] = [];
  statelist: Dropdownmodel[] = [];
  branchList: Dropdownmodel[]=[];
  selectedFinaccountMasterDetails = new Finaccountsmastergstmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
     private finaccountmodel: Finaccountsmastergstmodel, private sharedService: SharedService,
     private finsaccountmasterService: FinsaccountmasterService,
     private commonService: CommonService, private requestmodel:Requestmodel,
     private toasterService: ToastrService) {
    this.finaccountmodel = new Finaccountsmastergstmodel();
  }
  
  ngOnInit(): void {  
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Customer GST Locations");
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
    
    this.formAccountMaster = this.formBuilder.group({    
      accountId: new FormControl('',[Validators.required]),      
      arrayList: this.formBuilder.array([this.createInitialArray()]),     
    });    

    this.sharedService.loading = true;
   
    this.getBranchList();
    this.getaccountList();
    this.getstatelist();  
    
    this.sharedService.loading = false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formAccountMaster.controls; }

  get formArray() {
    return this.formAccountMaster.get("arrayList") as FormArray;
  }

  checkDuplicate(e:any,j:number){
    var selectedDataValue = this.formAccountMaster.getRawValue();
    var loc = e.target.value;
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(i!=j && selectedDataValue.arrayList[i].location==loc){
        this.toasterService.warning("Location Already Exists in Grid");
        this.formArray.controls[j].get("location")?.setValue("");
      }
    }
  }
  
  selectEvent(item: any) {
    this.requestmodel.strRequest = item.dataId;    
    this.formArray.clear();
    this.formArray.push(this.createInitialArray());
    this.finsaccountmasterService.getFinAccountGstList(this.requestmodel).subscribe((res) => {
      this.finaccountmodel = res;
      if(res.finAccountsGstDetail.length>0){
        this.formArray.clear();
        for (var i = 0; i < res.finAccountsGstDetail.length; i++) {
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("location")?.setValue(res.finAccountsGstDetail[i].location);
          this.formArray.controls[i].get("gstNo")?.setValue(res.finAccountsGstDetail[i].gstNo);
          this.formArray.controls[i].get("address1")?.setValue(res.finAccountsGstDetail[i].address1);
          this.formArray.controls[i].get("address2")?.setValue(res.finAccountsGstDetail[i].address2);
          this.formArray.controls[i].get("address3")?.setValue(res.finAccountsGstDetail[i].address3);
          this.formArray.controls[i].get("address4")?.setValue(res.finAccountsGstDetail[i].address4);
          this.formArray.controls[i].get("city")?.setValue(res.finAccountsGstDetail[i].city);
          this.formArray.controls[i].get("stateCode")?.setValue(res.finAccountsGstDetail[i].stateCode);
          this.formArray.controls[i].get("pinCode")?.setValue(res.finAccountsGstDetail[i].pinCode);
          this.formArray.controls[i].get("mobileNo")?.setValue(res.finAccountsGstDetail[i].mobileNo);
          this.formArray.controls[i].get("email")?.setValue(res.finAccountsGstDetail[i].email);
        }
      }  
    });
  }

  onChangeSearch(e: any) {
    // do something
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
    
  getaccountList(): void {
    this.commonService.getCustomerList().subscribe((res) => {
      this.accountList = res;
    });
  }  
  
  getBranchList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getstatelist(): void {
      this.commonService.getStateList().subscribe((res) => {
      this.statelist = res;
    });
  }

  
  createInitialArray() {
    return this.formBuilder.group({
      location:  [''],
      gstNo:  [''],
      address1:  [''],
      address2:  [''],
      address3:  [''],
      address4:  [''],
      city:  [''],
      stateCode:  [''],
      pinCode:  [''],
      mobileNo :  [''],
      email:  [''],
    });
  }

  addItem(index: number): void { 
    var selectedData = this.formAccountMaster.getRawValue();
    if (selectedData.arrayList[index].location != "" && selectedData.arrayList[index].gstNo != "") {
      this.formArray.push(this.createInitialArray());
    } 
    else {
      this.toasterService.warning("Please select Required Fields");
    }
  }

  removeItem(index: number){ 
    var selectedData = this.formAccountMaster.getRawValue();
    if (confirm("Are you sure, you want to delete this row?")) {
      this.requestmodel.strRequest = selectedData.accountId.dataId;
      this.requestmodel.strRequest1 = selectedData.arrayList[index].location;

      this.finsaccountmasterService.FinAccountGstLocDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status){  
          this.formArray.removeAt(index); 
        } 
        else{
          this.toasterService.warning(this.responseDetails.message);  
          return; 
        }   
      });
    }
  }

  exit(): void {
    this.route.navigate([this.dashboard]);
  }

  deleteFinAccountMasterForm(): void {    
    var selectedDataValue = this.formAccountMaster.getRawValue();
    if((selectedDataValue.accountId? selectedDataValue.accountId.dataId : '') != '' ){
      this.sharedService.loading = true;
      this.requestmodel.strRequest = selectedDataValue.accountId.dataId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.finsaccountmasterService.FinAccountGstDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status){    
              this.formAccountMaster.reset();
              this.route.navigate(['/custgstlocations']);
            } 
            else{
              console.log(this.responseDetails.message);  
              this.toasterService.warning(this.responseDetails.message);  
              return; 
            }   
        });
      }
      this.sharedService.loading = false;
    }
  }
    
  
  //Submit user form details //
  submitFinAccountMasterForm(): void {
    if (this.formAccountMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formAccountMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }          
      return;
    }
    var selectedDataValue = this.formAccountMaster.getRawValue();
   
    this.sharedService.loading = true;
    this.formSubmitted = true;
    
    this.finaccountmodel.accountId = selectedDataValue.accountId? selectedDataValue.accountId.dataId : '';
    this.finaccountmodel.finAccountsGstDetail = [];

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(selectedDataValue.arrayList[i].location!='' && selectedDataValue.arrayList[i].gstNo !=''){
        this.finaccountmodel.finAccountsGstDetail.push({
          'accountId': selectedDataValue.accountId? selectedDataValue.accountId.dataId : '',
          'location': selectedDataValue.arrayList[i].location.toString(),
          'gstNo': selectedDataValue.arrayList[i].gstNo.toString(),
          'address1':  selectedDataValue.arrayList[i].address1.toString().toUpperCase(),
          'address2':  selectedDataValue.arrayList[i].address2.toString().toUpperCase(),
          'address3': selectedDataValue.arrayList[i].address3.toString().toUpperCase(),
          'address4':  selectedDataValue.arrayList[i].address4.toString().toUpperCase(),
          'city':  selectedDataValue.arrayList[i].city.toString().toUpperCase(),
          'stateCode':  selectedDataValue.arrayList[i].stateCode.toString().toUpperCase(),
          'pinCode':  selectedDataValue.arrayList[i].pinCode.toString(),
          'mobileNo' :  selectedDataValue.arrayList[i].mobileNo.toString(),
          'email':  selectedDataValue.arrayList[i].email.toString(),
        });
      }
    }

    this.finsaccountmasterService.finsaccountsgstSubmitted(this.finaccountmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formAccountMaster.reset();
        this.route.navigate(['/custgstlocations']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
    
}
  
  
  
  
  