
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Spareslubesmasterlistmodel } from 'src/app/models/spareslubesmasterlistmodel';
import { Spareslubesmastermodel } from 'src/app/models/sparelubesmastermodel';
import { SparesLubesMasterService } from 'src/app/services/spareslubesmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-spareslubesmasterlist',
  templateUrl: './spareslubesmasterlist.component.html',
  styleUrls: ['./spareslubesmasterlist.component.css']
})
export class SpareslubesmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allSparesMaster: Spareslubesmasterlistmodel = new Spareslubesmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private sparesLubesmasterService: SparesLubesMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {

}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Spares/Lubricants Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.sparesLubesmasterService.clearSparesLubesMasterDetails();
  this.formFilter = this.formBuilder.group({
    classDesc: new FormControl(''),
  }); 

  this.sharedService.loading = true;
  this.sparesLubesMasterList();
  this.sharedService.loading=false;   
}
sparesLubesMasterList(){
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
      // this.filter.search = '';
      this.sparesLubesmasterService.getSparesLubesMasterList(this.filter)
        .subscribe(resp => {
          this.allSparesMaster = resp;
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
        title: 'SpareLub Name',
        data: 'spareLubName',
      },
      {
        title: 'Spare LubType',
        data: 'stype',
      },
      {
        title: 'Schedule/Other',
        data: 'sch_Oth',
      },
      {
        title: 'Life Type',
        data: 'lifeType',
      },
      {
        title: 'Life Expectancy',
        data: 'lifeExpectancy',
      },
     
      {
        title: 'Is Active',
        data: 'isActive',
      },
     
      {
        title: 'Action',
        data: 'spareLubId',
      },
    ],
  };
}
 //Open new user add screen
 AddSparesLubesMaster(): void {
  this.route.navigate(['/spareslubesmasteradd']);
}

//Open user details screen
sparesLubesMasterDetails(Classification: Spareslubesmastermodel): void {
  this.sparesLubesmasterService.setSparesLubesMasterDetails(Classification);
  this.route.navigate(['/spareslubesmasteredit']);
}


}