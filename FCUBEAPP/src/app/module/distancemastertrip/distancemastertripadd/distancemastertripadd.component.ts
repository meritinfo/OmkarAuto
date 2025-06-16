import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Distancemastertripmodel } from 'src/app/models/distancemastertripmodel';
import { DistancemastertripService } from 'src/app/services/distancemastertrip.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-distancemastertripadd',
  templateUrl: './distancemastertripadd.component.html',
  styleUrls: ['./distancemastertripadd.component.css']
})
export class DistancemastertripaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  allLocationList: Dropdownmodel[] = [];
  
  formDistanceMasterTrip!: FormGroup;
  selectedDistancemastertripDetails = new Distancemastertripmodel();
  distancemsttripmodel = new Distancemastertripmodel();
  
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();
  validationDetails = new Responsemodel();
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  createmode =true;
  selectedLocation: string[] = [];

  constructor(private distancemastertripmodel: Distancemastertripmodel, 
    private route: Router, private formBuilder: FormBuilder, 
    private commonService: CommonService, private distanceMastertripService: DistancemastertripService, 
    private toasterService: ToastrService,private requestmodel: Requestmodel,
    private sharedService: SharedService,) {
    this.distancemastertripmodel = new Distancemastertripmodel();
  }
  
  ngOnInit(): void {
    this.sharedService.loading = true;
    //Privilege check
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP"));
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
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
        this.editMode = true;          
        this.formDistanceMasterTrip.controls['fromLocation'].disable();
        this.formDistanceMasterTrip.controls['validFrom'].disable();
        this.formDistanceMasterTrip.controls['validUpto'].disable();
        this.getFreightTripInnerGridList();
      }
      this.sharedService.loading = false;
    }, 2000);   

  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
      this.allLocationList = res;
    });
  }
 
  get f() { return this.formDistanceMasterTrip.controls; }
  get formArray() {
    return this.formDistanceMasterTrip.get("arrayList") as FormArray;
  }

  selectToLocationEvent(item: any,index:number) {
    var ToPlace = item.dataId;
    var selectedDataValue=this.formDistanceMasterTrip.getRawValue();
    if(ToPlace == selectedDataValue.fromLocation.dataId)
    {
      this.toasterService.warning("To location can not be same as From Location");
      this.formArray.controls[index].get("toLocation")?.setValue("");
      return;
    }
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(ToPlace == selectedDataValue.arrayList[i].toLocation.dataId)
      {
        this.toasterService.warning("To location already exits in grid");
        this.formArray.controls[index].get("toLocation")?.setValue("");
        return;
      }
    }
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

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  addItem(index: number): void {
    if (this.formArray.value[index].toLocation != "" && this.formArray.value[index].kms != "") {
      this.formArray.push(this.createInitialArray());
    } else {
      this.toasterService.warning("Please select one To Location, enterKM");
    }
  }

  getFreightTripInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedDistancemastertripDetails.masterID;
    this.distanceMastertripService.getFreightTripInnerGridList(this.requestmodel).subscribe((res) => {
      this.formArray.clear();
      this.distancemsttripmodel = res;
      for (var i = 0; i < res.distanceDetailsTripList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("toLocation")?.setValue(this.locationList.find(e => e.dataId == res.distanceDetailsTripList[i].toLocation));
        this.formArray.controls[i].get("kms")?.setValue(res.distanceDetailsTripList[i].kms);
        this.formArray.controls[i].get("enrouteExpTruck")?.setValue(res.distanceDetailsTripList[i].enrouteExpTruck);
        this.formArray.controls[i].get("enrouteExpTrailer")?.setValue(res.distanceDetailsTripList[i].enrouteExpTrailer);
        this.formArray.controls[i].get("enrouteExpCarCarrier")?.setValue(res.distanceDetailsTripList[i].enrouteExpCarCarrier);
        this.formArray.controls[i].get("enrouteExpEmpty")?.setValue(res.distanceDetailsTripList[i].enrouteExpEmpty);
        this.formArray.controls[i].get("enrouteExpRemarks")?.setValue(res.distanceDetailsTripList[i].enrouteExpRemarks);
        this.formArray.controls[i].get("definedTollExp")?.setValue(res.distanceDetailsTripList[i].definedTollExp);
      }     
    });
  }


  createInitialArray() {
    return this.formBuilder.group({
      toLocation: ['', []],
      kms: ['0', []],
      enrouteExpTruck: ['0', []],
      enrouteExpTrailer: ['0', []],
      enrouteExpCarCarrier: ['0', []],
      enrouteExpEmpty: ['0', []],
      enrouteExpRemarks: ['', []],
      defineTollExp: ['0', []],
    });
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
    }
  }

  distanceMasterTripDelete(): void {
    if(this.selectedDistancemastertripDetails.masterID != '' ){
     this.requestmodel.strRequest =this.selectedDistancemastertripDetails.masterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.distanceMastertripService.distanceMasterTripDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formDistanceMasterTrip.reset();
              this.route.navigate(['/distancemastertriplist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }   
        });
      }
    }
  }

  //Submit form details //
  submitDistanceMasterFreightForm(): void {
    if (this.formDistanceMasterTrip.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formDistanceMasterTrip.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var selectedDataValue = this.formDistanceMasterTrip.getRawValue();
    this.distancemastertripmodel.masterID       = this.selectedDistancemastertripDetails.masterID ;
    this.distancemastertripmodel.fromLocation   = selectedDataValue.fromLocation.dataId;
    this.distancemastertripmodel.validFrom      = selectedDataValue.validFrom;
    this.distancemastertripmodel.validUpto      = selectedDataValue.validUpto;
    this.distancemastertripmodel.loggedInUser   = this.loggedInUserID;

    this.distancemastertripmodel.distanceDetailsTripList = [];
    for (var i = 0; i < this.formDistanceMasterTrip.value.arrayList.length; i++) {
      if (this.formDistanceMasterTrip.value.arrayList[i].toLocation != '') {
        this.distancemastertripmodel.distanceDetailsTripList.push({
          'masterID': '',
          'fromLocation': selectedDataValue.fromLocation.dataId,
          'toLocation': selectedDataValue.arrayList[i].toLocation.dataId,
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
      this.toasterService.warning("From location cannot be same as To Location in details grid");
      return;
    }

    //Duplicate destination check
    const foundDuplicateName = this.distancemastertripmodel.distanceDetailsTripList.find((data, index) => {
      return this.distancemastertripmodel.distanceDetailsTripList.find((x, ind) => x.toLocation === data.toLocation && index !== ind);
    })
    if (foundDuplicateName) {
      this.toasterService.warning("Duplicate To Location in details grid not allowed");
      return;
    }
    if(this.selectedDistancemastertripDetails.masterID==''){
      this.distanceMastertripService.chkdistanceTripValidity(this.distancemastertripmodel).subscribe((res: Responsemodel) => {
        this.validationDetails = res;
        if (this.validationDetails.status){   
          //ignore
        }
        else{
          this.toasterService.warning(this.validationDetails.message);  
          return;  
        }
      });
    }
    this.formSubmitted = true;
    this.distanceMastertripService.distanceMastertripSubmitted(this.distancemastertripmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formDistanceMasterTrip.reset();
        this.route.navigate(['/distancemastertriplist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }   
    });
  }  

  exit(): void {
    this.route.navigate(['/distancemastertriplist']);
  }
}


