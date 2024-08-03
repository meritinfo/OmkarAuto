
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Transportmastermodel } from 'src/app/models/transportmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TransportMasterService } from 'src/app/services/transportmaster.service';
import {Transportmasterinnergridmodel } from 'src/app/models/transportmasterinnergridmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';
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
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  uploadedcancelChq: string = "";
  uploadedaddrProof: string = "";


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
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Transport/Broker Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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

    this.getStateList();
    this.getBranchList();
    this.getLocationList();
    this.getVehicleTypeList();
    this.selectedTransportMasterDetail = this.transportMasterService.getTransportMasterDetails();
    this.formUser = this.formBuilder.group({
      tptName: new FormControl('',[Validators.required]),
      address1: new FormControl('',),
      address2: new FormControl('',),
      address3: new FormControl('',),
      address4: new FormControl('',),
      stateCode: new FormControl('',[Validators.required]),
      pinCode: new FormControl('',),
      phone: new FormControl('',),
      email: new FormControl('',),
      contactPerson1: new FormControl('',),
      mobile1: new FormControl('',),
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
      branchCode: new FormControl('',[Validators.required]),
      remarks: new FormControl('',),
      isActive: new FormControl('Y',),
      inActiveDate: new FormControl('',),
      
      transportDetailList: this.formBuilder.array([this.createLocationArray()]),
      stateDetailList: this.formBuilder.array([this.createStateArray()]),
      vehTypeDetailList: this.formBuilder.array([this.createVehArray()]) 
    });
    
    this.formUser.controls["inActiveDate"].disable();

    if (this.selectedTransportMasterDetail.tptCode != '') {
      setTimeout(() => {
        this.uploadedcancelChq = Constants.UploadFolderPath + 'upload/transport/cancelChq/' + this.selectedTransportMasterDetail.cancelChq;
        this.uploadedaddrProof = Constants.UploadFolderPath + 'upload/transport/addrProof/' + this.selectedTransportMasterDetail.addrProof;
        this.formUser.patchValue(this.selectedTransportMasterDetail);
        this.formUser.patchValue({
          inActiveDate: this.commonService.formatDate(this.selectedTransportMasterDetail.inActiveDate),
        })
        if(this.selectedTransportMasterDetail.isActive=="N"){          
          this.formUser.controls["inActiveDate"].enable();
        }
        this.getTransportMasterInnerGridList();
        this.editMode=true;
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

  onactiveChange(e:any){
    var act = e.target.value;
    if(act=='Y'){
      this.formUser.controls["inActiveDate"].disable();
    }
    else{      
      this.formUser.controls["inActiveDate"].enable();
    }

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
    var selectedData = this.formUser.getRawValue();

    this.transportMasterModel.tptCode = this.selectedTransportMasterDetail.tptCode;
    this.transportMasterModel.tptName= selectedData.tptName.toString().toUpperCase();
    this.transportMasterModel.address1 = selectedData.address1.toString().toUpperCase();
    this.transportMasterModel.address2 = selectedData.address2.toString().toUpperCase();
    this.transportMasterModel.address3 = selectedData.address3.toString().toUpperCase();
    this.transportMasterModel.address4 = selectedData.address4.toString().toUpperCase();
    this.transportMasterModel.stateCode = selectedData.stateCode.toString().toUpperCase();
    this.transportMasterModel.pinCode = selectedData.pinCode;
    this.transportMasterModel.phone = selectedData.phone;
    this.transportMasterModel.email = selectedData.email;
    this.transportMasterModel.contactPerson1 = selectedData.contactPerson1.toString().toUpperCase();
    this.transportMasterModel.mobile1 = selectedData.mobile1;
    this.transportMasterModel.contactPerson2 = selectedData.contactPerson2.toString().toUpperCase();
    this.transportMasterModel.mobile2 = selectedData.mobile2;
    this.transportMasterModel.pinCode = selectedData.pinCode;
    this.transportMasterModel.panNo = selectedData.panNo.toString().toUpperCase();
    this.transportMasterModel.gstNo = selectedData.gstNo.toString().toUpperCase();
    this.transportMasterModel.aadharNo = selectedData.aadharNo.toString().toUpperCase();
    this.transportMasterModel.eligibleForBid = selectedData.eligibleForBid;
    this.transportMasterModel.whatsappMblNo = selectedData.whatsappMblNo;
    this.transportMasterModel.branchCode = selectedData.branchCode;
    this.transportMasterModel.remarks = selectedData.remarks.toString().toUpperCase();;
    this.transportMasterModel.isActive = selectedData.isActive;
    this.transportMasterModel.inActiveDate = selectedData.inActiveDate;
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
    
    let formData = new FormData();
    formData.append('cancelChq', this.attachmentInput1.nativeElement.files[0]);
    formData.append('addrProof', this.attachmentInput.nativeElement.files[0]);
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




  
