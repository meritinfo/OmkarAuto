import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Intermediatescreenmodel } from 'src/app/models/intermediatescreenmodel';
console.log();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    year: string = '';
  logindate: string = '';
  branch: string = '';
  user: string = '';
  selectedScreenDetails = new Intermediatescreenmodel();
  constructor(private sharedService: SharedService, private route: Router) {

  }
  ngOnInit(): void {

    var userData = localStorage.getItem('yearid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.year = userData;
    }
 
    var userData2 = localStorage.getItem('loginDate')?.toString();
    if (typeof userData2 !== 'undefined' && userData2 !== null && userData2 !== '') {
      this.logindate = userData2;
    }
    var userData3 = localStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
    }
    var userData4 = localStorage.getItem('user')?.toString();
    if (typeof userData4 !== 'undefined' && userData4 !== null && userData4 !== '') {
      this.user = userData4;
    }
    if (this.user) {
      console.log(this.user);
    }
   
    if (this.year) {
      console.log(this.year);
    }
  
   

  }
  //Logout from system
  logout() {
    this.sharedService.loggedInStatus = false;
    this.route.navigate(['']);
  }
}
