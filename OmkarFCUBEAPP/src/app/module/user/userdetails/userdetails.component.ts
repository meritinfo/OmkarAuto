import { Component, OnInit } from '@angular/core';
import { Usermodel } from 'src/app/models/usermodel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  selectedUserDetails = new Usermodel();
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.selectedUserDetails = this.userService.getUserDetails();
  }
}
