
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Transportmastermodel } from 'src/app/models/transportmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TransportMasterService } from 'src/app/services/transportmaster.service';
import {Transportmasterinnergridmodel } from 'src/app/models/transportmasterinnergridmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtransportmaster',
  templateUrl: './addtransportmaster.component.html',
  styleUrls: ['./addtransportmaster.component.css']
})

export class AddtransportmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  transportmasterinnergridmodel = new Transportmasterinnergridmodel();


  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
  attachmentInput1: any;
  selectedTransportMasterDetail = new Transportmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private transportMasterModel: Transportmastermodel, 
    private transportMasterService: TransportMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.transportMasterModel = new Transportmastermodel();
  }

  ngOnInit(): void {
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

    this.getStateList();
    this.getBranchList();
    this.getLocationList();
    this.getVehicleTypeList();
    this.selectedTransportMasterDetail = this.transportMasterService.getTransportMasterDetails();
    this.formUser = this.formBuilder.group({
      tptCode: new FormControl('',),
      tptName: new FormControl('',[Validators.required]),
      address1: new FormControl('',[Validators.required]),
      address2: new FormControl('',),
      address3: new FormControl('',),
      address4: new FormControl('',),
      stateCode: new FormControl('',[Validators.required]),
      pinCode: new FormControl('',),
      phone: new FormControl('',),
      email: new FormControl('',),
      contactPerson1: new FormControl('',[Validators.required]),
      mobile1: new FormControl('',[Validators.required]),
      contactPerson2: new FormControl('',),
      mobile2: new FormControl('',),
      panNo: new FormControl('',),
      gstNo: new FormControl('',),
      aadharNo: new FormControl('',),
      ContactPerson2: new FormControl('',),
      Mobile2: new FormControl('',),
      cancelChq: new FormControl('',),
      addrProof: new FormControl('',),
      eligibleForBid: new FormControl('',),
      PanNo: new FormControl('',),
      whatsappMblNo: new FormControl('',),
      branchCode: new FormControl('',),
      remarks: new FormControl('',),
      isActive: new FormControl('Y',),
      inActiveDate: new FormControl('',),
      
      transportDetailList: this.formBuilder.array([this.createLocationArray()]),
      stateDetailList: this.formBuilder.array([this.createStateArray()]),
      vehTypeDetailList: this.formBuilder.array([this.createVehArray()]) 
    });
    
    if (this.selectedTransportMasterDetail.tptCode != '') {
      setTimeout(() => {
        this.formUser.patchValue(this.selectedTransportMasterDetail);
        this.formUser.patchValue({
          inActiveDate: this.commonService.formatDate(this.selectedTransportMasterDetail.inActiveDate),
        })
        this.getTransportMasterInnerGridList();
      }, 2000);  
    }
  }
  
  addMiscItem(index: number): void {
    if (this.formLocationArray.value[index].locId != "" ) {
      this.formLocationArray.push(this.createLocationArray());
    } else {
      this.toastrService.warning("Please select one Location");
    }
  }
  addStateItem(index: number): void {
    if (this.formStateArray.value[index].stateCode != "" ) {
      this.formStateArray.push(this.createStateArray());
    } else {
      this.toastrService.warning("Please select one state");
    }
  }

  addVehItem(index: number): void { 
    if (this.formVehArray.value[index].vehTypeId != "" ) {
      this.formVehArray.push(this.createStateArray());
    } else {
      this.toastrService.warning("Please select one vehicle");
    }
  }
  removeMiscItem(index: number) {
    this.formLocationArray.removeAt(index);
  }
  removeStateItem(index: number) {
    this.formStateArray.removeAt(index);
  }
  removeVehItem(index: number) {
    this.formVehArray.removeAt(index);
  }

  get f() { return this.formUser.controls; }

  get formLocationArray() {
    return this.formUser.get("transportDetailList") as FormArray;
  }

  get formStateArray() {
    return this.formUser.get("stateDetailList") as FormArray;
  }

  get formVehArray() {
    return this.formUser.get("vehTypeDetailList") as FormArray;
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleTypeList(): void {
    this.commonService.getVehicleTypeList().subscribe((res) => {
      this.vehicleTypeList = res;
    });
  }

  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  createLocationArray() {
    return this.formBuilder.group({
      dtlid: [''],
      tptCode: [''],
      locId: ['']
    });
  }

  createStateArray() {
    return this.formBuilder.group({
      dtlid: [''],
      tptCode: [''],
      stateCode: ['']
    });
  }

  createVehArray() {
    return this.formBuilder.group({
      dtlid: [''],
      tptCode: [''],
      vehTypeId: ['']
    });
  }

  getTransportMasterInnerGridList(): void {
    this.requestmodel.strRequest=this.selectedTransportMasterDetail.tptCode
    this.transportMasterService.getTransportMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.transportmasterinnergridmodel = res;
      this.formLocationArray.clear();
      this.formStateArray.clear();
      this.formVehArray.clear();

      for (let misc = 0; misc < this.transportmasterinnergridmodel.transportLocationList.length; misc++) {
        this.formLocationArray.push(this.createLocationArray());
        this.formLocationArray.controls[misc].get("locId")?.setValue(res.transportLocationList[misc].locId);
      }
      
      for (let misc = 0; misc < this.transportmasterinnergridmodel.transportStatesList.length; misc++) {
        this.formStateArray.push(this.createStateArray());
        this.formStateArray.controls[misc].get("stateCode")?.setValue(res.transportStatesList[misc].stateCode);
      }
      for (let misc = 0; misc < this.transportmasterinnergridmodel.transportVehTypesList.length; misc++) {
        this.formVehArray.push(this.createVehArray());
        this.formVehArray.controls[misc].get("vehTypeId")?.setValue(res.transportVehTypesList[misc].vehTypeId);
      } 
    });
  }


  transportMasterDelete(): void {
    if(this.selectedTransportMasterDetail.tptCode != '' ){
    this.requestmodel.strRequest =this.selectedTransportMasterDetail.tptCode
      if (confirm("Are you sure, you want to delete this?")) {
            this.transportMasterService.transportMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/transportmstlist']);
            }
            else {
              this.toastrService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/transportmstlist']);
  }

  submitTransportMasterForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }
      return;
    }

    this.transportMasterModel.tptCode = this.selectedTransportMasterDetail.tptCode;
    this.transportMasterModel.tptName= this.formUser.value.tptName.toString().toUpperCase();
    this.transportMasterModel.address1 = this.formUser.value.address1.toString().toUpperCase();
    this.transportMasterModel.address2 = this.formUser.value.address2.toString().toUpperCase();
    this.transportMasterModel.address3 = this.formUser.value.address3.toString().toUpperCase();
    this.transportMasterModel.address4 = this.formUser.value.address4.toString().toUpperCase();
    this.transportMasterModel.stateCode = this.formUser.value.stateCode.toString().toUpperCase();
    this.transportMasterModel.pinCode = this.formUser.value.pinCode;
    this.transportMasterModel.phone = this.formUser.value.phone;
    this.transportMasterModel.email = this.formUser.value.email;
    this.transportMasterModel.contactPerson1 = this.formUser.value.contactPerson1.toString().toUpperCase();
    this.transportMasterModel.mobile1 = this.formUser.value.mobile1;
    this.transportMasterModel.contactPerson2 = this.formUser.value.contactPerson2.toString().toUpperCase();
    this.transportMasterModel.mobile2 = this.formUser.value.mobile2;
    this.transportMasterModel.pinCode = this.formUser.value.pinCode;
    this.transportMasterModel.panNo = this.formUser.value.panNo.toString().toUpperCase();
    this.transportMasterModel.gstNo = this.formUser.value.gstNo.toString().toUpperCase();
    this.transportMasterModel.aadharNo = this.formUser.value.aadharNo.toString().toUpperCase();
    this.transportMasterModel.cancelChq = this.formUser.value.cancelChq;
    this.transportMasterModel.addrProof = this.formUser.value.addrProof;
    this.transportMasterModel.eligibleForBid = this.formUser.value.eligibleForBid;
    this.transportMasterModel.whatsappMblNo = this.formUser.value.whatsappMblNo;
    this.transportMasterModel.branchCode = this.formUser.value.branchCode;
    this.transportMasterModel.remarks = this.formUser.value.remarks;
    this.transportMasterModel.isActive = this.formUser.value.isActive;
    this.transportMasterModel.inActiveDate = this.formUser.value.inActiveDate;
    this.transportMasterModel.transportLocationList = [];
    this.transportMasterModel.transportStatesList = [];
    this.transportMasterModel.transportVehTypesList = [];

    if (this.formLocationArray.value != undefined) {
      for (var i = 0; i < this.formLocationArray.value.length; i++) {
        if(this.formLocationArray.value[i].locId!=''){
          this.transportMasterModel.transportLocationList.push({
            'dtlid': this.formLocationArray.value[i].dtlid,
            'tptCode': this.formLocationArray.value[i].tptCode,
            'locId': this.formLocationArray.value[i].locId,
          }) 
        }
      }
    }
    if (this.formStateArray.value != undefined) {
      for (var i = 0; i < this.formStateArray.value.length; i++) {
        if(this.formStateArray.value[i].stateCode!=''){
          this.transportMasterModel.transportStatesList.push({
            'dtlid': this.formStateArray.value[i].dtlid,
            'tptCode': this.formStateArray.value[i].tptCode,
            'stateCode': this.formStateArray.value[i].stateCode,
          }) 
        }  
      }
    }
    if (this.formVehArray.value != undefined) {
      for (var i = 0; i < this.formVehArray.value.length; i++) {      
        if(this.formVehArray.value[i].vehTypeId!=''){
          this.transportMasterModel.transportVehTypesList.push({
            'dtlid': this.formVehArray.value[i].dtlid,
            'tptCode': this.formVehArray.value[i].tptCode,
            'vehTypeId': this.formVehArray.value[i].vehTypeId,
          }) 
        }   
      }
    }
    
    if(this.transportMasterModel.transportLocationList.length==0 && this.transportMasterModel.transportStatesList.length==0){
      this.toastrService.warning("Please Enter atleast one location or state detail ");   
      return;
    }
    if(this.transportMasterModel.transportVehTypesList.length==0 ){
      this.toastrService.warning("Please Enter atleast one Vehicle detail ");   
      return;
    }

    let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.transportMasterModel));

    this.transportMasterService.transportmasterSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/transportmstlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }
}




  
