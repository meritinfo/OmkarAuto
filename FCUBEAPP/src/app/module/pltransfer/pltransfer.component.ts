import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { PltransferService } from 'src/app/services/pltransfer.service';
import { Component} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pltransfermodel } from 'src/app/models/pltransfermodel';

@Component({
  selector: 'app-pltransfer',
  templateUrl: './pltransfer.component.html',
  styleUrls: ['./pltransfer.component.css']
})

export class PltransferComponent {
  selectedPltransfermodel = new Pltransfermodel();
  responseDetails = new Responsemodel();
  branchList       : Dropdownmodel[]   = [];
  request          = new Requestmodel();
  userscope        : string = '';
  loggedBranch     : string = '';
  fromDate         : string = '';
  year             : string = '';
  branch           : string = '';
  loggedInUserID   : string = '';
  loginDate        : string = '';
  formFilter!      : FormGroup;
  maxDate          : string = '';
  minDate          : string = '';
  dashboard        : string ="";
  formSubmitted       = false;
  editMode            = false;
  createStatus        = false;
  editStatus          = false;
  deleteStatus        = false;
  viewStatus          = false;
  showGrid            = false;
  constructor(
  private route: Router,
  private formBuilder: FormBuilder,
  private pltransfermodel:Pltransfermodel,
  private commonService: CommonService,
  private pltransferService: PltransferService,
  private requestmodel: Requestmodel,
  private sharedService: SharedService,
  private toasterService: ToastrService
  )
  {
   this.pltransfermodel = new Pltransfermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "PL Transfer"));      
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
    this.formFilter = this.formBuilder.group({
      tfrBranch           : new FormControl('',Validators.required),
      tfrTotalDrAmt       : new FormControl(''),
      tfrTotalCrAmt       : new FormControl(''),
      tfrPLAmt            : new FormControl(''),
      tfrYear             : new FormControl(''),
      loggedInUser        : new FormControl(''),
      arrayList           : this.formBuilder.array([this.createInitialArray()]),
    });
    this. getBranchList();
  }

  getBranchList(): void {
    debugger
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  createInitialArray(): FormGroup {
    return this.formBuilder.group({
    accountName:[''],
    accountId  :[''],
    drAmt      :[''],
    crAmt      :[''],
    });
  }

  get f() { return this.formFilter.controls; }

  get formArray() {
    return this.formFilter.get("arrayList") as FormArray;
  }

  search(): void {
    this.showGrid=true;
    var selectedData = this.formFilter.getRawValue();
    if(selectedData.tfrBranch=="" || selectedData.tfrBranch==undefined)
    {
      this.toasterService.warning("Please select branch details")
    }
    this.requestmodel.strRequest =selectedData.tfrBranch.toString();
     this.requestmodel.strRequest1 =this.year;
    this.pltransferService.getPLTransferList(this.requestmodel).subscribe((res) => {
    this.formArray.clear();
    var tfrTotalDrAmt=0;
    var tfrTotalCrAmt=0;
    var tfrPLAmt=0;
    if (res.plTransferDetails && res.plTransferDetails.length > 0) {
      for (var i = 0; i < res.plTransferDetails.length; i++) {
      this.formArray.push(this.createInitialArray());
      this.formArray.controls[i].get("accountId")?.setValue(res.plTransferDetails[i].accountId);
      this.formArray.controls[i].get("accountName")?.setValue(res.plTransferDetails[i].accountName);
      this.formArray.controls[i].get("crAmt")?.setValue(res.plTransferDetails[i].crAmt);
      this.formArray.controls[i].get("drAmt")?.setValue(res.plTransferDetails[i].drAmt);
      tfrTotalDrAmt=tfrTotalDrAmt+parseFloat(res.plTransferDetails[i].drAmt);
      tfrTotalCrAmt=tfrTotalCrAmt+parseFloat(res.plTransferDetails[i].crAmt);
      tfrPLAmt=tfrTotalCrAmt-tfrTotalDrAmt;
      this.formArray.controls[i].get("accountName")?.disable();   
      this.formArray.controls[i].get("crAmt")?.disable();   
      this.formArray.controls[i].get("drAmt")?.disable();
      this.formFilter.controls['tfrTotalDrAmt'].disable();   
      this.formFilter.controls['tfrTotalCrAmt'].disable();  
      this.formFilter.controls['tfrPLAmt'].disable();  
      this.formFilter.patchValue({
      tfrTotalDrAmt      : tfrTotalDrAmt.toFixed(2),
      tfrTotalCrAmt      : tfrTotalCrAmt.toFixed(2),
      tfrPLAmt           :tfrPLAmt.toFixed(2)
    });
      }
      }else {
      this.pltransfermodel.plTransferDetails = [];
    }

    });
  }

  plTransferSave(): void {
    if (this.formFilter.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      var controls = this.formFilter.controls;
      for (var name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    var selectedDataVal                    = this.formFilter.getRawValue();
    this.pltransfermodel.tfrYear           =  this.year;
    this.pltransfermodel.tfrBranch         = selectedDataVal.tfrBranch;
    this.pltransfermodel.tfrTotalDrAmt     = selectedDataVal.tfrTotalDrAmt;
    this.pltransfermodel.tfrTotalCrAmt     = selectedDataVal.tfrTotalCrAmt;
    this.pltransfermodel.tfrPLAmt          = selectedDataVal.tfrPLAmt;
    this.pltransfermodel.loggedInUser      = this.loggedInUserID;
    this.pltransfermodel.plTransferDetails = [];
    var arr = selectedDataVal.arrayList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].accountId == "" || arr[i].accountName == "" ) {
        this.toasterService.warning("Inner Grid details should not be empty.");
        return;
      }
      else{
        this.pltransfermodel.plTransferDetails.push({
          'TfrId'      : "",
          'accountName':arr[i].accountName.toString(),
          'drAmt'      :arr[i].drAmt,
          'crAmt'      :arr[i].crAmt, 
          'accountId'  :arr[i].accountId, 
        })
      }
    }
    this.sharedService.loading = true;
    this.formSubmitted   = true;
    this.pltransferService.plTransferSave(this.pltransfermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formFilter.reset();
        window.location.reload();
      }
      else 
      {
        this.toasterService.warning(this.responseDetails.message);
        this.formFilter.reset();
        return;
      }
    });
    this.sharedService.loading = false;
  }
}
