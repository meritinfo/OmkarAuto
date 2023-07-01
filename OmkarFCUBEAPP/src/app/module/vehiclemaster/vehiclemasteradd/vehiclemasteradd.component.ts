import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiclemasteradd',
  templateUrl: './vehiclemasteradd.component.html',
  styleUrls: ['./vehiclemasteradd.component.css']
})
export class VehiclemasteraddComponent implements OnInit {
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

}
