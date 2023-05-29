import { Component } from '@angular/core';




import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Tyrepositionmasterlistmodel } from 'src/app/models/tyrepositionmasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tyrepositionmastermodel } from 'src/app/models/tyrepositionmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TyrepositionMasterService } from 'src/app/services/tyrepositionmaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addtyrepositionmaster',
  templateUrl: './addtyrepositionmaster.component.html',
  styleUrls: ['./addtyrepositionmaster.component.css']
})
export class AddtyrepositionmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedTyrePositionMasterDetails = new Tyrepositionmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private TyrePositionMasterModel: Tyrepositionmastermodel, private tyrepositionmasterService: TyrepositionMasterService, private commonService: CommonService) {
    this.TyrePositionMasterModel = new Tyrepositionmastermodel();

 
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

  this.selectedTyrePositionMasterDetails = this.tyrepositionmasterService.getTyrepositionMasterDetails();
  this.formUser = this.formBuilder.group({
    positionDesc: new FormControl('',)
 
  

  });
  if (this.selectedTyrePositionMasterDetails.tyrePosID != '') {
    this.formUser.patchValue(this.selectedTyrePositionMasterDetails);
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitTyrePositionMasterForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }

  this.TyrePositionMasterModel.tyrePosID = this.selectedTyrePositionMasterDetails.tyrePosID != '' ? this.selectedTyrePositionMasterDetails.tyrePosID : '';
  this.TyrePositionMasterModel.positionDesc= this.formUser.value.positionDesc;



  this.tyrepositionmasterService.tyrepositionMasterDetailsSubmitted(this.TyrePositionMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}




