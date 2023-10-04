import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';

@Component({
  selector: 'app-billstatementadd',
  templateUrl: './billstatementadd.component.html',
  styleUrls: ['./billstatementadd.component.css']
})
export class BillstatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  formBillStatement!: FormGroup;
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private route: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    var yearIDData = localStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = localStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

    }
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
    this.formBillStatement = this.formBuilder.group({
      statementBranch: new FormControl('', [Validators.required]),
      statementDate: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      vendor: new FormControl('', [Validators.required]),
      totalDieselAmount: new FormControl(''),
      totalDriverAdvAmount: new FormControl(''),
      totalStatementAmount: new FormControl(''),
      remarks: new FormControl(''),
    });
  }

  get f() { return this.formBillStatement.controls; }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (branchList: Dropdownmodel[], query: string): any[] {
    return branchList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

}
