
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Tripenroutebycompanylistmodel } from 'src/app/models/tripenroutebycompanylistmodel';
import { TripenrouteexpbycompanyModel } from 'src/app/models/tripenroutebycompanymodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { TripenroutebycompanyService } from 'src/app/services/tripenroutebycompany.service';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-tripenroutebycompanylist',
  templateUrl: './tripenroutebycompanylist.component.html',
  styleUrls: ['./tripenroutebycompanylist.component.css']
})
export class TripenroutebycompanylistComponent {
  dtOptions: DataTables.Settings = {};
  allEnrouteTypes: Tripenroutebycompanylistmodel = new Tripenroutebycompanylistmodel();
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
expList: Dropdownmodel[] = [];
keywordLocation = 'dataName';
 
year: string = '';
loginDate: string = '';
fromDate: string = '';
branch: string = '';
maxDate: string = '';
minDate: string = '';
editMode = false;
createStatus = false;
editStatus = false;
deleteStatus = false;
viewStatus = false; 
dashboard: string ="";
createmode = false;
@ViewChild(DataTableDirective)
dtElement!: DataTableDirective;
constructor(private formBuilder: FormBuilder,private tripenroutebycompanyService: TripenroutebycompanyService, 
  private commonService: CommonService, private route: Router) {
}

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((( aa: { menuName: string; }) => aa.menuName === "Trip Enroute Exp"));
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


  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
      
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;


var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }
  this.tripenroutebycompanyService.clearTripenrouteexpbycompanyDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate,),
    toDate: new FormControl(this.loginDate,),
   // branch: new FormControl('',),
    vehicle: new FormControl('',),
    expId: new FormControl('',)
    
  });
  this.getExpList();
  this.getVehicleNoList();

  var selectedData = this.formFilter.getRawValue();
  this.filter.fromDate = selectedData.fromDate;
  this.filter.toDate = selectedData.toDate;
  this.filter.filterStr = "";
  this.filter.filterStr1 =  this.branch;
  this.filter.filterStr2 = "";
  this.tripenroutebycompanyList();
}
tripenroutebycompanyList(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching: false,     
        language: {
          zeroRecords: ''
        }, 
    ajax: (dataTablesParameters: any, callback) => {
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = 'bName';
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.tripenroutebycompanyService.gettripenrouteexpbycompanyList(this.filter).subscribe(resp => {
        this.allEnrouteTypes = resp;
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
        data: 'enrouteExpId',
      },  
      {
        title: 'Branch',
        data: 'bname',
      },  
      {
        title: 'Vehicle No',
        data: 'vehicleNo',
      },
      {
        title: 'Exp Date',
        data: 'expDate',
      },
      {
        title: 'Exp',
        data: 'exp',
      },
      {
        title: 'Exp Amount',
        data: 'expAmount',
      },
      // {
      //   title: 'Qty Ltrs',
      //   data: 'qtyLtrs',
      // },
      // {
      //   title: 'Amount',
      //   data: 'amtPaid',
      // },   
     
    ],
  };
}

startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
  return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
  };
getExpList(): void {
  this.commonService.getExpTypeList().subscribe((res) => {
    this.expList = res;
  });
}

selectEvent(item: any) {
  // do something with selected item
}

onFocused(e: any) {
  // do something
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

onChangeSearch(search: string) {
  //ignore
}

//Open new driver master add screen
tripenroutebycompanyAdd(): void {
  this.route.navigate(['/tripenroutebycompanyadd']);
}

//Open user details screen
gettripenroutebycompanyDetails(trippayments: TripenrouteexpbycompanyModel): void {
  this.tripenroutebycompanyService.setTripenrouteexpbycompanyDetails(trippayments);
  this.route.navigate(['/tripenroutebycompanyedit']);
}


search(): void {
  var selectedData = this.formFilter.getRawValue();
 
  this.filter.fromDate = selectedData.fromDate;
  this.filter.toDate = selectedData.toDate;
  this.filter.filterStr = selectedData.expId;
  this.filter.filterStr1 =  this.branch;
  this.filter.filterStr2 = selectedData.vehicle?selectedData.vehicle.dataId:"";

  this.tripenroutebycompanyList();
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload(); 
  });
}


}



