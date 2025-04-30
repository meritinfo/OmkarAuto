import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Finaccountmodel  } from 'src/app/models/finaccountmodel';
import { Finaccountlistmodel } from 'src/app/models/finaccountlistmodel';
import { FinsaccountmasterService } from 'src/app/services/finaccountmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';


@Component({
  selector: 'app-finaccountsmasterlist',
  templateUrl: './finaccountsmasterlist.component.html',
  styleUrls:['./finaccountsmasterlist.component.css'],
})
export class FinaccountsmasterlistComponent {
    
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  groupList : Dropdownmodel[] = []; 
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allFinaccounts: Finaccountlistmodel = new Finaccountlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private finsaccountmasterService: FinsaccountmasterService, 
    private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {    
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Accounts/Ledger Master");
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
    
    this.finsaccountmasterService.clearFinsaccountsDetails();
    this.formFilter = this.formBuilder.group({
      accountName: new FormControl(''),
      groupName: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.getGroupList();
    this.finaccountslist();
    this.sharedService.loading=false;

  }
  finaccountslist(){
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching: false,     
        language: {
          zeroRecords: ''
        }, 
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.sharedService.loading = true;
      this.finsaccountmasterService.getFinsaccountsList(this.filter).subscribe(resp => {
         this.allFinaccounts = resp;
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
          title: 'Account Name',
          data: 'accountName',
        },
        {
        title: 'Ledger Name',
        data: 'ledgerName',
        },
        {
          title: 'Sub Account Name',
          data: 'subAccountName',
        },
        {
          title: 'Action',
          data: 'accountId',
        },
      ],
    };
  }
  getGroupList(): void {
      this.finsaccountmasterService.getGroupList().subscribe((res) => {
      this.groupList = res;
    });
  }
  
  //Open new driver master add screen
  addfinaccount(): void {
    this.route.navigate(['/finaccountadd']);
  }

  //Open user details screen
  getFinsaccountsDetails(finact: Finaccountmodel): void {
    this.finsaccountmasterService.setFinsaccountsDetails(finact);
    this.route.navigate(['/finaccountedit']);
  }

 
  search(): void {
    this.filter.search = this.formFilter.value.accountName;
    this.filter.sortColumn = this.formFilter.value.groupName;
    this.sharedService.loading=true;
    this.finaccountslist();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

