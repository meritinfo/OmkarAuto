import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Usermodel } from 'src/app/models/usermodel';
import { CommonService } from 'src/app/services/common.service';
import { DestinationService } from 'src/app/services/destination.service';
import { UserService } from 'src/app/services/user.service';
debugger
@Component({
  selector: 'app-adddestination',
  templateUrl: './adddestination.component.html',
  styleUrls: ['./adddestination.component.css']
})
export class AdddestinationComponent {

  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedDestinationDetails = new Destinationmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private destinationModel: Destinationmodel, private destinationService: DestinationService, private commonService: CommonService) {
    this.destinationModel = new Destinationmodel();


  }
  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    this.getBranchList();

    this.getStateList();
    this.selectedDestinationDetails = this.destinationService.getDestinationDetails();
    this.formUser = this.formBuilder.group({
      centreName: new FormControl('',),
      acctBranch: new FormControl('',),
      stateCode: new FormControl('',),
      pinCode: new FormControl('',),
      userBranch: new FormControl([], ),
      userState: new FormControl([], ),
    });
    if (this.selectedDestinationDetails.centreid != '') {
      this.formUser.patchValue(this.selectedDestinationDetails);
      this.formUser.patchValue({
        userBranch: this.selectedDestinationDetails.acctBranch,
        userState: this.selectedDestinationDetails.stateCode,
       
        
      })
    }
   

   

    }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  //Get Branch List details //
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  //Get Module List details //
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  //Submit user form details //
  submitDestinationForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this.destinationModel.centreid = this.selectedDestinationDetails.centreid != '' ? this.selectedDestinationDetails.centreid : '';

    this.destinationModel.centreName = this.formUser.value.centreName;
    this.destinationModel.pinCode = this.formUser.value.pinCode;
    this.destinationModel.acctBranch = this.formUser.value.userBranch.toString();
    this.destinationModel.stateCode = this.formUser.value.userState.toString();

    this.destinationService.destinationDetailsSubmitted(this.destinationModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
  }
}

