
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Freightgstmasterlistmodel   } from 'src/app/models/freightgstmasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Freightgstmastermodel } from 'src/app/models/freightgstmastermodel';
import { FreightGstMasterService } from 'src/app/services/freightgstmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-freightgstmasterlist',
  templateUrl: './freightgstmasterlist.component.html',
  styleUrls: ['./freightgstmasterlist.component.css']
})
export class FreightgstmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allGstTypes: Freightgstmasterlistmodel = new Freightgstmasterlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr : "",
    filterStr1: "",
    filterStr2:  "",
    filterStr3:  "", 
  }
  formFilter!: FormGroup;
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
   
  keywordLocation = 'dataName';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
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
  constructor(private formBuilder: FormBuilder,private freightGstMasterService: FreightGstMasterService, 
    private commonService: CommonService, private route: Router) {
  }
  ngOnInit(): void {
  
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Freight GST Master"));
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

    this.freightGstMasterService.clearFreightGstMasterDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      vehicle: new FormControl('',),
      tripNo: new FormControl('',)
    });
    var selectedData = this.formFilter.getRawValue();
    this.filter.fromDate = selectedData.fromDate;
    this.filter.toDate = selectedData.toDate;
    this.filter.filterStr = "";
    this.filter.filterStr1 =  "";
    this.FerightGstMasterList(); 

  }

  FerightGstMasterList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching: false,
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
        this.freightGstMasterService.getFreightgstmasterList(this.filter).subscribe(resp => {
          this.allGstTypes = resp;
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
          data: 'chCostId',
        }, 
        {
          title: 'Freight Desc',
          data: 'freightDesc',
        },
        {
          title: 'Sac Code',
          data: 'sacCode',
        },
        {
          title: 'Sgst Pct',
          data: 'sgstPct',
        },
        {
          title: 'Cgst Pct',
          data: 'cgstPct',
        },
        {
          title: 'Igst Pct',
          data: 'igstPct',
        },
        {
          title: 'Link Column',
          data: 'linkColumn',
        },   
      ],
    };
  }
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

   

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
  freightgstmasterAdd(): void {
    this.route.navigate(['/freightgstmasteradd']);
  }

  //Open user details screen
  getFreightGstMasterList(trippayments: Freightgstmastermodel): void {
    this.freightGstMasterService.setFreightGstMasterDetails(trippayments);
    this.route.navigate(['/freightgstmasteredit']);
  }

  search(): void {
    var selectedData = this.formFilter.getRawValue();
    this.filter.fromDate = selectedData.fromDate;
    this.filter.toDate = selectedData.toDate;
    this.filter.filterStr1 =  selectedData.vehicle?selectedData.vehicle.dataId:"";

    this.FerightGstMasterList();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload(); 
    });
  }
    
  
}
  
