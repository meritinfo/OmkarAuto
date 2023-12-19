import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Usermodel } from 'src/app/models/usermodel';
import { CommonService } from 'src/app/services/common.service';
import { DestinationService } from 'src/app/services/destination.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-adddestination',
  templateUrl: './adddestination.component.html',
  styleUrls: ['./adddestination.component.css']
})
export class AdddestinationComponent {

  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedDestinationDetails = new Destinationmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private destinationModel: Destinationmodel, private destinationService: DestinationService, 
    private commonService: CommonService, private requestmodel:Requestmodel,
     private toasterService: ToastrService ) {
    this.destinationModel = new Destinationmodel();


  }
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }


    var userData = sessionStorage.getItem('uid')?.toString();
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
      centreName: new FormControl('', [Validators.required]),
      acctBranch: new FormControl('',[Validators.required]),
      stateCode: new FormControl('', [Validators.required]), 
      pinCode: new FormControl('', [Validators.required]),
      controlBranch: new FormControl('',),

    });
    if (this.selectedDestinationDetails.centreid != '') {
      this.formUser.patchValue(this.selectedDestinationDetails);          
      this.editMode = true;
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

  deleteDestinationForm(): void {
    if(this.selectedDestinationDetails.centreid != '' ){
     this.requestmodel.strRequest =this.selectedDestinationDetails.centreid
      if (confirm("Are you sure, you want to delete this?")) {
            this.destinationService.destinationDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formUser.reset();
            window.location.reload();
        });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/destinationlist']);
  }


  //Submit user form details //
  submitDestinationForm(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    this.destinationModel.centreid = this.selectedDestinationDetails.centreid != '' ? this.selectedDestinationDetails.centreid : '';
    var selectedDataValue = this.formUser.getRawValue();
    this.destinationModel.centreName      = selectedDataValue.centreName.toString().toUpperCase();
    this.destinationModel.pinCode         = selectedDataValue.pinCode.toString();
    this.destinationModel.acctBranch      = selectedDataValue.acctBranch.toString();
    this.destinationModel.stateCode       = selectedDataValue.stateCode.toString();
    this.destinationModel.loggedInUserID  = this.loggedInUserID;

    this.destinationService.destinationDetailsSubmitted(this.destinationModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
  }
}

