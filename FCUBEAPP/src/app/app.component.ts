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
  title = 'FCUBEAPP';

  showModalBox: boolean = false;
  user: string = '';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;

  constructor(public sharedService: SharedService, private route: Router, 
    private loginModel: Loginmodel, private idle: Idle, private keepalive: Keepalive) {

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
      // sets an idle timeout of 1500 seconds.
      this.idle.setIdle(3000);
      // sets a timeout period of 50 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      this.idle.setTimeout(6000);
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


  //Shortcut key for destination list -> Ctrl + S
  @HostListener('window:keydown.control.s', ['$event'])
  tripFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/destinationlist']);
  }
  //Shortcut key for doc allot list -> Ctrl + M
  @HostListener('window:keydown.control.m', ['$event'])
  conFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/docallotlist']);
  }
  //Shortcut key for Transport list -> Ctrl + T
  @HostListener('window:keydown.control.t', ['$event'])
  trippayFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/transportmstlist']);
  }
  //Shortcut key for Consignment list -> Ctrl + L
  @HostListener('window:keydown.control.l', ['$event'])
  othertripFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/consignmentlist']);
  }
  //Shortcut key for Challan list -> Ctrl + G
  @HostListener('window:keydown.control.g', ['$event'])
  dieselFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/challanlist']);
  }
  //Shortcut key for Lorry Hire Payments list -> Ctrl + H
  @HostListener('window:keydown.control.h', ['$event'])
  happayFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/lhpmtlist']);
  }
  //Shortcut key for Delivery Ack list -> Ctrl + D
  @HostListener('window:keydown.control.d', ['$event'])
  dlvryFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/delacklist']);
  }
  //Shortcut key for Bill list -> Ctrl + B
  @HostListener('window:keydown.control.b', ['$event'])
  billFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/billstatementlist']);
  }
  //Shortcut key for Consignment Enquiry -> Ctrl + E
  @HostListener('window:keydown.control.e', ['$event'])
  cnenqFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/cnenquiry']);
  }
  //Shortcut key for Consignment Enquiry -> Ctrl + A
  @HostListener('window:keydown.control.a', ['$event'])
  accountFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/finaccountsmasterlist']);
  }
  //Shortcut key for Change Branch -> Ctrl + 6
  @HostListener('window:keydown.control.6', ['$event'])
  chngBrFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/changebranch']);
  }




}
