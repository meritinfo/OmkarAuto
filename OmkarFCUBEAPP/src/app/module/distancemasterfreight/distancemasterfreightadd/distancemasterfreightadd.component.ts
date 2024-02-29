import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Distancemasterfreightmodel } from 'src/app/models/distancemasterfreightmodel';
import { DistancemasterfreightmasterService } from 'src/app/services/distancemasterfreightmaster.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';

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
  distancemstfrtmodel = new Distancemasterfreightmodel();
  keywordLocation = 'dataName';
  selectedLocation: string[] = [];
  allLocationList: Dropdownmodel[] = [];
  ivToPlace = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  validationDetails = new Responsemodel();

  constructor(private distancemasterfreightmodel: Distancemasterfreightmodel, private route: Router, private formBuilder: FormBuilder, private commonService: CommonService, private distanceMasterFreightService: DistancemasterfreightmasterService, private toasterService: ToastrService,private requestmodel:Requestmodel,private sharedService: SharedService,) {
    this.distancemasterfreightmodel = new Distancemasterfreightmodel();
  }

  ngOnInit(): void {
     //Privilege check
     var menuData = sessionStorage.getItem('menulist')?.toString();
     if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
       var privilegeData = JSON.parse(menuData);
       const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
         .find(((aa: { menuName: string; }) => aa.menuName === "Distance Master - FREIGHT"));
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
    
    this.sharedService.loading = true;

    this.getLocationList();
    this.selectedDistancemasterfreightDetails = this.distanceMasterFreightService.getDistancemasterfreightDetails();
    this.formDistanceMasterFreight = this.formBuilder.group({
      fromLocation: new FormControl('', [Validators.required]),
      validFrom: new FormControl('', [Validators.required]),
      validUpto: new FormControl('', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])
    });

    setTimeout(() => {
      if (this.selectedDistancemasterfreightDetails.masterID != '') {
        console.log(this.selectedDistancemasterfreightDetails);
        this.formDistanceMasterFreight.patchValue(this.selectedDistancemasterfreightDetails);
        this.formDistanceMasterFreight.patchValue({
          validFrom:this.commonService.formatDate(this.selectedDistancemasterfreightDetails.validFrom),      
          validUpto:this.commonService.formatDate(this.selectedDistancemasterfreightDetails.validUpto),
          fromLocation: this.locationList.find(e => e.dataId == this.selectedDistancemasterfreightDetails.fromLocation),
        })
        this.editMode = true;
        this.formDistanceMasterFreight.controls['fromLocation'].disable();
        this.formDistanceMasterFreight.controls['validFrom'].disable();
        this.formDistanceMasterFreight.controls['validUpto'].disable();
        this.getFreightInnerGridList();
        this.sharedService.loading = false;        
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
  
  getFreightInnerGridList(): void {    
    this.requestmodel.strRequest= this.selectedDistancemasterfreightDetails.masterID;
    this.distanceMasterFreightService.getFreightInnerGridList(this.requestmodel).subscribe((res) => {
      this.distancemstfrtmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.distanceDetailsFreightList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("fromLocation")?.setValue(this.locationList.find(e => e.dataId == res.distanceDetailsFreightList[i].fromLocation));
        this.formArray.controls[i].get("toLocation")?.setValue(this.locationList.find(e => e.dataId == res.distanceDetailsFreightList[i].toLocation));
        this.formArray.controls[i].get("kms")?.setValue(res.distanceDetailsFreightList[i].kms);
      }
    });    
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDistanceMasterFreight.controls; }
  get formArray() {
    return this.formDistanceMasterFreight.get("arrayList") as FormArray;
  }

  selectToLocationEvent(item: any,index:number) {
    var ToPlace = item.dataId;
    var selectedDataValue=this.formDistanceMasterFreight.getRawValue();
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
      this.toasterService.warning("Please select one To Location, enterKM ");
    }
  }

  distanceMasterFrtDelete(): void {
    if(this.selectedDistancemasterfreightDetails.masterID != '' ){
     this.requestmodel.strRequest =this.selectedDistancemasterfreightDetails.masterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.distanceMasterFreightService.distanceMasterFrtDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formDistanceMasterFreight.reset();
              this.route.navigate(['/distancemasterfreightlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }   
        });
      }
    }
  }

  createInitialArray() {
    return this.formBuilder.group({
      toLocation: ['', [Validators.required]],
      kms: ['', [Validators.required]]
    });
  }

  exit(): void {
    this.route.navigate(['/distancemasterfreightlist']);
  }

  removeItem(item: any,index: number) {
    if (confirm("Are you sure, you want to delete this row?")) {  
      this.formArray.removeAt(index);
    }
  }

  //Submit form details //
  submitDistanceMasterFreightForm(): void {
    this.formSubmitted = true;
    if (this.formDistanceMasterFreight.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formDistanceMasterFreight.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
   
    var selectedDataValue = this.formDistanceMasterFreight.getRawValue();
    this.distancemasterfreightmodel.masterID      = this.selectedDistancemasterfreightDetails.masterID;
    this.distancemasterfreightmodel.fromLocation  = selectedDataValue.fromLocation.dataId;
    this.distancemasterfreightmodel.validFrom     = selectedDataValue.validFrom;
    this.distancemasterfreightmodel.validUpto     = selectedDataValue.validUpto;
    this.distancemasterfreightmodel.loggedInUser  = this.loggedInUserID;

    this.distancemasterfreightmodel.distanceDetailsFreightList = [];
    for (var i = 0; i < this.formDistanceMasterFreight.value.arrayList.length; i++) {
      if (this.formDistanceMasterFreight.value.arrayList[i].toLocation != '') {
        this.distancemasterfreightmodel.distanceDetailsFreightList.push({     
          'masterID': '',
          'fromLocation': selectedDataValue.fromLocation.dataId,
          'toLocation': selectedDataValue.arrayList[i].toLocation.dataId,
          'kms': selectedDataValue.arrayList[i].kms
        })
      }
    }

    //Start date end date validation
    if (Date.parse(this.distancemasterfreightmodel.validUpto) < Date.parse(this.distancemasterfreightmodel.validFrom)) {
      this.toasterService.warning("End date should be greter than start date");
      return;
    }

    const found = this.distancemasterfreightmodel.distanceDetailsFreightList.some(el => el.toLocation === this.distancemasterfreightmodel.fromLocation);
    if (found) {
      this.toasterService.warning("From location cannot be same as To Location in details grid");
      return;
    }    

    const foundDuplicateName = this.distancemasterfreightmodel.distanceDetailsFreightList.find((data, index) => {
      return this.distancemasterfreightmodel.distanceDetailsFreightList.find((x, ind) => x.toLocation === data.toLocation && index !== ind);
    })
    if (foundDuplicateName) {
      this.toasterService.warning("Duplicate To Location in details grid not allowed");
      return;
    }
    if(this.selectedDistancemasterfreightDetails.masterID==''){
      this.distanceMasterFreightService.chkdistanceFrtValidity(this.distancemasterfreightmodel).subscribe((res: Responsemodel) => {
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
    this.distanceMasterFreightService.distanceMasterFreightSubmitted(this.distancemasterfreightmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formDistanceMasterFreight.reset();
        this.route.navigate(['/distancemasterfreightlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }   
    });
  }  
  
  

}
