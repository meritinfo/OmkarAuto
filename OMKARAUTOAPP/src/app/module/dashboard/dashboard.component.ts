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

  }  

  get f() { return this.formUser.controls; }
}
