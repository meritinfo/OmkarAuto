import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';

@Component({
  selector: 'app-driversalarystatementadd',
  templateUrl: './driversalarystatementadd.component.html',
  styleUrls: ['./driversalarystatementadd.component.css']
})
export class DriversalarystatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  formDriverSalaryStatement!: FormGroup;
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

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
    this.formDriverSalaryStatement = this.formBuilder.group({
      transDate: new FormControl(''),
      tripFrom: new FormControl(''),
      tripTo: new FormControl(''),
      pmtType: new FormControl(''),
      remarks: new FormControl(''),
      totalSalary: new FormControl(''),
      totalPoolAmt: new FormControl(''),
      netPayable: new FormControl(''),
      creditAC: new FormControl(''),
      cheqNo: new FormControl('')
    });
  }

  get f() { return this.formDriverSalaryStatement.controls; }
}
