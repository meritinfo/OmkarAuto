import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicleinstpmtmodel } from 'src/app/models/vehicleinstpmtmodel';
import { CommonService } from 'src/app/services/common.service';
import { VehicleInstPmtService } from 'src/app/services/vehicleinstpmt.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-vehicleinstpmtllpadd',
  templateUrl: './vehicleinstpmtllpadd.component.html',
  styleUrls: ['./vehicleinstpmtllpadd.component.css']
})
export class VehicleinstpmtllpaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  keywordLocation = 'dataName';
  stateList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  mainAcList: Dropdownmodel[] = [];
  
  branch: string = '';

  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  year: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  createdBy : string = "";
  modifiedBy: string = "";
  createmode = false;


  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
  @ViewChild('attachmentInput1', {
    static: true
  }) attachmentInput1: any;

  selectedVehicleInstPmtDetail = new Vehicleinstpmtmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private sharedService : SharedService,
private vehicleinstpmtmodel: Vehicleinstpmtmodel, private vehicleInstPmtService: VehicleInstPmtService, private commonService: CommonService,private toastrService: ToastrService,private requestmodel:Requestmodel) {
    this.vehicleinstpmtmodel = new Vehicleinstpmtmodel();
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle EMI Payment");
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
    
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }

    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    this.getBranchList();
    this.getVehicleIdList();

    this.selectedVehicleInstPmtDetail = this.vehicleInstPmtService.getVehicleInstPmtDetails();

    this.formUser = this.formBuilder.group({
      branchCode: new FormControl(this.branch,[Validators.required]),
      pmtDate: new FormControl(this.loginDate,[Validators.required]),
      loanType: new FormControl('',[Validators.required]),
      vehicleMasterid: new FormControl('',[Validators.required]),
      totAmt: new FormControl('',[Validators.required]),
      remarks: new FormControl('',),
      pmtType: new FormControl('',[Validators.required]),
      neftYN: new FormControl('N',),
      cheqNo: new FormControl('',),
      creditAc: new FormControl('',[Validators.required]),
      cheqDate: new FormControl('',),
    });

    this.createmode = true;
    this.formUser.controls['branchCode'].disable();
    this.formUser.controls['neftYN'].disable();
    this.formUser.controls['cheqNo'].disable();
    this.formUser.controls['cheqDate'].disable();
    
    if (this.selectedVehicleInstPmtDetail.pmtId != '') {
      this.getMainAcList(this.selectedVehicleInstPmtDetail.pmtType);
    }
    setTimeout(() => {
      if (this.selectedVehicleInstPmtDetail.pmtId != '') {
        this.formUser.controls['pmtDate'].disable();
        this.formUser.controls['loanType'].disable();
        this.formUser.controls['vehicleMasterid'].disable();

        this.editMode = true;
        this.createdBy = this.selectedVehicleInstPmtDetail.createdBy + " " + this.selectedVehicleInstPmtDetail.createdDate;
        this.modifiedBy = this.selectedVehicleInstPmtDetail.modifiedBy + " " + this.selectedVehicleInstPmtDetail.modifiedDate; 
        this.formUser.patchValue(this.selectedVehicleInstPmtDetail);
       
        this.formUser.patchValue({
          pmtDate: this.commonService.formatDate(this.selectedVehicleInstPmtDetail.pmtDate),
          cheqDate:this.commonService.formatDate(this.selectedVehicleInstPmtDetail.cheqDate),
          vehicleMasterid: this.vehicleList.find(e => e.dataId == this.selectedVehicleInstPmtDetail.vehicleMasterid),
        })
        if(this.selectedVehicleInstPmtDetail.pmtType=="B"){          
          this.formUser.controls['neftYN'].enable();
        }
        if(this.selectedVehicleInstPmtDetail.neftYN=="N"){
          this.formUser.controls['cheqNo'].setValidators([Validators.required]);
          this.formUser.controls['cheqDate'].setValidators([Validators.required]);
          this.formUser.controls['cheqNo'].updateValueAndValidity();
          this.formUser.controls['cheqDate'].updateValueAndValidity();
          this.formUser.controls['cheqNo'].enable();
          this.formUser.controls['cheqDate'].enable();
        }
      }
    }, 2000);
  }

  get f() { return this.formUser.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getMainAcList(pmt: string): void {    
    this.requestmodel.strRequest = pmt;
    this.commonService.getAccountList(this.requestmodel).subscribe((res) => {
      this.mainAcList = res;
    });
  }

  selectEvent(item: any) {
    var vehi = item.dataId;
    var selectedData = this.formUser.getRawValue();
    if(selectedData.loanType==""){
      this.toastrService.warning("Please select Loan Type");
      this.formUser.patchValue({
        vehicleMasterid: "",
      })
      return;
    }
    else{
      this.requestmodel.strRequest = vehi;
      this.requestmodel.strRequest1 = selectedData.loanType;

      this.vehicleInstPmtService.checkVehicleLoanType(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formUser.controls["loanType"].disable();
        }
        else {
          this.toastrService.warning(this.responseDetails.message);
        }      
      });
    }
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
    return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
  };
  
  
  changePmtType(e: any) {
    var selectedValue = e.target.value;  
    this.formUser.patchValue({
      neftYN:"",
      cheqNo:"",
      cheqDate:this.loginDate,
    })   

    if (selectedValue == 'B'){
      this.formUser.controls['neftYN'].enable();     
    }
    else { 
      this.formUser.controls['neftYN'].disable();
      this.formUser.controls['cheqNo'].disable();
      this.formUser.controls['cheqDate'].disable();
    } 
    
    if(selectedValue=='M') {selectedValue = 'C'}

    this.getMainAcList(selectedValue);   
  }
  
  onneftChange(e:any){
    this.formUser.patchValue({
      cheqNo:'',
      cheqDate: this.loginDate,
    });   
    if(e.target.value=="Y"){
      this.formUser.controls['cheqNo'].clearValidators();      
      this.formUser.controls['cheqDate'].clearValidators();   
      this.formUser.controls['cheqNo'].disable();
      this.formUser.controls['cheqDate'].disable();      
    }
    else {
      this.formUser.controls['cheqNo'].setValidators([Validators.required]);
      this.formUser.controls['cheqDate'].setValidators([Validators.required]);
      this.formUser.controls['cheqNo'].enable();
      this.formUser.controls['cheqDate'].enable();
    }
    this.formUser.controls['cheqNo'].updateValueAndValidity();
    this.formUser.controls['cheqDate'].updateValueAndValidity();
  }


  vehicleInstPmtDelete(): void {
    if(this.selectedVehicleInstPmtDetail.pmtId != '' ){
    this.requestmodel.strRequest =this.selectedVehicleInstPmtDetail.pmtId
      if (confirm("Are you sure, you want to delete this?")) {
            this.vehicleInstPmtService.vehicleInstPmtDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/emipmtllplist']);
            }
            else {
              this.toastrService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/emipmtllplist']);
  }

//Submit user form details //
  submitVehicleInstPmtForm(): void {
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
    if (selectedDataValue.vehicleMasterid.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning("Invalid Vehicle");
      return;
    }
    this.formSubmitted = true;
    this.vehicleinstpmtmodel.pmtId = this.selectedVehicleInstPmtDetail.pmtId != '' ? this.selectedVehicleInstPmtDetail.pmtId : '';
    this.vehicleinstpmtmodel.branchCode = selectedDataValue.branchCode;
    this.vehicleinstpmtmodel.pmtDate = selectedDataValue.pmtDate;
    this.vehicleinstpmtmodel.loanType = selectedDataValue.loanType;    
    this.vehicleinstpmtmodel.vehicleMasterid = selectedDataValue.vehicleMasterid.dataId;
    this.vehicleinstpmtmodel.instNo = "0";
    this.vehicleinstpmtmodel.instId = "0";
    this.vehicleinstpmtmodel.priAmt = selectedDataValue.totAmt;
    this.vehicleinstpmtmodel.intAmt = "0";
    this.vehicleinstpmtmodel.totAmt = selectedDataValue.totAmt;
    this.vehicleinstpmtmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.vehicleinstpmtmodel.pmtType = selectedDataValue.pmtType;
    this.vehicleinstpmtmodel.neftYN = selectedDataValue.neftYN;
    this.vehicleinstpmtmodel.cheqNo = selectedDataValue.cheqNo;
    this.vehicleinstpmtmodel.cheqDate = selectedDataValue.cheqDate;
    this.vehicleinstpmtmodel.creditAc = selectedDataValue.creditAc;
    this.vehicleinstpmtmodel.yearid = this.year;
    this.vehicleinstpmtmodel.loggedInUser = this.loggedInUserID;

    this.vehicleInstPmtService.vehicleInstPmtSubmitted(this.vehicleinstpmtmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/emipmtllplist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }

}


