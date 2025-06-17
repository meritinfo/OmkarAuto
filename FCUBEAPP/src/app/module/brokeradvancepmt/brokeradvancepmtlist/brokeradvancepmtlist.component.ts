
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Drivermasterlistmodel } from 'src/app/models/drivermasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Drivermodel } from 'src/app/models/drivermodel';
import { BrokerAdvancePmtService } from 'src/app/services/brokeradvancepmt.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Drivermasterlistrequestmodel } from 'src/app/models/drivermasterlistrequestmodel.model';
import { PdfService } from 'src/app/services/pdf.service';

import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { BrokeradvancepmtModel } from 'src/app/models/brokeradvancepmtmodel';
import { Brokeradvancepmtlistmodel} from 'src/app/models/brokeradvancemodellist';
import { CommonService } from 'src/app/services/common.service';

import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-brokeradvancepmtlist',
  templateUrl: './brokeradvancepmtlist.component.html',
  styleUrls: ['./brokeradvancepmtlist.component.css']
})
export class BrokeradvancepmtlistComponent {
  
   loggedInUserID: string = '';
   dtOptions: DataTables.Settings = {};
  
   request: Requestmodel = new Requestmodel();
  allAdvanceMaster: Brokeradvancepmtlistmodel = new Brokeradvancepmtlistmodel();
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
  vehicleList: Dropdownmodel[] = [];
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
    
  year:string = ''; 
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private toastrService : ToastrService,
                                  private sharedService : SharedService,
    private brokerAdvancePmtService: BrokerAdvancePmtService, private route: Router,
    private commonService: CommonService,) {
}
 ngOnInit(): void {   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Broker Advances"));
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
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
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
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
  
      this.brokerAdvancePmtService.clearBrokerAdvanceDetails();
  
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.fromDate,),
        toDate: new FormControl(this.loginDate,),
  
        pmtNo: new FormControl("",),
      });
      
    //  this.getBranchList();
    //  this.getVehicleNoList();
  
      var selectedDataVal = this.formFilter.getRawValue();
      this.filter.fromDate = selectedDataVal.fromDate;
      this.filter.toDate = selectedDataVal.toDate; 
     // this.filter.filterStr = selectedDataVal.vehicleNo;
      this.filter.filterStr = selectedDataVal.pmtNo;
      this.filter.filterStr1= this.branch;    
      this.filter.filterStr2 = this.year;    
      this.getAdvanceList();
    }
  
    getAdvanceList(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,      
        searching:false,
        ajax: (dataTablesParameters: any, callback) => {
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
          this.filter.sortOrder = dataTablesParameters.order[0].dir;
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
          this.brokerAdvancePmtService.getBrokerAdvanceList(this.filter).subscribe(resp => {
           this.allAdvanceMaster = resp;
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
            data: 'advPmtid',
          },
         
          {
            title: 'Branch',
            data: 'branch',
          },
          {
            title: 'Payment No',
            data: 'pmtNo',
          },  
          {
            title: 'Payment Date',
            data: 'pmtDate',
          },       
          {
            title: 'Broker',
            data: 'broker',
          },
          {
            title: 'AdvanceAmt',
            data: 'advanceAmt ',
          },
         
        ],
      };
    }
  
    getBranchList(): void {
      this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
      });
    }
    
    getVehicleNoList(): void {
      this.commonService.getVehicleIdList().subscribe((res) => {
        this.vehicleList = res;
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
    
    brokerAdvancedd(): void {
      this.route.navigate(['/brokeradvpmtadd']);
    }
  
    getBrokerAdvancePmtDetails(Challan: BrokeradvancepmtModel): void {
      this.brokerAdvancePmtService.setBrokerAdvanceDetails(Challan);
      this.route.navigate(['/brokeradvpmtedit']);
    }  
  
   
  
    search(): void {
      debugger;
      var selectedDataVal = this.formFilter.getRawValue();
      this.filter.fromDate = selectedDataVal.fromDate;
      this.filter.toDate = selectedDataVal.toDate;
      this.filter.filterStr = selectedDataVal.pmtNo;
      this.filter.filterStr1 = this.branch;     
      this.filter.filterStr2 = this.year;    
      
       this.getAdvanceList();
       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(); 
       });
    }
    
  
  }
  
  
