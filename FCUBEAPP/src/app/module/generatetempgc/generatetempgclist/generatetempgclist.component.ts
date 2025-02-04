import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tempgcmodel } from 'src/app/models/tempgcmodel';
import { Tempgclistmodel  } from 'src/app/models/tempgclistmodel';
import { GeneratetempgcService } from 'src/app/services/generatetempgc.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { ConsignmentService } from 'src/app/services/consignment.service';

@Component({
  selector: 'app-generatetempgclist',
  templateUrl: './generatetempgclist.component.html',
  styleUrls: ['./generatetempgclist.component.css']
})
export class GeneratetempgclistComponent {
  alltempgclist: Tempgclistmodel = new Tempgclistmodel();
  lrmodel: Consignmentmodel = new Consignmentmodel();

  filter: Reportmodel = {
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
    filterStr3:''
  }

  formFilter!: FormGroup;
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
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

  gcfromDate: string = '';
  gctoDate: string = '';
  gcpayParty: string = '';
  branch: string = '';
  gcorigin: string = '';
  gcdestination: string = '';
  gcvehicleNo: string = '';
  gcmainLr: string = '';  

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private toasterService: ToastrService,private consignmentService: ConsignmentService,
    private generatetempgcService: GeneratetempgcService, 
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "DPR Generate Temp LR"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
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


