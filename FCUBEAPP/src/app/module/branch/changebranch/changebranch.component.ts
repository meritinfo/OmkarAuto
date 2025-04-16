import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/models/responsemodel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-changebranch',
  templateUrl: './changebranch.component.html',
  styleUrls: ['./changebranch.component.css']
})
export class ChangebranchComponent {
  loggedInUserID: string = '';
  dashboard:string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  branchList: Dropdownmodel[] = [];
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private commonService: CommonService, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Change Branch");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
    } 
        
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
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
    this.getDropdownList();
    this.formUser = this.formBuilder.group({
      userBranch: new FormControl('', Validators.required),
    });
    
  }

  get f() { return this.formUser.controls; }

  getDropdownList() {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  exit(): void {
    this.route.navigate([this.dashboard]);
  }
  
  submitUserBranch(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
     return;
    }
    sessionStorage.setItem("userBranch", this.formUser.value.userBranch.dataId);
    sessionStorage.setItem("branchname", this.formUser.value.userBranch.dataName);  
    this.toastrService.success("Branch Changed Successfully");
    this.route.navigate([this.dashboard]);
  }  
}

