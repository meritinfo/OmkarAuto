import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Distancemastertripmodel } from 'src/app/models/distancemastertripmodel';
import { DistancemastertripService } from 'src/app/services/distancemastertrip.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { FreighttripInnergridlistrequest } from 'src/app/models/freighttripInnergridlistrequest';
import { Responsemodel } from 'src/app/models/responsemodel';

@Component({
  selector: 'app-distancemastertripadd',
  templateUrl: './distancemastertripadd.component.html',
  styleUrls: ['./distancemastertripadd.component.css']
})
export class DistancemastertripaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  ivToPlace = '';
  locationList: Dropdownmodel[] = [];
  allLocationList: Dropdownmodel[] = [];
  formDistanceMasterTrip!: FormGroup;
  selectedDistancemastertripDetails = new Distancemastertripmodel();
  distancemsttripmodel = new Distancemastertripmodel();
  
  keywordLocation = 'dataName';
  freighttripInnergridlistrequest = new FreighttripInnergridlistrequest();

  formSubmitted = false;
  responseDetails = new Responsemodel();
  validationDetails = new Responsemodel();
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  createmode =true;
  selectedLocation: string[] = [];

  constructor(private distancemastertripmodel: Distancemastertripmodel, private route: Router, private formBuilder: FormBuilder, private commonService: CommonService, private distanceMastertripService: DistancemastertripService, private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.distancemastertripmodel = new Distancemastertripmodel();

  }
  ngOnInit(): void {
    //Privilege check
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP");
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
    this.getLocationList();

    this.selectedDistancemastertripDetails = this.distanceMastertripService.getDistancemastertripDetails();
    this.formDistanceMasterTrip = this.formBuilder.group({
      fromLocation: new FormControl('', [Validators.required]),
      validFrom: new FormControl('', [Validators.required]),
      validUpto: new FormControl('', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])
    });
    setTimeout(() => {
      if (this.selectedDistancemastertripDetails.masterID != '') {
        this.formDistanceMasterTrip.patchValue(this.selectedDistancemastertripDetails);

        this.formDistanceMasterTrip.patchValue({
          validFrom: this.commonService.formatDate(this.selectedDistancemastertripDetails.validFrom),
          validUpto: this.commonService.formatDate(this.selectedDistancemastertripDetails.validUpto),
          fromLocation: this.locationList.find(e => e.dataId == this.selectedDistancemastertripDetails.fromLocation),
        });
        this.formDistanceMasterTrip.controls['fromLocation'].disable();
        this.editMode = true;
        this.freighttripInnergridlistrequest.masterId = parseInt(this.selectedDistancemastertripDetails.masterID);
        this.getFreightTripInnerGridList();
      }
    }, 2000);

  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
      this.allLocationList = res;
    });
  }
  popupClosedToPlace() {
    if (!this.ivToPlace) {
      this.formDistanceMasterTrip.patchValue({
        fromLocation: ''
      });
    }
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDistanceMasterTrip.controls; }
  get formArray() {
    return this.formDistanceMasterTrip.get("arrayList") as FormArray;
  }

  selectEvent(item: any) {
    // do something with selected item
    this.selectedLocation = [];
    this.ivToPlace = item.dataId;
    this.selectedLocation.push(item.dataId);
    this.selectedLocation.push(this.formDistanceMasterTrip.value.fromLocation.dataId);
    for (var i = 0; i < this.formDistanceMasterTrip.value.arrayList.length; i++) {
      this.selectedLocation.push(this.formArray.controls[i].get("toLocation")?.value.dataId);
    }
    this.locationList = this.allLocationList.filter(aa => this.selectedLocation.indexOf(aa.dataId) === -1);
  }

  clearLocation(item: any, index: number) {
    var removedDataId = this.formArray.controls[index].get("toLocation")?.value.dataId;
    const dataindex = this.selectedLocation.indexOf(removedDataId);
    if (dataindex !== -1) {
      this.selectedLocation.splice(dataindex, 1);
    }
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("change")
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  addItem(index: number): void {
    if (this.formArray.value[index].toLocation != "" && this.formArray.value[index].kms != "") {
      this.formArray.push(this.createInitialArray());
    } else {
      this.toasterService.warning("Please select one destination name, enterKM");
    }
  }

  getFreightTripInnerGridList(): void {
    this.distanceMastertripService.getFreightTripInnerGridList(this.freighttripInnergridlistrequest).subscribe((res) => {
      this.distancemsttripmodel = res;
      for (var i = 0; i < res.distanceDetailsTripList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("fromLocation")?.setValue(this.locationList.find(e => e.dataId == res.distanceDetailsTripList[i].fromLocation));
        this.formArray.controls[i].get("toLocation")?.setValue(this.locationList.find(e => e.dataId == res.distanceDetailsTripList[i].toLocation));
        this.formArray.controls[i].get("kms")?.setValue(res.distanceDetailsTripList[i].kms);
        this.formArray.controls[i].get("enrouteExpTruck")?.setValue(res.distanceDetailsTripList[i].enrouteExpTruck);
        this.formArray.controls[i].get("enrouteExpTrailer")?.setValue(res.distanceDetailsTripList[i].enrouteExpTrailer);
        this.formArray.controls[i].get("enrouteExpCarCarrier")?.setValue(res.distanceDetailsTripList[i].enrouteExpCarCarrier);
        this.formArray.controls[i].get("enrouteExpEmpty")?.setValue(res.distanceDetailsTripList[i].enrouteExpEmpty);
        this.formArray.controls[i].get("enrouteExpRemarks")?.setValue(res.distanceDetailsTripList[i].enrouteExpRemarks);
        this.formArray.controls[i].get("definedTollExp")?.setValue(res.distanceDetailsTripList[i].definedTollExp);
        // this.formDistanceMasterTrip.value.arrayList.patchValue({
        //   'fromLocation': res.distanceDetailsTripList[i].fromLocation,
        //   'toLocation': res.distanceDetailsTripList[i].toLocation,
        //   'kms': res.distanceDetailsTripList[i].kms,
        //   'enrouteExpTruck': res.distanceDetailsTripList[i].enrouteExpTruck,
        //   'enrouteExpTrailer': res.distanceDetailsTripList[i].enrouteExpTrailer,
        //   'enrouteExpCarCarrier': res.distanceDetailsTripList[i].enrouteExpCarCarrier,
        //   'enrouteExpEmpty': res.distanceDetailsTripList[i].enrouteExpEmpty,
        //   'enrouteExpRemarks': res.distanceDetailsTripList[i].enrouteExpRemarks,
        //   'definedTollExp': res.distanceDetailsTripList[i].definedTollExp,
        // })
      }
      // this.formDistanceMasterTrip.patchValue({
      //   arrayList: res.distanceDetailsTripList
      // })
    });
  }


  createInitialArray() {
    return this.formBuilder.group({
      fromLocation: ['', []],
      toLocation: ['', []],
      kms: ['', []],

      index: ['', []],
      enrouteExpTruck: ['', []],
      enrouteExpTrailer: ['', []],
      enrouteExpCarCarrier: ['', []],
      enrouteExpEmpty: ['', []],
      enrouteExpRemarks: ['', []],
      defineTollExp: ['', []],
    });
  }

  removeItem(index: number) {
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
    }
  }
  distanceMasterTripDelete(): void {
    if(this.selectedDistancemastertripDetails.masterID != '' ){
     this.requestmodel.strRequest =this.selectedDistancemastertripDetails.masterID
      if (confirm("Are you sure, you want to delete this?")) {
            this.distanceMastertripService.distanceMasterTripDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formDistanceMasterTrip.reset();
            window.location.reload();
        });
      }
    }
  }

  //Submit form details //
  submitDistanceMasterFreightForm(): void {
    this.formSubmitted = true;
    if (this.formDistanceMasterTrip.invalid) {
      this.toasterService.warning("All fields are mandatory");
      if (this.formDistanceMasterTrip.controls['arrayList'].invalid) {
        this.toasterService.warning("Details fields are mandatory");
      }
      return;
    }
    var selectedDataValue = this.formDistanceMasterTrip.getRawValue();
    this.distancemastertripmodel.masterID = this.selectedDistancemastertripDetails.masterID != '' ? this.selectedDistancemastertripDetails.masterID : '';
    this.distancemastertripmodel.fromLocation = selectedDataValue.fromLocation.dataId;
    this.distancemastertripmodel.validFrom = selectedDataValue.validFrom;
    this.distancemastertripmodel.validUpto = selectedDataValue.validUpto;
    this.distancemastertripmodel.loggedInUser = this.loggedInUserID;

    this.distancemastertripmodel.distanceDetailsTripList = [];
    for (var i = 0; i < this.formDistanceMasterTrip.value.arrayList.length; i++) {
      if (this.formDistanceMasterTrip.value.arrayList[i].toLocation != '') {
        this.distancemastertripmodel.distanceDetailsTripList.push({
          'distanceDtlID': this.distancemsttripmodel.distanceDetailsTripList.length > i ? this.distancemsttripmodel.distanceDetailsTripList[i].distanceDtlID : '',
          'index': '',
          'masterID': '',
          'fromLocation': selectedDataValue.fromLocation.dataId,
          //'toLocation': this.formDistanceMasterTrip.value.arrayList[i].toLocation.dataId,
          'toLocation': selectedDataValue.arrayList[i].toLocation.dataId,
          'toLocationName': selectedDataValue.arrayList[i].toLocation.dataId,
          'fromLocationName': selectedDataValue.arrayList[i].toLocation.dataId,
          'kms': selectedDataValue.arrayList[i].kms,
          'enrouteExpTruck': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpTruck.toString(),
          'enrouteExpTrailer': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpTrailer.toString(),
          'enrouteExpCarCarrier': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpCarCarrier.toString(),
          'enrouteExpEmpty': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpEmpty.toString(),
          'enrouteExpRemarks': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpRemarks,
          'definedTollExp': this.formDistanceMasterTrip.value.arrayList[i].defineTollExp.toString(),

        })
      }
    }

    //Start date end date validation
    if (Date.parse(this.distancemastertripmodel.validUpto) < Date.parse(this.distancemastertripmodel.validFrom)) {
      this.toasterService.warning("End date should be greter than start date");
      return;
    }

    //From Location & Destination validation
    const found = this.distancemastertripmodel.distanceDetailsTripList.some(el => el.toLocation === this.distancemastertripmodel.fromLocation);
    if (found) {
      this.toasterService.warning("From location cannot be same as destination in details grid");
      return;
    }


    //Duplicate destination check
    const foundDuplicateName = this.distancemastertripmodel.distanceDetailsTripList.find((data, index) => {
      return this.distancemastertripmodel.distanceDetailsTripList.find((x, ind) => x.toLocation === data.toLocation && index !== ind);
    })
    if (foundDuplicateName) {
      this.toasterService.warning("Duplicate destination in details grid not allowed");
      return;
    }
    if(this.distancemastertripmodel.masterID==''){
      this.distancemastertripmodel.validFrom = this.formDistanceMasterTrip.value.validFrom;
      this.distancemastertripmodel.validUpto = this.formDistanceMasterTrip.value.validUpto;
      this.distancemastertripmodel.fromLocation = this.formDistanceMasterTrip.value.fromLocation.dataId;
      this.distanceMastertripService.chkdistanceTripValidity(this.distancemastertripmodel).subscribe((res: Responsemodel) => {
        this.validationDetails = res;
        if (this.validationDetails.status){        
          console.log(this.validationDetails.message);
          this.distanceMastertripService.distanceMastertripSubmitted(this.distancemastertripmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formDistanceMasterTrip.reset();
            this.route.navigate(['/distancemastertriplist']);
          });
        }
        else{
          this.toasterService.warning(this.validationDetails.message);
          this.formDistanceMasterTrip.patchValue({
            validFrom: '',
            validUpto:''
          });
          return;
        }
      });
    }

   
  }

  deleteDistanceMasterFreightForm(): void {
    if (confirm("Are you sure, you want to delete this?")) {

    }
  }

  exit(): void {
    this.route.navigate(['/distancemastertriplist']);
  }
}


