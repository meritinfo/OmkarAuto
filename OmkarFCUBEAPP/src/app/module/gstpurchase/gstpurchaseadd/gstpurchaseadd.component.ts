import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Gstaccountdetailsmodel } from 'src/app/models/gstaccountdetailsmodel';

@Component({
  selector: 'app-gstpurchaseadd',
  templateUrl: './gstpurchaseadd.component.html',
  styleUrls: ['./gstpurchaseadd.component.css']
})
export class GstpurchaseaddComponent {
  formGSTPurchase!: FormGroup;
  gstaccountList: Array<Gstaccountdetailsmodel> = [];
  gstaccountdetails = new Gstaccountdetailsmodel();
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.createInitialArray();
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formGSTPurchase.controls; }
  get gstAccountDetailsArray(): FormArray {
    return this.formGSTPurchase.get('gstAccountDetailsArray') as FormArray;
  }

  createInitialArray() {
    this.formGSTPurchase = this.formBuilder.group({
      accountId: [''],
      accountName: [''],
      narration: [''],
      subLedger: [''],
      hSN: [''],
      amount: [''],
      sGSTPercentage: [''],
      sGSTAmount: ['']
    });
  }

  addItem(): void {
    this.gstaccountdetails = new Gstaccountdetailsmodel();
    this.gstaccountdetails.accountName = this.formGSTPurchase.value.accountName;
    this.gstaccountdetails.narration = this.formGSTPurchase.value.narration;
    this.gstaccountdetails.subLedger = this.formGSTPurchase.value.subLedger;
    this.gstaccountdetails.hSN = this.formGSTPurchase.value.hSN;
    this.gstaccountdetails.amount = this.formGSTPurchase.value.amount;
    this.gstaccountdetails.sGSTPercentage = this.formGSTPurchase.value.sGSTPercentage;
    this.gstaccountdetails.sGSTAmount = this.formGSTPurchase.value.sGSTAmount;

    this.gstaccountList.push(this.gstaccountdetails);
    this.createInitialArray();
  }

  removeItem(index: any) {
    this.gstaccountList.splice(index, 1);
  }
}
