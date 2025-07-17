import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Consignmentlistmodel  } from 'src/app/models/consignmentlistmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { CommonService } from 'src/app/services/common.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-consignmentlist',
  templateUrl: './consignmentlist.component.html',
  styleUrls: ['./consignmentlist.component.css']
})
export class ConsignmentlistComponent implements OnInit  {
    
  loggedInUserID: string = '';
  dtOptions: DataTables.Settings = {};
  allConsignment: Consignmentlistmodel = new Consignmentlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
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
  branchList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  year: string = ''; 

  lrfromDate: string = '';
  lrtoDate: string = '';
  lrpayParty: string = '';
  lrorigin: string = '';
  lrdestination: string = '';
  lrvehicleNo: string = '';
  lrlrNo: string = '';

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,
                                    private sharedService : SharedService,
    private consignmentService: ConsignmentService, private route: Router,
    private toastrService :ToastrService, private commonService: CommonService,) {
  }

  ngOnInit(): void {   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Consignment/LR Entry"));
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
    
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    var lrfromDate = sessionStorage.getItem('lrfromDate')?.toString();
    if (typeof lrfromDate !== 'undefined' && lrfromDate !== null && lrfromDate !== '') {
      this.lrfromDate = lrfromDate;
    }
    else{
      this.lrfromDate = this.fromDate;
    }
    var lrtoDate = sessionStorage.getItem('lrtoDate')?.toString();
    if (typeof lrtoDate !== 'undefined' && lrtoDate !== null && lrtoDate !== '') {
      this.lrtoDate = lrtoDate;
    }
    else{
      this.lrtoDate = this.loginDate;
    }
    var lrpayParty = sessionStorage.getItem('lrpayParty')?.toString();
    if (typeof lrpayParty !== 'undefined' && lrpayParty !== null && lrpayParty !== '') {
      this.lrpayParty = lrpayParty;
    }
    var lrvehicleNo = sessionStorage.getItem('lrvehicleNo')?.toString();
    if (typeof lrvehicleNo !== 'undefined' && lrvehicleNo !== null && lrvehicleNo !== '') {
      this.lrvehicleNo = lrvehicleNo;
    }
    var lrlrNo = sessionStorage.getItem('lrlrNo')?.toString();
    if (typeof lrlrNo !== 'undefined' && lrlrNo !== null && lrlrNo !== '') {
      this.lrlrNo = lrlrNo;
    }
    
    var lrorigin = sessionStorage.getItem('lrorigin')?.toString();
    if (typeof lrorigin !== 'undefined' && lrorigin !== null && lrorigin !== '') {
      this.lrorigin = lrorigin;
    }
    var lrdestination = sessionStorage.getItem('lrdestination')?.toString();
    if (typeof lrdestination !== 'undefined' && lrdestination !== null && lrdestination !== '') {
      this.lrdestination = lrdestination;
    }

    this.consignmentService.clearConsignmentDetails();

    this.getBranchList();
    this.getPartyList();
    this.getLocationList();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      vehicleNo: new FormControl('',),
      payParty: new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
      lrNo: new FormControl('',),
    });
    
    setTimeout(() => {      
      this.formFilter.patchValue({
        fromDate: this.lrfromDate,
        toDate: this.lrtoDate,
        payParty: this.partyList.find(e => e.dataId == this.lrpayParty),   
        vehicleNo: this.lrvehicleNo,
        lrNo: this.lrlrNo,
        origin: this.locationList.find(e => e.dataId == this.lrorigin),   
        destination: this.locationList.find(e => e.dataId == this.lrdestination),     
      })
    }, 2000);

    this.filter.fromDate = this.lrfromDate,
    this.filter.toDate = this.lrtoDate,
    this.filter.filterStr = this.lrpayParty;
    this.filter.filterStr1 = this.lrorigin;
    this.filter.filterStr2 = this.lrdestination; 
    this.filter.filterStr3 = this.lrvehicleNo,  
    this.filter.sortColumn = this.lrlrNo ,
    this.filter.sortOrder = this.branch,   
    this.filter.search = this.year;    
    this.getConsignmentList();
  }

  getConsignmentList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,      
      searching:false,   
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.consignmentService.getConsignmentList(this.filter).subscribe(resp => {
         this.allConsignment = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
      },
     // Set column title and data field
      columns: [  
        {
          title: 'Action',
          data: 'consignmentID',
        }, 
        {
          title: 'Download',
          data: 'consignmentID',
        }, 
        {
          title: 'Booked At',
          data: 'bookedAt',
        },
        {
          title: 'Booking Date',
          data: 'bookingDate',
        },  
        {
          title: 'LR No',
          data: 'gcNoteNo',
        },       
        {
          title: 'From/Origin',
          data: 'fPlace',
        },
        {
          title: 'To/Dest',
          data: 'tPlace',
        },
        {
          title: 'Vehicle No',
          data: 'truckNo',
        },  
      ],
    };
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  
  onFocused(e: any) {
    // do something
  }
  
  onChangeSearch(search: string) {
  }
  
   
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  consignmentAdd(): void { 
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("lrfromDate", selecteddata.fromDate);
    sessionStorage.setItem("lrtoDate", selecteddata.toDate);
    sessionStorage.setItem("lrpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("lrorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("lrdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("lrvehicleNo", selecteddata.vehicleNo);
    sessionStorage.setItem("lrlrNo", selecteddata.lrNo);

    this.route.navigate(['/consignmentadd']);
  }

  getConsignmentDetails(Consignment: Consignmentmodel): void { 
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("lrfromDate", selecteddata.fromDate);
    sessionStorage.setItem("lrtoDate", selecteddata.toDate);
    sessionStorage.setItem("lrpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("lrorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("lrdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("lrvehicleNo", selecteddata.vehicleNo);
    sessionStorage.setItem("lrlrNo", selecteddata.lrNo);
    
    this.consignmentService.setConsignmentDetails(Consignment);
    this.route.navigate(['/consignmentedit']);
  }

  download(cn: Consignmentmodel): void {
    this.filter.filterStr   = cn.consignmentID;
    
    this.consignmentService.getLrPrint(this.filter).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "LR_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/LrPrint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
  
  search(): void {
    var selectedDataVal = this.formFilter.getRawValue();
    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.filterStr = selectedDataVal.payParty?selectedDataVal.payParty.dataId:"";
    this.filter.filterStr1 = selectedDataVal.origin?selectedDataVal.origin.dataId:"";
    this.filter.filterStr2 = selectedDataVal.destination?selectedDataVal.destination.dataId:"";
    this.filter.filterStr3 = selectedDataVal.vehicleNo;
    this.filter.sortColumn = selectedDataVal.lrNo;
    this.filter.sortOrder = this.branch,  
    this.filter.search = this.year;    

     this.getConsignmentList();
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload(); 
     });
  }
  

}
