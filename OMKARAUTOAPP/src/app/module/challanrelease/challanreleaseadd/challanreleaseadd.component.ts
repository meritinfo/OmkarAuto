import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ChallanreleaseModel } from 'src/app/models/challanreleasemodel';
import { Challanmastermodel } from 'src/app/models/challanmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { ChallanReleaseService } from 'src/app/services/challanrelease.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-challanreleaseadd',
  templateUrl: './challanreleaseadd.component.html',
  styleUrls: ['./challanreleaseadd.component.css']
})

export class ChallanreleaseaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  yearList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];
  editMode = false;
  createdBy : string = "";
  modifiedBy: string = "";
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  year: string = '';
  branch: string = '';

  selectedChallanReleaseDetails = new ChallanreleaseModel();
  selectedChallanDetails = new Challanmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private challanreleaseModel: ChallanreleaseModel,  
    private sharedService : SharedService,
    private toasterService: ToastrService,private challanReleaseService: ChallanReleaseService,
    private requestmodel:Requestmodel,private reportmodel:Reportmodel, 
    private commonService: CommonService) {
    this.challanreleaseModel = new ChallanreleaseModel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Challan Release for Pmt");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
        if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
          this.dashboard = dashboard;
        }
        if(!this.viewStatus){      
          this.route.navigate([this.dashboard]);
        }

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
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
    this.getDropdownList();
    this.getLocationList();
    this.getBrokerList();
    this.getBranchList();

    this.selectedChallanReleaseDetails = this.challanReleaseService.getChallanDetails();
    this.formUser = this.formBuilder.group({
      chYear: new FormControl('',[Validators.required]),
      challanBranch: new FormControl(this.branch,[Validators.required]),
      challanNo: new FormControl('',[Validators.required]),
      releaseForPmt: new FormControl('Y',[Validators.required]),
      challanFromStn: new FormControl('', ),
      challanToStn: new FormControl('', ),
      challanDateTime: new FormControl('', ),
      brokerId: new FormControl('', ),
    });

    this.formUser.controls["challanBranch"].disable();
    this.formUser.controls["chYear"].disable();
    this.formUser.controls["challanFromStn"].disable();
    this.formUser.controls["challanToStn"].disable();
    this.formUser.controls["challanDateTime"].disable();
    this.formUser.controls["brokerId"].disable();
    this.formUser.controls["releaseForPmt"].disable();

    if (this.selectedChallanReleaseDetails.chReleaseId != '') {
      this.formUser.controls["challanNo"].disable();
      this.formUser.patchValue(this.selectedChallanReleaseDetails);   
      this.editMode = true; 
      this.createdBy = this.selectedChallanReleaseDetails.createdBy + " " + this.selectedChallanReleaseDetails.createdDate;
      this.modifiedBy = this.selectedChallanReleaseDetails.modifiedBy + " " + this.selectedChallanReleaseDetails.modifiedDate;   
      this.editStatus = false;
      this.searchChallan();
      this.formUser.patchValue({
        challanBranch: this.selectedChallanReleaseDetails.challanBranch,
      });  
    }
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getDropdownList() {
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      this.formUser.patchValue({
        chYear: this.year,
      })   
    }); 
  }

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));    
  };

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  getBrokerList(): void {
    this.commonService.getBrokerList().subscribe((res) => {
      this.brokerList = res;
    });
  }

   

  onChangeSearch(search: string) {
    // do something with selected item
  }

  searchChallan(): void {
    var selectedDataVal = this.formUser.getRawValue();
    this.reportmodel.filterStr = selectedDataVal.challanNo;
    this.reportmodel.filterStr1 = selectedDataVal.challanBranch;
    this.reportmodel.filterStr2 = selectedDataVal.chYear;
    this.challanReleaseService.searchChallanDetail(this.reportmodel).subscribe((res) => {
      this.selectedChallanDetails = res;
      this.formUser.patchValue(this.selectedChallanDetails);
      this.formUser.patchValue({
        challanDateTime:this.commonService.formatDate(this.selectedChallanDetails.challanDateTime), 
        challanFromStn:this.selectedChallanDetails.challanFromStn, 
        challanToStn:this.selectedChallanDetails.challanToStn, 
        brokerId:this.selectedChallanDetails.brokerId,              
      })   
      this.formUser.controls["releaseForPmt"].disable();   
      this.formUser.controls["challanFromStn"].disable(); 
      this.formUser.controls["challanToStn"].disable(); 
      this.formUser.controls["brokerId"].disable(); 
      this.formUser.controls["challanDateTime"].disable(); 
    });
  }

  chkChallanDuplicateRelease(){
    var selectedData = this.formUser.getRawValue();
      this.reportmodel.filterStr = selectedData.challanNo;
      this.reportmodel.filterStr1 = selectedData.challanBranch;
      this.reportmodel.filterStr2 = selectedData.chYear;

      this.challanReleaseService.checkDuplicateChallanRelease(this.reportmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.searchChallan();
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            challanNo: "",
            challanFromStn: "",
            challanToStn: "",
            challanDateTime: "",
            brokerId: "",
          });
        }
      });
  }

  exit(): void {
    this.route.navigate(['/challanrelease']);
  }
  
  deleteChallanReleaseForm(): void {
    if(this.selectedChallanReleaseDetails.chReleaseId != '' ){
    this.requestmodel.strRequest =this.selectedChallanReleaseDetails.chReleaseId
      if (confirm("Are you sure, you want to delete this?")) {
            this.challanReleaseService.challanReleaseDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/challanrelease']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  //Submit user form details //
  submitChallanReleaseForm(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    this.formSubmitted = true;
    var selectedDataValue = this.formUser.getRawValue();
    this.challanreleaseModel.chReleaseId = this.selectedChallanReleaseDetails.chReleaseId;
    this.challanreleaseModel.chYear= selectedDataValue.chYear.toString().toUpperCase();
    this.challanreleaseModel.challanBranch = selectedDataValue.challanBranch;
    this.challanreleaseModel.challanNo = selectedDataValue.challanNo;
    this.challanreleaseModel.challanId = selectedDataValue.challanId;
    this.challanreleaseModel.releaseForPmt = selectedDataValue.releaseForPmt;
    this.challanreleaseModel.loggedInUser = this.loggedInUserID;

    this.challanReleaseService.challanReleaseSubmitted(this.challanreleaseModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;

      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/challanrelease']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
  }
}