    var gcfromDate = sessionStorage.getItem('gcfromDate')?.toString();
    if (typeof gcfromDate !== 'undefined' && gcfromDate !== null && gcfromDate !== '') {
      this.gcfromDate = gcfromDate;
    }
    else{
      this.gcfromDate = this.fromDate;
    }
    var gctoDate = sessionStorage.getItem('gctoDate')?.toString();
    if (typeof gctoDate !== 'undefined' && gctoDate !== null && gctoDate !== '') {
      this.gctoDate = gctoDate;
    }
    else{
      this.gctoDate = this.loginDate;
    }
    var gcpayParty = sessionStorage.getItem('gcpayParty')?.toString();
    if (typeof gcpayParty !== 'undefined' && gcpayParty !== null && gcpayParty !== '') {
      this.gcpayParty = gcpayParty;
    }
    var gcvehicleNo = sessionStorage.getItem('gcvehicleNo')?.toString();
    if (typeof gcvehicleNo !== 'undefined' && gcvehicleNo !== null && gcvehicleNo !== '') {
      this.gcvehicleNo = gcvehicleNo;
    }
    var gcorigin = sessionStorage.getItem('gcorigin')?.toString();
    if (typeof gcorigin !== 'undefined' && gcorigin !== null && gcorigin !== '') {
      this.gcorigin = gcorigin;
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    var gcdestination = sessionStorage.getItem('gcdestination')?.toString();
    if (typeof gcdestination !== 'undefined' && gcdestination !== null && gcdestination !== '') {
      this.gcdestination = gcdestination;
    }
    var gcmainLr = sessionStorage.getItem('gcmainLr')?.toString();
    if (typeof gcmainLr !== 'undefined' && gcmainLr !== null && gcmainLr !== '') {
      this.gcmainLr = gcmainLr;
    }
    
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
    });
    
    this.sharedService.loading=true;

    setTimeout(() => {      
      this.formFilter.patchValue({
        fromDate: this.gcfromDate,
        toDate: this.gctoDate,
        payParty:this.partyList.find(e => e.dataId == this.gcpayParty),   
        vehicleNo :this.gcvehicleNo,
        origin: this.locationList.find(e => e.dataId == this.gcorigin),
        destination: this.locationList.find(e => e.dataId == this.gcdestination),    
        mainLr:this.gcmainLr,
      })
    }, 2000);
    
    this.filter.fromDate = this.gcfromDate;
    this.filter.toDate = this.gctoDate;
    this.filter.search = this.loggedInUserID;
    this.filter.filterStr = this.gcpayParty;
    this.filter.filterStr1 = this.gcorigin;
    this.filter.filterStr2 = this.gcdestination;
    this.filter.filterStr3 = this.gcvehicleNo;
    this.filter.sortColumn =  this.gcmainLr;
    this.filter.sortOrder =  this.branch;
    
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
          title: 'DPR Date',
          data: 'dprDate',
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
          title: 'Download',
          data: 'tempGcId',
        },        
        {
          title: 'Mail',
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

  download(tempgc: Tempgcmodel): void {
    this.filter.filterStr   = tempgc.tempGcId;
    
    this.generatetempgcService.getLrPdf(this.filter).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "LR_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/LrPrint/" + resp.message;
        link.click();
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }

  sendMail(tempgc: Tempgcmodel): void {
    this.filter.filterStr   = tempgc.tempGcId;
    this.filter.filterStr1  = tempgc.bookingPlace ;
    
    this.generatetempgcService.sendLrMail(this.filter).subscribe(resp => {
      if(resp.status){    
        this.toasterService.success(resp.message); 
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  gettempgcDetails(tempgc: Tempgcmodel): void {
            
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("gcfromDate", selecteddata.fromDate);
    sessionStorage.setItem("gctoDate", selecteddata.toDate);
    sessionStorage.setItem("gcpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("gcorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("gcdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("gcvehicleNo", selecteddata.vehicleNo);
    sessionStorage.setItem("gcmainLr", selecteddata.mainLr);

    this.generatetempgcService.setTempgcDetails(tempgc);
    if(tempgc.tempGcId ==''|| tempgc.tempGcId =='0'){
      this.route.navigate(['/dprtempgcadd']);
    }
    else{
      this.route.navigate(['/dprtempgcedit']);
    }    
  } 
  
  
  genMainLrDetails(tempgc: Tempgcmodel): void {
      
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("gcfromDate", selecteddata.fromDate);
    sessionStorage.setItem("gctoDate", selecteddata.toDate);
    sessionStorage.setItem("gcpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("gcorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("gcdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("gcvehicleNo", selecteddata.vehicleNo);
    sessionStorage.setItem("gcmainLr", selecteddata.mainLr);

    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.search = this.loggedInUserID;
    this.filter.filterStr = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.filter.filterStr3 = selecteddata.vehicleNo;
    this.filter.sortColumn =  selecteddata.mainLr;
    
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
    this.lrmodel.vehicleTypeId = tempgc.vehicleTypeId;
    this.lrmodel.privateMark = "";  
    this.lrmodel.bulkYN = "N";
    this.lrmodel.loadLength = "";
    this.lrmodel.loadWidth = "";
    this.lrmodel.loadHeight = "";
    this.lrmodel.loadCFT = "";
    this.lrmodel.rateType = tempgc.rateType;
    this.lrmodel.rateDesc = "";  
    this.lrmodel.gstBy = tempgc.gstBy;
    this.lrmodel.rateRs = tempgc.rateRs;
    this.lrmodel.freightRs = tempgc.freightRs;
    this.lrmodel.statisticalRs =  "";
    this.lrmodel.fovRs=  "";
    this.lrmodel.doorCollRs =  "";
    this.lrmodel.handlingRs = tempgc.hamaliAmt;
    this.lrmodel.loadingDetnRs=  tempgc.ldDetenAmt;
    this.lrmodel.enrouteRs =  "";
    this.lrmodel.miscRs =  "";
    this.lrmodel.doorDelRs =  "";
    this.lrmodel.unLoadingRs =  "";
    this.lrmodel.unLoadingDetnRs =  "";
    this.lrmodel.extrasRS =  tempgc.extraAmt;
    this.lrmodel.othersRs =  tempgc.otherAmt;
    this.lrmodel.subTotalRs =  tempgc.totFreightAmt;
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
    this.lrmodel.gtotalRs =  tempgc.totFreightAmt;
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

    this.sharedService.loading=true;
    this.tempgcList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  