import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Distancemastertripmodel } from 'src/app/models/distancemastertripmodel';
import { DistancemastertripService } from 'src/app/services/distancemastertrip.service';
import { Responsemodel } from 'src/app/models/responsemodel';

@Component({
  selector: 'app-distancemastertripadd',
  templateUrl: './distancemastertripadd.component.html',
  styleUrls: ['./distancemastertripadd.component.css']
})
export class DistancemastertripaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  formDistanceMasterTrip!: FormGroup;
  selectedDistancemastertripDetails = new Distancemastertripmodel();
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private distancemastertripmodel: Distancemastertripmodel, private route: Router, private formBuilder: FormBuilder, private commonService: CommonService, private distanceMastertripService: DistancemastertripService, private toasterService: ToastrService) {
    this.distancemastertripmodel = new Distancemastertripmodel();

}
ngOnInit(): void {
  var yearIDData = localStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  var userData = localStorage.getItem('uid')?.toString();
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
  if (this.selectedDistancemastertripDetails.masterID != '') {
    this.formDistanceMasterTrip.patchValue(this.selectedDistancemastertripDetails);

    this.formDistanceMasterTrip.patchValue({
      fromLocation: this.selectedDistancemastertripDetails.fromLocation,
      validFrom: this.selectedDistancemastertripDetails.validFrom,
      validUpto: this.selectedDistancemastertripDetails.validUpto,
    })
  }
}

getLocationList(): void {
  this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
    this.locationList = res;
  });
}

// convenience getter for easy access to contact form fields
get f() { return this.formDistanceMasterTrip.controls; }
get formArray() {
  return this.formDistanceMasterTrip.get("arrayList") as FormArray;
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
    destination: ['', [Validators.required]],
    enterKM: ['', [Validators.required]]
  });
}

removeItem(index: number) {
  this.formArray.removeAt(index);
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
  this.distancemastertripmodel.masterID = this.selectedDistancemastertripDetails.masterID != '' ? this.selectedDistancemastertripDetails.masterID : '';
  this.distancemastertripmodel.fromLocation = this.formDistanceMasterTrip.value.fromLocation.dataId;
  this.distancemastertripmodel.validFrom = this.formDistanceMasterTrip.value.validFrom;
  this.distancemastertripmodel.validUpto = this.formDistanceMasterTrip.value.validUpto;
  this.distancemastertripmodel.loggedInUser = this.loggedInUserID;

  this.distancemastertripmodel.distanceDetailsTripList = [];
  for (var i = 0; i < this.formDistanceMasterTrip.value.arrayList.length; i++) {
    this.distancemastertripmodel.distanceDetailsTripList.push({
     'index': '',
      'masterID': '',
      'fromLocation': this.formDistanceMasterTrip.value.fromLocation.dataId,
      'toLocation': this.formDistanceMasterTrip.value.arrayList[i].destination.dataId,
      'kms': this.formDistanceMasterTrip.value.arrayList[i].enterKM,
      'enrouteExpTruck': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpTruck,
      'enrouteExpTrailer': this.formDistanceMasterTrip.value.arrayList[i].enterKM,
      'enrouteExpCarCarrier': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpCarCarrier,
      'enrouteExpEmpty': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpEmpty,
      'enrouteExpRemarks': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpRemarks,
      'defineTollExp': this.formDistanceMasterTrip.value.arrayList[i].defineTollExp,
    })
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

  this.distanceMastertripService.distanceMastertripSubmitted(this.distancemastertripmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formDistanceMasterTrip.reset();
    window.location.reload();
  });
}

}


