import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Loginmodel } from './models/loginmodel';
import { LoggedinUsermodel } from './models/loggedinusermodel';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OmkarFCUBEAPP';

  showModalBox: boolean = false;
  user: string = '';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;

  constructor(public sharedService: SharedService, private route: Router, private loginModel: Loginmodel, private idle: Idle, private keepalive: Keepalive) {

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

    if (this.sharedService.loggedInStatus) {
      // sets an idle timeout of 900 seconds.
      this.idle.setIdle(900);
      // sets a timeout period of 30 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      this.idle.setTimeout(30);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      this.idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.'
        this.reset();
      });

      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        this.showModalBox = false;
        this.sharedService.loggedInStatus = false;
        localStorage.clear();
        sessionStorage.clear();
        this.route.navigate(['']);
      });

      this.idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        this.showModalBox = true;
      });

      this.idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!'
      });

      // sets the ping interval to 15 seconds
      this.keepalive.interval(15);

      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

      this.reset();
    }
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started';
    this.timedOut = false;
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
    this.reset();
    this.showModalBox = false;
    this.loginModel.userName = this.user;
    this.sharedService.refreshToken(this.loginModel).subscribe((res: LoggedinUsermodel) => {
      sessionStorage.setItem("token", res.token);
    });
  }

  //Shortcut key for tripsheet list -> Ctrl + S
  @HostListener('window:keydown.control.s', ['$event'])
  tripFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/tripsheetlist']);
  }
  //Shortcut key for Consignment -> Ctrl + L
  @HostListener('window:keydown.control.l', ['$event'])
  conFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/consignmentlist']);
  }
  //Shortcut key for Trip Payments -> Ctrl + P
  @HostListener('window:keydown.control.p', ['$event'])
  trippayFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/trippaymentlist']);
  }
  //Shortcut key for OTHER Trip Payments -> Ctrl + O
  @HostListener('window:keydown.control.o', ['$event'])
  othertripFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/othertripopenlist']);
  }
  //Shortcut key for Diesel Statement -> Ctrl + D
  @HostListener('window:keydown.control.d', ['$event'])
  dieselFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/dieselstatementlist']);
  }
  //Shortcut key for Happay Statement -> Ctrl + H
  @HostListener('window:keydown.control.h', ['$event'])
  happayFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/happaystatementlist']);
  }


// Others Trip Open:  Ctrl + O
// Tripsheet:  Ctrl + S

}
