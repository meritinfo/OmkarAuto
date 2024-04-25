import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Distancetripeditmodel } from 'src/app/models/distancetripeditmodel';
import { DistancemastertripService } from 'src/app/services/distancemastertrip.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-distancetripedit',
  templateUrl: './distancetripedit.component.html',
  styleUrls: ['./distancetripedit.component.css']
})
export class DistancetripeditComponent {
  loggedInUserID: string = '';
  year: string = '';
  fromlocationList: Dropdownmodel[] = [];
  tolocationList: Dropdownmodel[] = [];
  formDistanceTrip!: FormGroup;
  keywordLocation = 'dataName';
  selectedLocation: string[] = [];
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  fromMasterId:string="";
   constructor(private distancetripeditmodel: Distancetripeditmodel, 
    private route: Router, private formBuilder: FormBuilder, 
    private commonService: CommonService, 
    private distancemastertripService: DistancemastertripService, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private sharedService: SharedService,) {
    this.distancetripeditmodel = new Distancetripeditmodel();
  }
   ngOnInit(): void {
     //Privilege check
     var menuData = sessionStorage.getItem('menulist')?.toString();
     if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
       var privilegeData = JSON.parse(menuData);
       var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
       var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Add/Edit Distance-TRIP");
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
    this.getFromLocationList();
    this.getToLocationList();
    
    this.formDistanceTrip = this.formBuilder.group({
      fromLocation: new FormControl('', [Validators.required]),
      validUpto: new FormControl('',),
      toLocation: new FormControl('', [Validators.required]),
      kms: new FormControl('0', [Validators.required]),
      enrouteExpTruck:  new FormControl('', ),
      enrouteExpTrailer:  new FormControl('', ),
      enrouteExpCarCarrier:  new FormControl('', ),
      enrouteExpEmpty:  new FormControl('', ),
      enrouteExpRemarks:  new FormControl('', ),
      definedTollExp:  new FormControl('', ),
    });  
   }
   getFromLocationList(): void {
    this.distancemastertripService.getFromLocationList().subscribe((res: Dropdownmodel[]) => {
      this.fromlocationList = res;
    });  
  }
   getToLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.tolocationList = res;
    });
  }
   get f() { return this.formDistanceTrip.controls; }
   selectEvent(item: any) {
    // do something with selected item
    this.requestmodel.strRequest=item.dataId;
    this.distancemastertripService.getDistanceTripMasterDtls(this.requestmodel).subscribe((res: Distancetripeditmodel) => {
      this.distancetripeditmodel = res;
      this.fromMasterId=res.masterID;
      this.formDistanceTrip.patchValue({
        validUpto: this.commonService.formatDate(res.validUpto)
      })
    });       
    this.formDistanceTrip.controls['validUpto'].disable();   
    this.formDistanceTrip.controls['fromLocation'].disable();    
  }
   selectToEvent(item: any) {
    // do something with selected item
    var selectedDataVal = this.formDistanceTrip.getRawValue();
    this.distancetripeditmodel.masterID             = this.fromMasterId;
    this.distancetripeditmodel.fromLocation         = selectedDataVal.fromLocation.dataId;
    this.distancetripeditmodel.toLocation           = item.dataId;
    this.distancetripeditmodel.distanceDtlID        = "";
    this.distancetripeditmodel.kms                  = "";
    this.distancetripeditmodel.enrouteExpTruck      = "";
    this.distancetripeditmodel.enrouteExpTrailer    = "";
    this.distancetripeditmodel.enrouteExpCarCarrier = "";
    this.distancetripeditmodel.enrouteExpEmpty      = "";
    this.distancetripeditmodel.enrouteExpRemarks    = "";
    this.distancetripeditmodel.definedTollExp       = "";
    this.distancemastertripService.getDistanceTripDetails(this.distancetripeditmodel).subscribe((res: Distancetripeditmodel) => {
      this.distancetripeditmodel = res
      this.formDistanceTrip.patchValue({
        kms: res.kms,
        enrouteExpTruck: res.enrouteExpTruck,
        enrouteExpTrailer: res.enrouteExpTrailer, 
        enrouteExpCarCarrier: res.enrouteExpCarCarrier,
        enrouteExpEmpty : res.enrouteExpEmpty,    
        enrouteExpRemarks : res.enrouteExpRemarks,  
        definedTollExp : res.definedTollExp, 
      })
      if(this.distancetripeditmodel.distanceDtlID==""){
        this.formDistanceTrip.patchValue({
          kms: "0"
        })  
        this.toasterService.warning("Destination Not Found for the Selected From Location, Enter New Data");
      }
    });     
    this.formDistanceTrip.controls['toLocation'].disable();     
  }
  
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e: any) {
    // do something
  }
   startWithFilter = function (list: Dropdownmodel[], query: string): any[] {
    return list.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
   exit(): void { 
    this.formDistanceTrip.reset();   
    window.location.reload();
  }
   submitDistanceFreightForm(){
    this.formSubmitted = true;
    if (this.formDistanceTrip.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formDistanceTrip.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var selectedDataVal = this.formDistanceTrip.getRawValue();
    if (parseFloat(selectedDataVal.kms)==0) {
      this.toasterService.warning(" KMS should not be Zero");   
      return;
    }

    this.distancetripeditmodel.masterID             = this.fromMasterId;
    this.distancetripeditmodel.fromLocation         = selectedDataVal.fromLocation.dataId;
    this.distancetripeditmodel.toLocation           = selectedDataVal.toLocation.dataId;
    this.distancetripeditmodel.kms                  = selectedDataVal.kms;
    this.distancetripeditmodel.enrouteExpTruck      = selectedDataVal.enrouteExpTruck;
    this.distancetripeditmodel.enrouteExpTrailer    = selectedDataVal.enrouteExpTrailer;
    this.distancetripeditmodel.enrouteExpCarCarrier = selectedDataVal.enrouteExpCarCarrier;
    this.distancetripeditmodel.enrouteExpEmpty      = selectedDataVal.enrouteExpEmpty;
    this.distancetripeditmodel.enrouteExpRemarks    = selectedDataVal.enrouteExpRemarks;
    this.distancetripeditmodel.definedTollExp       = selectedDataVal.definedTollExp;
    this.distancemastertripService.distanceTripEditSubmit(this.distancetripeditmodel).subscribe((res: Responsemodel) => {
      this.responseDetails=res;
      if(res.status){
        this.formDistanceTrip.reset();
        this.toasterService.success(this.responseDetails.message);  
        window.location.reload();  
      }    
      else{
        this.toasterService.warning(this.responseDetails.message); 
      }    
    }); 
  }
  
}
  