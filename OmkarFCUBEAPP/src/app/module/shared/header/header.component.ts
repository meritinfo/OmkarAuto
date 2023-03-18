import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private sharedService: SharedService, private route: Router) {

  }

  //Logout from system
  logout() {
    this.sharedService.loggedInStatus = false;
    this.route.navigate(['']);
  }
}
