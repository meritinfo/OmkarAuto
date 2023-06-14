import { Component } from '@angular/core';




import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Lrbillseriesmodel } from 'src/app/models/lrbillseriesmodel';
import { CommonService } from 'src/app/services/common.service';
import { LRBillSeriesService } from 'src/app/services/lrbillseries.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addlrbillseries',
  templateUrl: './addlrbillseries.component.html',
  styleUrls: ['./addlrbillseries.component.css']
})
export class AddlrbillseriesComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedlrbillSeriesDetails = new Lrbillseriesmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private lrbillSeriesModel: Lrbillseriesmodel, private lrbillseriesService: LRBillSeriesService, private commonService: CommonService) {
    this.lrbillSeriesModel = new Lrbillseriesmodel();


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

  this.selectedlrbillSeriesDetails = this.lrbillseriesService.getLrbillSeriesDetails();
  this.formUser = this.formBuilder.group({
    seriesCode: new FormControl('',),
    lr_Bill_type: new FormControl('',),
  

  });
  if (this.selectedlrbillSeriesDetails.seriesId != '') {
    this.formUser.patchValue(this.selectedlrbillSeriesDetails);
    this.formUser.patchValue({
      lr_Bill_type: this.selectedlrbillSeriesDetails.lr_Bill_type,
     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitLRBIllSeriesForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.lrbillSeriesModel.seriesId = this.selectedlrbillSeriesDetails.seriesId != '' ? this.selectedlrbillSeriesDetails.seriesId : '';
  this.lrbillSeriesModel.seriesCode= this.formUser.value.seriesCode;
  this.lrbillSeriesModel.lr_Bill_type = this.formUser.value.lr_Bill_type;


  this.lrbillseriesService.LrbillseriesDetailsSubmitted(this.lrbillSeriesModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}
