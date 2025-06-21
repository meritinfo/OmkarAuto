import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { SharedService } from './services/shared.service';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { Loginmodel } from './models/loginmodel';
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

  showModalBox: boolean = false;
  user: string = '';
  company: string = '';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;

  // Assuming Loginmodel and LoggedinUsermodel are provided via DI if needed elsewhere,
  // but for the idle logic, they don't seem directly relevant here.
  constructor(
    public sharedService: SharedService,
    private route: Router,
    private idle: Idle,
    private keepalive: Keepalive
  ) {
    // idle.setIdle and idle.setTimeout are often set in the constructor
    // or ngOnInit before calling idle.watch().
    // You have them in ngOnInit which is fine.

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
      // You might want to show a warning modal here, BEFORE timeout
      // this.showModalBox = true; // Show the warning modal
    });

    // Optional: onTimeoutWarning to show a countdown in your modal
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      // This is where you'd typically show your modal and update a countdown
      this.showModalBox = true; // Show the warning modal
    });

    // Configure keepalive (optional, for pinging server)
    // this.keepalive.interval(15); // Ping server every 15 seconds
    // this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  ngOnInit(): void {
    // Initialize user and company data from session storage
    // You have duplicate logic for 'user' here, correct it.
    const uid = sessionStorage.getItem('uid');
    if (uid) {
      this.sharedService.loggedInStatus = true;
    }
    const userName = sessionStorage.getItem('user');
    if (userName) {
      this.user = userName;
    }
    const companyName = sessionStorage.getItem('companyname');
    if (companyName) {
      this.company = companyName;
    }

    // IMPORTANT: Start watching for idle AFTER the user is logged in
    // and after all idle configurations are set up.
    if (this.sharedService.loggedInStatus) {
      this.reset(); // Initial reset to start watching
    } else {
      // If not logged in, ensure idle monitoring is stopped
      this.idle.stop();
    }
  }

  reset() {
    this.idle.watch(); // Start watching for user activity
    this.idleState = 'Started.';
    this.timedOut = false;
    // You might want to hide the modal here if it was shown for warning
    this.showModalBox = false;
  }

  // Method to handle closing the modal (e.g., if user clicks 'Stay Logged In')
  stayLoggedIn() {
    this.reset(); // Reset the timer and hide the modal
  }

  // Method to handle logging out from the modal
  logout() {
    this.showModalBox = false;
    this.sharedService.loggedInStatus = false;
    sessionStorage.clear();
    this.route.navigate(['/login']);
    this.idle.stop(); // Stop watching on logout
  }



  // Consider using HostListener for broader activity detection
  // This helps ensure the timer resets on any interaction within the app's root component.
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:click', ['$event'])
  onActivity(event: MouseEvent | KeyboardEvent) {
    // The DEFAULT_INTERRUPTSOURCES should handle this, but an explicit
    // HostListener ensures that your component reacts, and you can add custom logic here.
    // However, do NOT call this.reset() here directly if DEFAULT_INTERRUPTSOURCES
    // is already configured. Calling it excessively can cause performance issues or
    // unintended behavior. The idle service itself handles the resets when interrupts occur.
    // If you explicitly want to call reset on every interaction, you would remove
    // DEFAULT_INTERRUPTSOURCES and manually call reset here.
    // For now, trust DEFAULT_INTERRUPTSOURCES. This HostListener is more for
    // knowing when activity happens if you needed to debug or add other side effects.
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
    if(this.company =="LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED") {
      this.route.navigate(['/docallotllp']);
    }
    else{
      this.route.navigate(['/docallotlist']);
    }
  }
  //Shortcut key for Transport list -> Ctrl + R
  @HostListener('window:keydown.control.r', ['$event'])
  mrFont(event: KeyboardEvent) {
    event.preventDefault();
    this.route.navigate(['/mrentrylist']);
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
    if(this.company =="LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED") {
      this.route.navigate(['/consignmentllp']);
    }
    else{
      this.route.navigate(['/consignmentlist']);
    }
  }
  //Shortcut key for Challan list -> Ctrl + G
  @HostListener('window:keydown.control.g', ['$event'])
  dieselFont(event: KeyboardEvent) {
    event.preventDefault();
    if(this.company =="LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED") {
      this.route.navigate(['/challan_llplist']);
    }
    else{
      this.route.navigate(['/challanlist']);
    }
  }
  //Shortcut key for Lorry Hire Payments list -> Ctrl + H
  @HostListener('window:keydown.control.h', ['$event'])
  happayFont(event: KeyboardEvent) {
    event.preventDefault();
    if(this.company =="LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED") {
      this.route.navigate(['/lhpmtlistllp']); 
    }
    else{
      this.route.navigate(['/lhpmtlist']);      
    }
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
    if(this.company =="LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED") {
      this.route.navigate(['/billmainlistLLP']);
    }
    else{
      this.route.navigate(['/billstatementlist']);
    }
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
