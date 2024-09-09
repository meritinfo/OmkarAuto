import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Fingroupmodel } from 'src/app/models/fingroupmodel';
import { CommonService } from 'src/app/services/common.service';
import { FingroupService } from 'src/app/services/fingroup.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-fingroupadd',
  templateUrl: './fingroupadd.component.html',
  styleUrls: ['./fingroupadd.component.css']
})
export class FingroupaddComponent {
 
  loggedInUserID: string = '';
  userlogindate:string="";
  formFinGroup!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();

  accountTypeList: Dropdownmodel[] = [];
  subAccountTypeList: Dropdownmodel[] = []; 
  // scheduleList: Dropdownmodel[] = [];

  selectedFinGroupMasterDetails = new Fingroupmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private fingroupmodel: Fingroupmodel,private sharedService:SharedService,
    private finGroupService: FingroupService, private commonService: CommonService,
    private requestmodel:Requestmodel,
    private toasterService: ToastrService) {
    this.fingroupmodel = new Fingroupmodel();
 
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Accounts Group Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }


    var userData = sessionStorage.getItem('uid')?.toString();
    var userlogindate =sessionStorage.getItem('loginDate')?.toString();
    
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    
    this.formFinGroup = this.formBuilder.group({
      groupName: new FormControl('',[Validators.required]),
      accountType: new FormControl('',[Validators.required]),
      subAccountType: new FormControl('',[Validators.required]),
      //schID: new FormControl('',[Validators.required]),
    });  
      
    this.sharedService.loading = true;
    this.selectedFinGroupMasterDetails = this.finGroupService.getFingroupDetails(); 
    
    if (this.selectedFinGroupMasterDetails.accountId != ''){
      this.requestmodel.strRequest=this.selectedFinGroupMasterDetails.accountType;
    }
    this.getaccounttypes();
    this.getsubaccounttypes(this.requestmodel);
    //this.getschedulelist();     
  
    setTimeout(() => {
      if (this.selectedFinGroupMasterDetails.accountId != '') {
          this.formFinGroup.patchValue(this.selectedFinGroupMasterDetails);
          this.editMode=true;
        }
    }, 2000);
    
    this.sharedService.loading = false;
  }
// convenience getter for easy access to contact form fields
  get f() { return this.formFinGroup.controls; }

  chkActName(e: any) {
    if (this.selectedFinGroupMasterDetails.accountId == "")
    {
      this.sharedService.loading = true;
      this.requestmodel.strRequest = e.target.value; 
      this.finGroupService.chkActName(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formFinGroup.patchValue({
            groupName: ''
          });
        }
      });
      this.sharedService.loading = false;
    }
  }

  deleteFinGroupMasterForm(): void {
    if(this.selectedFinGroupMasterDetails.accountId != '' ){      
    this.sharedService.loading = true;
     this.requestmodel.strRequest =this.selectedFinGroupMasterDetails.accountId
      if (confirm("Are you sure, you want to delete this?")) {
            this.finGroupService.FinGroupDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res; 
            if (this.responseDetails.status){              
              console.log(this.responseDetails.message);
              this.formFinGroup.reset();
              this.route.navigate(['/fingrouplist']);
            } 
            else{
              console.log(this.responseDetails.message);  
              this.toasterService.warning(this.responseDetails.message);  
              return; 
            }   
        });
      }
      
    this.sharedService.loading = false;
    }
  }
  exit(): void {
    this.route.navigate(['/fingrouplist']);
  }

  getaccounttypes(): void {
    this.finGroupService.getaccounttypes().subscribe((res) => {
      this.accountTypeList = res;
    });
  }

  getsubaccounttypes(request:Requestmodel): void {
    this.finGroupService.getsubaccounttypes(request).subscribe((res) => {
      this.subAccountTypeList = res;
    });
  }

  // getschedulelist(): void {
  //     this.finGroupService.getschedulelist().subscribe((res) => {
  //     this.scheduleList = res;
  //   });
  // }

  accountTypeChange(e: any) { 
      console.log(e.target.value);
      this.requestmodel.strRequest = e.target.value; 
      this.getsubaccounttypes(this.requestmodel);
  }


//Submit user form details //
  submitFinGroupMasterForm(): void {
    if (this.formFinGroup.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");  
      const controls = this.formFinGroup.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }           
      return;
    }
    
    this.formSubmitted = true;
    this.fingroupmodel.accountId = this.selectedFinGroupMasterDetails.accountId != '' ? this.selectedFinGroupMasterDetails.accountId : '';
    this.fingroupmodel.groupName= this.formFinGroup.value.groupName.toString().toUpperCase();
    this.fingroupmodel.accountType= this.formFinGroup.value.accountType.toString().toUpperCase();
    this.fingroupmodel.subAccountType=this.formFinGroup.value.subAccountType;
    this.fingroupmodel.schID= "";
    this.fingroupmodel.loggedInUserID= this.loggedInUserID;

    this.sharedService.loading = true;
    this.finGroupService.fingroupDetailsSubmitted(this.fingroupmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formFinGroup.reset();
      this.route.navigate(['/fingrouplist']);
    });  
    this.sharedService.loading = false;
  }
}




