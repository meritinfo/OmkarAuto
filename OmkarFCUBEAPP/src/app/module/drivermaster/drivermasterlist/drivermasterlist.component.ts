import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Drivermasterlistmodel } from 'src/app/models/drivermasterlistmodel';
import { Drivermodel } from 'src/app/models/drivermodel';
import { DrivermasterService } from 'src/app/services/drivermaster.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Drivermasterlistrequestmodel } from 'src/app/models/drivermasterlistrequestmodel.model';
import { PdfService } from 'src/app/services/pdf.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-drivermasterlist',
  templateUrl: './drivermasterlist.component.html',
  styleUrls: ['./drivermasterlist.component.css']
})
export class DrivermasterlistComponent {

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDriverMaster: Drivermasterlistmodel = new Drivermasterlistmodel();
  filter: Drivermasterlistrequestmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'driverName',
    sortOrder: 'asc',
    search: '',
    allData: false
  }

  formFilter!: FormGroup;

  constructor(private formBuilder: FormBuilder, private drivermasterService: DrivermasterService,
    private route: Router, private excelService: ExcelService, private pdfService: PdfService) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList).find((( aa: { menuName: string; }) => aa.menuName === "Driver Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.drivermasterService.clearDriverMasterDetails();
    this.formFilter = this.formBuilder.group({
      driverName: new FormControl(''),
    });
    this.driverMasterList();
  }

  driverMasterList() {
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
        //this.filter.search = dataTablesParameters.search.value;
        this.drivermasterService.getDriverMasterList(this.filter)
          .subscribe(resp => {
            this.allDriverMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Driver Name ',
          data: 'driverName',
        },
        {
          title: 'Father Name ',
          data: 'fatherName',
        },
        {
          title: 'DOA',
          data: 'dateOfAppoint',
        },
        {
          title: 'License No ',
          data: 'licenseNo',
        },
        {
          title: 'Lic Valid Upto ',
          data: 'licValidUpto',
        },
        {
          title: 'Driver Mobile ',
          data: 'driverMobile1',
        },
        {
          title: 'Intro By ',
          data: 'introBy',
        },
        {
          title: 'Action',
          data: 'driverMasterID',
        },

      ],
    };
  }

  //Open new driver master add screen
  drivermasterAdd(): void {
    this.route.navigate(['/drivermasteradd']);
  }

  //Open user details screen
  getDriverMasterDetails(Docrenewal: Drivermodel): void {
    this.drivermasterService.setDriverMasterDetails(Docrenewal);
    this.route.navigate(['/drivermasteredit']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.driverName;
    this.driverMasterList();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  exportExcel(): void {
    this.filter.allData = true;
    this.drivermasterService.getDriverMasterList(this.filter)
      .subscribe(resp => {
        const allDataList = resp.driverList;
        this.excelService.exportAsExcelFile(allDataList, 'DriverMaster');
      });
  }

  exportPdf(): void {
    this.filter.allData = true;
    this.drivermasterService.getDriverMasterList(this.filter)
      .subscribe(resp => {
        const allDataList = resp.driverList;
        this.pdfService.exportAsPdfFile(allDataList, 'driverName,fatherName,dateOfBirth,licenseNo,licValidUpto,driverMobile1,introBy', 'DriverMaster');
      });
  }

}

