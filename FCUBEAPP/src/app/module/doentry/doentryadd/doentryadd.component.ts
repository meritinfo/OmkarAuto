import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Domodel } from 'src/app/models/domodel';
import { CommonService } from 'src/app/services/common.service';
import { DoentryService } from 'src/app/services/doentry.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-doentryadd',
  templateUrl: './doentryadd.component.html',
  styleUrls: ['./doentryadd.component.css']
})
export class DoentryaddComponent {
  loggedInUserID: string = '';
  branch: string = '';
  formUser!: FormGroup;
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
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  cnorcneeList: Dropdownmodel[] = [];
  productList: Dropdownmodel[] = [];
  createdBy: string = "";
  modifiedBy: string = "";

  selectedDoDetails = new Domodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private domodel: Domodel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private doentryService: DoentryService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.selectedDoDetails = new Domodel();
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "DO Entry");
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
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getPartyList();
    this.getLocationList();
    this.getCnorCneeList();
    this.getProductList();

    this.selectedDoDetails = this.doentryService.getDoDetails();

    this.formUser = this.formBuilder.group({      
      doBranch : new FormControl(this.branch,[Validators.required]),
      doDate  : new FormControl(this.loginDate,[Validators.required]),
      doParty : new FormControl('',[Validators.required]),
      partyDoNo: new FormControl('',),
      loadingFrom : new FormControl('',[Validators.required]),
      consignorId : new FormControl('',[Validators.required]),
      destination  : new FormControl('',[Validators.required]),
      consigneeId : new FormControl('',[Validators.required]),
      productId  : new FormControl('',), 
      materialDesc : new FormControl('',),
      doQty  : new FormControl('',[Validators.required]),
      doRemarks : new FormControl('',),            
    });
    
    
    this.formUser.controls['doBranch'].disable(); 

    setTimeout(() => {
      if (this.selectedDoDetails.doId != '') {
        this.formUser.patchValue(this.selectedDoDetails);  
        this.formUser.controls['doParty'].disable(); 
        this.formUser.patchValue({
          doDate: this.commonService.formatDate(this.selectedDoDetails.doDate),
          doParty: this.partyList.find(e => e.dataId == this.selectedDoDetails.doParty),
          loadingFrom: this.locationList.find(e => e.dataId == this.selectedDoDetails.loadingFrom),
          destination: this.locationList.find(e => e.dataId == this.selectedDoDetails.destination),  
          consigneeId : this.cnorcneeList.find(e => e.dataId == this.selectedDoDetails.consigneeId),  
          consignorId : this.cnorcneeList.find(e => e.dataId == this.selectedDoDetails.consignorId),  
        });            
        this.editMode = true;
        this.createdBy = this.selectedDoDetails.createdBy + " " + this.selectedDoDetails.createdDate;
        this.modifiedBy = this.selectedDoDetails.modifiedBy + " " + this.selectedDoDetails.modifiedDate;       
      }    
    }, 2000);

    this.sharedService.loading=false;
  }
  
  selectEvent(item: any) {
    // do something with selected item
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


  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
 
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
    
  getCnorCneeList(): void {
    this.commonService.GetCneeCnorList().subscribe((res) => {
      this.cnorcneeList = res;
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

  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

 
  deleteDprDetailsForm(): void {
    if(this.selectedDoDetails.doId != '' ){   
      this.requestmodel.strRequest = this.selectedDoDetails.doId
      if (confirm("Are you sure, you want to delete this?")) {   
        this.sharedService.loading=true;
        this.doentryService.doDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/doentrylist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
        this.sharedService.loading=false;
      }
      
    }
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

    if (selectedDataVal.loadingFrom.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataVal.destination.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning("To Place is Invalid");
      return;
    }

    if (selectedDataVal.doParty.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Party is Invalid");
      return;
    }

    if (selectedDataVal.doQty?parseFloat(selectedDataVal.doQty):0>0) {
      //ignore
    }
    else{
      this.toasterService.warning(" Qty is Invalid");
      return;
    }
    
    this.domodel.doId = this.selectedDoDetails.doId ;

    this.domodel.doBranch = selectedDataVal.doBranch;
    this.domodel.doDate = selectedDataVal.doDate;
    this.domodel.doParty= selectedDataVal.doParty?selectedDataVal.doParty.dataId:"";
    this.domodel.partyDoNo= selectedDataVal.partyDoNo;    
    this.domodel.loadingFrom = selectedDataVal.loadingFrom?selectedDataVal.loadingFrom.dataId:"";
    this.domodel.consignorId = selectedDataVal.consignorId?selectedDataVal.consignorId.dataId:"";
    this.domodel.destination= selectedDataVal.destination?selectedDataVal.destination.dataId:"";
    this.domodel.consigneeId= selectedDataVal.consigneeId?selectedDataVal.consigneeId.dataId:"";
    this.domodel.productId = selectedDataVal.productId;
    this.domodel.materialDesc = selectedDataVal.materialDesc.toString().toUpperCase();;
    this.domodel.doQty = selectedDataVal.doQty.toString().toUpperCase();;
    this.domodel.doRemarks = selectedDataVal.doRemarks.toString().toUpperCase();;    

    this.domodel.loggedInUserID = this.loggedInUserID; 
    

    this.formSubmitted = true;
    this.sharedService.loading=true;

    this.doentryService.doSubmitted(this.domodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/doentrylist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    this.sharedService.loading=false;
  }
}



