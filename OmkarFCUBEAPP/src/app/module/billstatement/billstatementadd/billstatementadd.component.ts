import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Billstatementsearchlistmodel } from 'src/app/models/billstatementsearchlistmodel';
import { Billstatementsearchlistrequestmodel } from 'src/app/models/billstatementsearchlistrequestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillstatementService } from 'src/app/services/billstatement.service';

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
  billstatementsearchlistmodel = new Billstatementsearchlistmodel();

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private billstatementsearchlistrequestmodel: Billstatementsearchlistrequestmodel, private billstatementService: BillstatementService, private route: Router, private formBuilder: FormBuilder) {
    this.billstatementsearchlistrequestmodel = new Billstatementsearchlistrequestmodel();
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
      statementBillStation: new FormControl(''),
      billSeries: new FormControl(''),
      billNo: new FormControl(''),
      billDate: new FormControl(''),
      party: new FormControl(''),
      lrFrom: new FormControl(''),
      lrTo: new FormControl(''),
      fromPoint: new FormControl(''),
      toPoint: new FormControl(''),
      totalFreight: new FormControl(''),
      totalExtra: new FormControl(''),
      totalSubTotal: new FormControl(''),
      gstType: new FormControl(''),
      sgstRef: new FormControl(''),
      sgstAmount: new FormControl(''),
      cgstRef: new FormControl(''),
      cgstAmount: new FormControl(''),
      igstRef: new FormControl(''),
      igstAmount: new FormControl(''),
      totalbillAmount: new FormControl('')
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

  searchStatement(): void {
    this.billstatementService.getBillStatementSearchList(this.billstatementsearchlistrequestmodel).subscribe((res: Billstatementsearchlistmodel) => {
      this.billstatementsearchlistmodel = res;
    });
  }

  selectedData(index: number, event: any) {
    this.billstatementsearchlistmodel.billStatementSearchList[index].selected = event.target.checked;
  }

}
