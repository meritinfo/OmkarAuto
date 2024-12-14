import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from 'src/app/models/loggedinusermodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Schedulemodel } from 'src/app/models/schedulemodel';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginSubmitted = false;
  selectedUserDetails = new LoggedinUsermodel();
  shdled = false;
  login = true;
  otp = false;
  ipAddress = "";
  shdlMsg:string ="";
  scheduleDetails = new Schedulemodel();
  responseDetails = new Responsemodel();
  companyname: string = '';

  constructor(private formBuilder: FormBuilder, private loginModel: Loginmodel, 
    private commonService: CommonService, 
    private sharedService: SharedService, private route: Router) {
    this.loginModel = new Loginmodel();
  }

  //On initial load
  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', Validators.required),
      otp: new FormControl('',),
    });
    
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.login= false;
      this.shdlMsg = 'Another project is open' ;
    }
    //this.getIpAddress();
    this.getScheduleDetails();
    this.getCompanyDetails();
    this.sharedService.loggedInStatus = false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formLogin.controls; }
  
  
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
          this.login=false;
          this.shdlMsg = 'Application is under maintenance till '+ formatDate(enddt,format, locale);
        }
        else{               
          this.shdlMsg = 'Application will be under maintenance between '+ 
          formatDate(startdt,format, locale) + ' and ' + formatDate(enddt,format, locale) ;
        }
      }
    });
     
  }

  getIpAddress(){
    this.sharedService.getipaddress().subscribe((res) => {
      this.ipAddress = res;
    });     
  }
  
  getCompanyDetails(){
    this.sharedService.getCompanyDetail().subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status){        
        this.companyname = this.responseDetails.message;
      }
      else{
        this.companyname = "FCUBE"
      }
      sessionStorage.setItem("companyname", this.companyname );
    });
     
  }

  // Send partner details //
  submitLoginForm(): void {
    this.loginSubmitted = true;
    if (this.formLogin.invalid) {
      return;
    }

    this.sharedService.loading = true;
    var selecteddata = this.formLogin.getRawValue();
    this.loginModel.userName = selecteddata.userName;
    this.loginModel.userPassword = selecteddata.userPassword;
    this.loginModel.ipAddress = this.ipAddress;
    this.loginModel.otp = selecteddata.otp?selecteddata.otp : "";

    this.sharedService.loginSubmitted(this.loginModel).subscribe((res: LoggedinUsermodel) => {
      this.selectedUserDetails = res;
      if (this.selectedUserDetails.status) {
        sessionStorage.setItem("uid", this.selectedUserDetails.userId);     
        sessionStorage.setItem("token", this.selectedUserDetails.token);    
        sessionStorage.setItem("scope", this.selectedUserDetails.scope);
        sessionStorage.setItem("user", this.selectedUserDetails.userName);
      
        this.sharedService.loggedInStatus = true;
        this.route.navigate(['/intermediatescreen']);
      }
      else if(this.selectedUserDetails.userId == "1"){
        if (confirm("Do you want to generate OTP?")) {
          this.sharedService.generateOTP(this.loginModel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.selectedUserDetails.message = "OTP Generated, Login with OTP";
              console.log("OTP Generated, Login with OTP"); 
              this.otp = true;
            }
            else{
              console.log(this.responseDetails.message);        
            }     
          });
        }
      }
      else {
        console.log(this.selectedUserDetails.message);
      }
      this.formLogin.reset(); 
    });
    this.sharedService.loading = false;
  }

}
