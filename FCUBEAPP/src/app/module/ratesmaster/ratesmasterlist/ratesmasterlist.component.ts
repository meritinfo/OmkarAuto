import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { Ratesmasterlistmodel } from 'src/app/models/ratesmasterlistmodel';
import { Ratesmastermodel } from 'src/app/models/ratesmastermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-ratesmasterlist',
  templateUrl: './ratesmasterlist.component.html',
  styleUrls: ['./ratesmasterlist.component.css']
})
export class RatesmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allRatesMaster: Ratesmasterlistmodel = new Ratesmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'FromPoint',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;

  constructor(private ratesMasterService: RatesMasterService,private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {


  }
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Define Booking Rates");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.ratesMasterService.clearRatesMasterDetails();
    this.formFilter = this.formBuilder.group({
      fromPoint: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.rateMasterList();
    this.sharedService.loading=false;
  }
  
  rateMasterList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
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
        this.ratesMasterService.getRatesMasterList(this.filter)
          .subscribe(resp => {
            this.allRatesMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Account Name',
          data: 'accountName',
        },
        {
          title: 'From Point',
          data: 'fromPoint',
        },
        {
          title: 'Valid From',
          data: 'validFrom',
        },

        {
          title: 'Valid Upto',
          data: 'validUpto',
        },
        {
          title: 'Rate Method',
          data: 'rateMethod',
        },
        {
          title: 'Action',
          data: 'masterID',
        },

      ],
    };
  }
  //Open new driver master add screen
  ratesMasterAdd(): void {
    this.route.navigate(['/addratesmaster']);
  }
  getRatesMasterDetails(Docrenewal: Ratesmastermodel): void {
    this.ratesMasterService.setRatesMasterDetails(Docrenewal);
    this.route.navigate(['/ratesmasteredit']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.fromPoint;
    this.sharedService.loading=true;
    this.rateMasterList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}