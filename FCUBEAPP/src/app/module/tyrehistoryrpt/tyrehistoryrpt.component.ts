import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Requestmodel } from 'src/app/models/requestmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Tyremasterlistmodel } from 'src/app/models/tyremasterlistmodel';
import { TyremgntrptService } from 'src/app/services/tyremgntrpt.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tyrehistoryrpt',
  templateUrl: './tyrehistoryrpt.component.html',
  styleUrls: ['./tyrehistoryrpt.component.css']
})
export class TyrehistoryrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  brandList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allTyremgntRptlist: Tyremasterlistmodel = new Tyremasterlistmodel();
  request: Requestmodel = new Requestmodel();
  formFilter!: FormGroup;
  userSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();

  constructor(private tyremgntrptService: TyremgntrptService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router) {
  }
  ngOnInit(): void {   

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Tyre History Report");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setFullYear(year - 1);
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
  
    this.formFilter = this.formBuilder.group({
      tyreNo: new FormControl('',),  
    });
    
    this.request.strRequest   = "";

    this.sharedService.loading=true;
    this.getTyreStatus();
    this.sharedService.loading=false;
  }
  
  getBrandList(): void {
    this.commonService.getTyreBrandList().subscribe((res) => {
      this.brandList = res;
    });
  }

  get f() { return this.formFilter.controls; }

  getTyreStatus(){
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 500,
        serverSide: true,
        processing: true,
        searching:false,
        ajax: (dataTablesParameters: any, callback) => {    
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });      
          this.tyremgntrptService.getTyreHistoryRptList(this.request).subscribe(resp => {
             this.allTyremgntRptlist = resp;
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
          data: 'purchaseDate',
        },  
        {
          title: 'Tyre Status',
          data: 'tyrePattern',
        }, 
        {
          title: 'Vehicle No',
          data: 'tyreModel',
        }, 
        {
          title: 'Brand Name',
          data: 'brandID',
        }, 
        {
          title: 'KM',
          data: 'estLifeKM',
        }, 
      ],
    };
  }
    
  //Open user details screen
  exportExcel(): void {      
    this.userSubmitted = true;
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedDataVal=this.formFilter.getRawValue();    
    this.request.strRequest = selectedDataVal.tyreNo;
    this.tyremgntrptService.getTyreHistoryRptExcel(this.request).subscribe(resp => {
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "TyreHistory" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
    
  search(): void {
    this.userSubmitted = true;
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedDataVal=this.formFilter.getRawValue(); 
    this.request.strRequest = selectedDataVal.tyreNo;

    this.sharedService.loading=true;
    this.getTyreStatus();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
} 



