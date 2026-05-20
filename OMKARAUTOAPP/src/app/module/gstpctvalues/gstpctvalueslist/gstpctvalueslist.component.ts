
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Gstpctvaluesmodel  } from 'src/app/models/gstpctvaluesmodel';
import { Gstpctvalueslistmodel } from 'src/app/models/gstpctvalueslistmodel';
import { GstPctValuesService } from 'src/app/services/gstpctvalues.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Drivermasterlistrequestmodel } from 'src/app/models/drivermasterlistrequestmodel.model';
import { PdfService } from 'src/app/services/pdf.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { DataTableDirective } from 'angular-datatables';

import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-gstpctvalueslist',
  templateUrl: './gstpctvalueslist.component.html',
  styleUrls: ['./gstpctvalueslist.component.css']
})
export class GstpctvalueslistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;     
  allPctValues: Gstpctvalueslistmodel = new Gstpctvalueslistmodel();
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
   
  loginDate: string = '';
  year: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  formFilter!: FormGroup;
   
  constructor(private formBuilder: FormBuilder, private gstPctValuesService: GstPctValuesService,
    private sharedService: SharedService,    private commonService: CommonService,    
    private toasterService: ToastrService, private route: Router, ) {
  }
   
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Define GST Pct"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    this.gstPctValuesService.clearGstPctValuesDetails();

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    this.formFilter = this.formBuilder.group({  
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });

    this.sharedService.loading=true;
    this.gstPctList();
    this.sharedService.loading=false;
  }
     
  gstPctList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,   
        language: {
          zeroRecords: ''
        }, 
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
        this.gstPctValuesService.getGstpctvaluesmodelList(this.filter).subscribe(resp => {
         this.allPctValues= resp;
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
          data: 'id',
        }, 
        {
          title: 'Valid From',
          data: 'validFrom',
        },
        {
          title: 'Road FrtGst ',
          data: 'roadFrtGst',
        },
        {
          title: 'Rail FrtGst',
          data: 'railFrtGst',
        },
        {
          title: 'Coastal Frt Gst',
          data: 'coastalFrtGst',
        },
        {
          title: 'Hamali Gst',
          data: 'hamaliGst',
        },
        {
          title: 'Detention Gst',
          data: 'detentionGst',
        },
        {
          title: 'Other Charges Gst',
          data: 'otherChargesGst',
        },   
      ],
    };
  }
     
  gstpctvaluesAdd(): void {
    this.route.navigate(['/gstpctvaluesadd']);
  } 

  //Open user details screen
  setGstPctValuesDetails(Docrenewal: Gstpctvaluesmodel): void {
    this.gstPctValuesService.setGstPctValuesDetails(Docrenewal);
    this.route.navigate(['/gstpctvaluesedit']);
  }
  
  search(): void {
    var selectedDataVal = this.formFilter.getRawValue();
    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.search = "";
   // this.filter.filterStr = selectedDataVal.panNo;
   // this.filter.filterStr1 = this.year;
   this.filter.fromDate = this.formFilter.value.fromDate;
   this.filter.toDate = this.formFilter.value.toDate;
    this.sharedService.loading=true;
    this.gstPctList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
  
