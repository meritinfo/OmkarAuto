import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Loginmodel } from './models/loginmodel';
import { LoggedinUsermodel } from './models/loggedinusermodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OmkarFCUBEAPP';

  showModalBox: boolean = false;
  user: string = '';

  constructor(public sharedService: SharedService, private route: Router, private loginModel: Loginmodel) {
  }

  ngOnInit(): void {
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.sharedService.loggedInStatus = true;
    }
    var userName = sessionStorage.getItem('user')?.toString();
    if (typeof userName !== 'undefined' && userName !== null && userName !== '') {
      this.user = userName;
    }

    // starts immediately, then every 20 minutes
    timer(1200000, 1200000).subscribe(() => {
      if (this.sharedService.loggedInStatus) {
        this.showModalBox = true;
      }
    });
  }

  //Logout from system
  logout() {
    this.showModalBox = false;
    this.sharedService.loggedInStatus = false;
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['']);
  }

  stay() {
    this.showModalBox = false;
    this.loginModel.userName = this.user;
    this.sharedService.refreshToken(this.loginModel).subscribe((res: LoggedinUsermodel) => {
      sessionStorage.setItem("token", res.token);
    });
  }
}
