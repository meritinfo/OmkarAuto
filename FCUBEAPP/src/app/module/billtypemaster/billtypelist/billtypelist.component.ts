
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Billstypelistmodel } from 'src/app/models/billstypemasterlistmodel';
import { Billstypemodel } from 'src/app/models/billstypemastermodel';
import { BillsTypeService } from 'src/app/services/billstypemaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-billtypelist',
  templateUrl: './billtypelist.component.html',
  styleUrls: ['./billtypelist.component.css']
})
export class BilltypelistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBillsTypeMaster: Billstypelistmodel = new Billstypelistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private billsTypeService: BillsTypeService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {
}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Bill Types Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.billsTypeService.clearBillsTypeDetails();
  this.formFilter = this.formBuilder.group({
   // classDesc: new FormControl(''),
  }); 

  this.sharedService.loading = true;
  this.billsTypeMasterList();
  this.sharedService.loading=false;   
}
billsTypeMasterList(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    searching: false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      // this.filter.search = '';
      this.billsTypeService.getBillsTypeList(this.filter)
        .subscribe(resp => {
          this.allBillsTypeMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
        this.sharedService.loading = false;
    },
    // Set column title and data field
    columns: [
     
     
      {
        title: 'Bill TypeDesc',
        data: 'billTypeDesc',
      },
      {
        title: 'Main Ac',
        data: 'mainAc',
      },
      {
        title: 'Other Ac',
        data: 'otherAc',
      },
      {
        title: 'Other Ac2',
        data: 'otherAc2',
      },
      {
        title: 'Other Ac3',
        data: 'otherAc3',
      },
      {
        title: 'SAC Code',
        data: 'sasCode',
      },
     
      {
        title: 'Action',
        data: 'billTypeId',
      },
    ],
  };
}

//Open new user add screen
AddBillsTypeMaster(): void {
  this.route.navigate(['/billtypeadd']);
}

//Open user details screen
getBillsTypeDetails(Classification: Billstypemodel): void {
  this.billsTypeService.setBillsTypeDetails(Classification);
  this.route.navigate(['/billtypeedit']);
}

search(): void {
  this.filter.search = this.formFilter.value.centreName;
  this.sharedService.loading = true;
  this.billsTypeMasterList();
  this.sharedService.loading=false;   
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}


