import { Component,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Rechargerequestmodel } from 'src/app/models/rechargerequestmodel';
import { Rechargerequestlist } from 'src/app/models/rechargerequestlist';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';
import { RechargerequestService } from 'src/app/services/rechargerequest.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';


@Component({
  selector: 'app-rechargerequestapproveadd',
  templateUrl: './rechargerequestapproveadd.component.html',
  styleUrls: ['./rechargerequestapproveadd.component.css']
})

export class RechargerequestapproveaddComponent {
  branchList     : Dropdownmodel[] = [];
  fleetCardList     : Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  @ViewChild('AttachInput', {
    static: true
  }) AttachInput: any;

  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'fromPlace',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }

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
  balanceAmt      : string = '';
  formRequestRecharge!: FormGroup;
  dashboard       : string ="";
  attachPath       : string ="";
  showGrid = false;
   
  selectedRechargerequestmodel = new Rechargerequestmodel();
  rechargerequestlist = new Rechargerequestlist();

  constructor(
    private route: Router, 
    private requestmodel:Requestmodel,
    private formBuilder: FormBuilder, private reportmodel:Reportmodel,
    private rechargerequestService: RechargerequestService, 
    private commonService: CommonService,private toasterService: ToastrService ,
    private sharedService: SharedService,) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Fleet Card Recharge Approve"));      
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
      reqId          : new FormControl(''),
      reqBranch      : new FormControl(''),
      reqCard        : new FormControl(''),
      vehicleMasterId: new FormControl(''),
      approvedYN     : new FormControl(''),
      approvedBy     : new FormControl(''),
      approvedAmt    : new FormControl(''),
      appRejRemarks  : new FormControl(''),
      loggedInUser   : new FormControl(''),
      fromDate       : new FormControl(this.fromDate),
      toDate         : new FormControl(this.loginDate),
      selectedAll    : new FormControl(''),
      arrayList      : this.formBuilder.array([this.createInitialArray()]),
    });
    this.formRequestRecharge.controls['reqCard'].disable();   
    this.getBranchList();
    this.getFleetCardList();
    this.getVehicleNoList();
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

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
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

  createInitialArray(): FormGroup {
    return this.formBuilder.group({
      reqId           : [''],
      reqDate         : [''],
      reqCard         : [''],
      reqAmt          : [''],
      cardNo          : [''],
      vehicleNo       : [''],
      remarks         : [''],
      approvedYN      : [''],
      approvedAmt     : [''],
      appRejRemarks   : [''],
      approvedBy      : [''],
      selected        : [''],
    });
  }

  get formArray() {
    return this.formRequestRecharge.get("arrayList") as FormArray;
  }

  search(): void {
    var selectedData = this.formRequestRecharge.getRawValue();
    this.reportmodel.filterStr = selectedData.reqBranch?.toString() ?? "";
    this.reportmodel.fromDate = selectedData.fromDate?.toString() ?? "";
    this.reportmodel.toDate = selectedData.toDate?.toString() ?? "";
    if (selectedData.reqCard && selectedData.reqCard.dataId) {
      this.reportmodel.filterStr1 = selectedData.reqCard.dataId.toString();
    }
    if (selectedData.vehicleMasterId && selectedData.vehicleMasterId.dataId) {
      this.reportmodel.filterStr2 = selectedData.vehicleMasterId.dataId.toString();
    }
    this.rechargerequestService.getBpclBalanceAmount(this.reportmodel).subscribe((res) => {
      if(res.status){
        this.balanceAmt = res.message;
      }
    });
    this.rechargerequestService.getRechargeRequestApproveList(this.reportmodel).subscribe((res) => {
      if (res.rechargeRequestLst && res.rechargeRequestLst.length > 0) {
        this.formArray.clear();
        this.rechargerequestlist = res;
        this.showGrid = true;
        for (var i = 0; i < res.rechargeRequestLst.length; i++) {
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("reqId")?.setValue(res.rechargeRequestLst[i].reqId);
          this.formArray.controls[i].get("reqDate")?.setValue(res.rechargeRequestLst[i].reqDate);
          this.formArray.controls[i].get("vehicleNo")?.setValue(res.rechargeRequestLst[i].vehicleNo);
          this.formArray.controls[i].get("cardNo")?.setValue(res.rechargeRequestLst[i].cardNo);
          this.formArray.controls[i].get("reqAmt")?.setValue(res.rechargeRequestLst[i].reqAmt);
          this.formArray.controls[i].get("remarks")?.setValue(res.rechargeRequestLst[i].remarks);
          this.formArray.controls[i].get("reqDate")?.disable();
          this.formArray.controls[i].get("vehicleNo")?.disable();
          this.formArray.controls[i].get("cardNo")?.disable();
          this.formArray.controls[i].get("reqAmt")?.disable();
          this.formArray.controls[i].get("approvedAmt")?.disable();
          this.formArray.controls[i].get("approvedYN")?.disable();
          this.formArray.controls[i].get("appRejRemarks")?.disable();
          this.formArray.controls[i].get("remarks")?.disable();
        }
      }
    });
  }


  selectAll(e: any) {
    if(e.target.checked){
      for (var i = 0; i < this.rechargerequestlist.rechargeRequestLst.length; i++) {
       this.rechargerequestlist.rechargeRequestLst[i].selected = true;
        this.formArray.controls[i].get("selected")?.setValue('Y');
        this.formArray.controls[i].get("approvedAmt")?.enable();   
        this.formArray.controls[i].get("approvedYN")?.enable();   
        this.formArray.controls[i].get("appRejRemarks")?.enable();   
      }
    }
    else{
      for (var i = 0; i < this.rechargerequestlist.rechargeRequestLst.length; i++) {
      this.rechargerequestlist.rechargeRequestLst[i].selected = false;
        this.formArray.controls[i].get("selected")?.setValue('');
        this.formArray.controls[i].get("approvedAmt")?.disable();   
        this.formArray.controls[i].get("approvedYN")?.disable();   
        this.formArray.controls[i].get("appRejRemarks")?.disable();   
      }
    }
  }

  selectedData(index: number, event: any) {
    var isChecked = event.target.checked;
    if (isChecked) {
      this.rechargerequestlist.rechargeRequestLst[index].selected = true;
      this.formArray.controls[index].get("selected")?.setValue('Y');
      this.formArray.controls[index].get("approvedAmt")?.enable();
      this.formArray.controls[index].get("approvedYN")?.enable();
      this.formArray.controls[index].get("appRejRemarks")?.enable();
    } else {
      this.rechargerequestlist.rechargeRequestLst[index].selected = false;
      this.formArray.controls[index].get("selected")?.setValue('');
      this.formArray.controls[index].get("approvedAmt")?.disable();
      this.formArray.controls[index].get("approvedYN")?.disable();
      this.formArray.controls[index].get("appRejRemarks")?.disable();
    }
  }


  rechargeRequestAppSave(): void {
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
    var arr= selectedDataVal.arrayList;
    
    var IsItemSelected = false;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].selected) {
        if(arr[i].approvedYN=="")
        {
          this.toasterService.warning("Please select approval: Y or N");
          return;
        }
        else if(arr[i].approvedYN=="Y")
        {
          if(arr[i].approvedAmt=="" || arr[i].approvedAmt=="0")
          {
            this.toasterService.warning("Approval amount should not be zero or emptty");
            return;
          }
        }
        else if(arr[i].approvedYN=="N")
        {
          arr[i].approvedAmt="0";
        }
        IsItemSelected = true;
        this.rechargerequestlist.rechargeRequestLst[i].reqCard 
        this.rechargerequestlist.rechargeRequestLst[i].approvedBy=this.loggedInUserID
        this.rechargerequestlist.rechargeRequestLst[i].approvedYN=arr[i].approvedYN.toString();
        this.rechargerequestlist.rechargeRequestLst[i].appRejRemarks=arr[i].appRejRemarks.toString().toUpperCase();
        this.rechargerequestlist.rechargeRequestLst[i].approvedAmt=arr[i].approvedAmt.toString();
      }
    }
    if (!IsItemSelected){
      this.toasterService.warning("Select Atleast one record");
      return;
    }
    this.sharedService.loading=true;
    this.formSubmitted = true;
    this.rechargerequestService.rechargeRequestAppSave(this.rechargerequestlist).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        window.location.reload();
      } else {
        this.toasterService.warning(this.responseDetails.message);  
      }
    });
    this.sharedService.loading = false;
  }
}
