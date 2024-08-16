import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehiclefltmastermodel } from 'src/app/models/vehiclefltmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { VehicleFltMasterService } from 'src/app/services/vehiclefltmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-vehiclemasteradd',
  templateUrl: './vehiclemasteradd.component.html',
  styleUrls: ['./vehiclemasteradd.component.css']
})
export class VehiclemasteraddComponent {
  loggedInUserID: string = '';
  formVehicleMaster!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  selectedVehicleMasterDetails = new Vehiclefltmastermodel();
  vehicalfltmstmodel = new Vehiclefltmastermodel();
  keywordLocation = 'dataName';
  vehicleList: Dropdownmodel[] = [];
  vehicleGrpList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  vehicleMfrList: Dropdownmodel[] = [];
  vehicleLedgerAcList: Dropdownmodel[] = [];
  vehicleAssetAcList: Dropdownmodel[] = [];
  attach1: string = "";
  attach2: string = "";
  attach3: string = "";

  @ViewChild('attachment1Input', {
    static: true
  }) attachment1Input: any;
  @ViewChild('attachment2Input', {
    static: true
  }) attachment2Input: any;
  @ViewChild('attachment3Input', {
    static: true
  }) attachment3Input: any;

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehiclefltmastermodel: Vehiclefltmastermodel, 
    private sharedService: SharedService,
    private toasterService: ToastrService,
    private vehiclefltmasterService: VehicleFltMasterService, private commonService: CommonService,
    private requestmodel:Requestmodel) {
    this.vehiclefltmastermodel = new Vehiclefltmastermodel();
  }
  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Master");
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
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getVehicleNoList();
    this.getVehicleGrpList();
    this.getVehicleTypes();
    this.getVehicleMfrList();
    this.getVehicleLedgerList();
    this.getVehicleAssetList();

    this.selectedVehicleMasterDetails = this.vehiclefltmasterService.getvehiclefltmasterDetails();
    this.formVehicleMaster = this.formBuilder.group({
      vehicleNo: new FormControl('',[Validators.required]),
      regnDate: new FormControl('',[Validators.required]),
      regdOwner: new FormControl('',[Validators.required]),
      chasisNo: new FormControl('',[Validators.required]),
      engineNo: new FormControl('',[Validators.required]),
      vehicleTypeGroupId: new FormControl('',[Validators.required]),
      vehMfrId: new FormControl('',[Validators.required]),
      mfrModelName: new FormControl('',[Validators.required]),
      fuelType: new FormControl('',[Validators.required]),
      makeYear: new FormControl('',[Validators.required]),
      tankCap: new FormControl('',[Validators.required]),
      grossWt: new FormControl(''),
      unLadenWT: new FormControl(''),
      noOfTyres: new FormControl(''),
      mileageLt: new FormControl('',[Validators.required]),
      vehLength: new FormControl(''),
      vehBreadth: new FormControl(''),
      vehHeight: new FormControl(''),
      vehVolumeCFT: new FormControl(''),
      remarks: new FormControl(''),
      ownershipType: new FormControl(''),
      fastTagYN: new FormControl('',[Validators.required]),
      fastTagCo: new FormControl(''),
      fastTagNo: new FormControl(''),
      petroCardYN: new FormControl('',[Validators.required]),
      petroCo: new FormControl(''),
      petroCardNo: new FormControl(''),
      petroCardPin: new FormControl(''),
      happayCardYN: new FormControl('',[Validators.required]),
      happayCardNo: new FormControl(''),
      happayCardPin: new FormControl(''),
      fipYN: new FormControl('',[Validators.required]),
      fipNo: new FormControl(''),
      soldYN: new FormControl('N',[Validators.required]),
      soldTo: new FormControl(''),
      soldDate: new FormControl(''),
      soldValue: new FormControl(''),
      tfrYN: new FormControl('N',[Validators.required]),
      tfrDate: new FormControl(''),
      tfrVehicleNo: new FormControl(''),
      tfrVehicleId: new FormControl(''),
      vehicleLedgerAc: new FormControl('',[Validators.required]),
      vehicleAssetAc: new FormControl('',[Validators.required]),
      attach1Desc: new FormControl(''),
      attach1Link: new FormControl(''),
      attach2Desc: new FormControl(''),
      attach2Link: new FormControl(''),
      attach3Desc: new FormControl(''),
      attach3Link: new FormControl(''),
      userBranch: new FormControl(''),
      userBranch2: new FormControl(''),

      arrayList: this.formBuilder.array([this.createInitialArray()])

    });

      this.formVehicleMaster.controls['vehicleLedgerAc'].clearValidators();   
      this.formVehicleMaster.controls['vehicleLedgerAc'].updateValueAndValidity();
    setTimeout(() => {
      if (this.selectedVehicleMasterDetails.vehicleMasterID != '') {
        this.attach1 = Constants.UploadFolderPath + 'vehical/attachment1/' + this.selectedVehicleMasterDetails.attach1Link;
        this.attach2 = Constants.UploadFolderPath + 'vehical/attachment2/' + this.selectedVehicleMasterDetails.attach2Link;
        this.attach3 = Constants.UploadFolderPath + 'vehical/attachment3/' + this.selectedVehicleMasterDetails.attach3Link;
        
        this.formVehicleMaster.controls['vehicleNo'].disable();
        this.formVehicleMaster.patchValue(this.selectedVehicleMasterDetails);
        this.formVehicleMaster.patchValue({        
          regnDate: this.commonService.formatDate(this.selectedVehicleMasterDetails.regnDate),
          soldDate: this.commonService.formatDate(this.selectedVehicleMasterDetails.soldDate),
          tfrDate: this.commonService.formatDate(this.selectedVehicleMasterDetails.tfrDate),
          vehicleLedgerAc: this.vehicleLedgerAcList.find(e => e.dataId == this.selectedVehicleMasterDetails.vehicleLedgerAc),
          vehicleAssetAc: this.vehicleAssetAcList.find(e => e.dataId == this.selectedVehicleMasterDetails.vehicleAssetAc),
        })
        this.editMode=true;      
        this.formVehicleMaster.controls['vehicleLedgerAc'].setValidators([Validators.required]);  
        this.formVehicleMaster.controls['vehicleLedgerAc'].updateValueAndValidity();

        this.getVehicleInnerGridList();
      }
    }, 2000);
    this.sharedService.loading=false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formVehicleMaster.controls; }
  get formArray() {
    return this.formVehicleMaster.get("arrayList") as FormArray;
  }

   
  getVehicleInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedVehicleMasterDetails.vehicleMasterID;
    this.vehiclefltmasterService.getVehiclefltMstInnerGridList(this.requestmodel).subscribe((res) => {
      this.vehicalfltmstmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.vehiclefltDetailList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("validFrom")?.setValue(this.commonService.formatDate(res.vehiclefltDetailList[i].validFrom));
        this.formArray.controls[i].get("validTo")?.setValue(this.commonService.formatDate(res.vehiclefltDetailList[i].validTo));
        this.formArray.controls[i].get("vehicleAvgLoad")?.setValue(res.vehiclefltDetailList[i].vehicleAvgLoad);
        this.formArray.controls[i].get("vehicleAvgEmpty")?.setValue(res.vehiclefltDetailList[i].vehicleAvgEmpty);
        this.formArray.controls[i].get("adBlue")?.setValue(res.vehiclefltDetailList[i].adBlue);
      }
    });
  }

  
  createInitialArray() {
    return this.formBuilder.group({
      validFrom: ['', []],
      validTo: ['', []],
      vehicleAvgLoad: ['', []],
      vehicleAvgEmpty:['', []],
      adBlue: ['', []],
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  
  getVehicleGrpList(): void {
    this.commonService.getVehicleTypeGroupList().subscribe((res) => {
      this.vehicleGrpList = res;
    });
  }
  getVehicleTypes(): void {
    this.commonService.getVehicleTypes().subscribe((res) => {
      this.vehicleTypeList = res;
    });
  }
  
  getVehicleMfrList(): void {
    this.vehiclefltmasterService.getVehicleMfrList().subscribe((res) => {
      this.vehicleMfrList = res;
    });
  }

  getVehicleLedgerList(): void {
    this.vehiclefltmasterService.getVehicleLedgerList().subscribe((res) => {
      this.vehicleLedgerAcList = res;
    });
  }

  getVehicleAssetList(): void {
    this.vehiclefltmasterService.getVehicleAssetList().subscribe((res) => {
      this.vehicleAssetAcList = res;
    });
  }

  onVehicalNoChange(e: any) {
    var selectedValue = e.target.value;
    if (this.selectedVehicleMasterDetails.vehicleMasterID == ''){ 
      this.requestmodel.strRequest = e.target.value; 
      this.vehiclefltmasterService.chkVehicalNoExist(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formVehicleMaster.patchValue({
            vehicleNo: ''
          });
        }
      });
    }

  }


  onFastTagChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="Y"){ 
      this.formVehicleMaster.controls['fastTagCo'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['fastTagNo'].setValidators([Validators.required]);
    }
    else {
      this.formVehicleMaster.controls['fastTagCo'].clearValidators();
      this.formVehicleMaster.controls['fastTagNo'].clearValidators();
      
    }
    this.formVehicleMaster.controls['fastTagCo'].updateValueAndValidity();
    this.formVehicleMaster.controls['fastTagNo'].updateValueAndValidity();

  }

  onPetroCardChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="Y"){ 
      this.formVehicleMaster.controls['petroCo'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['petroCardNo'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['petroCardPin'].setValidators([Validators.required]);
    }
    else {
      this.formVehicleMaster.controls['petroCo'].clearValidators();
      this.formVehicleMaster.controls['petroCardNo'].clearValidators();
      this.formVehicleMaster.controls['petroCardPin'].clearValidators();
      
    }
    this.formVehicleMaster.controls['petroCo'].updateValueAndValidity();
    this.formVehicleMaster.controls['petroCardNo'].updateValueAndValidity();
    this.formVehicleMaster.controls['petroCardPin'].updateValueAndValidity();

  }

  onHappayCardChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="Y"){ 
      this.formVehicleMaster.controls['happayCardNo'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['happayCardPin'].setValidators([Validators.required]);
    }
    else {
      this.formVehicleMaster.controls['happayCardNo'].clearValidators();
      this.formVehicleMaster.controls['happayCardPin'].clearValidators();
      
    }
    this.formVehicleMaster.controls['happayCardNo'].updateValueAndValidity();
    this.formVehicleMaster.controls['happayCardPin'].updateValueAndValidity();

  }

  onFipChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="Y"){ 
      this.formVehicleMaster.controls['fipNo'].setValidators([Validators.required]);
    }
    else {
      this.formVehicleMaster.controls['fipNo'].clearValidators();
      
    }
    this.formVehicleMaster.controls['fipNo'].updateValueAndValidity();
  }

  onSoldChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="Y"){ 
      this.formVehicleMaster.controls['soldTo'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['soldDate'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['soldValue'].setValidators([Validators.required]);
    }
    else {
      this.formVehicleMaster.controls['soldTo'].clearValidators();
      this.formVehicleMaster.controls['soldDate'].clearValidators();
      this.formVehicleMaster.controls['soldValue'].clearValidators();
      
    }
    this.formVehicleMaster.controls['soldTo'].updateValueAndValidity();
    this.formVehicleMaster.controls['soldDate'].updateValueAndValidity();
    this.formVehicleMaster.controls['soldValue'].updateValueAndValidity();

  }

  
  onTransferChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="Y"){ 
      this.formVehicleMaster.controls['tfrDate'].setValidators([Validators.required]);
      this.formVehicleMaster.controls['tfrVehicleNo'].setValidators([Validators.required]);
    }
    else {
      this.formVehicleMaster.controls['tfrDate'].clearValidators();
      this.formVehicleMaster.controls['tfrVehicleNo'].clearValidators();
      
    }
    this.formVehicleMaster.controls['tfrDate'].updateValueAndValidity();
    this.formVehicleMaster.controls['tfrVehicleNo'].updateValueAndValidity();

  }
  
  deleteVehicleMasterForm(): void {
    if(this.selectedVehicleMasterDetails.vehicleMasterID != '' ){      
    this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedVehicleMasterDetails.vehicleMasterID
      if (confirm("Are you sure, you want to delete this?")) {
            this.vehiclefltmasterService.vehicalMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message);
              this.formVehicleMaster.reset();
              this.route.navigate(['/vehiclemasterlist']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            }  
        });
      }
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/vehiclemasterlist']);
  }


  //Submit user form details //
  submitVehicleMasterForm(): void {
    this.userSubmitted = true;
    var selectedDataValue = this.formVehicleMaster.getRawValue();
    if (this.formVehicleMaster.invalid) {      
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formVehicleMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    
    this.sharedService.loading=true;
    var selectedDataValue = this.formVehicleMaster.getRawValue();
    this.vehiclefltmastermodel.vehicleMasterID    = this.selectedVehicleMasterDetails.vehicleMasterID != '' ? this.selectedVehicleMasterDetails.vehicleMasterID : '';
    this.vehiclefltmastermodel.vehicleNo          = selectedDataValue.vehicleNo.toString().toUpperCase();
    this.vehiclefltmastermodel.fleetStation       = '1';
    this.vehiclefltmastermodel.regnDate           = selectedDataValue.regnDate;
    this.vehiclefltmastermodel.regdOwner          = selectedDataValue.regdOwner.toString().toUpperCase();
    this.vehiclefltmastermodel.chasisNo           = selectedDataValue.chasisNo.toString().toUpperCase();;
    this.vehiclefltmastermodel.engineNo           = selectedDataValue.engineNo.toString().toUpperCase();;
    this.vehiclefltmastermodel.vehicleTypeID      = '';
    this.vehiclefltmastermodel.vehicleTypeGroupId = selectedDataValue.vehicleTypeGroupId;
    this.vehiclefltmastermodel.vehMfrId           = selectedDataValue.vehMfrId;
    this.vehiclefltmastermodel.mfrModelName       = selectedDataValue.mfrModelName.toString().toUpperCase();
    this.vehiclefltmastermodel.fuelType           = selectedDataValue.fuelType;
    this.vehiclefltmastermodel.makeYear           = selectedDataValue.makeYear;
    this.vehiclefltmastermodel.tankCap            = selectedDataValue.tankCap;
    this.vehiclefltmastermodel.grossWt            = selectedDataValue.grossWt;
    this.vehiclefltmastermodel.unLadenWT          = selectedDataValue.unLadenWT;
    this.vehiclefltmastermodel.noOfTyres          = selectedDataValue.noOfTyres;
    this.vehiclefltmastermodel.mileageLt          = selectedDataValue.mileageLt;
    this.vehiclefltmastermodel.vehLength          = selectedDataValue.vehLength;
    this.vehiclefltmastermodel.vehBreadth         = selectedDataValue.vehBreadth;
    this.vehiclefltmastermodel.vehHeight          = selectedDataValue.vehHeight;
    this.vehiclefltmastermodel.vehVolumeCFT       = selectedDataValue.vehVolumeCFT;
    this.vehiclefltmastermodel.remarks            = selectedDataValue.remarks.toString().toUpperCase();
    this.vehiclefltmastermodel.ownershipType      = selectedDataValue.ownershipType;
    this.vehiclefltmastermodel.fastTagYN          = selectedDataValue.fastTagYN;
    this.vehiclefltmastermodel.fastTagCo          = selectedDataValue.fastTagCo;
    this.vehiclefltmastermodel.fastTagNo          = selectedDataValue.fastTagNo;
    this.vehiclefltmastermodel.petroCardYN        = selectedDataValue.petroCardYN;
    this.vehiclefltmastermodel.petroCo            = selectedDataValue.petroCo;
    this.vehiclefltmastermodel.petroCardNo        = selectedDataValue.petroCardNo;
    this.vehiclefltmastermodel.petroCardPin       = selectedDataValue.petroCardPin;
    this.vehiclefltmastermodel.happayCardYN       = selectedDataValue.happayCardYN;
    this.vehiclefltmastermodel.happayCardNo       = selectedDataValue.happayCardNo;
    this.vehiclefltmastermodel.happayCardPin      = selectedDataValue.happayCardPin;
    this.vehiclefltmastermodel.fipYN              = selectedDataValue.fipYN;
    this.vehiclefltmastermodel.fipNo              = selectedDataValue.fipNo;
    this.vehiclefltmastermodel.soldYN             = selectedDataValue.soldYN;
    this.vehiclefltmastermodel.soldTo             = selectedDataValue.soldTo;
    this.vehiclefltmastermodel.soldDate           = selectedDataValue.soldDate;
    this.vehiclefltmastermodel.soldValue          = selectedDataValue.soldValue;
    this.vehiclefltmastermodel.tfrYN              = selectedDataValue.tfrYN;
    this.vehiclefltmastermodel.tfrDate            = selectedDataValue.tfrDate;
    this.vehiclefltmastermodel.tfrVehicleNo       = selectedDataValue.tfrVehicleNo;
    this.vehiclefltmastermodel.tfrVehicleId       = selectedDataValue.tfrVehicleId;
    this.vehiclefltmastermodel.vehicleLedgerAc    = selectedDataValue.vehicleLedgerAc.dataId?selectedDataValue.vehicleLedgerAc:'';
    this.vehiclefltmastermodel.vehicleAssetAc     = selectedDataValue.vehicleAssetAc.dataId?selectedDataValue.vehicleAssetAc:'';
    this.vehiclefltmastermodel.attach1Desc        = selectedDataValue.attach1Desc.toString().toUpperCase();
    this.vehiclefltmastermodel.attach1Link        = selectedDataValue.attach1Link;
    this.vehiclefltmastermodel.attach2Desc        = selectedDataValue.attach2Desc.toString().toUpperCase();
    this.vehiclefltmastermodel.attach2Link        = selectedDataValue.attach2Link;
    this.vehiclefltmastermodel.attach3Desc        = selectedDataValue.attach3Desc.toString().toUpperCase();
    this.vehiclefltmastermodel.attach3Link        = selectedDataValue.attach3Link;
    this.vehiclefltmastermodel.loggedInUser       = this.loggedInUserID;   

    this.vehiclefltmastermodel.vehiclefltDetailList = [];

    for (var i = 0; i < this.formVehicleMaster.value.arrayList.length; i++) {
      if (this.formVehicleMaster.value.arrayList[i].validFrom != '') {
        //Start date end date validation
        if (Date.parse(selectedDataValue.arrayList[i].validTo) < Date.parse(selectedDataValue.arrayList[i].validFrom)) {
          this.toasterService.warning("Valid To date should be greter than Valid From date");
          return;
        }

        this.vehiclefltmastermodel.vehiclefltDetailList.push({
          'detailID': '',
          'vehicleMasterID': '',
          'validFrom': selectedDataValue.arrayList[i].validFrom,
          'validTo': selectedDataValue.arrayList[i].validTo,
          'vehicleAvgLoad': selectedDataValue.arrayList[i].vehicleAvgLoad,
          'vehicleAvgEmpty': selectedDataValue.arrayList[i].vehicleAvgEmpty,
          'adBlue': selectedDataValue.arrayList[i].adBlue,
        })
      }      
    }
    let formData = new FormData();
    formData.append('attach1Link', this.attachment1Input.nativeElement.files[0]);
    formData.append('attach2Link', this.attachment2Input.nativeElement.files[0]);
    formData.append('attach3Link', this.attachment3Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.vehiclefltmastermodel));

    this.vehiclefltmasterService.vehicleFltmasterDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formVehicleMaster.reset();
        this.route.navigate(['/vehiclemasterlist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }     
    });
    this.sharedService.loading=false;
  }

  
  // addItem(): void {
    // this.gstaccountdetails = new Gstaccountdetailsmodel();
    // this.gstaccountdetails.accountName = this.formGSTPurchase.value.accountName;
    // this.gstaccountdetails.narration = this.formGSTPurchase.value.narration;
    // this.gstaccountdetails.subLedger = this.formGSTPurchase.value.subLedger;
    // this.gstaccountdetails.hSN = this.formGSTPurchase.value.hSN;
    // this.gstaccountdetails.amount = this.formGSTPurchase.value.amount;
    // this.gstaccountdetails.sGSTPercentage = this.formGSTPurchase.value.sGSTPercentage;
    // this.gstaccountdetails.sGSTAmount = this.formGSTPurchase.value.sGSTAmount;

    // this.gstaccountList.push(this.gstaccountdetails);
    // this.createInitialArray();
  //   this.formArray.push(this.createInitialArray());
  // }
  
  addItem(index: number): void { 
    if (this.formArray.value[index].validFrom != "" && this.formArray.value[index].validTo != "" 
      && this.formArray.value[index].vehicleAvgLoad != "" && this.formArray.value[index].vehicleAvgEmpty!= "" 
      && this.formArray.value[index].AdAvg != "" ) {

       //Start date end date validation
     if (Date.parse(this.formArray.value[index].validTo) < Date.parse(this.formArray.value[index].validFrom)) {
      this.toasterService.warning("Valid To date should be greter than Valid From date");
      }
      else {
        this.formArray.push(this.createInitialArray());
      }
     } 
     else {
       this.toasterService.warning("Please select Required Fields ");
     }
 }

  removeItem(index: number) {
    this.formArray.removeAt(index);
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

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
}