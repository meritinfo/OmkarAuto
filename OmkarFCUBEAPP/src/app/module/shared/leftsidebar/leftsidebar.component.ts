import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {
  selectedUserID: string = '';
  mainMenuList: any;
  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.selectedUserID = userData;
      this.getMenuList(this.selectedUserID);
    }
    
  }

  getMenuList(selectedUserID: string){
    this.sharedService.getMenuList(selectedUserID).subscribe((res: any) => {
      this.mainMenuList = res;
    });
  }
}
