
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Cnorcneegstlistmodel  } from 'src/app/models/cnorcneegstlismodel';
import { Cnorcneegstmodel } from 'src/app/models/cnorcneegstmodel';
import { CnorCneeGstService } from 'src/app/services/cnorcneegst.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-cnorcneegstlist', 
  templateUrl: './cnorcneegstlist.component.html',
  styleUrls: ['./cnorcneegstlist.component.css']
})
export class CnorcneegstlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

    allCnorcneeGst: Cnorcneegstlistmodel = new Cnorcneegstlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'doccode',
      sortOrder: 'asc',
      search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private cnorCneeGstService: CnorCneeGstService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Consignor/Consignee Search");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.cnorCneeGstService.clearCnorcneeMasterModelDetails();
  this.formFilter = this.formBuilder.group({
    docDescription: new FormControl(''),
  });

  this.sharedService.loading=true;
  this.cnorcneeGstList();
  this.sharedService.loading=false;
}
cnorcneeGstList(){
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
      this.cnorCneeGstService.getCnorCneeGstList(this.filter).subscribe(resp => {
        this.allCnorcneeGst = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Location',
        data: 'location',
      },
      {
        title: 'Address1',
        data: 'address1',
      },
      {
        title: 'address2',
        data: 'address2',
      },
      {
        title: 'GstNo',
        data: 'gstNo',
      },
      {
        title: 'Contact Person',
        data: 'contactPerson',
      },
      {
        title: 'Mobile No',
        data: 'mobileNo',
      },

      {
        title: 'Action',
        data: 'cnorCneeDetID',
      },   
    ],
  };
}
//Open new destination add screen
addCneeGst(): void {
  this.route.navigate(['/cnorcneegstadd']);
}


//Open user details screen
getCnorCneeGstDetails(Docrenewal: Cnorcneegstmodel): void {
  this.cnorCneeGstService.setCnorcneeGstModelDetails(Docrenewal);
  this.route.navigate(['/cnorcneegstedit']);
}


search(): void {
  this.filter.search = this.formFilter.value.docDescription;
  this.sharedService.loading=true;
  this.cnorcneeGstList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}

}





