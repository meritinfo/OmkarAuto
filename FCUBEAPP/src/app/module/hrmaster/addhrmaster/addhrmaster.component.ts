import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hrmastermodel } from 'src/app/models/hrmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { HrMasterService } from 'src/app/services/hrmaster.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-addhrmaster',
  templateUrl: './addhrmaster.component.html',
  styleUrls: ['./addhrmaster.component.css']
})
export class AddhrmasterComponent {
  loggedInUserID: string = '';
  formHrMaster!: FormGroup;
  hrList: Dropdownmodel[] = [];
  formSubmitted = false;
  responseDetails = new Responsemodel();
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;


  selectedHrMasterDetails = new Hrmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private hrmastermodel: Hrmastermodel, private hrMasterService: HrMasterService, 
    private toasterService: ToastrService,  private requestmodel: Requestmodel,
    private commonService: CommonService) {
    this.hrmastermodel = new Hrmastermodel();

  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "HR Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
    this.getHrTypeList();
    this.selectedHrMasterDetails = this.hrMasterService.getHrmasterDetails();
    this.formHrMaster = this.formBuilder.group({
      hrCode: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      hrType: new FormControl('', [Validators.required]),
    });

    setTimeout(() => {
      if (this.selectedHrMasterDetails.hrId != '') {
        this.formHrMaster.patchValue(this.selectedHrMasterDetails); 
        this.formHrMaster.controls["hrCode"].disable();
        this.editMode = true;   
      }
    }, 2000);
  }

  chkHrcode(e: any): void {
    if (this.selectedHrMasterDetails.hrId == "")
    {
      this.requestmodel.strRequest = e.target.value; 
      this.hrMasterService.chkHrcode(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formHrMaster.patchValue({
            hrCode: ''
          });
        }
      });
    }
  }

  getHrTypeList(): void {
    this.commonService.getHrTypeList().subscribe((res) => {
      this.hrList = res;
    });
  }

  exit(): void {
    this.route.navigate(['/hrmasterlist']);
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formHrMaster.controls; }

  deleteHrMaster():void {
    if (this.selectedHrMasterDetails.hrId != '') {
      this.requestmodel.strRequest = this.selectedHrMasterDetails.hrId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.hrMasterService.hrMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formHrMaster.reset();
            this.route.navigate(['/hrmasterlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }

//Submit user form details //
  submitHrMasterForm(): void {
    if (this.formHrMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formHrMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    var selectedDataVal = this.formHrMaster.getRawValue();
    this.formSubmitted = true;
    this.hrmastermodel.hrId         = this.selectedHrMasterDetails.hrId;
    this.hrmastermodel.hrCode       = selectedDataVal.hrCode;
    this.hrmastermodel.description  = selectedDataVal.description;
    this.hrmastermodel.hrType       = selectedDataVal.hrType;
    this.hrmastermodel.loggedInUser = selectedDataVal.loggedInUser;


    this.hrMasterService.hrmasterDetailsSubmitted(this.hrmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formHrMaster.reset();
        this.route.navigate(['/hrmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }
}





