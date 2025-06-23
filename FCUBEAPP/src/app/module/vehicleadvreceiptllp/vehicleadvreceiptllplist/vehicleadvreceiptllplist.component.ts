
import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { VehicleadvbalreceiptServiceLLP } from 'src/app/services/vehicleadvbalreceiptllp.service';
import { VehicleadvbalreceiptlistModelLLP } from 'src/app/models/vehicleadvbalreceiptlistmodelllp';
import { VehicleadvbalreceiptModelLLP } from 'src/app/models/vehicleadvreceiptmodelllp';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-vehicleadvreceiptllplist',
  templateUrl: './vehicleadvreceiptllplist.component.html',
  styleUrls: ['./vehicleadvreceiptllplist.component.css']
})
export class VehicleadvreceiptllplistComponent {
 dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allAdvanceMaster: VehicleadvbalreceiptlistModelLLP = new VehicleadvbalreceiptlistModelLLP();
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    strRequest:''
  }
  
  keywordLocation = 'dataName';
  vehicleList : Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private vehicleadvbalreceiptService: VehicleadvbalreceiptServiceLLP,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Vehicle Repairs Entry"));
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    this.vehicleadvbalreceiptService.clearVehicleadvbalreceiptModelDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
      partyId:new FormControl(''),
    });     

    this.getVehicleIdList();
     this.getCreditAcListNew();
    this.sharedService.loading=true;   
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = '';
    this.vehicleAdvanceBalList();

    this.sharedService.loading=false;
  }


  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
   getCreditAcListNew(): void {
    //this.requestmodel.strRequest= 'B';
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditAcList = res;
    });  
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

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
  };

  vehicleAdvanceBalList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching :false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.vehicleadvbalreceiptService.getVehicleadvbalreceiptMasterList(this.filter).subscribe(resp => {
          this.allAdvanceMaster = resp;
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
          data: 'transId',
        },
        {
          title: 'Trans Date',
          data: 'transDate',
        },
        {
          title: 'Branch ',
          data: 'branchName',
        },
      
        {
          title: 'Trips Upto Date',
          data: 'tripsUptoDate',
        }, 
        {
          title: 'Party',
          data: 'party',
        }, 
        {
          title: 'Cheq Cash Amt',
          data: 'cheqCashAmt',
        },
      
        {
          title: 'Amt Recd',
          data: 'amtRecd',
        },
        {
          title: 'Amt Ded',
          data: 'amtDed',
        },
      
        {
          title: 'Amt Extras',
          data: 'amtExtras',
        },
        {
          title: 'Total Amt Recd',
          data: 'totalAmtRecd',
        },
       
      ],
    };
  }

  addVehicleadvbalreceiptMaster(): void {
    this.route.navigate(['/vehicleadvbalreceiptllpadd']);
  } 

//Open user details screen
  getVehicleAdvBalreceiptasterDetails(tyre: VehicleadvbalreceiptModelLLP): void {
    this.vehicleadvbalreceiptService.setVehicleAdvBalreceiptDetails(tyre);
    this.route.navigate(['/Vehicleadvbalreceiptllpedit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;    
    this.filter.search = selecteddata.partyId?selecteddata.partyId.dataId:"";
    this.sharedService.loading=true;
    this.vehicleAdvanceBalList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}





