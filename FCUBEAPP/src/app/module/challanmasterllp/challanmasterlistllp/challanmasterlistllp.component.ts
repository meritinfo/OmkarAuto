
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { ChallanlistmodelllP  } from 'src/app/models/challanmasterlistllp';
import { ChallanmastermodelllP } from 'src/app/models/challanmastermodelllp';
import { ChallanmasterServiceLLP } from 'src/app/services/challanmasterllp.service';
import { CommonService } from 'src/app/services/common.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-challanmasterlistllp',
  templateUrl: './challanmasterlistllp.component.html',
  styleUrls: ['./challanmasterlistllp.component.css']
})
export class ChallanmasterlistllpComponent {
  loggedInUserID: string = '';
  dtOptions: DataTables.Settings = {};
  allChallan: ChallanlistmodelllP = new ChallanlistmodelllP();
  request: Requestmodel = new Requestmodel();
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
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
    
  year:string = ''; 
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private toastrService : ToastrService,
    private challanmasterService: ChallanmasterServiceLLP, private route: Router,
    private commonService: CommonService,) {
  }
  ngOnInit(): void {   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Challan Entry"));
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
    
    
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }

    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
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
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
  

    this.challanmasterService.clearChallanDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      vehicleNo: new FormControl("",),
      challanNo: new FormControl("",),
    });
    
    this.getBranchList();
    this.getVehicleNoList();

    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate; 
    this.filter.filterStr = selectedDataVal.vehicleNo;
    this.filter.filterStr1 = selectedDataVal.challanNo;
    this.filter.filterStr2 = this.branch;    
    this.filter.filterStr3 = this.year;    
    this.getChallanList();
  }

  getChallanList(){
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
        this.challanmasterService.getChallanList(this.filter).subscribe(resp => {
         this.allChallan = resp;
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
          title: 'Action',
          data: 'challanId',
        },
        {
          title: 'Print',
          data: 'challanId',
        },   
        {
          title: 'Branch',
          data: 'cbranch',
        },
        {
          title: 'Challan Date',
          data: 'challanDateTime',
        },  
        {
          title: 'Challan No',
          data: 'challanNo',
        },       
        {
          title: 'From/Origin',
          data: 'fPlace',
        },
        {
          title: 'To/Dest',
          data: 'tPlace',
        },
        {
          title: 'Vehicle No',
          data: 'truckNo',
        }, 
      ],
    };
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  
  onFocused(e: any) {
    // do something
  }
  
  onChangeSearch(search: string) {
  }
  
   
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  challanAdd(): void {
    this.route.navigate(['/challanaddllp']);
  }

  getChallanDetails(Challan: ChallanmastermodelllP): void {
    this.challanmasterService.setChallanDetails(Challan);
    this.route.navigate(['/challaneditllp']);
  }  

  download(ch: ChallanmastermodelllP): void {
    this.request.strRequest = ch.challanId;
    this.request.strRequest1 = this.loggedInUserID;
        
    this.challanmasterService.getChallanPrintPdf(this.request).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "Challan_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/challanprint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }

  search(): void {
    debugger;
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.filterStr = selectedDataVal.vehicleNo;
    this.filter.filterStr1 = selectedDataVal.challanNo;
    this.filter.filterStr2 = this.branch;     
    this.filter.filterStr3 = this.year;    
    
     this.getChallanList();
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload(); 
     });
  }
  

}


