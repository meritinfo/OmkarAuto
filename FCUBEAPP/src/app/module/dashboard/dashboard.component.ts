import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Docrenewalmodel } from 'src/app/models/docrenewalmodel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  docrenewalList: Docrenewalmodel[] = [];

  selectedUserID: string = '';
  formUser!: FormGroup;
  constructor(private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.selectedUserID = userData;
    }
    if (this.selectedUserID) {
      console.log(this.selectedUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }


    this.getDocRenewalDetails();

    this.formUser = this.formBuilder.group({
      arrayList: this.formBuilder.array([this.createInitialArray()]),
    });
  }  

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }

  get f() { return this.formUser.controls; }


  createInitialArray() {
    return this.formBuilder.group({
      vehicleNo: [''],
      docDescription: [''],
      validToDt: [''],
      netAmount: [''],
      daysRemaining: [''],
    });
  }

  getDocRenewalDetails(): void {
    this.commonService.getDocRenewalDetails().subscribe((res) => {
      this.docrenewalList = res;
      for (var i = 0; i < res.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("vehicleNo")?.setValue(this.docrenewalList[i].vehicleNo);
        this.formArray.controls[i].get("docDescription")?.setValue(this.docrenewalList[i].docDescription);
        this.formArray.controls[i].get("validToDt")?.setValue(this.docrenewalList[i].validToDt);
        this.formArray.controls[i].get("netAmount")?.setValue(this.docrenewalList[i].netAmount);
        this.formArray.controls[i].get("daysRemaining")?.setValue(this.docrenewalList[i].daysRemaining);

        this.formArray.controls[i].get("vehicleNo")?.disable();
        this.formArray.controls[i].get("docDescription")?.disable();
        this.formArray.controls[i].get("validToDt")?.disable();
        this.formArray.controls[i].get("netAmount")?.disable();
        this.formArray.controls[i].get("daysRemaining")?.disable();
      }
    });
  }


}
