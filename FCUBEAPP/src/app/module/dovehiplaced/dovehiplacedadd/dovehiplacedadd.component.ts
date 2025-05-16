import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dovehiplacedmodel } from 'src/app/models/dovehiplacedmodel';
import { CommonService } from 'src/app/services/common.service';
import { DoentryService } from 'src/app/services/doentry.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dovehiplacedadd',
  templateUrl: './dovehiplacedadd.component.html',
  styleUrls: ['./dovehiplacedadd.component.css']
})
export class DovehiplacedaddComponent {
  loggedInUserID: string = '';
  branch: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];
  createdBy: string = "";
  modifiedBy: string = "";
  doQty: string = "";
  doQtyLift: string = "";
  baldoQty: string = "";
  doid: string = "";
    

  selectedDoDetails = new Dovehiplacedmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private dovehiplacedmodel: Dovehiplacedmodel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private doentryService: DoentryService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.selectedDoDetails = new Dovehiplacedmodel();
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "DO Vehicle Placement");
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

    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
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

    
    var doid = sessionStorage.getItem('doid')?.toString();
    if (typeof doid !== 'undefined' && doid !== null && doid !== '') {
      this.doid = doid;
      sessionStorage.setItem("doid", "");
    }
    else {
      this.route.navigate([this.dashboard]);
    }
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getBrokerList();
    this.getVehicleTypeList();
    this.getEmpList();

    this.formUser = this.formBuilder.group({      
      doBranch : new FormControl('',),
      doNo: new FormControl('',),
      doDate  : new FormControl('',),
      partyName : new FormControl('',),
      partyDoNo: new FormControl('',),
      loadingFr : new FormControl('',),
      cnorName : new FormControl('',),
      dest  : new FormControl('',),
      cneeName : new FormControl('',),
      placementDate : new FormControl(this.loginDate,[Validators.required]),
      vehicleNo : new FormControl('',[Validators.required]),
      vehicleType : new FormControl('',[Validators.required]),
      vehicleCapacity: new FormControl('',[Validators.required]),
      ownMarket : new FormControl('O',),  
      brokerId : new FormControl('',[Validators.required]),
      hireRateType : new FormControl('F',),  
      hireRate : new FormControl('',),  
      hireAmt : new FormControl('',[Validators.required]),
      vehicleEngBy : new FormControl('',),  
      loadAssignTo : new FormControl('',),  
      placementRem : new FormControl('',),   
    });
    
    this.formUser.controls['doBranch'].disable(); 
    this.formUser.controls['doNo'].disable(); 
    this.formUser.controls['doDate'].disable(); 
    this.formUser.controls['partyName'].disable(); 
    this.formUser.controls['partyDoNo'].disable(); 
    this.formUser.controls['loadingFr'].disable(); 
    this.formUser.controls['dest'].disable(); 
    this.formUser.controls['cneeName'].disable(); 
    this.formUser.controls['cnorName'].disable(); 
    this.formUser.controls['hireRate'].disable();     

    this.requestmodel.strRequest = this.doid;
    this.doentryService.getDoVehiPlacedDetails(this.requestmodel).subscribe((res) => {
      this.selectedDoDetails = res
      if (this.selectedDoDetails.doId != '') {
        this.formUser.patchValue(this.selectedDoDetails);  
        this.formUser.patchValue({
          doDate: this.commonService.formatDate(this.selectedDoDetails.doDate),
          placementDate:this.loginDate,
          hireRate: "0",  
          hireAmt: "0",  
        });    
        this.doQty = this.selectedDoDetails.doQty?this.selectedDoDetails.doQty:"0";
        this.doQtyLift = this.selectedDoDetails.doQtyLift?this.selectedDoDetails.doQtyLift:"0";
        this.baldoQty = (parseFloat(this.doQty) - parseFloat(this.doQtyLift)).toString();
      }    
    });

    this.sharedService.loading=false;
  }
  
   

  onChangeSearch(search: string) {
    // do something with selected item
  }

  onFocused(e: any) {
    // do something
  }
  
  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));    
  };

  getVehiCapacity(e:any){
    var vehitp = e.target.value;
   
    this.requestmodel.strRequest = vehitp
    this.commonService.getVehiCapacity(this.requestmodel).subscribe((res) => {
      if(res.status){
        this.formUser.patchValue({
          vehicleCapacity: res.message,  
        });  
        this.onratepct();
      }
    });    
  }

  onRateChange(e:any){
    var ratetp = e.target.value;   
    if(ratetp=="P"){
      this.formUser.controls['hireRate'].enable(); 
      this.formUser.controls['hireAmt'].disable();       
    }
    else{      
      this.formUser.controls['hireRate'].disable();  
      this.formUser.controls['hireAmt'].enable();      
    }
    this.formUser.patchValue({
      hireRate: "0",  
      hireAmt: "0",  
    });      
  }

  onratepct(){
    var selectedData = this.formUser.getRawValue();
    var rate = selectedData.hireRate;
    var capacity = selectedData.vehicleCapacity==""?0:parseFloat(selectedData.vehicleCapacity);
    var hire = capacity * (rate==""?0:parseFloat(rate))
    this.formUser.patchValue({
      hireAmt: hire,  
    });  
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
 
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
 
  getVehicleTypeList(): void {
    this.commonService.getVehicleTypeList().subscribe((res) => {
      this.vehicleTypeList = res;
    });
  }

  getEmpList(): void {
    this.commonService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }

  exit(): void {
    this.route.navigate(['/doentrylist']);
  }

  submitDprDetails(): void {
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

    var selectedDataVal =this.formUser.getRawValue();

    if (selectedDataVal.brokerId.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" broker is Invalid");
      return;
    }
    
    if (parseFloat(selectedDataVal.vehicleCapacity)> parseFloat(this.baldoQty)) {
      this.toasterService.warning(" Vehi Capacity should not be more than DO Balance Qty");
      return;
    }
    
    
    this.dovehiplacedmodel.doId = this.selectedDoDetails.doId ;
    this.dovehiplacedmodel.doNo = this.selectedDoDetails.doNo ;
    this.dovehiplacedmodel.doBranch = this.selectedDoDetails.doBranch;
    this.dovehiplacedmodel.doDate = selectedDataVal.doDate;
    this.dovehiplacedmodel.partyDoNo = this.selectedDoDetails.partyDoNo;   
    this.dovehiplacedmodel.doVpId = "";  
    this.dovehiplacedmodel.placementDate = selectedDataVal.placementDate;
    this.dovehiplacedmodel.vehicleNo = selectedDataVal.vehicleNo;
    this.dovehiplacedmodel.vehicleType = selectedDataVal.vehicleType;
    this.dovehiplacedmodel.vehicleCapacity = selectedDataVal.vehicleCapacity;
    this.dovehiplacedmodel.ownMarket = selectedDataVal.ownMarket;
    this.dovehiplacedmodel.brokerId = selectedDataVal.brokerId?selectedDataVal.brokerId.dataId:"";
    this.dovehiplacedmodel.hireRateType = selectedDataVal.hireRateType;
    this.dovehiplacedmodel.hireRate = selectedDataVal.hireRate?selectedDataVal.hireRate.toString():"0";
    this.dovehiplacedmodel.hireAmt = selectedDataVal.hireAmt.toString();
    this.dovehiplacedmodel.vehicleEngBy = selectedDataVal.vehicleEngBy;
    this.dovehiplacedmodel.loadAssignTo = selectedDataVal.loadAssignTo;
    this.dovehiplacedmodel.placementRem = selectedDataVal.placementRem?selectedDataVal.placementRem.toString().toUpperCase():"";
    this.dovehiplacedmodel.loggedInUserID = this.loggedInUserID;     

    this.formSubmitted = true;
    this.sharedService.loading=true;

    this.doentryService.doVehiPlacedSubmitted(this.dovehiplacedmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/dovehplacedlist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    this.sharedService.loading=false;
  }
}



