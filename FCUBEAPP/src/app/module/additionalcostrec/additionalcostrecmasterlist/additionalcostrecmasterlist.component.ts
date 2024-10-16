
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { AdditionalcostrecmasterModel  } from 'src/app/models/additionalcostrecmastermodel';
import { Additionalcostrecmasterlistmodel } from 'src/app/models/additionalcostrecmasterlist';
import { AdditionalcostrecService } from 'src/app/services/additionalcostrecmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-additionalcostrecmasterlist',
  templateUrl: './additionalcostrecmasterlist.component.html',
  styleUrls: ['./additionalcostrecmasterlist.component.css']
})
export class AdditionalcostrecmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

    allAdditionalMaster: Additionalcostrecmasterlistmodel = new Additionalcostrecmasterlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'doccode',
      sortOrder: 'asc',
      search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private additionalcostrecService: AdditionalcostrecService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Addtional Cost/Rec Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.additionalcostrecService.clearAdditionalcostrecmasterDetails();
  this.formFilter = this.formBuilder.group({
    docDescription: new FormControl(''),
  });

  this.sharedService.loading=true;
  this.additionalcostrecMasterList();
  this.sharedService.loading=false;
}
additionalcostrecMasterList(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching:false,
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
      this.additionalcostrecService.getadditionalcostrecmasterList(this.filter).subscribe(resp => {
        this.allAdditionalMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Add Cost Code',
        data: 'addCostCode',
      },
      {
        title: 'Add Cost Type',
        data: 'addCostType',
      },
      {
        title: 'AddCost Description',
        data: 'addCostDescription',
      },
      {
        title: 'Account ID',
        data: 'accountID',
      },
      {
        title: 'Affect Costing',
        data: 'affectCosting',
      },
     

      {
        title: 'Action',
        data: 'addCostID',
      },   
    ],
  };
}

//Open new destination add screen
adddditionalcostrecmaster(): void {
  this.route.navigate(['/additionalcostrecmasteradd']);
}


//Open user details screen
getdditionalcostrecmasterDetails(Docrenewal: AdditionalcostrecmasterModel): void {
  this.additionalcostrecService.setAdditionalcostrecmasterDetails(Docrenewal);
  this.route.navigate(['/additionalcostrecmasteredit']);
}


search(): void {
  this.filter.search = this.formFilter.value.docDescription;
  this.sharedService.loading=true;
  this.additionalcostrecMasterList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}

}




