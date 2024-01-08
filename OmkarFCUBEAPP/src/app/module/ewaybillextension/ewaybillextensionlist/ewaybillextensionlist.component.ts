import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Ewaybillextmodel  } from 'src/app/models/ewaybillextmodel';
import { Ewaybillextlistmodel } from 'src/app/models/ewaybillextlistmodel';
import { EwaybillextService } from 'src/app/services/ewaybillext.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-ewaybillextensionlist',
  templateUrl: './ewaybillextensionlist.component.html',
  styleUrls: ['./ewaybillextensionlist.component.css']
})
export class EwaybillextensionlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allEwayBillExtlist: Ewaybillextlistmodel = new Ewaybillextlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'ewayBillExpDate',
    sortOrder: 'desc',
    search: ''
}
  formFilter!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private ewaybillextService: EwaybillextService, private route: Router,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Ewaybill Extention");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
  
    this.ewaybillextService.clearEwaybillextDetails();
    this.formFilter = this.formBuilder.group({
      groupName: new FormControl(''),
    });
    this.sharedService.loading = true;
    this.ewaybillextlist();       
    this.sharedService.loading = false;
  }

  ewaybillextlist(){
    
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
        this.filter.search = '';      
        this.ewaybillextService.getEwaybillextList(this.filter)
          .subscribe(resp => {
            this.allEwayBillExtlist = resp;  
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
            title: 'Booked At',
            data: 'bookedAt',
          },
          {
            title: 'Booking Date',
            data: 'bookingDate',
          },
          {
          title: 'GcNote No',
          data: 'gcNoteNo',
          },
          {
          title: 'From Location',
          data: 'fromLocation',
          },
          {
          title: 'Destination',
          data: 'destination',
          },
          {
          title: 'EwayBill No',
          data: 'ewayBillNo',
          },
          {
          title: 'EwayBill Date',
          data: 'ewayBillDate',
          },
          {
          title: 'EwayBill Exp Date',
          data: 'ewayBillExpDate',
          },
          {
            title: 'Action',
            data: 'ewayBillNo',
          },
        ],
      };
  }
  
  getEwayBillExtDetails(eway: Ewaybillextmodel): void {
    this.ewaybillextService.setEwaybillextDetails(eway);
    this.route.navigate(['/ewaybillextedit']);
  }
  
  search(): void {
    this.sharedService.loading = true;
    this.ewaybillextlist();       
    this.sharedService.loading = false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}

