
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Panwisetdsratelistmodel } from 'src/app/models/panwisetdsratelistmodel';
import { Panwisetdsratemodel } from 'src/app/models/panwisetdsratemodel';
import { PanwisetdsrateService } from 'src/app/services/panwisetdsrate.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Drivermasterlistrequestmodel } from 'src/app/models/drivermasterlistrequestmodel.model';
import { PdfService } from 'src/app/services/pdf.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';

@Component({
  selector: 'app-panwisetdsratelist',
  templateUrl: './panwisetdsratelist.component.html',
  styleUrls: ['./panwisetdsratelist.component.css']
})
export class PanwisetdsratelistComponent {

   createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;
    year: string = '';
      yearList: Dropdownmodel[] = [];
  
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    allPanRate: Panwisetdsratelistmodel = new Panwisetdsratelistmodel();
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
  
    constructor(private formBuilder: FormBuilder, private panService: PanwisetdsrateService,
      private sharedService: SharedService,    private commonService: CommonService,    
      private route: Router, private excelService: ExcelService, private pdfService: PdfService) {
}
ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "PAN wise TDS Rates"));
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

    this.panService.clearDPanwisetdsrateDetails();
    this.formFilter = this.formBuilder.group({
      panNo: new FormControl(''),
      yearID: new FormControl(''),
    });
    this.sharedService.loading=true;
    this.getDropdownList();   
    this.panRateList();
    this.sharedService.loading=false;
  }

  panRateList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.panService.getPanwisetdsrateList(this.filter).subscribe(resp => {
            this.allPanRate = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Pan No',
          data: 'panNo',
        },
        {
          title: 'Owner Name ',
          data: 'ownerName',
        },
        {
          title: 'Valid From',
          data: 'validFrom',
        },
        {
          title: 'Valid Upto',
          data: 'validUpto ',
        },
        {
          title: 'Tds Rate ',
          data: 'tdsRate',
        },
        {
          title: 'Is Active',
          data: 'isActive',
        },
       
        {
          title: 'Action',
          data: 'rateid',
        },

      ],
    };
  }

  //Open new driver master add screen
  panwisetdsrateAdd(): void {
    this.route.navigate(['/panwisetdsrateadd']);
  }
  getDropdownList() {
    this.sharedService.loading = true;
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      // this.formLogin.patchValue({
      //   yearID:this.yearList[0].dataId,
      // })   
    }); 
  }

  //Open user details screen
  setPanwisetdsrateDetails(Docrenewal: Panwisetdsratemodel): void {
    this.panService.setPanwisetdsrateDetails(Docrenewal);
    this.route.navigate(['/panwisetdsrateedit']);
  }
  search(): void {
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.search = "";
    this.filter.filterStr = selectedDataVal.panNo;
    this.filter.filterStr1 = this.year;
    this.sharedService.loading=true;
    this.panRateList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
