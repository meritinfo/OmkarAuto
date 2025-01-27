import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Intermediatescreenmodel } from 'src/app/models/intermediatescreenmodel';
import { Subscription, interval, map, timer } from 'rxjs';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from 'src/app/models/loggedinusermodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Schedulemodel } from 'src/app/models/schedulemodel';
import { formatDate } from "@angular/common";

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
  yeardesc: string = '';
  shdled=false;
  shdlMsg:string ="";
  scheduleDetails = new Schedulemodel();

  selectedScreenDetails = new Intermediatescreenmodel();
  timerSubscription !: Subscription;
  constructor(private sharedService: SharedService, 
    private commonService: CommonService, 
    private route: Router, private loginModel: Loginmodel) {

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
    var yeardesc = sessionStorage.getItem('yeardesc')?.toString();
    if (typeof yeardesc !== 'undefined' && yeardesc !== null && yeardesc !== '') {
      this.yeardesc = yeardesc;
    }
    
    var userData4 = sessionStorage.getItem('user')?.toString();
    if (typeof userData4 !== 'undefined' && userData4 !== null && userData4 !== '') {
      this.user = userData4;
    }
    var userData5 = sessionStorage.getItem('companyname')?.toString();
    if (typeof userData5 !== 'undefined' && userData5 !== null && userData !== '') {
      this.company = userData5;
    }

    this.getScheduleDetails();


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
  changePwd():void { 
    this.route.navigate(['/changepassword']);
  }

  dashboard(): void { 
    this.route.navigate(['/dashboard']);
  }

  getScheduleDetails(){
    this.commonService.getScheduleDetails().subscribe((res: Schedulemodel ) => {
      this.scheduleDetails = res;      
      const today = new Date();
      var warndt = new Date(res.warningTimeStart); 
      var startdt = new Date(res.publishStart); 
      var enddt = new Date(res.publishEnd); 
      const format = 'dd-MMM-yyyy hh:mm a';
      const locale = 'en-US';

      if(today>= warndt && today <= enddt) {     
        this.shdled = true; 
        if(today>= startdt && today <= enddt)  {
          this.route.navigate(['/']);
        }
        else{               
          this.shdlMsg = 'Application will be under maintenance between '+ 
          formatDate(startdt,format, locale) + ' and ' + formatDate(enddt,format, locale) ;
        }
      }
    });
     
  }

  // don't forget to unsubscribe when the Observable is not necessary anymore 
  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
