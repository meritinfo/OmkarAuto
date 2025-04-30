
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Chcosttypeslistmodel   } from 'src/app/models/chcosttypeslistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { ChcosttypesModel } from 'src/app/models/chcosttypesmodel';
import { ChCostTypesService } from 'src/app/services/chcosttypes.service';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-chcosttypeslist',
  templateUrl: './chcosttypeslist.component.html',
  styleUrls: ['./chcosttypeslist.component.css']
})
export class ChcosttypeslistComponent {
  dtOptions: DataTables.Settings = {};
  allCostTypes: Chcosttypeslistmodel = new Chcosttypeslistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr : "",
    filterStr1: "",
    filterStr2:  "",
    filterStr3:  "",  

}
formFilter!: FormGroup;
branchList: Dropdownmodel[] = [];
vehicleList: Dropdownmodel[] = [];
 
keywordLocation = 'dataName';
year: string = '';
loginDate: string = '';
fromDate: string = '';
maxDate: string = '';
minDate: string = '';
editMode = false;
createStatus = false;
editStatus = false;
deleteStatus = false;
viewStatus = false; 
dashboard: string ="";
createmode = false;
@ViewChild(DataTableDirective)
dtElement!: DataTableDirective;
constructor(private formBuilder: FormBuilder,private chCostTypesService: ChCostTypesService, 
  private commonService: CommonService, private route: Router) {
  }
    ngOnInit(): void {
    
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((( aa: { menuName: string; }) => aa.menuName === "Challan Cost Types"));
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
  
  
      var loginDate = sessionStorage.getItem('loginDate')?.toString();
      if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
        this.loginDate = loginDate;
      }
        
      this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
      this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
      
      this.fromDate = this.minDate ;
  
  
  
      this.chCostTypesService.clearCostTypesDetails();
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.fromDate,),
        toDate: new FormControl(this.loginDate,),
       // branch: new FormControl('',),
        vehicle: new FormControl('',),
        tripNo: new FormControl('',)
      });
     // this.getBranchList();
     // this.getVehicleNoList();
  
      var selectedData = this.formFilter.getRawValue();
      this.filter.fromDate = selectedData.fromDate;
      this.filter.toDate = selectedData.toDate;
      this.filter.filterStr = "";
      this.filter.filterStr1 =  "";
      this.chCostTypesList();
    }
    chCostTypesList(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        searching: false,
        ajax: (dataTablesParameters: any, callback) => {
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          this.filter.sortColumn = 'bName';
          this.filter.sortOrder = dataTablesParameters.order[0].dir;
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
          this.chCostTypesService.getCostTypesList(this.filter).subscribe(resp => {
            this.allCostTypes = resp;
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
            title: 'Challan Cost Desc',
            data: 'chCostDesc',
          },
          {
            title: 'Sac Code',
            data: 'sacCode',
          },
          {
            title: 'Gst Pct',
            data: 'gstPct',
          },
      
          {
            title: 'Action',
            data: 'chCostId',
          },
        ],
      };
    }
    startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
      return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
    };
  
    selectEvent(item: any) {
      // do something with selected item
    }
  
    onFocused(e: any) {
      // do something
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
  
    onChangeSearch(search: string) {
      //ignore
    }
    
    //Open new driver master add screen
    chcosttypesAdd(): void {
      this.route.navigate(['/chcosttypesadd']);
    }
  
    //Open user details screen
    getCostTypesList(trippayments: ChcosttypesModel): void {
      this.chCostTypesService.setCostTypesDetails(trippayments);
      this.route.navigate(['/chcosttypesedit']);
    }
  
  
    search(): void {
      debugger;
      var selectedData = this.formFilter.getRawValue();
     
      this.filter.fromDate = selectedData.fromDate;
      this.filter.toDate = selectedData.toDate;
     // this.filter.filterStr = selectedData.branch;
      this.filter.filterStr1 =  selectedData.vehicle?selectedData.vehicle.dataId:"";
  
      this.chCostTypesList();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(); 
      });
    }
    
  
  }
  
