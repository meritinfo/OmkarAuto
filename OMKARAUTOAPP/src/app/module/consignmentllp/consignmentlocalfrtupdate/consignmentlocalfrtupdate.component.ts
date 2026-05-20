import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Consignmentupdatemodel } from 'src/app/models/consignmentupdatemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-consignmentlocalfrtupdate',
  templateUrl: './consignmentlocalfrtupdate.component.html',
  styleUrls: ['./consignmentlocalfrtupdate.component.css']
})
export class ConsignmentlocalfrtupdateComponent {
 formUser!: FormGroup;
  loggedInUserID : string = '';
  year           : string = '';
  branch         : string = '';
  loginDate      : string = '';
  fromDate       : string = '';
  maxDate        : string = '';
  minDate        :  string = '';
  newDate        : string = '';
  whatsappPOD2   : string = '';
  partyList      : Dropdownmodel[] = [];
  formSubmitted  = false;
  editMode       = false;
  createStatus   = false;
  editStatus     = false;
  deleteStatus   = false;
  viewStatus     = false; 
  dashboard      : string ="";
  branchList     : Dropdownmodel[] = [];
  rateList       : Dropdownmodel[] = [];
  contentList    : Dropdownmodel[] = [];
  locationList   : Dropdownmodel[] = [];
  freightList    : Dropdownmodel[] = [];
  gstByList      : Dropdownmodel[] = [];
  responseDetails= new Responsemodel();
  selectedLrDetails = new Consignmentmodel();
  keywordLocation = 'dataName';

  constructor(private route: Router, private formBuilder: FormBuilder,
    private lrmodel: Consignmentmodel,  private cnmodel: Consignmentupdatemodel,private lrentryService: ConsignmentService,
    private commonService: CommonService, private sharedService: SharedService,
    private toastrService: ToastrService, private requestmodel: Requestmodel) {
    this.lrmodel = new Consignmentmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Update Local Freight");
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
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    this.fromDate = this.minDate ;
    this.sharedService.loading = true;
    this.getBranchList();
    this.getRateList();
    this.getLocationList();
    this.getBillingPartyList();
    this.getContentList();
    this.getFreightList();
    this.getGstByList();
    this.formSubmitted = false;
    this.sharedService.loading = false;
    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl(this.branch, [Validators.required]),
      gcNoteNo      : new FormControl('', [Validators.required]),
      vehicleNo     : new FormControl('',),
      containerNo   : new FormControl('',), 
      bookingDate   : new FormControl('', ),
      fromPlace     : new FormControl('',),    
      toPlace       : new FormControl('', ), 
      poNo          : new FormControl('', ), 
      shipmentNo    : new FormControl('', ), 
      noPackages    : new FormControl('',),  
      actualWt      : new FormControl('',),   
      chargewt      : new FormControl('',),   
      cnorName      : new FormControl('',), 
      cneeName      : new FormControl('',),
      party         : new FormControl(''),
      gstBy         : new FormControl(''),
      productId     : new FormControl('', ),
      extrasRecd2   : new FormControl('',[Validators.required]),
      gstType       : new FormControl(''), 
    });
    this.formUser.controls['bookingPlace'].disable();
    this.formUser.controls['vehicleNo'].disable();
    this.formUser.controls['bookingDate'].disable();  
    this.formUser.controls['fromPlace'].disable();  
    this.formUser.controls['toPlace'].disable();
    this.formUser.controls['noPackages'].disable(); 
    this.formUser.controls['actualWt'].disable();   
    this.formUser.controls['cnorName'].disable();  
    this.formUser.controls['cneeName'].disable();  
    this.formUser.controls['chargewt'].disable();  
    this.formUser.controls['containerNo'].disable(); 
    this.formUser.controls['productId'].disable(); 
    this.formUser.controls['poNo'].disable(); 
    this.formUser.controls['shipmentNo'].disable(); 
    this.formUser.controls['gstBy'].disable(); 
    this.formUser.controls['gstType'].disable(); 
    this.formUser.controls['party'].disable(); 
  }

  get f() { return this.formUser.controls; }  

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getGstByList(): void {
    this.commonService.getGstByList().subscribe((res) => {
      this.gstByList = res;
    });
  }  

  getRateList(): void {
    this.commonService.getRateList().subscribe((res) => {
      this.rateList = res;
    });
  }

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
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

  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }

  getFreightList(): void {
    this.commonService.getFreightList().subscribe((res) => {
      this.freightList = res;
    });
  }
  
  getConsignmentDetails(e: any) { 
    this.formUser.patchValue({
      bookingDate   : "",
      vehicleNo     : "",
      containerNo   :  "",
      fromPlace     :  "",
      toPlace       :  "",   
      poNo          :  "",
      shipmentNo    :  "",  
      noPackages    :  "",
      actualWt      :  "", 
      chargewt      :  "", 
      cnorName      :  "", 
      cneeName      :  "", 
      party         :  "", 
      rateType      :  "", 
      gstBy         :  "", 
      rateRs        :  "", 
      freightRs     :  "", 
      gstType       :  "", 
      extrasRecd2   :  "",
    });
    this.sharedService.loading    = true;
    this.requestmodel.strRequest  = this.branch;
    this.requestmodel.strRequest1 = e.target.value; 
    this.requestmodel.strRequest2 = this.year; 
    this.lrentryService.getConsignmentDetailsForUpdate(this.requestmodel).subscribe((res:Consignmentmodel) => {
      this.lrmodel = res;
      var cn = this.lrmodel.fromPlace;
      if (typeof cn === 'undefined' || cn === null || cn === '') {
        this.toastrService.warning("LR No Doesn't Exists ");
        this.formUser.patchValue({
          gcNoteNo : "",
        });    
        return;
      }
      else{
        this.formUser.patchValue({
          bookingDate  :   this.commonService.formatDate(this.lrmodel.bookingDate),
          vehicleNo    :   this.lrmodel.invoiceNo,
          containerNo  :   this.lrmodel.containerNo,
          fromPlace    :   this.lrmodel.fromPlace,
          toPlace      :   this.lrmodel.toPlace, 
          poNo         :   this.lrmodel.poNo,
          shipmentNo   :   this.lrmodel.poNo,
          noPackages   :   this.lrmodel.noPackages,
          actualWt     :   this.lrmodel.actualWt, 
          chargewt     :   this.lrmodel.chargewt, 
          cnorName     :   this.lrmodel.cnorName,
          cneeName     :   this.lrmodel.cneeName, 
          party        :   this.partyList.find(x => x.dataId == this.lrmodel.billingParty), 
          rateType     :   this.lrmodel.rateType, 
          gstBy        :   this.lrmodel.gstBy, 
          rateRs       :   this.lrmodel.rateRs, 
          freightRs    :   this.lrmodel.freightRs, 
          fovRs        :   this.lrmodel.fovRs ,
          productId    :   this.lrmodel.productId, 
          gstType      :   this.lrmodel.gstType, 
          extrasRecd2  :   this.lrmodel.extrasRecd2
        });
      }
    });
    this.sharedService.loading = false;
  }
  
  
  exit(): void {
    this.route.navigate(['/consignmentllp']);
  }


  updateLocalFreightForm(): void {
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
    this.formSubmitted = true;
    var selectedDataVal=this.formUser.getRawValue();   
    this.cnmodel.consignmentID = this.lrmodel.consignmentID;           
    this.cnmodel.extrasRecd2 = selectedDataVal.extrasRecd2.toString();
    this.lrentryService.consignmentLocalFrtUpdate(this.cnmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res; 
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/consignmentllp']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      } 
    });  
  } 
}
