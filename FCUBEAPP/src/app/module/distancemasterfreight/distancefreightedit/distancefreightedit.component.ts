import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Distancefreighteditmodel } from 'src/app/models/distancefreighteditmodel';
import { DistancemasterfreightmasterService } from 'src/app/services/distancemasterfreightmaster.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-distancefreightedit',
  templateUrl: './distancefreightedit.component.html',
  styleUrls: ['./distancefreightedit.component.css']
})
export class DistancefreighteditComponent {
  loggedInUserID: string = '';
  year: string = '';
  fromlocationList: Dropdownmodel[] = [];
  tolocationList: Dropdownmodel[] = [];
  formDistanceFreight!: FormGroup;
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

  constructor(private distancefreighteditmodel: Distancefreighteditmodel, 
    private route: Router, private formBuilder: FormBuilder, 
    private commonService: CommonService, 
    private distanceMasterFreightService: DistancemasterfreightmasterService, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private sharedService: SharedService,) {
    this.distancefreighteditmodel = new Distancefreighteditmodel();
  }

  ngOnInit(): void {
     //Privilege check
     var menuData = sessionStorage.getItem('menulist')?.toString();
     if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
       var privilegeData = JSON.parse(menuData);
       var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Add/Edit Distance-FREIGHT");
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
    
    this.formDistanceFreight = this.formBuilder.group({
      fromLocation: new FormControl('', [Validators.required]),
      validUpto: new FormControl('',),
      toLocation: new FormControl('', [Validators.required]),
      kms: new FormControl('0', [Validators.required]),
    });  

  }

  getFromLocationList(): void {
    this.distanceMasterFreightService.getFromLocationList().subscribe((res: Dropdownmodel[]) => {
      this.fromlocationList = res;
    });  
  }

  getToLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.tolocationList = res;
    });
  }

  get f() { return this.formDistanceFreight.controls; }

  selectEvent(item: any) {
    // do something with selected item
    this.requestmodel.strRequest=item.dataId;
    this.distanceMasterFreightService.getDistanceFrtMasterDtls(this.requestmodel).subscribe((res: Distancefreighteditmodel) => {
      this.distancefreighteditmodel = res;
      this.fromMasterId=res.masterID;
      this.formDistanceFreight.patchValue({
        validUpto: this.commonService.formatDate(res.validUpto)
      })
    });       
    this.formDistanceFreight.controls['validUpto'].disable();   
    this.formDistanceFreight.controls['fromLocation'].disable();    
  }

  selectToEvent(item: any) {
    // do something with selected item
    var selectedDataVal = this.formDistanceFreight.getRawValue();
    this.distancefreighteditmodel.masterID      = this.fromMasterId;
    this.distancefreighteditmodel.fromLocation  = selectedDataVal.fromLocation.dataId;
    this.distancefreighteditmodel.toLocation    = item.dataId;
    this.distancefreighteditmodel.distanceDtlID = "";
    this.distancefreighteditmodel.kms           = "";
    this.distanceMasterFreightService.getDistanceFrtDetails(this.distancefreighteditmodel).subscribe((res: Distancefreighteditmodel) => {
      this.distancefreighteditmodel.distanceDtlID=res.distanceDtlID;
      this.distancefreighteditmodel.kms = res.kms;
      this.formDistanceFreight.patchValue({
        kms: res.kms
      })
      if(this.distancefreighteditmodel.distanceDtlID==""){
        this.formDistanceFreight.patchValue({
          kms: "0"
        })  
        this.toasterService.warning("Destination Not Found for the Selected From Location, Enter New Data");
      }
    });     
    this.formDistanceFreight.controls['toLocation'].disable();     
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
    this.formDistanceFreight.reset();   
    window.location.reload();
  }

  submitDistanceFreightForm(){
    this.formSubmitted = true;
    if (this.formDistanceFreight.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formDistanceFreight.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedDataVal = this.formDistanceFreight.getRawValue();    
    if (parseFloat(selectedDataVal.kms)==0) {
      this.toasterService.warning(" KMS should not be Zero");   
      return;
    }

    this.distancefreighteditmodel.masterID      = this.fromMasterId;
    this.distancefreighteditmodel.fromLocation  = selectedDataVal.fromLocation.dataId;
    this.distancefreighteditmodel.toLocation    = selectedDataVal.toLocation.dataId;
    this.distancefreighteditmodel.kms           = selectedDataVal.kms;
    this.distanceMasterFreightService.distanceFrtEditSubmit(this.distancefreighteditmodel).subscribe((res: Responsemodel) => {
      this.responseDetails=res;
      if(res.status){
        this.formDistanceFreight.reset();
        this.toasterService.success(this.responseDetails.message);  
        window.location.reload();  
      }    
      else{
        this.toasterService.warning(this.responseDetails.message); 
      }    
    }); 
  }

}
