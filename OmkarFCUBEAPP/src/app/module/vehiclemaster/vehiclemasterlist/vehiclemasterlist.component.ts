import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiclemasterlist',
  templateUrl: './vehiclemasterlist.component.html',
  styleUrls: ['./vehiclemasterlist.component.css']
})
export class VehiclemasterlistComponent implements OnInit {
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

  //Open new vehicle master add screen
  vehiclemasterAdd(): void {
    this.route.navigate(['/vehiclemasteradd']);
  }

}
