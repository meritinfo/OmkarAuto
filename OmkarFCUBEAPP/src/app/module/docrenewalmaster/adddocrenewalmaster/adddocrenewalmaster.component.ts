import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Docrenewalmastermodel } from 'src/app/models/docrenewalmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { DocRenewalMasterService } from 'src/app/services/docrenewalmaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adddocrenewalmaster',
  templateUrl: './adddocrenewalmaster.component.html',
  styleUrls: ['./adddocrenewalmaster.component.css']
})
export class AdddocrenewalmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedDocRenewalMasterDetails = new Docrenewalmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private docRenewalMasterModel: Docrenewalmastermodel, private docrenewalmasterService: DocRenewalMasterService, private commonService: CommonService) {
    this.docRenewalMasterModel = new Docrenewalmastermodel();

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

  this.selectedDocRenewalMasterDetails = this.docrenewalmasterService.getDocrenewalMasterDetails();
  this.formUser = this.formBuilder.group({
    docCode: new FormControl('',),
    docDescription: new FormControl('',),
  

  });
  if (this.selectedDocRenewalMasterDetails.docRenewalID != '') {
    this.formUser.patchValue(this.selectedDocRenewalMasterDetails);
   
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitDocRenewalMasterForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.docRenewalMasterModel.docRenewalID = this.docRenewalMasterModel.docRenewalID != '' ? this.selectedDocRenewalMasterDetails.docRenewalID : '';
  this.docRenewalMasterModel.docCode= this.formUser.value.docCode;
  this.docRenewalMasterModel.docDescription = this.formUser.value.docDescription;


  this.docrenewalmasterService.docrenewalMasterDetailsSubmitted(this.docRenewalMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}



