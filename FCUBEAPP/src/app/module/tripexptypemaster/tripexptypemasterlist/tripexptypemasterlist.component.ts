import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import {Tripexptypemasterlistmodel } from 'src/app/models/tripexptypemasterlistmodel';
import { TripexptypemasterModel } from 'src/app/models/tripexptypemastermodel';
import {TripExpTypeMasterService } from 'src/app/services/tripexptypemaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tripexptypemasterlist',
  templateUrl: './tripexptypemasterlist.component.html',
  styleUrls: ['./tripexptypemasterlist.component.css']
})

export class TripexptypemasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTripExpMaster: Tripexptypemasterlistmodel = new Tripexptypemasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private tripExpTypeMasterService: TripExpTypeMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {

  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Trip Expense Type Master");
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

    this.tripExpTypeMasterService.clearCheckTripExpMasterDetails();
    this.formFilter = this.formBuilder.group({
      classDesc: new FormControl(''),
    }); 

    this.sharedService.loading = true;
    this.tripExpTypeMasterList();
    this.sharedService.loading=false;   
  }

  tripExpTypeMasterList(){
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
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        // this.filter.search = '';
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.tripExpTypeMasterService.getTripExpTypeMasterList(this.filter).subscribe(resp => {
            this.allTripExpMaster = resp;
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
          title: 'Action',
          data: 'expId',
        }, 
        {
          title: 'Exp Desc',
          data: 'expDesc',
        },      
       
      ],
    };
  }

  AddTripExpTypeMaster(): void {
    this.route.navigate(['/tripexptypemasteradd']);
  }

  //Open user details screen
  tripExpTypeMasterDetails(Classification: TripexptypemasterModel): void {
    this.tripExpTypeMasterService.setTripExpTypeMasterDetails(Classification);
    this.route.navigate(['/tripexptypemasteredit']);
  }
}
