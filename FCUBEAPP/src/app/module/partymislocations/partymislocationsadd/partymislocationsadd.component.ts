
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import {Partymislocationmodel } from 'src/app//models/partymislocationsmodel';
import { CommonService } from 'src/app/services/common.service';
import {Partymislocationlistmodel } from 'src/app/models/partymislocationslist';
import { Ratesmasternewmodel } from 'src/app/models/ratesmasternewmodel';
import { PartyMisLocationsService } from 'src/app/services/partymislocations.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-partymislocationsadd',
  templateUrl: './partymislocationsadd.component.html',
  styleUrls: ['./partymislocationsadd.component.css']
})
export class PartymislocationsaddComponent {
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
  partymislocationmodel = new Partymislocationmodel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedPartyMisLocationDetail = new Partymislocationmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private partymislocationmodels: Partymislocationmodel, 
    private partyMisLocationsService: PartyMisLocationsService, 
        private sharedService : SharedService,
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.partymislocationmodels = new Partymislocationmodel();

  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Party MIS Locations");
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
    this.getPartyList();

    this.selectedPartyMisLocationDetail = this.partyMisLocationsService.getPartyMisLocationDetails();
    this.formUser = this.formBuilder.group({
      partyId : new FormControl('',[Validators.required]),
      arrayList: this.formBuilder.array([this.createMisArray()]),
    }); 

    if (this.selectedPartyMisLocationDetail.partyId  != '') {
      setTimeout(() => {
        this.formUser.controls['partyId'].disable();  
        this.formUser.patchValue(this.selectedPartyMisLocationDetail);
        this.formUser.patchValue({
          partyId: this.partyList.find(e => e.dataId == this.selectedPartyMisLocationDetail.partyId),
        })  
      
        this.getPartyMisLocationInnerGridList();
        this.editMode =true;
      }, 2000);  
    }
  }

  get f() { return this.formUser.controls; }

  get formRatesArray() {
    return this.formUser.get("arrayList") as FormArray;    
  }

  createMisArray() {
    return this.formBuilder.group({
      locationId: [''],
    });
  }

  addItem(i: number): void {    
    if (this.formRatesArray.value[i].locationId != "" ) {
      this.formRatesArray.push(this.createMisArray());
    } 
    else {
      this.toastrService.warning("Please Enter   Details");
    }
    
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formRatesArray.removeAt(index);  
    }
  }    
     
  
  selectEvent(item: any) {    
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

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
    });
  }
  
  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  getPartyMisLocationInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedPartyMisLocationDetail.partyId; 
    this.partyMisLocationsService.getPartyMisLocationInnerGridList(this.requestmodel).subscribe((res) => {
      this.formRatesArray.clear();
      this.partymislocationmodels = res;
      for (let i = 0; i < res.partyMisLocationDetailList.length; i++) {
        this.formRatesArray.push(this.createMisArray());     
        this.formRatesArray.controls[i].get("locationId")?.setValue(this.locationList.find(e => e.dataId == res.partyMisLocationDetailList[i].locationId));
      }     
    });
  }  
    
  selectToLocationEvent(item: any,index:number) {
    var ToPlace = item.dataId;
    var selectedDataValue=this.formUser.getRawValue();
    for (let i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(ToPlace == selectedDataValue.arrayList[i].locationId.dataId)
      {
        this.toastrService.warning("Location already exits in grid");
        this.formRatesArray.controls[index].get("locationId")?.setValue("");
        return;
      }
    }
  }  
   
    
  Delete(): void {
    if(this.selectedPartyMisLocationDetail.partyId  != '' ){
    this.requestmodel.strRequest =this.selectedPartyMisLocationDetail.partyId 
      if (confirm("Are you sure, you want to delete this?")) {
        this.partyMisLocationsService.partyMisLocationDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/partymisloc']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
    
  exit(): void {
    this.route.navigate(['/partymisloc']);
  }  


  submitpartyMislocationForm(): void {
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
    if (selectedDataValue.partyId.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning("Party is Invalid");
      return;
    }

    this.partymislocationmodels.partyId= selectedDataValue.partyId.dataId;
    
    this.partymislocationmodels.partyMisLocationDetailList = [];
          
    for (let i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].locationId.dataId) {
        this.partymislocationmodels.partyMisLocationDetailList.push({
          'partyId': selectedDataValue.partyId.dataId,
          'locationId': selectedDataValue.arrayList[i].locationId.dataId,  
        }) 
      }
      else{
        this.toastrService.warning("Loacation is Invalid");
        return;
      }
    }        
    
    this.partyMisLocationsService.partymislocationSubmitted(this.partymislocationmodels).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/partymisloc']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
} 
    
    
      
  
  



      
