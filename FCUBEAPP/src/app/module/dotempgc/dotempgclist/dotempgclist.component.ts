import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dotempgcmodel } from 'src/app/models/dotempgcmodel';
import { Dotempgclistmodel  } from 'src/app/models/dotempgclistmodel';
import { DotempgcService } from 'src/app/services/dotempgc.service';
import { Repreqmodel } from 'src/app/models/repreqmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { ConsignmentService } from 'src/app/services/consignment.service';

@Component({
  selector: 'app-dotempgclist',
  templateUrl: './dotempgclist.component.html',
  styleUrls: ['./dotempgclist.component.css']
})
export class DotempgclistComponent {
  alltempgclist: Dotempgclistmodel = new Dotempgclistmodel();
  lrmodel: Consignmentmodel = new Consignmentmodel();

  filter: Repreqmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'dprBranch',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: '',
    filterStr1: '',
    filterStr2:'',
    filterStr3:'',
    filterStr4:'',
    filterStr5:'',
    filterStr6:'',
  }

  formFilter!: FormGroup;
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  year: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false;
  formSubmitted = false;
  loggedInUserID: string = '';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private toasterService: ToastrService,private consignmentService: ConsignmentService,
    private generatetempgcService: DotempgcService, 
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "DO Generate Temp LR"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
    }
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }

    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    else {
      this.route.navigate(['/']);
    }

      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.generatetempgcService.clearTempgcDetails();
    
    this.getPartyList();
    this.getLocationList();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      vehicleNo :new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
      mainLr:new FormControl('',),
      gcNoteNo:new FormControl('',),
    });
    
    this.sharedService.loading=true;
    
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = this.loggedInUserID;
    this.filter.filterStr = "";
    this.filter.filterStr1 = "";
    this.filter.filterStr2 = "";
    this.filter.filterStr3 = "";
    this.filter.sortColumn =  "";
    this.filter.sortOrder =  this.branch;
    this.filter.filterStr4 = "";
    this.filter.filterStr5 = this.year;
    
    this.tempgcList();    
    this.sharedService.loading=false;
  }
  
  tempgcList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.generatetempgcService.getTempgcList(this.filter).subscribe(resp => {
          this.alltempgclist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Vehicle In Date',
          data: 'vehiInDate',
        }, 
        {
          title: 'GC Note No',
          data: 'gcNoteNo',
        },  
        {
          title: 'Party Name',
          data: 'partyName',
        },  
        {
          title: 'From Place ',
          data: 'fplace',
        },
        {
          title: 'To Place',
          data: 'tplace',
        }, 
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },   
        {
          title: 'Driver Name',
          data: 'driverName',
        },  
        {
          title: 'Driver Mobile',
          data: 'driverMob1',
        },     
        {
          title: 'Action',
          data: 'dprId',
        },        
        {
          title: 'Main LR',
          data: 'tempGcId',
        },  
      ],
    };
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


  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  gettempgcDetails(tempgc: Dotempgcmodel): void {    
    this.generatetempgcService.setTempgcDetails(tempgc);
    this.route.navigate(['/dotempgcedit']);
  } 
  
  
  genMainLrDetails(tempgc: Dotempgcmodel): void {
   
    this.lrmodel.consignmentID = "0";
    this.lrmodel.bookingPlace = tempgc.bookingPlace;
    this.lrmodel.gcNoteNo = tempgc.gcNoteNo;
    this.lrmodel.bookingDate = tempgc.bookingDate;
    this.lrmodel.bookingStatus = tempgc.bookStatus;
    this.lrmodel.ewayBillEntryType = tempgc.ewayBillType;
    this.lrmodel.ewayBillNo = tempgc.ewayBillNo
    this.lrmodel.ewayBillDate = tempgc.ewayBillDate;
    this.lrmodel.ewayBillExpDate = tempgc.ewayBillExpDate
    this.lrmodel.invoiceNo   = tempgc.invoiceNo;
    this.lrmodel.invoiceDate = tempgc.invoiceDt;
    this.lrmodel.invoiceValue = tempgc.goodsValue;
    this.lrmodel.declaredValue =  tempgc.goodsValue;
    this.lrmodel.fromPlace = tempgc.fromPlace;
    this.lrmodel.toPlace = tempgc.toPlace;
    this.lrmodel.kms = "0";
    this.lrmodel.ownTruck = "";
    this.lrmodel.truckNo = tempgc.vehicleNo;
    this.lrmodel.billingParty = tempgc.payParty;
    this.lrmodel.billingBranch = tempgc.payStn
    this.lrmodel.businessBy = tempgc.businessby;
    this.lrmodel.businessBranch = tempgc.bookingPlace;
    this.lrmodel.cnorId = tempgc.cnorId;
    this.lrmodel.cnorName = tempgc.cnorName;
    this.lrmodel.cnorAdd1 = tempgc.cnorAdd1;
    this.lrmodel.cnorAdd2 = tempgc.cnorAdd2;
    this.lrmodel.cnorAdd3 = tempgc.cnorAdd2;
    this.lrmodel.cnorPin = tempgc.cnorPin;
    this.lrmodel.cnorEmail = "";
    this.lrmodel.cnorMobile = "";
    this.lrmodel.cnorGst = tempgc.cnorGst;
    this.lrmodel.cneeId = tempgc.cneeId;
    this.lrmodel.cneeName = tempgc.cneeName;
    this.lrmodel.cneeAdd1 = tempgc.cneeAdd1;
    this.lrmodel.cneeAdd2 = tempgc.cneeAdd2;
    this.lrmodel.cneeAdd3 = tempgc.cneeAdd3;
    this.lrmodel.cneePin = tempgc.cneePin;
    this.lrmodel.cneeEmail = "";
    this.lrmodel.cneeMobile = tempgc.cneeMob;
    this.lrmodel.cneeGst = tempgc.cneeGst;
    this.lrmodel.shipmentNo = "";
    this.lrmodel.shipmentDt = "";
    this.lrmodel.classId = tempgc.classCode;
    this.lrmodel.productId = tempgc.productCode;
    this.lrmodel.productDesc = tempgc.cropDesc;
    this.lrmodel.hsnSac = "";
    this.lrmodel.noPackages = tempgc.noPackages;
    this.lrmodel.looseFlag = "N";
    this.lrmodel.weightType = "MT";
    this.lrmodel.actualWt = tempgc.actualWt;
    this.lrmodel.senderWt = tempgc.actualWt;
    this.lrmodel.chargewt = tempgc.chargewt;
    this.lrmodel.wtDesc = "";  
    this.lrmodel.vehicleTypeId = "";
    this.lrmodel.privateMark = "";  
    this.lrmodel.bulkYN = "N";
    this.lrmodel.loadLength = "";
    this.lrmodel.loadWidth = "";
    this.lrmodel.loadHeight = "";
    this.lrmodel.loadCFT = "";
    this.lrmodel.rateType = "";
    this.lrmodel.rateDesc = "";  
    this.lrmodel.gstBy = tempgc.gstBy;
    this.lrmodel.rateRs = "";
    this.lrmodel.freightRs = "";
    this.lrmodel.statisticalRs =  "";
    this.lrmodel.fovRs=  "";
    this.lrmodel.doorCollRs =  "";
    this.lrmodel.handlingRs = "";
    this.lrmodel.loadingDetnRs=  "";
    this.lrmodel.enrouteRs =  "";
    this.lrmodel.miscRs =  "";
    this.lrmodel.doorDelRs =  "";
    this.lrmodel.unLoadingRs =  "";
    this.lrmodel.unLoadingDetnRs =  "";
    this.lrmodel.extrasRS =  "";
    this.lrmodel.othersRs = "";
    this.lrmodel.subTotalRs =  "";
    this.lrmodel.gstType =  "N";
    this.lrmodel.sgstPct  =  "";
    this.lrmodel.sgstAmt  =  "";
    this.lrmodel.cgstPct  =  "";
    this.lrmodel.cgstAmt  =  "";
    this.lrmodel.igstPct  = "";
    this.lrmodel.igstAmt  =  "";
    this.lrmodel.nonGstAmt1  =  "";
    this.lrmodel.nonGstAmt1Desc  =  "";
    this.lrmodel.nonGstAmt2  =  "";
    this.lrmodel.nonGstAmt2Desc  =  "";
    this.lrmodel.generalRemarks =  "";
    this.lrmodel.gtotalRs =  "";
    this.lrmodel.vehicleInDt =  tempgc.vehicleInDt;
    this.lrmodel.vehicleInTime = tempgc.vehicleInTime;
    this.lrmodel.vehicleOutDt = tempgc.vehicleOutDt;
    this.lrmodel.vehicleOutTime = tempgc.vehicleOutTime;
    this.lrmodel.yearId =  "";
    this.lrmodel.loggedInUser =  "";

    this.consignmentService.setConsignmentDetails(this.lrmodel);
    this.route.navigate(['/consignmentedit']);
  }  

  get f() { return this.formFilter.controls; }

  search(): void {
    this.formSubmitted = true;
    if (this.formFilter.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }

    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.search = this.loggedInUserID;
    this.filter.filterStr = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.filter.filterStr3 = selecteddata.vehicleNo;
    this.filter.sortColumn =  selecteddata.mainLr;
    this.filter.sortOrder =  this.branch;
    this.filter.filterStr4 = selecteddata.gcNoteNo;
    this.filter.filterStr5 = this.year;

    this.sharedService.loading=true;
    this.tempgcList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  