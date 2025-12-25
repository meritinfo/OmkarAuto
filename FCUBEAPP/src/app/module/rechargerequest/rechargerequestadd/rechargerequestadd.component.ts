import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Rechargerequestmodel } from 'src/app/models/rechargerequestmodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';
import { RechargerequestService } from 'src/app/services/rechargerequest.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Constants } from 'src/app/common/constants';


@Component({
  selector: 'app-rechargerequestadd',
  templateUrl: './rechargerequestadd.component.html',
  styleUrls: ['./rechargerequestadd.component.css']
})
export class RechargerequestaddComponent {
  branchList     : Dropdownmodel[] = [];
  fleetCardList     : Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  @ViewChild('AttachInput', {
    static: true
  }) AttachInput: any;

  formSubmitted   = false;
  responseDetails = new Responsemodel();
  editMode        = false;
  createmode      = true;
  createStatus    = false;
  editStatus      = false;
  deleteStatus    = false;
  viewStatus      = false; 
  fromDate: string = '';
  minDate: string = '';  
  maxDate: string = '';
  year   : string = '';
  loginDate: string = '';
  branch:string = '';
  loggedInUserID      : string = '';
  formRequestRecharge!: FormGroup;
  dashboard       : string ="";
  attachPath       : string ="";
  
  selectedRechargerequestmodel = new Rechargerequestmodel();

  constructor(
    private route: Router, 
    private formBuilder: FormBuilder, 
    private rechargerequestmodel: Rechargerequestmodel,
    private requestmodel:Requestmodel,
     private rechargerequestService: RechargerequestService, 
    private commonService: CommonService,private toasterService: ToastrService ,
    private sharedService: SharedService,) {
    this.rechargerequestmodel = new Rechargerequestmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Trip Sheet"));      
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
      
    this.sharedService.loggedInStatus = true;
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
        
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate;
    
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }

    this.formRequestRecharge = this.formBuilder.group({ 
      reqId: new FormControl(''),
      reqBranch: new FormControl(this.branch,[Validators.required]),
      reqDate: new FormControl(this.loginDate,[Validators.required]),
      reqCard: new FormControl('',[Validators.required]),
      reqAmt:  new FormControl('',[Validators.required]),
      vehicleMasterId: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
      attachPath: new FormControl(''),
      loggedInUser: new FormControl(''),
    });
    this.getBranchList();
    this.getFleetCardList();
    this.getVehicleNoList();
    this.formRequestRecharge.controls['reqBranch'].disable(); 
    this.formRequestRecharge.controls['reqCard'].disable();     

    this.selectedRechargerequestmodel = this.rechargerequestService.setRechargeRequestDetails();
    if (this.selectedRechargerequestmodel.reqId  != '') {
      setTimeout(() => {        
        this.formRequestRecharge.patchValue(this.selectedRechargerequestmodel);
        this.attachPath = Constants.UploadFolderPath + 'RechargeRequest/' + this.selectedRechargerequestmodel.attachPath;
        this.formRequestRecharge.patchValue({        
          reqDate: this.commonService.formatDate(this.selectedRechargerequestmodel.reqDate.toString()),
          reqCard: this.fleetCardList.find(e => e.dataId == this.selectedRechargerequestmodel.reqCard),
          vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedRechargerequestmodel.vehicleMasterId),
        }); 
        this.editMode =true;
      }, 2000);  
    } 
  }

  get f() { return this.formRequestRecharge.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
    });
  }

  getFleetCardList(): void {
    this.rechargerequestService.getFleetCardList().subscribe((res) => {
        this.fleetCardList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
    
  selectEvent(item: any) {
    this.requestmodel.strRequest = item.dataName;
    this.rechargerequestService.getVehiBpclCardDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      if (res.status) {
        this.formRequestRecharge.patchValue({        
          reqCard: this.fleetCardList.find(e => e.dataId == res.message),
        });  
        this.formRequestRecharge.controls["vehicleMasterId"].disable();
      }
      else {
        this.toasterService.warning(res.message);
      }
    });
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };

  RechargeRequestDelete(): void {    
    if(this.selectedRechargerequestmodel.reqId != '' ){
      this.requestmodel.strRequest =this.selectedRechargerequestmodel.reqId
      if (confirm("Are you sure, you want to delete this?")) {
        this.rechargerequestService.RechargeRequestDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formRequestRecharge.reset();
            this.route.navigate(['/FleetCardRechargeReq']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
  
  exit(): void {
    this.route.navigate(['/FleetCardRechargeReq']);
  } 

  rechargeRequestSave(): void {    
    if (this.formRequestRecharge.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formRequestRecharge.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    var selectedDataVal = this.formRequestRecharge.getRawValue();
    this.rechargerequestmodel.reqId = this.selectedRechargerequestmodel.reqId;
    this.rechargerequestmodel.reqBranch = selectedDataVal.reqBranch.toUpperCase().toString();
    this.rechargerequestmodel.reqDate = selectedDataVal.reqDate.toString();
    this.rechargerequestmodel.reqAmt = selectedDataVal.reqAmt.toString();
    this.rechargerequestmodel.reqCard = selectedDataVal.reqCard.dataId.toString();
    this.rechargerequestmodel.vehicleMasterId = selectedDataVal.vehicleMasterId.dataId.toString();
    this.rechargerequestmodel.loggedInUser = this.loggedInUserID;
    this.rechargerequestmodel.remarks = selectedDataVal.remarks.toUpperCase().toString();
    this.rechargerequestmodel.attachPath = this.attachPath;
  
    
    let formData = new FormData();       
    formData.append('attachPath', this.AttachInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.rechargerequestmodel));
    this.rechargerequestService.rechargeRequestSave(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formRequestRecharge.reset();
        this.route.navigate(['/FleetCardRechargeReq']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
  

}
