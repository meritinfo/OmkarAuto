

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Distancemasterfreightmodel } from 'src/app/models/distancemasterfreightmodel';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ratesmastermodel } from 'src/app/models/ratesmastermodel';

@Component({
  selector: 'app-addratesmaster',
  templateUrl: './addratesmaster.component.html',
  styleUrls: ['./addratesmaster.component.css']
})
export class AddratesmasterComponent implements OnInit {

  loggedInUserID: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  formRatesMaster!: FormGroup;
  selectedRatesMaster = new Ratesmastermodel();
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private ratesmastermodel: Ratesmastermodel, private route: Router, private formBuilder: FormBuilder, private commonService: CommonService, private ratesMasterService: RatesMasterService, private toasterService: ToastrService) {
    this.ratesmastermodel = new Ratesmastermodel();
  }

  ngOnInit(): void {
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
    this.getLocationList();
    this.getRateList();
    this.getCreditAcList()
    this.selectedRatesMaster = this.ratesMasterService.getRatesMasterDetails();
    this.formRatesMaster = this.formBuilder.group({
      accountId: new FormControl('', []),
      fromPlace: new FormControl('', []),
      validFrom: new FormControl('', []),
      validUpto: new FormControl('', []),
      rateTypeId: new FormControl('', []),
      rateMethod: new FormControl('', []),
      rateForStateOrToPlace: new FormControl('', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])
    });
    if (this.selectedRatesMaster.masterID != '') {
      this.formRatesMaster.patchValue(this.selectedRatesMaster);

      this.formRatesMaster.patchValue({
        FromPlace: this.selectedRatesMaster.fromPlace,
        validFrom: this.selectedRatesMaster.validFrom,
        validUpto: this.selectedRatesMaster.validUpto,
      })
    }
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

  addItem(): void {
    this.formArray.push(this.createInitialArray());
  }

  createInitialArray() {
    return this.formBuilder.group({
      destState: ['', [Validators.required]],
      toPlace: ['', [Validators.required]],
      rateTypeId: ['', []],
      rate: ['', []],
    });
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }

  //Submit form details //
  submitRatesMasterForm(): void {
    this.formSubmitted = true;
    if (this.formRatesMaster.invalid) {
      this.toasterService.warning("All fields are mandatory");
      if (this.formRatesMaster.controls['arrayList'].invalid) {
        this.toasterService.warning("Details fields are mandatory");
      }
      return;
    }
    this.ratesmastermodel.masterID = this.ratesmastermodel.masterID != '' ? this.ratesmastermodel.masterID : '';
    this.ratesmastermodel.accountid = this.formRatesMaster.value.accountId;
    this.ratesmastermodel.validFrom = this.formRatesMaster.value.validFrom;
    this.ratesmastermodel.validUpto = this.formRatesMaster.value.validUpto;
    this.ratesmastermodel.rateMethod = this.loggedInUserID;

    this.ratesmastermodel.ratesMasterDetailsList = [];
    for (var i = 0; i < this.formRatesMaster.value.arrayList.length; i++) {
      this.ratesmastermodel.ratesMasterDetailsList.push({
        'index': '',
        'dtlId': '',
        'masterID': '',
        'destState': this.formRatesMaster.value.destState.dataId,
        'toPlace': this.formRatesMaster.value.arrayList[i].toPlace.dataId,
        'rateTypeId': this.formRatesMaster.value.arrayList[i].rateTypeId,
        'rate': this.formRatesMaster.value.arrayList[i].rate,
      })
    }

    //Start date end date validation
    if (Date.parse(this.ratesmastermodel.validUpto) < Date.parse(this.ratesmastermodel.validFrom)) {
      this.toasterService.warning("End date should be greter than start date");
      return;
    }

    //From Location & Destination validation
   // const found = this.ratesmastermodel.ratesMasterDetailsList.some(el => el.toLocation === this.ratesmastermodel.fromLocation);
    //if (found) {
     // this.toasterService.warning("From location cannot be same as destination in details grid");
     // return;
   // }

    //Duplicate destination check
    //const foundDuplicateName = this.ratesmastermodel.ratesMasterDetailsList.find((data, index) => {
   //   return this.ratesmastermodel.ratesMasterDetailsList.find((x, ind) => x.toLocation === data.toLocation && index !== ind);
  ////  })
  //  if (foundDuplicateName) {
    //  this.toasterService.warning("Duplicate destination in details grid not allowed");
     // return;
 //   }

    this.ratesMasterService.ratesMasterSubmitted(this.ratesmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formRatesMaster.reset();
      window.location.reload();
    });
  }

}
