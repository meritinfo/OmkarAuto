
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { BrokeradvancepmtModel } from 'src/app/models/brokeradvancepmtmodel';
import { BrokerAdvancePmtService } from 'src/app/services/brokeradvancepmt.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-brokeradvancepmtadd',
  templateUrl: './brokeradvancepmtadd.component.html',
  styleUrls: ['./brokeradvancepmtadd.component.css']
})
export class BrokeradvancepmtaddComponent {
  loggedInUserID: string = '';
  formDriverMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  branch: string = '';
  year: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  seriesDoc: string = "";
  dashboard: string ="";
  minDate:string = '';
  maxDate: string = '';
  loginDate:string = '';
  fromDate: string = '';
  vehicleList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  selectedBrokerAdvanceDetails = new BrokeradvancepmtModel();
  driverPhotoData: [] = [];
  driverPhotoPreview: any;
  driverPhotoName: string = '';
  keywordLocation = 'dataName';  
  uploadedDrLic: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private brokeradvancepmtModel: BrokeradvancepmtModel, private brokerAdvancePmtService: BrokerAdvancePmtService,
    private commonService: CommonService, private sharedService : SharedService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.brokeradvancepmtModel = new BrokeradvancepmtModel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Broker Advances"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
      this.sharedService.loggedInStatus = true;
        var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    else {
      this.route.navigate(['/']);
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }
   
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
  
    
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
    this.getBranchList();
    this.getBrokerList();
   
    this.selectedBrokerAdvanceDetails = this.brokerAdvancePmtService.getBrokerAdvanceDetails();
    this.formDriverMaster = this.formBuilder.group({
      advPmtid: new FormControl('',),
    //  driverName: new FormControl('', [Validators.required]),
      branchCode: new FormControl(this.branch, [Validators.required]),
      pmtNo: new FormControl('', [Validators.required]),
      pmtDate: new FormControl(this.loginDate, [Validators.required]),
      brokerId: new FormControl('', [Validators.required]),
      advanceAmt: new FormControl('', [Validators.required]),
      remarks: new FormControl('', ),
      attachment1: new FormControl('',),
      pmtType: new FormControl('', [Validators.required]),
      neftYN: new FormControl('N', ),
      creditAc: new FormControl('', [Validators.required]),
      chequeNo: new FormControl('',),
      chequeDt: new FormControl('',),
        modifyRemarks : new FormControl('',),
     // finDocid: new FormControl('',),
     
     
    });

   // this.formDriverMaster.controls['age'].disable(); 
    this.formDriverMaster.controls['branchCode'].disable();
          this.formDriverMaster.controls['pmtDate'].disable();
            this.formDriverMaster.controls['pmtNo'].disable();
     if (this.selectedBrokerAdvanceDetails.advPmtid != '') {      
      this.getCreditAcList(this.selectedBrokerAdvanceDetails.pmtType);  
    }
        if (this.selectedBrokerAdvanceDetails.advPmtid == ''){
      this.onBranchChange();
    }

