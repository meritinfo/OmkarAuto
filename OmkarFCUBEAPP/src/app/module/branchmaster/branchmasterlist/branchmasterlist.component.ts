import { Component, } from '@angular/core';
import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Branchmasterlistmodel  } from 'src/app/models/branchmasterlistmodel';
import { Branchmodel } from 'src/app/models/branchmodel';

import { BranchMasterService } from 'src/app/services/branchmaster.service';

@Component({
  selector: 'app-branchmasterlist',
  templateUrl: './branchmasterlist.component.html',
  styleUrls: ['./branchmasterlist.component.css']
})
export class BranchmasterlistComponent  {

  loggedInUserID: string = '';
  dtOptions: DataTables.Settings = {};
  allBranchMaster: Branchmasterlistmodel = new Branchmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''
  }

  constructor(private branchService: BranchMasterService, private route: Router) {
  }

  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
  }
       // Set column title and data field
   
        
  
  //Open new user add screen
  Addbranchmaster(): void {
    this.route.navigate(['/addbranchmaster']);
  }
  
}

