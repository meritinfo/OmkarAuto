import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consignmentlist',
  templateUrl: './consignmentlist.component.html',
  styleUrls: ['./consignmentlist.component.css']
})
export class ConsignmentlistComponent implements OnInit {

  loggedInUserID: string = '';

  constructor(private route: Router) {
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

  //Open new user add screen
  consignmentAdd(): void {
    this.route.navigate(['/consignmentadd']);
  }
}
