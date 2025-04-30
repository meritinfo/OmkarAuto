import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Billsubmitmasterlistmodel } from 'src/app/models/billsubmitmasterlistmodel';
import { Billsubmitmastermodel } from 'src/app/models/billsubmitmastermodel';
import { BillSubmitMasterService } from 'src/app/services/billsubmitmaster.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';


@Component({
  selector: 'app-billsubmitmasterlist',
  templateUrl: './billsubmitmasterlist.component.html',
  styleUrls: ['./billsubmitmasterlist.component.css']
})
export class BillsubmitmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  loggedInUserID: string = '';
  allSubmitMaster: Billsubmitmasterlistmodel = new Billsubmitmasterlistmodel();
  request: Requestmodel = new Requestmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }
  
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  keywordLocation = 'dataName';
  partyList: Dropdownmodel[] = [];
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private billSubmitMasterService: BillSubmitMasterService,private toastrService : ToastrService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Bill Submit Entry"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
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
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
    
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;
  

  this.billSubmitMasterService.clearBillSubmitMasterDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate),
    toDate: new FormControl(this.loginDate),
    partyCode: new FormControl('',),
    submitNo: new FormControl('',),
    printSign:new FormControl('N'),
  });     

  this.sharedService.loading=true;   
  this.filter.fromDate = this.fromDate;
  this.filter.toDate = this.loginDate;
 this.billSubmitList();
 this.getBillingPartyList();
  this.sharedService.loading=false;
}

billSubmitList() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching :false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.billSubmitMasterService.getBillSubmitMasterList(this.filter).subscribe(resp => {
        this.allSubmitMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Action',
        data: 'submitMstId',
      },
      {
        title: 'Print',
        data: 'submitMstId',
      },  
      {
        title: 'Submit Stn',
        data: 'Sname',
      },
      {
        title: 'Submit No',
        data: 'submitNo',
      },
      {
        title: 'Submit Date',
        data: 'submitDt',
      }, 
      {
        title: 'Submit Type',
        data: 'submitType',
      },
      {
        title: 'Courier Co',
        data: 'courierCo',
      }, 
      {
        title: 'Courier Docket No',
        data: 'courierDocketNo',
      }, 
      {
        title: 'Party',
        data: 'party',
      }, 
      {
        title: 'Submit Location',
        data: 'lname',
      }, 
      {
        title: 'Dept',
        data: 'dname',
      },  
    ],
  };
}

addBillSubmitMaster(): void {
  this.route.navigate(['/billsubmitmasteradd']);
} 
getBillingPartyList(): void {
  this.commonService.getBillingPartyList().subscribe((res) => {
    this.partyList = res;
  });
}


//Open user details screen
getBillSubmitMasterDetails(tyre: Billsubmitmastermodel): void {
  this.billSubmitMasterService.setBillSubmitMasterDetails(tyre);
  this.route.navigate(['/billsubmitmasteredit']);
}

download(billsub: Billsubmitmastermodel): void {
  this.request.strRequest = billsub.submitMstId;
  this.request.strRequest1 = this.formFilter.value.printSign;

  this.billSubmitMasterService.getBillSubmitPrint(this.request).subscribe(resp => {
    if(resp.status){    
      let link = document.createElement("a");
      link.download = "BillSubmit_" + new Date().getTime() + '.pdf';
      link.href = "assets/reports/billsubmitprint/" + resp.message;
      link.click();
      window.open(link.href, "_blank");
    }
    else{        
      this.toastrService.warning(resp.message);   
    }
  });
}

search(): void {
  var selecteddata = this.formFilter.getRawValue();
  this.filter.fromDate = selecteddata.fromDate;
  this.filter.toDate = selecteddata.toDate;
  this.filter.filterStr1 = this.formFilter.value.submitNo;
  this.filter.filterStr2 = this.formFilter.value.partyCode.dataId;
  this.sharedService.loading=true;
  this.billSubmitList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}