    setTimeout(() => {   
    if (this.selectedBrokerAdvanceDetails.advPmtid  != '') {
       //const objectURL = URL.createObjectURL(this.convertDataUrlToBlob('upload/driver/driverphoto/' + this.selectedDriverMasterDetails.drPhoto));
    
      this.uploadedDrLic = Constants.UploadFolderPath + 'broker/attachment/' + this.selectedBrokerAdvanceDetails.attachment1;
     
      this.formDriverMaster.patchValue(this.selectedBrokerAdvanceDetails);
      this.formDriverMaster.patchValue({
        // dateOfBirth: this.commonService.formatDate(this.selectedDriverMasterDetails.dateOfBirth),
        // dateOfAppoint: this.commonService.formatDate(this.selectedDriverMasterDetails.dateOfAppoint),
        // licValidUpto: this.commonService.formatDate(this.selectedDriverMasterDetails.licValidUpto),
        // hazLicValidUpto: this.commonService.formatDate(this.selectedDriverMasterDetails.hazLicValidUpto),
        // inActiveDate: this.commonService.formatDate(this.selectedDriverMasterDetails.inActiveDate),
         pmtDate: this.commonService.formatDate(this.selectedBrokerAdvanceDetails.pmtDate),
         chequeDt: this.commonService.formatDate(this.selectedBrokerAdvanceDetails.chequeDt),
         brokerId: this.brokerList.find(e => e.dataId == this.selectedBrokerAdvanceDetails.brokerId),
      })
    
       this.formDriverMaster.controls['pmtDate'].disable();
       //  this.formDriverMaster.controls['brokerId'].disable();
           this.formDriverMaster.controls['pmtNo'].disable();
             this.getFinDocDetails(this.selectedBrokerAdvanceDetails.finDocid);
      this.editMode = true;
    }
      }, 2000);   
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDriverMaster.controls; }

    onBranchChange() {
      // var selectedData = this.formUser.getRawValue();
      // if (selectedData.challanBranch==""){
         this.requestmodel.strRequest = this.branch;
      this.requestmodel.strRequest1 =  this.year;
     //  }
     //  else{
        // this.requestmodel.strRequest = selectedData.challanBranch;
      // }
   
       this.brokerAdvancePmtService.getPmtNo(this.requestmodel).subscribe((res: Responsemodel) => {
         this.responseDetails = res;
         if (this.responseDetails.status) {
           this.formDriverMaster.patchValue({
             pmtNo: this.responseDetails.message
           });
         }
        else{
           this.toasterService.warning(this.responseDetails.message);
         }
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
  
  getBrokerList(): void {
    this.commonService.getBrokerList().subscribe((res) => {
      this.brokerList = res;
    });
  }
  

  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.commonService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }
  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
    });
  }

    onNeftChk(e: any) {
      if(e.target.value=="N"){
        this.formDriverMaster.controls['chequeNo'].clearValidators();      
        this.formDriverMaster.controls['chequeDt'].clearValidators();   
        this.formDriverMaster.controls['chequeNo'].disable();
        this.formDriverMaster.controls['chequeDt'].disable();
        this.formDriverMaster.patchValue({
          chequeNo:'',
          chequeDate:'',
        });   
      }
      else {
        this.formDriverMaster.controls['chequeNo'].setValidators([Validators.required]);
        this.formDriverMaster.controls['chequeDt'].setValidators([Validators.required]);
        this.formDriverMaster.controls['chequeNo'].enable(); 
        this.formDriverMaster.controls['chequeDt'].enable();
      }
      this.formDriverMaster.controls['chequeNo'].updateValueAndValidity();
      this.formDriverMaster.controls['chequeDt'].updateValueAndValidity();
    }
  
    changePmtType(e: any) {
      var selectedValue = e.target.value;
       
      if (selectedValue == 'B'){
        this.formDriverMaster.controls['neftYN'].enable();
        this.formDriverMaster.controls['chequeNo'].enable();
        this.formDriverMaster.controls['chequeDt'].enable();
      }
      else {
        this.formDriverMaster.controls['neftYN'].disable();
        this.formDriverMaster.controls['chequeNo'].disable();
        this.formDriverMaster.controls['chequeDt'].disable(); 
      }
     
      this.formDriverMaster.patchValue({
        neftPmt : "",
        chequeNo: "",
        chequeDate: this.loginDate,
      });
      
      this.getCreditAcList(selectedValue);
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
  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };


  deleteDriverMasterForm(): void {
    if (this.selectedBrokerAdvanceDetails.advPmtid  != '') {
      this.requestmodel.strRequest = this.selectedBrokerAdvanceDetails.advPmtid 
      if (confirm("Are you sure, you want to delete this?")) {
        this.brokerAdvancePmtService.brokerAdvanceDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formDriverMaster.reset();
            this.route.navigate(['/brokeradvlist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/brokeradvlist']);
  }

  submitBrokerAdvanceMasterForm() {
    if (this.formDriverMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formDriverMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    this.formSubmitted = true;
    var selectedDataVal = this.formDriverMaster.getRawValue()
    this.brokeradvancepmtModel.advPmtid  = this.selectedBrokerAdvanceDetails.advPmtid ;
    //this.driverModel.driverName = selectedDataVal.driverName.toString().toUpperCase();
    //this.driverModel.fatherName = selectedDataVal.fatherName.toString().toUpperCase();
   // this.driverModel.dateOfBirth = selectedDataVal.dateOfBirth;
  //  this.driverModel.age = selectedDataVal.age.toString();
  //  this.driverModel.introBy = selectedDataVal.introBy.toString().toUpperCase();
  //  this.driverModel.introByMobileNo = selectedDataVal.introByMobileNo;
   // this.driverModel.dateOfAppoint = selectedDataVal.dateOfAppoint;
   // this.driverModel.vehicleMasterId = selectedDataVal.vehicleMasterId?selectedDataVal.vehicleMasterId.dataId:"";
   this.brokeradvancepmtModel.branchCode = selectedDataVal.branchCode;
this.brokeradvancepmtModel.pmtNo = selectedDataVal.pmtNo;
this.brokeradvancepmtModel.pmtDate = selectedDataVal.pmtDate;
this.brokeradvancepmtModel.brokerId = selectedDataVal.brokerId.dataId;
this.brokeradvancepmtModel.advanceAmt = selectedDataVal.advanceAmt.toString();
this.brokeradvancepmtModel.remarks = selectedDataVal.remarks.toUpperCase().toString();
this.brokeradvancepmtModel.pmtType = selectedDataVal.pmtType;
this.brokeradvancepmtModel.neftYN = selectedDataVal.neftYN;
this.brokeradvancepmtModel.creditAc = selectedDataVal.creditAc;
this.brokeradvancepmtModel.chequeNo = selectedDataVal.chequeNo;
this.brokeradvancepmtModel.chequeDt = selectedDataVal.chequeDt;
this.brokeradvancepmtModel.modifyRemarks = selectedDataVal.modifyRemarks.toUpperCase().toString();
this.brokeradvancepmtModel.yearId = this.year;



    this.brokeradvancepmtModel.loggedInUser = this.loggedInUserID;
   // this.driverModel.deleteFlag = "N";

    let formData = new FormData();
 
    formData.append('attach1', this.attachmentInput.nativeElement.files[0]);
        formData.append('datadetails', JSON.stringify(this.brokeradvancepmtModel));


    this.brokerAdvancePmtService.brokerAdvanceDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formDriverMaster.reset();
        this.route.navigate(['/brokeradvlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }


}


