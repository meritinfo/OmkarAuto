import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from 'src/app/models/loggedinusermodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginSubmitted = false;
  selectedUserDetails = new LoggedinUsermodel();

  constructor(private formBuilder: FormBuilder, private loginModel: Loginmodel, private sharedService: SharedService, private route: Router) {
    this.loginModel = new Loginmodel();
  }

  //On initial load
  ngOnInit(): void {
    sessionStorage.removeItem('uid');
    this.formLogin = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', Validators.required)
    });
    this.sharedService.loggedInStatus = false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formLogin.controls; }

  // Send partner details //
  submitLoginForm(): void {
    this.sharedService.loading = true;
    this.loginSubmitted = true;
    if (this.formLogin.invalid) {
      this.sharedService.loading = false;
      return;
    }
    this.loginModel.userName = this.formLogin.value.userName;
    this.loginModel.userPassword = this.formLogin.value.userPassword;
    this.sharedService.loginSubmitted(this.loginModel).subscribe((res: LoggedinUsermodel) => {
      this.selectedUserDetails = res;
      if (this.selectedUserDetails.status) {
        sessionStorage.setItem("uid", this.selectedUserDetails.userId);
     
        sessionStorage.setItem("token", this.selectedUserDetails.token);
        sessionStorage.setItem("user", this.selectedUserDetails.userName);
      
        this.sharedService.loggedInStatus = true;
        this.sharedService.loading = false;
        this.route.navigate(['/intermediatescreen']);
      }
      else {
        console.log(this.selectedUserDetails.message);
      }
      this.sharedService.loading = false;
      this.formLogin.reset(); 
    });
  }

}
