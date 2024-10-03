import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Ratetypesmodel } from 'src/app/models/ratetypesmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ratetypeslistmodel } from 'src/app/models/ratetypeslistmodel';
import { CommonService } from 'src/app/services/common.service';
import { RateTypesService } from 'src/app/services/ratetypes.service';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-addratetypes',
  templateUrl: './addratetypes.component.html',
  styleUrls: ['./addratetypes.component.css']
})
export class AddratetypesComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  

  responseDetails = new Responsemodel();


  selectedRateTypesDetails = new Ratetypesmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private ratetypesmodel: Ratetypesmodel,private requestmodel:Requestmodel, private rateTypesService: RateTypesService,  private toasterService: ToastrService,private commonService: CommonService) {
    this.ratetypesmodel = new Ratetypesmodel();



}
exit(): void {
  this.route.navigate(['/ratetypeslist']);
}
checkDuplicateRate(){
  var selectedData = this.formUser.getRawValue();  
    this.requestmodel.strRequest = selectedData.rateDesc;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.rateTypesService.checkDuplicateRate(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          rateDesc: ''  
        });
        
      }
    });
    
}

deleteRateTypeForm(): void {
  if(this.selectedRateTypesDetails.rateTypeId != '' ){
   this.requestmodel.strRequest =this.selectedRateTypesDetails.rateTypeId
    if (confirm("Are you sure, you want to delete this?")) {
          this.rateTypesService.rateTypeDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/ratetypeslist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}

ngOnInit(): void {
 
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

  this.selectedRateTypesDetails = this.rateTypesService.getratetypesDetails();
  this.formUser = this.formBuilder.group({
    rateDesc: new FormControl('', [Validators.required]),
    rateMethod: new FormControl('',[Validators.required]),
  

  });
  if (this.selectedRateTypesDetails.rateTypeId != '') {
    this.formUser.patchValue(this.selectedRateTypesDetails);
    this.formUser.patchValue({
      rateMethod: this.selectedRateTypesDetails.rateMethod, 
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitRateTypesForm(): void {
  this.formSubmitted = true;
  
  if (this.formUser.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields"); 
    const controls = this.formUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    } 
    return;
  }
  this.ratetypesmodel.rateTypeId = this.selectedRateTypesDetails.rateTypeId != '' ? this.selectedRateTypesDetails.rateTypeId : '';
  this.ratetypesmodel.rateDesc= this.formUser.value.rateDesc.toString().toUpperCase();
  this.ratetypesmodel.rateMethod = this.formUser.value.rateMethod;
  this.ratetypesmodel.loggedInUser = this.loggedInUserID;


  this.rateTypesService.ratetypeDetailsSubmitted(this.ratetypesmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
   // console.log(this.responseDetails.message);
    //this.formUser.reset();
    //window.location.reload();
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/ratetypeslist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }
  });
}
}



