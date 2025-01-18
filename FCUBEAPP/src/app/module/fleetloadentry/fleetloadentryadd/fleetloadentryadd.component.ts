import { Component ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { FleetLoadEntryService } from 'src/app/services/fleetloadentry.service';
import { Fleetloadentrymodel } from 'src/app/models/fleetloadentrymodel';


@Component({
  selector: 'app-fleetloadentryadd',
  templateUrl: './fleetloadentryadd.component.html',
  styleUrls: ['./fleetloadentryadd.component.css']
})
export class FleetloadentryaddComponent {
  loggedInUserID: string = '';
  formFleetLoad!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch: string = '';
  uploadedAttach: string = "";
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleList : Dropdownmodel[] = [];
  branchList  : Dropdownmodel[] = [];
  productList : Dropdownmodel[] = [];
  creditAcList : Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  List: Dropdownmodel[] = [];
  selectedFleetLoadEntryDetails = new Fleetloadentrymodel();
  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private fleetLoadEntryModel: Fleetloadentrymodel, 
    private fleetLoadEntryService: FleetLoadEntryService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.fleetLoadEntryModel = new Fleetloadentrymodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Load Memo Entry");
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
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.sharedService.loading = true;   
    this.getLocationList();
    this.getBranchList();
    this.getVehicleNoList();
    this.getProductList();
    this.getCreditAcList();

    this.selectedFleetLoadEntryDetails = this.fleetLoadEntryService.getFleetLoadEntryDetails();
    this.formFleetLoad = this.formBuilder.group({   
      loadBranch: new FormControl(this.branch,[Validators.required]),
      loadDate: new FormControl(this.loginDate,[Validators.required]),
      loadType: new FormControl('',[Validators.required]),
      vehicleMasterId: new FormControl('',[Validators.required]),
      loadFor: new FormControl('',[Validators.required]),
      loadMemoNo: new FormControl('',[Validators.required]),
      loadingFrom: new FormControl('',[Validators.required]),
      consignorName: new FormControl('',[Validators.required]),
      consignorAdd: new FormControl('',),
      loadingTo: new FormControl('',[Validators.required]),
      consigneeName: new FormControl('',[Validators.required]),
      consigneeAdd: new FormControl('',),
      productId: new FormControl('',[Validators.required]),
      qtyWt: new FormControl('',[Validators.required]),
      qtyPkgs: new FormControl('',[Validators.required]),
      ratePerTon: new FormControl('',),
      hireAmt: new FormControl('',[Validators.required]),
      advAmt: new FormControl('',),
      remarks: new FormControl('',),
      attachMemocopy: new FormControl('',),
    });

    setTimeout(() => {
      this.formFleetLoad.controls['loadBranch'].disable();  

      if (this.selectedFleetLoadEntryDetails.loadId != '') {
        this.formFleetLoad.patchValue(this.selectedFleetLoadEntryDetails);    
        this.uploadedAttach = Constants.UploadFolderPath + 'loadmemo/' + this.selectedFleetLoadEntryDetails.attachMemocopy;
        this.formFleetLoad.patchValue({        
          loadDate: this.commonService.formatDate(this.selectedFleetLoadEntryDetails.loadDate),
          loadingFrom: this.locationList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.loadingFrom),
          loadingTo: this.locationList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.loadingTo),
          vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.vehicleMasterId),
          loadFor: this.creditAcList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.loadFor),
        });
        this.editMode = true;
        this.formFleetLoad.controls['loadType'].disable();  
        if(this.selectedFleetLoadEntryDetails.loadType == "E"){
          this.formFleetLoad.controls['qtyWt'].clearValidators();
          this.formFleetLoad.controls['qtyPkgs'].clearValidators(); 
          this.formFleetLoad.controls['hireAmt'].clearValidators();  
          this.formFleetLoad.controls['loadFor'].clearValidators();   
          this.formFleetLoad.controls['loadMemoNo'].clearValidators();   
          this.formFleetLoad.controls['consignorName'].clearValidators();   
          this.formFleetLoad.controls['consigneeName'].clearValidators();  
          this.formFleetLoad.controls['productId'].clearValidators();     
    
          this.formFleetLoad.patchValue({
            qtyWt : 0,
            qtyPkgs : 0,
            hireAmt : 0,
          });
        }
        else{      
          this.formFleetLoad.controls['qtyWt'].setValidators([Validators.required]);
          this.formFleetLoad.controls['qtyPkgs'].setValidators([Validators.required]);
          this.formFleetLoad.controls['hireAmt'].setValidators([Validators.required]);
          this.formFleetLoad.controls['loadFor'].setValidators([Validators.required]);
          this.formFleetLoad.controls['loadMemoNo'].setValidators([Validators.required]);
          this.formFleetLoad.controls['consignorName'].setValidators([Validators.required]);
          this.formFleetLoad.controls['consigneeName'].setValidators([Validators.required]);
          this.formFleetLoad.controls['productId'].setValidators([Validators.required]);
        }
        this.formFleetLoad.controls['qtyWt'].updateValueAndValidity();    
        this.formFleetLoad.controls['qtyPkgs'].updateValueAndValidity();    
        this.formFleetLoad.controls['hireAmt'].updateValueAndValidity();   
        this.formFleetLoad.controls['loadFor'].updateValueAndValidity();   
        this.formFleetLoad.controls['loadMemoNo'].updateValueAndValidity();   
        this.formFleetLoad.controls['consignorName'].updateValueAndValidity();   
        this.formFleetLoad.controls['consigneeName'].updateValueAndValidity();  
        this.formFleetLoad.controls['productId'].updateValueAndValidity();  
      }    
    }, 2000);
    this.sharedService.loading = false;
  }

  get f() { return this.formFleetLoad.controls; }

  getCreditAcList(): void {
    //this.requestmodel.strRequest= 'B';
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditAcList = res;
    });  
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getProductList(): void {
    this.commonService.getProductList().subscribe((res) => {
      this.productList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  
  selectEvent(item: any) {
    // do something with selected item
  // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  onRateChange(){
    var ItemQty = 0;
    var Itemrate = 0;
    var ItemAmt = 0;

    var selectedVal = this.formFleetLoad.getRawValue();
    ItemQty = selectedVal.qtyWt?selectedVal.qtyWt:"0";
    Itemrate= selectedVal.ratePerTon?selectedVal.ratePerTon:"0";
    ItemAmt = ItemQty * Itemrate

    if(Itemrate>0){
      this.formFleetLoad.patchValue({
        hireAmt : ItemAmt.toFixed(2),
      });
    }
    else{      
      this.formFleetLoad.patchValue({
        hireAmt : "",
      });
    }
  }

  onLoadTypeChange(e:any){
    var ldtp = e.target.value;

    if(ldtp == "E"){
      this.formFleetLoad.controls['qtyWt'].clearValidators();
      this.formFleetLoad.controls['qtyPkgs'].clearValidators(); 
      this.formFleetLoad.controls['hireAmt'].clearValidators();  
      this.formFleetLoad.controls['loadFor'].clearValidators();   
      this.formFleetLoad.controls['loadMemoNo'].clearValidators();   
      this.formFleetLoad.controls['consignorName'].clearValidators();   
      this.formFleetLoad.controls['consigneeName'].clearValidators();  
      this.formFleetLoad.controls['productId'].clearValidators();     

      this.formFleetLoad.patchValue({
        qtyWt : 0,
        qtyPkgs : 0,
        hireAmt : 0,
      });
    }
    else{      
      this.formFleetLoad.controls['qtyWt'].setValidators([Validators.required]);
      this.formFleetLoad.controls['qtyPkgs'].setValidators([Validators.required]);
      this.formFleetLoad.controls['hireAmt'].setValidators([Validators.required]);
      this.formFleetLoad.controls['loadFor'].setValidators([Validators.required]);
      this.formFleetLoad.controls['loadMemoNo'].setValidators([Validators.required]);
      this.formFleetLoad.controls['consignorName'].setValidators([Validators.required]);
      this.formFleetLoad.controls['consigneeName'].setValidators([Validators.required]);
      this.formFleetLoad.controls['productId'].setValidators([Validators.required]);
    }
    this.formFleetLoad.controls['qtyWt'].updateValueAndValidity();    
    this.formFleetLoad.controls['qtyPkgs'].updateValueAndValidity();    
    this.formFleetLoad.controls['hireAmt'].updateValueAndValidity();   
    this.formFleetLoad.controls['loadFor'].updateValueAndValidity();   
    this.formFleetLoad.controls['loadMemoNo'].updateValueAndValidity();   
    this.formFleetLoad.controls['consignorName'].updateValueAndValidity();   
    this.formFleetLoad.controls['consigneeName'].updateValueAndValidity();  
    this.formFleetLoad.controls['productId'].updateValueAndValidity();  
  }

  exit(): void {
    this.route.navigate(['/loadmemolist']);
  }

  deleteFleetLoadEntryForm(): void {
    if(this.selectedFleetLoadEntryDetails.loadId != '' ){
      this.requestmodel.strRequest = this.selectedFleetLoadEntryDetails.loadId;
      if (confirm("Are you sure, you want to delete this?")) {
            this.fleetLoadEntryService.fleetLoadEntryDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formFleetLoad.reset();
              this.route.navigate(['/loadmemolist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  //Submit user form details //
  submitFleetLoadEntryForm(): void {  
    if (this.formFleetLoad.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formFleetLoad.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;

    var selectedDataVal = this.formFleetLoad.getRawValue();
    if (selectedDataVal.vehicleMasterId.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning("Invalid Vehicle");
      return;
    }
    if (selectedDataVal.loadingTo.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" To Place is Invalid");
      return;
    }
    if (selectedDataVal.loadingFrom.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataVal.loadFor.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Load For is Invalid");
      return;
    }

    this.formSubmitted = true;
    this.fleetLoadEntryModel.loadId = this.selectedFleetLoadEntryDetails.loadId ;
    this.fleetLoadEntryModel.loadBranch = selectedDataVal.loadBranch;
    this.fleetLoadEntryModel.loadDate = selectedDataVal.loadDate;
    this.fleetLoadEntryModel.loadType = selectedDataVal.loadType;
    this.fleetLoadEntryModel.vehicleMasterId = selectedDataVal.vehicleMasterId.dataId;
    this.fleetLoadEntryModel.loadFor = selectedDataVal.loadFor.dataId;
    this.fleetLoadEntryModel.loadMemoNo = selectedDataVal.loadMemoNo;
    this.fleetLoadEntryModel.loadingFrom = selectedDataVal.loadingFrom.dataId;;
    this.fleetLoadEntryModel.consignorName = selectedDataVal.consignorName.toString().toUpperCase();;
    this.fleetLoadEntryModel.consignorAdd = selectedDataVal.consignorAdd.toString().toUpperCase();;
    this.fleetLoadEntryModel.loadingTo = selectedDataVal.loadingTo.dataId;;
    this.fleetLoadEntryModel.consigneeName = selectedDataVal.consigneeName.toString().toUpperCase();;
    this.fleetLoadEntryModel.consigneeAdd = selectedDataVal.consigneeAdd.toString().toUpperCase();;
    this.fleetLoadEntryModel.productId = selectedDataVal.productId;
    this.fleetLoadEntryModel.qtyWt = selectedDataVal.qtyWt.toString();
    this.fleetLoadEntryModel.qtyPkgs = selectedDataVal.qtyPkgs.toString();
    this.fleetLoadEntryModel.ratePerTon = selectedDataVal.ratePerTon.toString();
    this.fleetLoadEntryModel.hireAmt = selectedDataVal.hireAmt.toString();
    this.fleetLoadEntryModel.advAmt = selectedDataVal.advAmt.toString();
    this.fleetLoadEntryModel.remarks = selectedDataVal.remarks.toString().toUpperCase();
    this.fleetLoadEntryModel.loggedInUser   = this.loggedInUserID;

    let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.fleetLoadEntryModel));

    this.fleetLoadEntryService.fleetLoadEntrySubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formFleetLoad.reset();
        this.route.navigate(['/loadmemolist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}
