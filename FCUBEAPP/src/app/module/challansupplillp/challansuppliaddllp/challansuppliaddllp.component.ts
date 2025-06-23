
import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Challanmastermodel } from 'src/app/models/challanmastermodel';
import { ChallansuppliServiceLLP } from 'src/app/services/challansupplillp.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-challansuppliaddllp',
  templateUrl: './challansuppliaddllp.component.html',
  styleUrls: ['./challansuppliaddllp.component.css']
})
export class ChallansuppliaddllpComponent {
   formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  createdBy : string = "";
  modifiedBy: string = "";
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicalList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  selectedChallanDetails = new Challanmastermodel();
  keywordLocation = 'dataName';

  constructor(private route: Router, private formBuilder: FormBuilder,
    private challanmodel: Challanmastermodel, private challanmasterService: ChallansuppliServiceLLP,
    private commonService: CommonService,  private sharedService: SharedService,
    private toastrService: ToastrService, private requestmodel: Requestmodel) {
    this.challanmodel = new Challanmastermodel();

}
ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Supp. Challan Entry");
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
    
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var mindt = new Date("2025-03-31");
    var logdt = new Date(this.loginDate);

    if(logdt>mindt){
      this.toastrService.warning("This form is for old Challans, Invalid login year");
      this.route.navigate(['/suppchallanlist']);
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
  
    this.sharedService.loading = true;
    this.createdBy = this.selectedChallanDetails.createdBy + " " + this.selectedChallanDetails.createdDate;
    this.modifiedBy = this.selectedChallanDetails.modifiedBy + " " + this.selectedChallanDetails.modifiedDate;   

    this.getBranchList();
    this.getLocationList();
    this.getVehTypes();
    this.getBrokerList();

    this.sharedService.loading = false;
    
    this.selectedChallanDetails = this.challanmasterService.getChallanDetails();

    this.formUser = this.formBuilder.group({
      challanBranch: new FormControl(this.branch, [Validators.required]),
      challanNo: new FormControl('', [Validators.required]),
      challanDateTime: new FormControl(this.loginDate, [Validators.required]),
      challanFromStn: new FormControl('', [Validators.required]),
      challanToStn: new FormControl('', [Validators.required]),
      distanceKms: new FormControl('',),
      truckNo: new FormControl('', [Validators.required]),
      brokerId: new FormControl('', [Validators.required]),
      brokerMblNo: new FormControl('',), 
      totalHire: new FormControl('',[Validators.required]), 
      totalAdvance: new FormControl('',),    
      balance: new FormControl('',),    
      balancePayAt: new FormControl(this.branch,[Validators.required]),    
      generalRemarks: new FormControl('',),   
      modifyRemarks: new FormControl('',),   
    });

    this.formUser.controls["challanBranch"].disable();
    this.formUser.controls["balance"].disable();
    this.formUser.controls["modifyRemarks"].disable();
        
    setTimeout(() => {      
      if (this.selectedChallanDetails.challanId != '') {
        this.sharedService.loading = true;
        this.formUser.patchValue(this.selectedChallanDetails);
        this.formUser.patchValue({
          challanDateTime: this.commonService.formatDate(this.selectedChallanDetails.challanDateTime) ,
          challanFromStn: this.locationList.find(e => e.dataId == this.selectedChallanDetails.challanFromStn),
          challanToStn: this.locationList.find(e => e.dataId == this.selectedChallanDetails.challanToStn), 
          brokerId : this.brokerList.find(e => e.dataId == this.selectedChallanDetails.brokerId),           
        })       
     
        this.formUser.controls['challanNo'].disable();  
        this.formUser.controls["modifyRemarks"].enable();  
        
        this.createdBy = this.selectedChallanDetails.createdBy + " " + this.selectedChallanDetails.createdDate;
        this.modifiedBy = this.selectedChallanDetails.modifiedBy + " " + this.selectedChallanDetails.modifiedDate;     
        
        this.editMode = true;        
        this.sharedService.loading = false;           
      }   
      
    }, 2000);   
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
 

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  
  getBrokerList(): void {
    this.commonService.getBrokerListLLP().subscribe((res) => {
      this.brokerList = res;
    });
  }
  
  
  getVehTypes(): void {
    this.commonService.getVehicleTypeList().subscribe((res) => {
      this.vehicalList = res;
    });
  }
   
  chkChallanDuplicate(){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.challanNo==""){
      this.toastrService.warning("Challan No should not be Blank");
      return;
    }
    else{
      this.requestmodel.strRequest = selectedData.challanBranch;
      this.requestmodel.strRequest1 = selectedData.challanNo;
      this.requestmodel.strRequest2 = this.year;
      this.challanmasterService.checkDuplicateChallan(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toastrService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            challanNo: "",
          });
        }
      });
    }  
  }

  
  calculateTotalAmount(){
    var totalHire = 0;
    var totalAdvance = 0;
    var balance = 0;
    var selectedDataValue = this.formUser.getRawValue();

    var totalHire = selectedDataValue.totalHire!= ""? parseFloat(selectedDataValue.totalHire) : 0;
    var totalAdvance = selectedDataValue.totalAdvance!= ""? parseFloat(selectedDataValue.totalAdvance ) : 0;
    if(totalHire<totalAdvance){
      this.toastrService.warning("Total Advance should not be more than Total Hire");
      this.formUser.patchValue({
        totalHire: "",
        totalAdvance: "",
        balance: "",
      });
      return;
    }

    balance = totalHire - totalAdvance;
    this.formUser.patchValue({
      totalHire: totalHire.toFixed(2),
      totalAdvance: totalAdvance.toFixed(2),
      balance: balance.toFixed(2),
    });
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

 
  deleteChallanForm(): void {
    if(this.selectedChallanDetails.challanId != '' ){      
      this.sharedService.loading = true;
      this.requestmodel.strRequest =this.selectedChallanDetails.challanId;
      if (confirm("Are you sure, you want to delete this?")) {
            this.challanmasterService.challanDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/suppchallanlistllp']);
            }
            else {
              this.toastrService.warning(this.responseDetails.message);
            }    
        });
      }      
      this.sharedService.loading = false;
    }
  }

  exit(): void {
    this.route.navigate(['/suppchallanlistllp']);
  }

  submitChallanForm(): void {
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

    if (selectedDataValue.challanFromStn.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataValue.challanToStn.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" To Place is Invalid");
      return;
    }

    if (selectedDataValue.brokerId.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Broker is Invalid");
      return;
    }
    if(selectedDataValue.totalHire?parseFloat(selectedDataValue.totalHire):0 > 0){
      //ignore
    }
    else{
      this.toastrService.warning("Lorry Hire should be greater than Zero");
      return;
    }
   

    this.formSubmitted = true;
    this.sharedService.loading = true;
    this.challanmodel.challanId = this.selectedChallanDetails.challanId?this.selectedChallanDetails.challanId:"";
    this.challanmodel.challanBranch = selectedDataValue.challanBranch;
    this.challanmodel.challanNo = selectedDataValue.challanNo;
    this.challanmodel.challanDateTime = selectedDataValue.challanDateTime;
    this.challanmodel.chStatus = "O";
    this.challanmodel.challanFromStn = selectedDataValue.challanFromStn?selectedDataValue.challanFromStn.dataId:"";
    this.challanmodel.challanToStn = selectedDataValue.challanToStn?selectedDataValue.challanToStn.dataId:"";
    this.challanmodel.distanceKms = selectedDataValue.distanceKms? selectedDataValue.distanceKms : ""; 
    this.challanmodel.truckNo = selectedDataValue.truckNo? selectedDataValue.truckNo.toString().toUpperCase() : ""; 
    this.challanmodel.brokerId = selectedDataValue.brokerId?selectedDataValue.brokerId.dataId:"";
    this.challanmodel.brokerMblNo = selectedDataValue.brokerMblNo? selectedDataValue.brokerMblNo : ""; 
    this.challanmodel.totalHire = selectedDataValue.totalHire? selectedDataValue.totalHire.toString() : "0"; 
    this.challanmodel.totalAdvance = selectedDataValue.totalAdvance? selectedDataValue.totalAdvance.toString() : "0"; 
    this.challanmodel.balance = selectedDataValue.balance? selectedDataValue.balance.toString() : "0"; 
    this.challanmodel.balancePayAt = selectedDataValue.balancePayAt? selectedDataValue.balancePayAt : ""; 
    this.challanmodel.generalRemarks = selectedDataValue.generalRemarks?selectedDataValue.generalRemarks.toString().toUpperCase():"";
    this.challanmodel.modifyRemarks = selectedDataValue.modifyRemarks?selectedDataValue.modifyRemarks.toString().toUpperCase():"";
    this.challanmodel.yearId = this.year;
    this.challanmodel.loggedInUser = this.loggedInUserID;

    this.challanmodel.challanDtls = [];    
         
    this.challanmasterService.challanDetailsSubmitted(this.challanmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (res.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/suppchallanlistllp']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
    });

    this.sharedService.loading = false;
  }

}
