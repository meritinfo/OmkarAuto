import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-gstdetails',
  templateUrl: './gstdetails.component.html',
  styleUrls: ['./gstdetails.component.css']
})
export class GstdetailsComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  result: string = '';

  constructor(private route: Router, private formBuilder: FormBuilder, private commonService: CommonService) {
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

    this.formUser = this.formBuilder.group({
      eWayBillNo: new FormControl('',),
    });
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  //Submit user form details //
  submitForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }

    var payload = {'eWayBillNumber': this.formUser.value.eWayBillNo}

    this.commonService.billDetails(payload).subscribe((res: any) => {
      this.result = JSON.stringify(res.result);
      this.formUser.reset();
    });
  }
}
