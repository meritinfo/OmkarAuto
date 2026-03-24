
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Sparespurchasemastermodel } from 'src/app/models/sparespurchasemastermodel';
import { CommonService } from 'src/app/services/common.service';
import { Ratesmasternewlistmodel } from 'src/app/models/ratesmasternewlistmodel';
import { Ratesmasternewmodel } from 'src/app/models/ratesmasternewmodel';
import { RatesMasterNewService } from 'src/app/services/ratesmasternew.services';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ratesmasternewadd',
  templateUrl: './ratesmasternewadd.component.html',
  styleUrls: ['./ratesmasternewadd.component.css']
})
export class RatesmasternewaddComponent {
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
  dashboard: string ="";
  editMode= false;
  userSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  
  creditacList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  vehicleGrpList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  modelList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  productList: Dropdownmodel[] = [];
 
  vehicleTypeList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  sparespurchasemodel = new Sparespurchasemastermodel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedRatesMasterDetail = new Ratesmasternewmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private ratesmasternewmodel: Ratesmasternewmodel, 
    private ratesMasterNewService: RatesMasterNewService, 
    private sharedService : SharedService,
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.ratesmasternewmodel = new Ratesmasternewmodel();
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Define Booking Rates");
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

    this.getLocationList();
    this.getRateList();
    this.getPartyList();
    this.getProductList();
    this.getVehicleGrpList();
 
    this.selectedRatesMasterDetail = this.ratesMasterNewService.getRatesMasterNewDetails();
    this.formUser = this.formBuilder.group({
      transDate : new FormControl(this.loginDate,[Validators.required]),
    
      rateId           : new FormControl('',),
      partyId          : new FormControl('',[Validators.required]),
      vehTypeId        : new FormControl('',),
      validFrom        : new FormControl(this.loginDate,[Validators.required]),
      validUpto        : new FormControl(this.loginDate,[Validators.required]),
      rateTypeId       : new FormControl('',),
      fromLocationType : new FormControl('',),
      fromLocation     : new FormControl('',[Validators.required]),
      arrayList        : this.formBuilder.array([this.createRatesArray()]),
    }); 
  
