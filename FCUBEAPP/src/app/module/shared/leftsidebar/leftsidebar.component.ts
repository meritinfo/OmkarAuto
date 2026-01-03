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
    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.selectedUserID = userData;
      if (this.sharedService.loggedInStatus) {
        this.getMenuList(this.selectedUserID);
      }
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      $('#side-menu').metisMenu();
    }, 1000);
  }

  getMenuList(selectedUserID: string) {
    this.sharedService.getMenuList(selectedUserID).subscribe((res: any) => {
      this.mainMenuList = res;
      sessionStorage.setItem("menulist", JSON.stringify(this.mainMenuList));
    });
  }
}
