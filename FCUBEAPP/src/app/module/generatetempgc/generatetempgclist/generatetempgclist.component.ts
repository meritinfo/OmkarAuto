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
  userSubmitted = false;
  loggedInUserID: string = '';
  

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

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 10);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
    this.generatetempgcService.clearTempgcDetails();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      vehicleNo :new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
      mainLr:new FormControl('',),
    });
    
    this.getPartyList();
    this.getLocationList();
    this.sharedService.loading=true;
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = this.loggedInUserID;
    this.filter.filterStr = "";
    this.filter.filterStr1 =  "";
    this.filter.filterStr2 =  "";
    this.filter.filterStr3 =  "";
    this.filter.sortColumn =  "";

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
    this.generatetempgcService.setTempgcDetails(tempgc);
    if(tempgc.tempGcId ==''|| tempgc.tempGcId =='0'){
      this.route.navigate(['/dprtempgcadd']);
    }
    else{
      this.route.navigate(['/dprtempgcedit']);
    }    
  } 
  
  
  genMainLrDetails(tempgc: Tempgcmodel): void {
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
    this.lrmodel.ownTruck = "N";
    this.lrmodel.truckNo = tempgc.vehicleNo;
    this.lrmodel.billingParty = tempgc.payParty;
    this.lrmodel.billingBranch = tempgc.payStn
    this.lrmodel.businessBy = tempgc.businessby
    this.lrmodel.businessBranch = tempgc.bookingPlace;
    this.lrmodel.cnorName = tempgc.cnorName;
    this.lrmodel.cnorAdd1 = tempgc.cnorAdd1;
    this.lrmodel.cnorAdd2 = tempgc.cnorAdd2;
    this.lrmodel.cnorAdd3 = tempgc.cnorAdd2;
    this.lrmodel.cnorPin = tempgc.cnorPin;
    this.lrmodel.cnorEmail = "";
    this.lrmodel.cnorMobile = "";
    this.lrmodel.cnorGst = tempgc.cnorGst;
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
    this.lrmodel.weightType = "";
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
    this.lrmodel.freightRs =  "";
    this.lrmodel.statisticalRs =  "";
    this.lrmodel.fovRs=  "";
    this.lrmodel.doorCollRs =  "";
    this.lrmodel.handlingRs =  "";
    this.lrmodel.loadingDetnRs=  "";
    this.lrmodel.enrouteRs =  "";
    this.lrmodel.miscRs =  "";
    this.lrmodel.doorDelRs =  "";
    this.lrmodel.unLoadingRs =  "";
    this.lrmodel.unLoadingDetnRs =  "";
    this.lrmodel.extrasRS =  "";
    this.lrmodel.othersRs =  "";
    this.lrmodel.subTotalRs =  "";
    this.lrmodel.gstType =  "";
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
    this.lrmodel.yearId =  "";
    this.lrmodel.loggedInUser =  "";

    this.consignmentService.setConsignmentDetails(this.lrmodel);
    this.route.navigate(['/consignmentedit']);
  }  

  get f() { return this.formFilter.controls; }

  search(): void {
    this.userSubmitted = true;
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


    this.sharedService.loading=true;
    this.tempgcList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  