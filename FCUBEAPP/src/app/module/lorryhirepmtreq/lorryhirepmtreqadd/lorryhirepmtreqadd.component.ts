import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Lorryhirereqmodel } from 'src/app/models/lorryhirereqmodel';
import { LorryhirereqService } from 'src/app/services/lorryhirereq.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-lorryhirepmtreqadd',
  templateUrl: './lorryhirepmtreqadd.component.html',
  styleUrls: ['./lorryhirepmtreqadd.component.css']
})

export class LorryhirepmtreqaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  editMode = false;

  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  challanId: string = "";
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  attachPath: string = "";
  
  @ViewChild('attachPathInput', {
    static: true
  }) attachPathInput: any;

  selectedLorryhirereqDetails = new Lorryhirereqmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private lorryhirereqmodel: Lorryhirereqmodel,private requestmodel:Requestmodel, 
    private toasterService: ToastrService,private lorryhirereqService: LorryhirereqService, 
    private commonService: CommonService) {
    this.lorryhirereqmodel = new Lorryhirereqmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Lorry Hire Extra Payment Request");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;



    this.getBranchList();
    this.getYearList(); 

    this.selectedLorryhirereqDetails = this.lorryhirereqService.getLorryhireReqDetails();

    this.formUser = this.formBuilder.group({
      reqBranch: new FormControl('',[Validators.required]),
      reqDate: new FormControl('',[Validators.required]),
      chYear: new FormControl('',[Validators.required]),
      challanBranch: new FormControl('',[Validators.required]),
      challanNo: new FormControl('',[Validators.required]),    
      extraHamali: new FormControl('',),
      extraDeten: new FormControl('',),
      extraOthers: new FormControl('',),
      extraOthers2: new FormControl('',),
      extraOthers3: new FormControl('',),
      remarks: new FormControl('',[Validators.required]),
    });

    setTimeout(() => {
      if (this.selectedLorryhirereqDetails.id != '') {
        this.attachPath = Constants.UploadFolderPath + 'lorryHirePmtReq/attachPath/' + this.selectedLorryhirereqDetails.attachPath;
        this.formUser.patchValue(this.selectedLorryhirereqDetails);
        this.formUser.patchValue({
          reqDate:this.commonService.formatDate(this.selectedLorryhirereqDetails.reqDate),
        })   
        this.challanId = this.selectedLorryhirereqDetails.challanId; 
        this.editMode = true;  
      }
    }, 2000);    
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  }    

  getChallanDetails(){
    var selectedData = this.formUser.getRawValue();   
    this.requestmodel.strRequest = selectedData.chYear;
    this.requestmodel.strRequest1 = selectedData.challanNo;
    this.formUser.patchValue({
      challanNo: '' ,       
    });
    this.challanId = '';

    this.lorryhirereqService.getChallanDetails(this.requestmodel).subscribe((res: Lorryhirereqmodel) => {
      this.lorryhirereqmodel = res;
      this.formUser.patchValue({
        challanNo: this.lorryhirereqmodel.challanNo , 
      }); 
      this.challanId = this.lorryhirereqmodel.challanId;  
    }); 
    setTimeout(() => {
      if(this.challanId = ''){
        this.toasterService.warning("Please Enter valid Challan ");
        return;
      }
    }, 2000);     
  }

  exit(): void {
    this.route.navigate(['/lhextrapmtreqlist']);
  }

  deleteextrapmtreq(): void {
    if(this.selectedLorryhirereqDetails.id != '' ){
      this.requestmodel.strRequest =this.selectedLorryhirereqDetails.id
      if (confirm("Are you sure, you want to delete this?")) {
            this.lorryhirereqService.lorryhireReqDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/lhextrapmtreqlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

 
  submitextrapmtreqForm(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedData = this.formUser.getRawValue();
    var extra = 0;

    if(selectedData.extraHamali != ""){
      extra = extra + parseFloat(selectedData.extraHamali);
    }
    if(selectedData.extraDeten != ""){
      extra = extra + parseFloat(selectedData.extraDeten);
    }
    if(selectedData.extraOthers != ""){
      extra = extra + parseFloat(selectedData.extraOthers);
    }
    if(selectedData.extraOthers2 != ""){
      extra = extra + parseFloat(selectedData.extraOthers2);
    }
    if(selectedData.extraOthers3 != ""){
      extra = extra + parseFloat(selectedData.extraOthers3);
    }

    if(extra > 0){
      //ignore
    }
    else{
      this.toasterService.warning("Please Enter Extra Amount");  
      return; 
    }

    this.formSubmitted = true;

    this.lorryhirereqmodel.id = this.selectedLorryhirereqDetails.id ;
    this.lorryhirereqmodel.reqBranch = selectedData.reqBranch;
    this.lorryhirereqmodel.reqDate = selectedData.reqDate;
    this.lorryhirereqmodel.reqBy = this.loggedInUserID;
    this.lorryhirereqmodel.chYear = selectedData.chYear;
    this.lorryhirereqmodel.challanBranch = selectedData.challanBranch;
    this.lorryhirereqmodel.challanNo = selectedData.challanNo;
    this.lorryhirereqmodel.challanId = this.challanId;
    this.lorryhirereqmodel.extraHamali = selectedData.extraHamali;
    this.lorryhirereqmodel.extraDeten = selectedData.extraDeten;
    this.lorryhirereqmodel.extraOthers = selectedData.extraOthers;
    this.lorryhirereqmodel.extraOthers2 = selectedData.extraOthers2;
    this.lorryhirereqmodel.extraOthers3 = selectedData.extraOthers3;
    this.lorryhirereqmodel.remarks = selectedData.remarks.toString().toUpperCase();
    this.lorryhirereqmodel.reqModifiedBy = this.loggedInUserID;

    let formData = new FormData();
    formData.append('attachPath', this.attachPathInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.lorryhirereqmodel));

    this.lorryhirereqService.lorryhireReqSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/lhextrapmtreqlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
  }
}




