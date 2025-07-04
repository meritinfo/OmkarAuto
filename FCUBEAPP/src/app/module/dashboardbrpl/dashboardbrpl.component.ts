import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Docrenewalmodel } from 'src/app/models/docrenewalmodel';

@Component({
  selector: 'app-dashboardbrpl',
  templateUrl: './dashboardbrpl.component.html',
  styleUrls: ['./dashboardbrpl.component.css']
})
export class DashboardbrplComponent  implements OnInit {

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
    });
  }


}
