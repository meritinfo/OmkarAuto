import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DovehicleinService } from 'src/app/services/dovehiclein.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Dovehicleinmodel } from 'src/app/models/dovehicleinmodel';
import { Dovehicleinlistmodel  } from 'src/app/models/dovehicleinlistmodel';
import { Dotempgcmodel } from 'src/app/models/dotempgcmodel';
import { DotempgcService } from 'src/app/services/dotempgc.service';
  
 
@Component({
  selector: 'app-dovehicleinlist',
  templateUrl: './dovehicleinlist.component.html',
  styleUrls: ['./dovehicleinlist.component.css']
})
export class DovehicleinlistComponent {
  allDolist: Dovehicleinlistmodel = new Dovehicleinlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'dprBranch',
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
  vehicleList: Dropdownmodel[] = [];

  tempgc= new Dotempgcmodel();
  
  keywordLocation = 'dataName';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false;
  formSubmitted = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private toasterService: ToastrService, private doentryService: DovehicleinService, 
    private dotempgcService : DotempgcService,
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "DO Vehicle IN"));
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

    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    
    this.doentryService.clearDoVehicleInDetails();

    this.getVehicleNoList();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      vehicleNo: new FormControl('',),
    });
    
    this.sharedService.loading=true;

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = "";
    this.filter.filterStr = "";
    this.filter.filterStr1 = "";
    this.filter.filterStr2 = "";
    this.filter.filterStr3 = "";

    this.doList();    
    this.sharedService.loading=false;
  }
  
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }


  doList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        
        this.doentryService.getDoVehicleInList(this.filter).subscribe(resp => {
          this.allDolist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title:' Entry Date',
          data: 'entryDater',
        }, 
        {
          title: 'Truck No  ',
          data: 'truckNo',
        },
        {
          title: '  Vehicle In Date.',
          data: 'vehicleInDatetime',
        },
        {
          title: 'Owner Name ',
          data: 'ownerName',
        },
        {
          title: 'Contact Name',
          data: 'contactName',
        },
        {
          title: 'Mobile No ',
          data: 'mobileNo',
        },  
        {
          title: 'Driver Name ',
          data: 'driverName',
        },   
        {
          title: 'Driver Mobile ',
          data: 'driverMobile1',
        }, 
        {
          title: 'Action',
          data: 'doViId',
        },   
        {
          title: 'Temp GC',
          data: 'doViId',
        },   
      ],
    };
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getdoVehiDetails(dos: Dovehicleinmodel): void {
    this.doentryService.setDoVehicleInDetails(dos);
    this.route.navigate(['/dovehicleinedit']);
  }  

  gentempGc(dos: Dovehicleinmodel): void {
    this.tempgc.tempGcId = "";
    this.tempgc.doId = dos.doId;
    this.tempgc.vehiclePlacedId = dos.doVpId; 
    this.tempgc.bookingPlace = dos.entryBranch;
    this.tempgc.gcNoteNo = "";
    this.tempgc.bookingDate = this.loginDate;
    this.tempgc.bookStatus = "";
    this.tempgc.vehiInDate = dos.vehicleInDatetime;
    this.tempgc.partyName = "";
    this.tempgc.fromPlace  = "";
    this.tempgc.toPlace  = "";
    this.tempgc.fplace  = "";
    this.tempgc.tplace  = "";
    this.tempgc.ewayBillType  = "A";
    this.tempgc.ewayBillNo  = "";
    this.tempgc.ewayBillDate  = "";
    this.tempgc.ewayBillExpDate  = "";
    this.tempgc.invoiceNo  = "";
    this.tempgc.invoiceDt   = "";
    this.tempgc.goodsValue   = "";
    this.tempgc.cnorId  = "";
    this.tempgc.cnorName  = "";
    this.tempgc.cnorAdd1   = "";
    this.tempgc.cnorAdd2   = "";
    this.tempgc.cnorAdd3   = "";
    this.tempgc.cnorState   = "";
    this.tempgc.cnorPin   = "";
    this.tempgc.cnorGst   = "";
    this.tempgc.cneeId  = "";
    this.tempgc.cneeName   = "";
    this.tempgc.cneeAdd1   = "";
    this.tempgc.cneeAdd2   = "";
    this.tempgc.cneeAdd3   = "";
    this.tempgc.cneeState   = "";
    this.tempgc.cneePin   = "";
    this.tempgc.cneeGst  = "";
    this.tempgc.cneeMob   = "";
    this.tempgc.classCode  = "";
    this.tempgc.productCode  = "";
    this.tempgc.noPackages  = "";
    this.tempgc.actualWt  = "";
    this.tempgc.chargewt  = "";
    this.tempgc.vehicleInDt  = "";
    this.tempgc.vehicleInTime  = "";
    this.tempgc.vehicleOutDt  = "";
    this.tempgc.vehicleOutTime  = "";
    this.tempgc.cropDesc  = "";
    this.tempgc.vehicleNo   = dos.truckNo;
    this.tempgc.vehOwnerName   = dos.ownerName;
    this.tempgc.ownerPan   = dos.panNo;
    this.tempgc.vehOwnerMobile   = dos.mobileNo;
    this.tempgc.driverName   = dos.driverName;
    this.tempgc.driverMob1   = dos.driverMobile1;
    this.tempgc.driverLicNo = dos.driverLicense;
    this.tempgc.driverLicDt  = dos.driverLicValid;
    this.tempgc.payStn   = dos.entryBranch;
    this.tempgc.payParty   = dos.doParty;
    this.tempgc.businessby  = "";
    this.tempgc.gstBy = "E";
    this.tempgc.remarks  = "";
    this.tempgc.yearId = "";
    this.tempgc.mainCn   = "";
    this.tempgc.loggedInUser  = "";    

    this.dotempgcService.setTempgcDetails(this.tempgc);
    this.route.navigate(['/dotempgcadd']);
  }  

  get f() { return this.formFilter.controls; }

  search(): void {
    this.formSubmitted = true;
    if (this.formFilter.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }

    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.search = "";
    this.filter.filterStr1 = selecteddata.vehicleNo?selecteddata.vehicleNo.dataId:"";
    this.filter.filterStr2 = this.branch;
    
    this.sharedService.loading = true;
    this.doList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  