  if (this.selectedRatesMasterDetail.rateId  != '') {
    setTimeout(() => {
     
      this.formUser.patchValue(this.selectedRatesMasterDetail);
      this.formUser.patchValue({
        validFrom: this.commonService.formatDate(this.selectedRatesMasterDetail.validFrom),
        validUpto: this.commonService.formatDate(this.selectedRatesMasterDetail.validUpto),
     
        partyId: this.partyList.find(e => e.dataId == this.selectedRatesMasterDetail.partyId),
        fromLocation:this.locationList.find(e => e.dataId == this.selectedRatesMasterDetail.fromLocation),
      })  
         this.formUser.controls['validFrom'].disable();   
         this.formUser.controls['partyId'].disable(); 
         this.formUser.controls['validUpto'].disable(); 
    
      this.getRatesMasterNewInnerGridList();
      this.editMode =true;
    }, 2000);  
  }
  }

  get f() { return this.formUser.controls; }

  get formRatesArray() {
    return this.formUser.get("arrayList") as FormArray;    
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

  getRatesMasterNewInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedRatesMasterDetail.rateId; 
    this.ratesMasterNewService.getRatesMasterNewInnerGridList(this.requestmodel).subscribe((res) => {
      this.formRatesArray.clear();
      this.ratesmasternewmodel = res;
      for (let i = 0; i < res.ratesMasterNewDetailList.length; i++) {
        this.formRatesArray.push(this.createRatesArray());
        this.formRatesArray.controls[i].get("rateDtlId")?.setValue(res.ratesMasterNewDetailList[i].rateDtlId);
        this.formRatesArray.controls[i].get("rateId")?.setValue(res.ratesMasterNewDetailList[i].rateId);  
       this.formRatesArray.controls[i].get("destination")?.setValue(this.locationList.find(e => e.dataId == res.ratesMasterNewDetailList[i].destination)), 
        this.formRatesArray.controls[i].get("productId")?.setValue(res.ratesMasterNewDetailList[i].productId);  
        this.formRatesArray.controls[i].get("rateRs")?.setValue(res.ratesMasterNewDetailList[i].rateRs);   
      }     
    });
  }

  getProductList(): void {
    this.commonService.getProductList().subscribe((res) => {
      this.productList = res;
    });
  }
    
  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formRatesArray.removeAt(index);  
    
    }
  } 

  createRatesArray() {
    return this.formBuilder.group({
      rateDtlId: [''],
      destination: [''],
      productId: ['0'],
      rateRs: [''],
    });
  } 

  getVehicleGrpList(): void {
    this.commonService.getVehicleTypeList().subscribe((res) => {
      this.vehicleGrpList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
    });
  }

  getRateList(): void {
    this.commonService.getRateList().subscribe((res) => {
      this.rateList = res;
    });
  }

  selectEvent(item: any) {
    // do something with selected item
   
  }
 
  addItem(i: number): void {    
    var selectedDate = this.formUser.getRawValue();
    if (this.formRatesArray.value[i].destination != "" && this.formRatesArray.value[i].productId!="" ) {
      this.formRatesArray.push(this.createRatesArray());
    } 
    else {
      this.toastrService.warning("Please Enter   Details");
    }
  }
    
  selectToLocationEvent(item: any,index:number) {
    var ToPlace = item.dataId;
    var selectedDataValue=this.formUser.getRawValue();
    if(ToPlace == selectedDataValue.fromLocation.dataId)
    {
      this.toastrService.warning("Destination can not be same as From Location");
      this.formRatesArray.controls[index].get("destination")?.setValue("");
      return;
    }
  }

  changeProduct(e: any,index:number){
    var pr = e.target.value;
    var selectedDataValue=this.formUser.getRawValue();
    for (let i = 1; i < selectedDataValue.arrayList.length; i++) {
        var t = i-1
      if( selectedDataValue.arrayList[index].destination.dataId == selectedDataValue.arrayList[t].destination.dataId && selectedDataValue.arrayList[t].productId==e.target.value)
      {
        this.toastrService.warning("Destination with same product already exits in grid");
        this.formRatesArray.controls[index].get("productId")?.setValue("");
         return;
      }
    }
  }
    
  ratesMasterDelete(): void {
    if(this.selectedRatesMasterDetail.rateId  != '' ){
    this.requestmodel.strRequest =this.selectedRatesMasterDetail.rateId 
      if (confirm("Are you sure, you want to delete this?")) {
            this.ratesMasterNewService.ratesMasterNewDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/ratesmasterlist']);
            }
            else {
              this.toastrService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }
        
  exit(): void {
    this.route.navigate(['/ratesmasterlist']);
  }  

  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
    this.partyList = res;
    });
  }

  submitRatesMasterNewForm(): void {
    if (this.formUser.invalid) {
       this.toastrService.warning("Please enter mandatory fields");
       const controls = this.formUser.controls;
       for (const name in controls) {
         if (controls[name].invalid) {
           // Convert camelCase key to readable format
           const readableName = name.replace(/([A-Z])/g, ' $1');
           const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);
  
           this.toastrService.warning(titleCaseName + " field is invalid");
         }
       }
      return;
     }
    var selectedDataValue = this.formUser.getRawValue();
    this.ratesmasternewmodel.rateId = this.selectedRatesMasterDetail.rateId ;
    this.ratesmasternewmodel.partyId= selectedDataValue.partyId.dataId;
    this.ratesmasternewmodel.validFrom = selectedDataValue.validFrom;
    this.ratesmasternewmodel.validUpto= selectedDataValue.validUpto;
    this.ratesmasternewmodel.vehTypeId= selectedDataValue.vehTypeId;
    this.ratesmasternewmodel.rateTypeId= selectedDataValue.rateTypeId;
    this.ratesmasternewmodel.fromLocationType= selectedDataValue.fromLocationType;
    this.ratesmasternewmodel.fromLocation= selectedDataValue.fromLocation.dataId;
    this.ratesmasternewmodel.loggedInUser=  this.loggedInUserID;
    this.ratesmasternewmodel.ratesMasterNewDetailList = [];
    for (let i = 0; i < selectedDataValue.arrayList.length; i++) {
       if (selectedDataValue.arrayList[i].productId == "" || selectedDataValue.arrayList[i].destination==""|| selectedDataValue.arrayList[i].rateRs=="" ) {
         this.toastrService.warning("Please Enter  Detail");
         return;
       } 
       else{
        this.ratesmasternewmodel.ratesMasterNewDetailList.push({
          'rateDtlId': "",
          'rateId': "",
          'productId': selectedDataValue.arrayList[i].productId,
          'destination': selectedDataValue.arrayList[i].destination.dataId,
          'rateRs': selectedDataValue.arrayList[i].rateRs,
        }) 
      }
    }  
    let d1 = new Date(this.ratesmasternewmodel.validUpto);
    let d2 = new Date(this.ratesmasternewmodel.validFrom);
      if (d1 < d2) {
      this.toastrService.warning("End date should be greater than start date");
      this.sharedService.loading=false;
      return;
    } 
    this.ratesMasterNewService.ratesMasterNewSubmitted(this.ratesmasternewmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/ratesmasterlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
} 
    
    
      
  
  


