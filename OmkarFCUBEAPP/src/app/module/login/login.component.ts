import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginmodel } from 'src/app/models/loginmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginSubmitted = false;
  selectedUserDetails = new Usermodel();

  constructor(private formBuilder: FormBuilder, private loginModel: Loginmodel, private sharedService: SharedService, private route: Router) {
    this.loginModel = new Loginmodel();
  }

  //On initial load
  ngOnInit(): void {
    localStorage.removeItem('uid');
    this.formLogin = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', Validators.required)
    });
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formLogin.controls; }

  // Send partner details //
  submitLoginForm(): void {
    this.loginSubmitted = true;
    if (this.formLogin.invalid) {
      return;
    }
    this.loginModel.userName = this.formLogin.value.userName;
    this.loginModel.userPassword = this.formLogin.value.userPassword;
    this.sharedService.loginSubmitted(this.loginModel).subscribe((res: Usermodel) => {
      this.selectedUserDetails = res;
      if (this.selectedUserDetails.status) {
        localStorage.setItem("uid", this.selectedUserDetails.userId);
        this.route.navigate(['/dashboard']);
      }
      else {
        console.log(this.selectedUserDetails.message);
      }
      this.formLogin.reset();
    })
  }
}
