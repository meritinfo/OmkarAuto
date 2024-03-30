import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Intermediatescreenmodel } from 'src/app/models/intermediatescreenmodel';
import { Subscription, interval, map, timer } from 'rxjs';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from 'src/app/models/loggedinusermodel';
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
  company: string = '';
  branchname: string = '';
  selectedScreenDetails = new Intermediatescreenmodel();
  timerSubscription !: Subscription;
  constructor(private sharedService: SharedService, private route: Router, private loginModel: Loginmodel) {

  }
  ngOnInit(): void {
    var userData = sessionStorage.getItem('yearID')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.year = userData;
    }

    var userData2 = sessionStorage.getItem('loginDate')?.toString();
    if (typeof userData2 !== 'undefined' && userData2 !== null && userData2 !== '') {
      this.logindate = userData2;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
    }
    var userData5 = sessionStorage.getItem('branchname')?.toString();
    if (typeof userData5 !== 'undefined' && userData5 !== null && userData5 !== '') {
      this.branchname = userData5;
    }
    var userData4 = sessionStorage.getItem('user')?.toString();
    if (typeof userData4 !== 'undefined' && userData4 !== null && userData4 !== '') {
      this.user = userData4;
    }
    var userData5 = sessionStorage.getItem('companyname')?.toString();
    if (typeof userData5 !== 'undefined' && userData5 !== null && userData !== '') {
      this.company = userData5;
    }


    // timer(0, 1200000) call the function immediately and every 1200 seconds 
    this.timerSubscription = timer(0, 1200000).pipe(
      map(() => {
        var data = {"userName": this.user}
        this.loginModel.userName = this.user;
        this.sharedService.refreshToken(this.loginModel).subscribe((res: LoggedinUsermodel) => {
          sessionStorage.setItem("token", res.token);
        });
      })
    ).subscribe();
  }

  //Logout from system
  logout() {
    this.sharedService.loggedInStatus = false;
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['']);
  }
  changePwd(): void {
 
    this.route.navigate(['/changepassword']);
  }
    

  // don't forget to unsubscribe when the Observable is not necessary anymore 
  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
