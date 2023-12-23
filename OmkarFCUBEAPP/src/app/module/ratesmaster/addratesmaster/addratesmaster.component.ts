import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ratesmastermodel } from 'src/app/models/ratesmastermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-addratesmaster',
  templateUrl: './addratesmaster.component.html',
  styleUrls: ['./addratesmaster.component.css']
})
export class AddratesmasterComponent implements OnInit {

  loggedInUserID: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  formRatesMaster!: FormGroup;
  selectedRatesMaster = new Ratesmastermodel();
  ratesmstmodel = new Ratesmastermodel();
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();

  constructor(private ratesmastermodel: Ratesmastermodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private ratesMasterService: RatesMasterService,
    private toasterService: ToastrService) {
    this.ratesmastermodel = new Ratesmastermodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList)
      .menuList.find((aa: { menuName: string; }) => aa.menuName === "Define Booking Rates");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
    
    this.formRatesMaster = this.formBuilder.group({
      accountid: new FormControl('', [Validators.required]),
      fromPlace: new FormControl('', [Validators.required]),
      validFrom: new FormControl('', [Validators.required]),
      validUpto: new FormControl('', [Validators.required]),
      rateTypeId: new FormControl('', [Validators.required]),
      rateMethod: new FormControl('', [Validators.required]),
      rateForStateOrToPlace: new FormControl('P', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])          

    });

    this.formArray.controls[0].get("destState")?.disable();
    this.formRatesMaster.controls['rateMethod'].disable();

    this.sharedService.loading=true;
    this.getLocationList();
    this.getStateList();
    this.getRateList();
    this.getCreditAcList();
    this.selectedRatesMaster = this.ratesMasterService.getRatesMasterDetails();

    if (this.selectedRatesMaster.masterID != '') {   
      this.formRatesMaster.controls['accountid'].disable();
      this.formRatesMaster.controls['fromPlace'].disable();
    }

    setTimeout(() => {
      if (this.selectedRatesMaster.masterID != '') {    
        this.formRatesMaster.patchValue(this.selectedRatesMaster);
        if (this.selectedRatesMaster.rateTypeId=='1') {
          this.formRatesMaster.patchValue({
            rateMethod: 'KRF',
          });
        }
        else {
          this.formRatesMaster.patchValue({
            rateMethod: 'RTF',
          });
        }
        this.formRatesMaster.patchValue({
          validFrom: this.commonService.formatDate(this.selectedRatesMaster.validFrom),
          validUpto: this.commonService.formatDate(this.selectedRatesMaster.validUpto), 
        });
        this.editMode = true;
        this.getFreightRateInnerGridList();
      }
    }, 2000);
    this.sharedService.loading=false;
  }

  getFreightRateInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedRatesMaster.masterID;
    this.ratesMasterService.getFreightRateInnerGridList(this.requestmodel).subscribe((res) => {
      this.ratesmstmodel = res;
      for (var i = 0; i < res.freightRatesDetailsList.length; i++) {
        this.formArray.push(this.createInitialArray());
        if (this.selectedRatesMaster.rateForStateOrToPlace == "P"){
          this.formArray.controls[i].get("destState")?.disable();
          this.formArray.controls[i].get("toPlace")?.enable();
        }
        else{
          this.formArray.controls[i].get("toPlace")?.disable();
          this.formArray.controls[i].get("destState")?.enable();
        }
        this.formArray.controls[i].get("destState")?.setValue(this.stateList.find(e => e.dataId == res.freightRatesDetailsList[i].destState));
        this.formArray.controls[i].get("toPlace")?.setValue(this.locationList.find(e => e.dataId == res.freightRatesDetailsList[i].toPlace));
        this.formArray.controls[i].get("rate")?.setValue(res.freightRatesDetailsList[i].rate);
      }
    });
  }


  createInitialArray() {
    return this.formBuilder.group({
      destState: ['', []],
      toPlace: ['', []],
      rate: ['', []],
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
  getCreditAcList(): void {
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditacList = res;
    });
  }
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  onStateorPlaceChange(e: any) {
    this.formArray.clear();
    var selectedValue = e.target.value;
    this.formArray.push(this.createInitialArray());       
    if (selectedValue.toString() == 'P') {
      this.formArray.controls[0].get("destState")?.disable();
      this.formArray.controls[0].get("toPlace")?.enable();
    }
    else{
      this.formArray.controls[0].get("toPlace")?.disable();
      this.formArray.controls[0].get("destState")?.enable();
    }
  }

  onRateTypeChange(e: any) {
    var selectedValue = e.target.value;
    if (selectedValue.toString() == '1') {
      this.formRatesMaster.patchValue({
        rateMethod: 'KRF',
      });
    }
    else {
      this.formRatesMaster.patchValue({
        rateMethod: 'RTF',
      });
    }
  }
  
  // convenience getter for easy access to contact form fields
  get f() { return this.formRatesMaster.controls; }
  get formArray() {
    return this.formRatesMaster.get("arrayList") as FormArray;
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

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  addItem(index: number): void {
    var selectedDataVal= this.formRatesMaster.getRawValue()
    if ((this.formArray.value[index].destState != "" || this.formArray.value[index].toPlace != "") 
    && this.formArray.value[index].rate) {
      if (selectedDataVal.rateForStateOrToPlace == "P" && this.formArray.value[index].toPlace.dataId==selectedDataVal.fromPlace){
        this.toasterService.warning("From Point cannot be same as To Place in details grid");
        return;
      }
      else if (selectedDataVal.rateForStateOrToPlace == "S" && this.formArray.value[index].destState.dataId==selectedDataVal.fromPlace){
        this.toasterService.warning("From Point cannot be same as Destination State in details grid");
        return;
      }
      else {
        this.formArray.push(this.createInitialArray());  
      }    
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }
    
    var i=0;
    var selectedDataVal=this.formRatesMaster.getRawValue();
   
    for (i=0; i<this.formArray.controls.length;i++){
      if (selectedDataVal.rateForStateOrToPlace == "P"){
        this.formArray.controls[i].get("destState")?.disable();
      }
      else{
        this.formArray.controls[i].get("toPlace")?.disable();
      }
    }

  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }


  deleteRatesMasterForm(): void {
    if (this.selectedRatesMaster.masterID != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedRatesMaster.masterID;
      if (confirm("Are you sure, you want to delete this?")) {
        this.ratesMasterService.RatesMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          console.log(this.responseDetails.message);
          this.formRatesMaster.reset();
          this.route.navigate(['/ratesmasterlist']);
        });
      }
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/ratesmasterlist']);
  }

  //Submit form details //
  submitRatesMasterForm(): void {
    this.formSubmitted = true;
    if (this.formRatesMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formRatesMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
              
    if (this.formRatesMaster.controls['arrayList'].invalid) {
      this.toasterService.warning("Details fields are mandatory");
      return;
    }
    
    this.sharedService.loading=true;
    var selectedDataVal=this.formRatesMaster.getRawValue();
    this.ratesmastermodel.masterID = this.selectedRatesMaster.masterID ;
    this.ratesmastermodel.accountid = selectedDataVal.accountid?selectedDataVal.accountid:this.selectedRatesMaster.accountid;
    this.ratesmastermodel.fromPlace = selectedDataVal.fromPlace;
    this.ratesmastermodel.validFrom = selectedDataVal.validFrom;
    this.ratesmastermodel.validUpto = selectedDataVal.validUpto;
    this.ratesmastermodel.rateTypeId = selectedDataVal.rateTypeId;
    this.ratesmastermodel.rateMethod = selectedDataVal.rateMethod;
    this.ratesmastermodel.rateForStateOrToPlace = selectedDataVal.rateForStateOrToPlace;
    this.ratesmastermodel.loggedInUser = this.loggedInUserID; 

    this.ratesmastermodel.freightRatesDetailsList = [];

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if(selectedDataVal.arrayList[i].destState!='' || selectedDataVal.arrayList[i].toPlace !=''){
        this.ratesmastermodel.freightRatesDetailsList.push({
          'dtlId': '',
          'masterID': '',
          'destState': selectedDataVal.arrayList[i].destState?selectedDataVal.arrayList[i].destState.dataId:'',
          'toPlace': selectedDataVal.arrayList[i].toPlace?selectedDataVal.arrayList[i].toPlace.dataId:'',
          'rate': selectedDataVal.arrayList[i].rate,
        });
      }
    }

    //Start date end date validation
    if (Date.parse(this.ratesmastermodel.validUpto) < Date.parse(this.ratesmastermodel.validFrom)) {
      this.toasterService.warning("End date should be greater than start date");
      return;
    }

    const found = this.ratesmastermodel.freightRatesDetailsList.some(el => el.rate === '');
      if (found) {
        this.toasterService.warning("Rate cannot be Empty in details grid");
        return;
      }

    if (this.ratesmastermodel.rateForStateOrToPlace == "P") {     
      const found = this.ratesmastermodel.freightRatesDetailsList.some(el => el.toPlace === this.ratesmastermodel.fromPlace);
      if (found) {
        this.toasterService.warning("From Point cannot be same as To Place in details grid");
        return;
      }
      //Duplicate destination check
      const foundDuplicateName = this.ratesmastermodel.freightRatesDetailsList.find((data, index) => {
        return this.ratesmastermodel.freightRatesDetailsList.find((x, ind) => x.toPlace === data.toPlace && index !== ind);
      });
      if (foundDuplicateName) {
        this.toasterService.warning(" To place in details grid not allowed");
        return;
      }
    }
    else {
      const found = this.ratesmastermodel.freightRatesDetailsList.some(el => el.destState === this.ratesmastermodel.fromPlace);
      if (found) {
        this.toasterService.warning("From Point cannot be same as State in details grid");
        return;
      }

      //Duplicate destination check
      const foundDuplicateName = this.ratesmastermodel.freightRatesDetailsList.find((data, index) => {
        return this.ratesmastermodel.freightRatesDetailsList.find((x, ind) => x.destState === data.destState && index !== ind);
      });
      if (foundDuplicateName) {
        this.toasterService.warning(" State in details grid not allowed");
        return;
      }
    }

    this.ratesMasterService.ratesMasterSubmitted(this.ratesmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formRatesMaster.reset();
      this.route.navigate(['/ratesmasterlist']);
    });
    
    this.sharedService.loading=false;
  }
  

}
