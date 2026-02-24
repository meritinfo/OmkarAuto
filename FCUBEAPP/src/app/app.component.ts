import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';
import { timer, interval } from 'rxjs';
import { Router } from '@angular/router';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from './models/loggedinusermodel'; // Make sure this is used or remove if not needed
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FCUBEAPP';
  lastActivity = Date.now();

  showModalBox: boolean = false;
  user: string = '';
  company: string = '';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;

  constructor(
    public sharedService: SharedService,
    private route: Router,private idle: Idle,
    private keepalive: Keepalive,private loginModel: Loginmodel) {

    // Configure the idle service
    this.idle.setIdle(3600); // 1 hour (seconds)
    this.idle.setTimeout(600); // 10 minutes warning period (seconds)
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // Watch for idle status changes
    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      this.showModalBox = false; // Hide warning modal if user becomes active
      this.reset(); // Reset the timer
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.showModalBox = false; // Ensure modal is closed on actual timeout
      this.sharedService.loggedInStatus = false;
      sessionStorage.clear(); // Clear session data
      this.route.navigate(['/login']); // Redirect to login
      this.idle.stop(); // Stop watching for idle
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      this.showModalBox = true; // Show the warning modal
    });

     this.keepalive.interval(15); // Ping server every 15 seconds
     this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  ngOnInit(): void {
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      this.sharedService.loggedInStatus = true;
      this.user = uid;
    }
    const shortCode = sessionStorage.getItem('shortCode');
    if (shortCode) {
      this.company = shortCode;
    }   
    if (this.sharedService.loggedInStatus) {
      this.reset(); // Initial reset to start watching
    } else {
      this.idle.stop();
    }
  }

  reset() {
    this.idle.watch(); // Start watching for user activity
    this.idleState = 'Started.';
    this.timedOut = false;
    this.showModalBox = false;
  }

  stayLoggedIn() {
    this.reset(); // Reset the timer and hide the modal
  }

  logout() {
    this.showModalBox = false;
    this.sharedService.loggedInStatus = false;
    sessionStorage.clear();
    this.route.navigate(['/login']);
    this.idle.stop(); // Stop watching on logout
  }

  getRefreshToken() {
    this.loginModel.userName = this.user;
    interval(1200000).subscribe(() => {
      if ((Date.now() - this.lastActivity)< (20 * 60000)) {
        this.sharedService.refreshToken(this.loginModel).subscribe((res: LoggedinUsermodel) => {
          sessionStorage.setItem("token", res.token);
          this.lastActivity = Date.now();
        });
      }
    });
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:scroll', ['$event'])
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:click', ['$event'])
  onActivity(event: Event) {
    this.getRefreshToken();
    this.lastActivity = Date.now();
  }

  //Shortcut key for destination list -> Ctrl + S
  @HostListener('window:keydown.control.s', ['$event'])
  tripFont(event: Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/destinationlist']);
  }
  //Shortcut key for doc allot list -> Ctrl + M
  @HostListener('window:keydown.control.m', ['$event'])
  conFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/docallotllp']);
    }
    else{
      this.route.navigate(['/docallotlist']);
    }
  }
  //Shortcut key for Transport list -> Ctrl + R
  @HostListener('window:keydown.control.r', ['$event'])
  mrFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/mrentrylist']);
  }
  //Shortcut key for Transport list -> Ctrl + T
  @HostListener('window:keydown.control.t', ['$event'])
  trippayFont(event: Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/transportmstlist']);
  }
  //Shortcut key for Consignment list -> Ctrl + L
  @HostListener('window:keydown.control.l', ['$event'])
  othertripFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/consignmentllp']);
    }
    else{
      this.route.navigate(['/consignmentlist']);
    }
  }
   //Shortcut key for Consignment list -> Ctrl + I
  @HostListener('window:keydown.control.i', ['$event'])
  ccinvFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/ccinvoicelist']);
    }
  }
  
  //Shortcut key for Consignment list -> Ctrl + u
  @HostListener('window:keydown.control.u', ['$event'])  
  updatecnbillFont(event: Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/updatellpcnforbill']);
    }
    else{
      this.route.navigate(['/updatecnforbill']);
    }
  }
  //Shortcut key for Challan list -> Ctrl + G 
  @HostListener('window:keydown.control.g', ['$event'])
  dieselFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/challan_llplist']);
    }
    else{
      this.route.navigate(['/challanlist']);
    }
  }
  //Shortcut key for Lorry Hire Payments list -> Ctrl + H
  @HostListener('window:keydown.control.h', ['$event'])
  happayFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/lhpmtlistllp']); 
    }
    else{
      this.route.navigate(['/lhpmtlist']);      
    }
  }
  //Shortcut key for Delivery Ack list -> Ctrl + D
  @HostListener('window:keydown.control.d', ['$event'])
  dlvryFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/delacklist']);
  }
  //Shortcut key for Bill list -> Ctrl + B
  @HostListener('window:keydown.control.b', ['$event'])
  billFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    if(this.company =="LLP") {
      this.route.navigate(['/billmainlistLLP']);
    }
    else{
      this.route.navigate(['/billstatementlist']);
    }
  }
  //Shortcut key for Consignment Enquiry -> Ctrl + E
  @HostListener('window:keydown.control.e', ['$event'])
  cnenqFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/cnenquiry']);
  }
  //Shortcut key for Consignment Enquiry -> Ctrl + A
  @HostListener('window:keydown.control.a', ['$event'])
  accountFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/finaccountsmasterlist']);
  }
  //Shortcut key for Change Branch -> Ctrl + 6
  @HostListener('window:keydown.control.6', ['$event'])
  chngBrFont(event:  Event) {
    const kEvent = event as KeyboardEvent;
    kEvent.preventDefault();
    this.route.navigate(['/changebranch']);
  }




}
