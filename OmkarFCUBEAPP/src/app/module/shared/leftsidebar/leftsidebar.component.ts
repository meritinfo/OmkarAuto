import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Menulistmodel } from 'src/app/models/loggedinusermodel';
import { SharedService } from 'src/app/services/shared.service';
declare const $: any;

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit, AfterViewInit {
  selectedUserID: string = '';
  mainMenuList: Menulistmodel[] = [];
  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.selectedUserID = userData;
      if (this.sharedService.loggedInStatus) {
        this.getMenuList(this.selectedUserID);
      }
    }
  }
  ngAfterViewInit() {
    $('#side-menu').metisMenu();
  }

  getMenuList(selectedUserID: string) {
    this.sharedService.getMenuList(selectedUserID).subscribe((res: any) => {
      this.mainMenuList = res;
      for (let i = 0; i < this.mainMenuList.length; i++) {
       // this.mainMenuList[i].menuList = this.mainMenuList[i].menuList.sort((a, b) => a.menuType > b.menuType ? 1 : -1);
     
      }
      sessionStorage.setItem("menulist", JSON.stringify(this.mainMenuList));
    });
  }
}
