import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Docrenewalentrylistmodel } from 'src/app/models/docrenewalentrylistmodel';
import { Docrenewalentrymodel } from 'src/app/models/docrenewalentrymodel';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-docrenewalentrylist',
  templateUrl: './docrenewalentrylist.component.html',
  styleUrls: ['./docrenewalentrylist.component.css']
})
export class DocrenewalentrylistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  docRenewalList: Dropdownmodel[] = [];

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDocRenewalEntry: Docrenewalentrylistmodel = new Docrenewalentrylistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'transDate',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:''
  }

  formFilter!: FormGroup;

  constructor(private docrenewalEntryService: DocRenewalEntryService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private commonService: CommonService, private route: Router) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Service Renewal Entry");
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
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);
  
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
  
    this.docrenewalEntryService.clearDocrenewalEntryDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,),
      toDate: new FormControl(this.loginDate,),
      docDescription: new FormControl(''),
      vehicleMasterID: new FormControl(''),
    });
    this.getVehicleNoList();
    this.getDocRenewalList();

    this.filter.fromDate = this.minDate;
    this.filter.toDate = this.loginDate;
    this.filter.filterStr = '';
    this.filter.filterStr1 = '';
    this.filter.filterStr2 = '';
    this.filter.filterStr3 = '';

    this.sharedService.loading=true;
    this.docrenewalEntryList();
    this.sharedService.loading=false;
  }
  
  getDocRenewalList(): void {
    this.docrenewalEntryService.getDocRenewalList().subscribe((res) => {
      this.docRenewalList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  selectEvent(item: any) {
    // do something with selected item
   // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  docrenewalEntryList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        // this.filter.search = dataTablesParameters.search.value;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.docrenewalEntryService.getDocrenewalEntryList(this.filter).subscribe(resp => {
            this.allDocRenewalEntry = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Trans Date',
          data: 'transDate',
        },
        {
          title: 'Document ',
          data: 'docDescription',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },
        {
          title: 'Valid From Dt',
          data: 'validFromDt',
        },
        {
          title: 'Valid To Dt',
          data: 'validToDt',
        },
        {
          title: 'Net Amount',
          data: 'netAmount',
        },
        {
          title: 'Action',
          data: 'docRenewalEntryId',
        },  

      ],
    };
  }
  //Open new driver master add screen
  docrenewalEntryAdd(): void {
    this.route.navigate(['/adddocrenewalentry']);
  }

  //Open user details screen
  getRenewalEntryDetails(Docrenewal: Docrenewalentrymodel): void {
    this.docrenewalEntryService.setDocRenewalEntryDetails(Docrenewal);
    this.route.navigate(['/docrenewalentryedit']);
  }

  search(): void {
    var selectedData = this.formFilter.getRawValue();

    this.filter.search = selectedData.docDescription;    
    this.filter.fromDate = selectedData.fromDate;
    this.filter.toDate = selectedData.toDate;
    this.filter.filterStr = selectedData.vehicleMasterID?selectedData.vehicleMasterID.dataId:"" ;

    this.sharedService.loading=true;
    this.docrenewalEntryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
