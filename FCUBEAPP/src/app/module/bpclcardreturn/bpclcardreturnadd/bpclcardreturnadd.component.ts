import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Fleetcardreturntransfermodel } from 'src/app/models/fleetcardreturntransfermodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';
import { RechargerequestService } from 'src/app/services/rechargerequest.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Constants } from 'src/app/common/constants';
import { Reportmodel } from 'src/app/models/reportmodel';

@Component({
  selector: 'app-bpclcardreturnadd',
  templateUrl: './bpclcardreturnadd.component.html',
  styleUrls: ['./bpclcardreturnadd.component.css']
})
export class BpclcardreturnaddComponent {
 branchList      : Dropdownmodel[] = [];
  fleetCardList  : Dropdownmodel[] = [];
  vehicleList    : Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  balanceAmt      : string = '';
  formSubmitted   = false;
  responseDetails = new Responsemodel();
  editMode        = false;
  createmode      = true;
  createStatus    = false;
  editStatus      = false;
  deleteStatus    = false;
  viewStatus      = false; 
  fromDate        : string = '';
  minDate         : string = '';  
  maxDate         : string = '';
  year            : string = '';
  loginDate       : string = '';
  branch:string   = '';
  loggedInUserID  : string = '';
  formRequestRecharge!: FormGroup;
  dashboard       : string ="";

  selectedFleetcardreturntransfermodel = new Fleetcardreturntransfermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private fleetcardreturntransfermodel: Fleetcardreturntransfermodel, private requestmodel:Requestmodel,
    private rechargerequestService: RechargerequestService, private sharedService: SharedService,
    private commonService: CommonService,private toasterService: ToastrService ,) {
    this.fleetcardreturntransfermodel = new Fleetcardreturntransfermodel();
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "BPCL Card Amount Return"));      
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
      returnId: new FormControl(''),
      returnBranch: new FormControl(this.branch,[Validators.required]),
      returnDate: new FormControl(this.loginDate,[Validators.required]),
      fleetCard: new FormControl('',[Validators.required]),
      returnAmt:  new FormControl('',[Validators.required]),
      vehicleMasterId: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
      loggedInUser: new FormControl(''),
    });
    this.getBranchList();
    this.getFleetCardList();
    this.getVehicleNoList();
    this.formRequestRecharge.controls['returnBranch'].disable(); 
    this.formRequestRecharge.controls['fleetCard'].disable();     

    this.selectedFleetcardreturntransfermodel = this.rechargerequestService.selectFleetcardreturntransferDetails();
    if (this.selectedFleetcardreturntransfermodel.returnId  != '') {
      setTimeout(() => {        
        this.formRequestRecharge.patchValue(this.selectedFleetcardreturntransfermodel);      
        this.formRequestRecharge.patchValue({        
          returnDate: this.commonService.formatDate(this.selectedFleetcardreturntransfermodel.returnDate.toString()),
          fleetCard: this.fleetCardList.find(e => e.dataId == this.selectedFleetcardreturntransfermodel.fleetCard),
          vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedFleetcardreturntransfermodel.vehicleMasterId),
        });          
      }, 2000);  
      this.formSubmitted=true
      this.formRequestRecharge.controls['returnDate'].disable(); 
      this.formRequestRecharge.controls['returnAmt'].disable();  
      this.formRequestRecharge.controls['vehicleMasterId'].disable();  
      this.formRequestRecharge.controls['remarks'].disable();  
    } 
  }

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

  get f() { return this.formRequestRecharge.controls; }

  selectEvent(item: any) {
    this.requestmodel.strRequest = item.dataName;
    this.rechargerequestService.getVehiBpclCardDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      if (res.status) {
        this.formRequestRecharge.patchValue({        
          fleetCard: this.fleetCardList.find(e => e.dataId == res.message),
        });  
        var reqCard = this.fleetCardList.find(e => e.dataId == res.message)?.dataName;
        this.requestmodel.strRequest1 = reqCard? reqCard : "";
        this.rechargerequestService.getBpclCardBalAmount(this.requestmodel).subscribe((res) => {
          if(res.status){
            this.balanceAmt = res.message;
          }
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

  CardBalCheck(e: any) {
    var enteredAmt =parseFloat(e.target.value);
    var balanceAmt = parseFloat(this.balanceAmt);
    if (enteredAmt >= balanceAmt) {
      this.toasterService.warning( "Amount should not be greater than balance amount" );
      this.formRequestRecharge.patchValue({
        returnAmt: ''
      });
      return;
    }
  }


  
  exit(): void {
    this.route.navigate(['/bpclcardamtreturn']);
  } 

  fleetCardReturnTransferSave(): void {    
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
    this.fleetcardreturntransfermodel.returnId = this.selectedFleetcardreturntransfermodel.returnId;
    this.fleetcardreturntransfermodel.returnBranch = selectedDataVal.returnBranch.toUpperCase().toString();
    this.fleetcardreturntransfermodel.returnDate = selectedDataVal.returnDate.toString();
    this.fleetcardreturntransfermodel.returnAmt = selectedDataVal.returnAmt.toString();
    this.fleetcardreturntransfermodel.fleetCard = selectedDataVal.fleetCard.dataId.toString();
    this.fleetcardreturntransfermodel.cardNo = selectedDataVal.fleetCard.dataName.toString();
    this.fleetcardreturntransfermodel.vehicleMasterId = selectedDataVal.vehicleMasterId.dataId.toString();
    this.fleetcardreturntransfermodel.loggedInUser = this.loggedInUserID;
    this.fleetcardreturntransfermodel.remarks   = selectedDataVal.remarks.toUpperCase().toString();
    this.rechargerequestService.fleetCardReturnTransferSave(this.fleetcardreturntransfermodel).subscribe((res: Responsemodel) => {
       this.responseDetails = res;
       if (this.responseDetails.status) {
        this.toasterService.success("Transfered Successfully");
        this.route.navigate(['/bpclcardamtreturn']);
       } else {
         this.toasterService.warning(this.responseDetails.message);  
       }
     });
     this.sharedService.loading = false;
  }
}
