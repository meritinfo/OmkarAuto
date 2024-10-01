
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Benificiarymastermodel  } from 'src/app/models/benificiarymastermodel';
import { Benificiarymasterlistmodel } from 'src/app/models/benificiarymasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dprmodel } from 'src/app/models/dprmodel';
import { DprService } from 'src/app/services/dpr.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { BenificiaryMasterService } from 'src/app/services/benificiarymaster.service';

@Component({
  selector: 'app-benificiarymasterlist',
  templateUrl: './benificiarymasterlist.component.html',
  styleUrls: ['./benificiarymasterlist.component.css']
})
export class BenificiarymasterlistComponent {
  allbenificiarylist: Benificiarymasterlistmodel = new Benificiarymasterlistmodel();
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
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
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
    private toasterService: ToastrService, private benificiaryMasterService: BenificiaryMasterService, 
    private dprService: DprService, private ratesMasterService: RatesMasterService,
    private commonService: CommonService,private route: Router)  {
  

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Beneficiary Master"));
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

  this.dprService.clearDprDetails();
  this.benificiaryMasterService.clearBenificiarymasterEntryDetails();

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  today.setMonth(month - 10);
  
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date().toLocaleDateString('en-CA').toString();
  
  if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
    this.fromDate = this.minDate ;
  }
  else{
    this.fromDate = today.toLocaleDateString('en-CA').toString();
  }   

  
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate,),
    toDate: new FormControl(this.loginDate,),
    //payParty: new FormControl('',),
  
  });
  this.sharedService.loading=true;

  setTimeout(() => {      
    this.formFilter.patchValue({
      // fromDate: this.dprfromDate,
      // toDate: this.dprtoDate,
      // payParty: this.partyList.find(e => e.dataId == this.dprpayParty),   
      // type: this.dprtype,
      // origin: this.locationList.find(e => e.dataId == this.dprorigin),   
      // destination: this.locationList.find(e => e.dataId == this.dprdestination),     
    })
  }, 2000);

 // this.filter.fromDate = this.dprfromDate;
 // this.filter.toDate = this.dprtoDate;
  // this.filter.search = this.dprpayParty;
  // this.filter.filterStr = this.dprtype;
  // this.filter.filterStr1 = this.dprorigin;
  // this.filter.filterStr2 = this.dprdestination;

  this.beneficiaryList();    
  this.sharedService.loading=false;
}
beneficiaryList(){
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
        
        this.benificiaryMasterService.getBenificiaryMasterList(this.filter).subscribe(resp => {
          this.allbenificiarylist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Ben Type',
          data: 'benType',
        }, 
        {
          title: 'ben Code',
          data: 'benCode',
        },
        {
          title: 'Ben Name',
          data: 'benName',
        },
        {
          title: 'Ben Co AcName',
          data: 'benCoAcName',
        },  
        {
          title: 'Ben BankName',
          data: 'benBankName',
        },   
       
        {
          title: 'Action',
          data: 'masterId',
        },    
         
      ],
    };
  }


  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  
  
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  get f() { return this.formFilter.controls; }
  benificiaryMasterAdd(): void {
    this.route.navigate(['/benificiarymasteradd']);
  }

  //Open user details screen
  getBenificiaryMasterDetails(Docrenewal: Benificiarymastermodel): void {
    this.benificiaryMasterService.setBenificiaryMasterDetails(Docrenewal);
    this.route.navigate(['/benificiarymasteredit']);
  }
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
    this.filter.search = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr = selecteddata.type;
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.sharedService.loading = true;
    this.beneficiaryList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  

