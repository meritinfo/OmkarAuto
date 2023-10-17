import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Distancemasterfreightmodel } from 'src/app/models/distancemasterfreightmodel';
import { DistancemasterfreightmasterService } from 'src/app/services/distancemasterfreightmaster.service';
import { Responsemodel } from 'src/app/models/responsemodel';

@Component({
  selector: 'app-distancemasterfreightadd',
  templateUrl: './distancemasterfreightadd.component.html',
  styleUrls: ['./distancemasterfreightadd.component.css']
})
export class DistancemasterfreightaddComponent implements OnInit {

  loggedInUserID: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  formDistanceMasterFreight!: FormGroup;
  selectedDistancemasterfreightDetails = new Distancemasterfreightmodel();
  keywordLocation = 'dataName';
  ivToPlace = '';
  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private distancemasterfreightmodel: Distancemasterfreightmodel, private route: Router, private formBuilder: FormBuilder, private commonService: CommonService, private distanceMasterFreightService: DistancemasterfreightmasterService, private toasterService: ToastrService) {
    this.distancemasterfreightmodel = new Distancemasterfreightmodel();
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
    this.selectedDistancemasterfreightDetails = this.distanceMasterFreightService.getDistancemasterfreightDetails();
    this.formDistanceMasterFreight = this.formBuilder.group({
      fromLocation: new FormControl('', [Validators.required]),
      validFrom: new FormControl('', [Validators.required]),
      validUpto: new FormControl('', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])
    });
    if (this.selectedDistancemasterfreightDetails.masterID != '') {
      this.formDistanceMasterFreight.patchValue(this.selectedDistancemasterfreightDetails);

      this.formDistanceMasterFreight.patchValue({
       // fromLocation: this.selectedDistancemasterfreightDetails.fromLocation,
        validFrom: this.selectedDistancemasterfreightDetails.validFrom,
        validUpto: this.selectedDistancemasterfreightDetails.validUpto,
        fromLocation: this.locationList.find(e => e.dataId == this.selectedDistancemasterfreightDetails.fromLocation),
      })
    }
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
    });
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDistanceMasterFreight.controls; }
  get formArray() {
    return this.formDistanceMasterFreight.get("arrayList") as FormArray;
  }

  selectEvent(item: any) {
    this.ivToPlace = item.dataId;
    // do something with selected item
    
  }
  popupClosedToPlace() {
    if (!this.ivToPlace) {
      this.formDistanceMasterFreight.patchValue({
        fromLocation: ''
      });
    }
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
    if (this.formDistanceMasterFreight.invalid) {
      this.toasterService.warning("All fields are mandatory");
      if (this.formDistanceMasterFreight.controls['arrayList'].invalid) {
        this.toasterService.warning("Details fields are mandatory");
      }
      return;
    }
    this.distancemasterfreightmodel.masterID = this.selectedDistancemasterfreightDetails.masterID != '' ? this.selectedDistancemasterfreightDetails.masterID : '';
    this.distancemasterfreightmodel.fromLocation = this.formDistanceMasterFreight.value.fromLocation.dataId;
    this.distancemasterfreightmodel.validFrom = this.formDistanceMasterFreight.value.validFrom;
    this.distancemasterfreightmodel.validUpto = this.formDistanceMasterFreight.value.validUpto;
    this.distancemasterfreightmodel.loggedInUser = this.loggedInUserID;

    this.distancemasterfreightmodel.distanceDetailsFreightList = [];
    for (var i = 0; i < this.formDistanceMasterFreight.value.arrayList.length; i++) {
      this.distancemasterfreightmodel.distanceDetailsFreightList.push({
        'index': '',
        'masterID': '',
        'fromLocation': this.formDistanceMasterFreight.value.fromLocation.dataId,
        'toLocation': this.formDistanceMasterFreight.value.arrayList[i].destination.dataId,
        'kms': this.formDistanceMasterFreight.value.arrayList[i].enterKM
      })
    }

    //Start date end date validation
    if (Date.parse(this.distancemasterfreightmodel.validUpto) < Date.parse(this.distancemasterfreightmodel.validFrom)) {
      this.toasterService.warning("End date should be greter than start date");
      return;
    }

    //From Location & Destination validation
    const found = this.distancemasterfreightmodel.distanceDetailsFreightList.some(el => el.toLocation === this.distancemasterfreightmodel.fromLocation);
    if (found) {
      this.toasterService.warning("From location cannot be same as destination in details grid");
      return;
    }

    //Duplicate destination check
    const foundDuplicateName = this.distancemasterfreightmodel.distanceDetailsFreightList.find((data, index) => {
      return this.distancemasterfreightmodel.distanceDetailsFreightList.find((x, ind) => x.toLocation === data.toLocation && index !== ind);
    })
    if (foundDuplicateName) {
      this.toasterService.warning("Duplicate destination in details grid not allowed");
      return;
    }

    this.distanceMasterFreightService.distanceMasterFreightSubmitted(this.distancemasterfreightmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formDistanceMasterFreight.reset();
      window.location.reload();
    });
  }
  

}
