import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Fingrouplistmodel } from 'src/app/models/fingrouplistmodel';
import { Fingroupmodel } from 'src/app/models/fingroupmodel';
import { CommonService } from 'src/app/services/common.service';
import { FingroupService } from 'src/app/services/fingroup.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fingroupadd',
  templateUrl: './fingroupadd.component.html',
  styleUrls: ['./fingroupadd.component.css']
})
export class FingroupaddComponent {
 
  loggedInUserID: string = '';
  userlogindate:string="";
  formFinGroup!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();

  accountId:string = "" ;
  groupName: string = "" ;
  accounttype: string = "" ;
  subAccountName: string = "" ;
  subAccountType: string = "";
  SchID: string = "";
  createdBy: string = "" ;

  accountTypeList: Dropdownmodel[] = [];
  subAccountTypeList: Dropdownmodel[] = []; 
  scheduleList: Dropdownmodel[] = [];

  selectedFinGroupMasterDetails = new Fingroupmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private fingroupmodel: Fingroupmodel,
     private finGroupService: FingroupService, private commonService: CommonService,
     private toasterService: ToastrService) {
    this.fingroupmodel = new Fingroupmodel();
 
}

ngOnInit(): void {
  var userData = sessionStorage.getItem('uid')?.toString();
  var userlogindate =sessionStorage.getItem('loginDate')?.toString();
  
  if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
    this.loggedInUserID = userData;
  }
  if (this.loggedInUserID) {
    console.log(this.loggedInUserID);
  }
  else {
    this.route.navigate(['/']);
  }
  
  this.selectedFinGroupMasterDetails = this.finGroupService.getFingroupDetails(); 
  this.formFinGroup = this.formBuilder.group({
    groupName: new FormControl('',),
    accounttype: new FormControl('',),
    subaccounttype: new FormControl('',),
    schedule: new FormControl('',),
  });  
 
  this.getaccounttypes();
  this.getsubaccounttypes('');
  this.getschedulelist();  

  setTimeout(() => {
    if (this.selectedFinGroupMasterDetails.accountId != '') {
        this.formFinGroup.patchValue(this.selectedFinGroupMasterDetails);
        this.formFinGroup.patchValue({
          accounttype: this.accountTypeList.find(e => e.dataName == this.selectedFinGroupMasterDetails.accountType),
          subaccounttype:this.subAccountTypeList.find(e => e.dataName == this.selectedFinGroupMasterDetails.subAccountName),
        });
      }
  }, 2000);
  
}
// convenience getter for easy access to contact form fields
get f() { return this.formFinGroup.controls; }

chkActName() {
    if (this.accountId == "")
    {
      this.groupName = this.formFinGroup.value.groupName;
      this.finGroupService.chkActName(this.groupName).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formFinGroup.patchValue({
            groupName: ''
          });
        }
      });
    }
  }

getaccounttypes(): void {
  this.finGroupService.getaccounttypes().subscribe((res) => {
    this.accountTypeList = res;
  });
}

getsubaccounttypes(actType: string): void {
  this.finGroupService.getsubaccounttypes(actType).subscribe((res) => {
    this.subAccountTypeList = res;
  });
}

getschedulelist(): void {
    this.finGroupService.getschedulelist().subscribe((res) => {
    this.scheduleList = res;
  });
}

accountTypeChange(e: any) { 
    console.log(e.target.value);
    var selectedValue = e.target.value;

    this.getsubaccounttypes(selectedValue);
}

subaccountTypeChange(e: any) {    
  console.log(e.target.value);
  var selectedValue = e.target.value;

  this.getsubaccounttypes(selectedValue);  
}

//Submit user form details //
submitFinGroupMasterForm(): void {
  this.formSubmitted = true;
  if (this.formFinGroup.invalid) {
    return;
  }

  this.fingroupmodel.accountId = this.selectedFinGroupMasterDetails.accountId != '' ? this.selectedFinGroupMasterDetails.accountId : '';
  this.fingroupmodel.groupName= this.formFinGroup.value.groupName;
  this.fingroupmodel.accountType= this.formFinGroup.value.accounttype;
  this.fingroupmodel.subAccountType=this.formFinGroup.value.subaccounttype;
  this.fingroupmodel.schID= this.formFinGroup.value.schedule;
  this.fingroupmodel.createdBy= this.loggedInUserID;

  this.finGroupService.fingroupDetailsSubmitted(this.fingroupmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formFinGroup.reset();
    window.location.reload();
  });
}
}




