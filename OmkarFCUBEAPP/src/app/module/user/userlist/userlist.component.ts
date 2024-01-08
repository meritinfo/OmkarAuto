import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Userlistmodel } from 'src/app/models/userlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { ConfirmationdialogService } from 'src/app/services/confirmationdialog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  allUsers: Userlistmodel = new Userlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'username',
    sortOrder: 'asc',
    search: ''
  }

  constructor(private userService: UserService, private route: Router, private confirmationdialogService: ConfirmationdialogService) {
  }

  ngOnInit(): void {
    this.userService.clearUserDetails();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.userService.getUserMasterList(this.filter)
          .subscribe(resp => {
            this.allUsers = resp;
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
          title: 'User Name',
          data: 'userName',
        },
        {
          title: 'User Description',
          data: 'userDescription',
        },
        {
          title: 'Scope',
          data: 'userScope',
        },
        {
          title: 'Role Type',
          data: 'userRoleType',
        },
        {
          title: 'Centre Name',
          data: 'centreName',
        },
        {
          title: 'Active',
          data: 'activeYN',
        },
      
        {
          title: 'Action',
          data: 'userId',
        },
      ],
    };
  }
  //Open new user add screen
  userAdd(): void {
    this.route.navigate(['/useradd']);
  }

  //Open user details screen
  userDetails(user: Usermodel): void {
    this.userService.setUserDetails(user);
    this.route.navigate(['/useredit']);
  }

  public deleteUser(user: Usermodel) {
    console.log(user);
    // this.confirmationdialogService.confirm('Please confirm..', 'Do you really want to delete ' + user.userName + '?')
    //   .then((confirmed) => console.log('User confirmed:', confirmed))
    //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
