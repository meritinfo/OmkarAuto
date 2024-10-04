import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Truckmastermodel } from 'src/app/models/truckmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TruckMasterService } from 'src/app/services/truckmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-addtruckmaster',
  templateUrl: './addtruckmaster.component.html',
  styleUrls: ['./addtruckmaster.component.css']
})

export class AddtruckmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = []; 
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  year: string = '';
  loginDate: string = '';
  branch:string = '';

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
  @ViewChild('attachmentInput1', {
    static: true
  }) attachmentInput1: any;

  selectedTruckMasterDetail = new Truckmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehicleTypeGroupMasterModel: Truckmastermodel, 
    private vehicleTypeGroupMasterService: TruckMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.vehicleTypeGroupMasterModel = new Truckmastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Market Truck Master"));      
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
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }

    this.getStateList();
    this.selectedTruckMasterDetail = this.vehicleTypeGroupMasterService.getTruckMasterDetails();
    this.formUser = this.formBuilder.group({
      truckNo: new FormControl('',[Validators.required]),
      regnDate: new FormControl('',[Validators.required]),
      ownerName: new FormControl('',[Validators.required]),
      ownerType: new FormControl('',),
      ownMarket: new FormControl('M',),
      panNo: new FormControl('',),
      aadharNo: new FormControl('',[Validators.required]),
      aadharLinkedYN: new FormControl('',),
      panValidYN: new FormControl('',),
      itFiledYN: new FormControl('',),
      address1: new FormControl('',),
      address2: new FormControl('',),
      address3: new FormControl('',),
      address4: new FormControl('',),
      stateCode: new FormControl('',),
      pinCode: new FormControl('',),
      phoneNo: new FormControl('',),
      contactName: new FormControl('',),
      mobileNo: new FormControl('',),
      chasisNo: new FormControl('',),
      engineNo: new FormControl('',),
      vehCode: new FormControl('',),
      model: new FormControl('',),
      mfrName: new FormControl('',),
      ladenWt: new FormControl('',),
      unLadenWt: new FormControl('',),
      insuranceDt: new FormControl('',),
      nationalPermitDt: new FormControl('',),
      fitnessDt: new FormControl('',),
      rcUpload: new FormControl('',),
      otherUpload: new FormControl('',),
      isActive: new FormControl('Y',),
      inActiveDate: new FormControl('',),
      remarks: new FormControl('',),
    });

    if (this.selectedTruckMasterDetail.truckID != '') {
      this.formUser.patchValue(this.selectedTruckMasterDetail);
      this.formUser.controls['truckNo'].disable();
      this.formUser.patchValue({
        isActive: this.selectedTruckMasterDetail.isActive,
        regnDate: this.commonService.formatDate(this.selectedTruckMasterDetail.regnDate),
        insuranceDt: this.commonService.formatDate(this.selectedTruckMasterDetail.insuranceDt),
        nationalPermitDt: this.commonService.formatDate(this.selectedTruckMasterDetail.nationalPermitDt),
        fitnessDt: this.commonService.formatDate(this.selectedTruckMasterDetail.fitnessDt),
        inActiveDate: this.commonService.formatDate(this.selectedTruckMasterDetail.inActiveDate),
        ownerType:this.selectedTruckMasterDetail.ownerType   
      })
    }
  }

  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  get f() { return this.formUser.controls; }

  exit(): void {
    this.route.navigate(['/mkttrucklist']);
  }

  truckMasterDelete(): void {
    if(this.selectedTruckMasterDetail.truckID != '' ){
    this.requestmodel.strRequest =this.selectedTruckMasterDetail.truckID
      if (confirm("Are you sure, you want to delete this?")) {
          this.vehicleTypeGroupMasterService.truckMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/mkttrucklist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }

  submitTruckMasterForm(): void {
    this.formSubmitted = true;
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
    var selectedDataValue = this.formUser.getRawValue();

    this.vehicleTypeGroupMasterModel.truckID = this.selectedTruckMasterDetail.truckID != '' ? this.selectedTruckMasterDetail.truckID : '';
    this.vehicleTypeGroupMasterModel.truckNo = selectedDataValue.truckNo;
    this.vehicleTypeGroupMasterModel.regnDate = selectedDataValue.regnDate;
    this.vehicleTypeGroupMasterModel.ownerName = selectedDataValue.ownerName.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.ownerType = selectedDataValue.ownerType;
    this.vehicleTypeGroupMasterModel.ownMarket = selectedDataValue.ownMarket;
    this.vehicleTypeGroupMasterModel.panNo = selectedDataValue.panNo;
    this.vehicleTypeGroupMasterModel.aadharNo = selectedDataValue.aadharNo;
    this.vehicleTypeGroupMasterModel.aadharLinkedYN = selectedDataValue.aadharLinkedYN;
    this.vehicleTypeGroupMasterModel.panValidYN = selectedDataValue.panValidYN;
    this.vehicleTypeGroupMasterModel.itFiledYN = selectedDataValue.itFiledYN;
    this.vehicleTypeGroupMasterModel.address1 = selectedDataValue.address1.toString().toUpperCase()
    this.vehicleTypeGroupMasterModel.address2 = selectedDataValue.address2.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.address3 = selectedDataValue.address3.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.address4 = selectedDataValue.address4.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.stateCode = selectedDataValue.stateCode;
    this.vehicleTypeGroupMasterModel.pinCode = selectedDataValue.pinCode;
    this.vehicleTypeGroupMasterModel.phoneNo = selectedDataValue.phoneNo;
    this.vehicleTypeGroupMasterModel.contactName = selectedDataValue.contactName.toString().toUpperCase();   
     this.vehicleTypeGroupMasterModel.mobileNo = selectedDataValue.mobileNo;
    this.vehicleTypeGroupMasterModel.chasisNo = selectedDataValue.chasisNo.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.engineNo = selectedDataValue.engineNo;
    this.vehicleTypeGroupMasterModel.vehCode = selectedDataValue.vehCode;
    this.vehicleTypeGroupMasterModel.model = selectedDataValue.model;
    this.vehicleTypeGroupMasterModel.mfrName = selectedDataValue.mfrName;
    this.vehicleTypeGroupMasterModel.ladenWt = selectedDataValue.ladenWt;
    this.vehicleTypeGroupMasterModel.unLadenWt = selectedDataValue.unLadenWt;
    this.vehicleTypeGroupMasterModel.insuranceDt = selectedDataValue.insuranceDt;
    this.vehicleTypeGroupMasterModel.nationalPermitDt = selectedDataValue.nationalPermitDt;
    this.vehicleTypeGroupMasterModel.fitnessDt = selectedDataValue.fitnessDt;
    this.vehicleTypeGroupMasterModel.rcUpload = selectedDataValue.rcUpload?selectedDataValue.rcUpload:'';
    this.vehicleTypeGroupMasterModel.otherUpload = selectedDataValue.otherUpload?selectedDataValue.otherUpload:'';
    this.vehicleTypeGroupMasterModel.isActive = selectedDataValue.isActive;
    this.vehicleTypeGroupMasterModel.inActiveDate = selectedDataValue.inActiveDate;
    this.vehicleTypeGroupMasterModel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.vehicleTypeGroupMasterModel.loggedInUser = this.loggedInUserID;
    
    let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('attach', this.attachmentInput1.nativeElement.files[1]);
    formData.append('datadetails', JSON.stringify(this.vehicleTypeGroupMasterModel));

    this.vehicleTypeGroupMasterService.truckmasterSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/mkttrucklist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }
}


