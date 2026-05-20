
import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';

import { CommonService } from 'src/app/services/common.service';
import { Documentmasterlistmodel } from 'src/app/models/documentmasterlist';
import { Documentmastermodel } from 'src/app/models/documentmastermodel';
import { DocumentMasterService } from 'src/app/services/documentmaster.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';


@Component({
  selector: 'app-documentmasteradd',
  templateUrl: './documentmasteradd.component.html',
  styleUrls: ['./documentmasteradd.component.css']
})
export class DocumentmasteraddComponent {
   loggedInUserID: string = '';
    formUser!: FormGroup;
    formSubmitted = false;
    branch : string = '';
    loginDate: string = '';
    year: string = '';
    maxDate: string = '';
    minDate: string = '';
   
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false; 
  dashboard: string ="";
    responseDetails = new Responsemodel();
    branchList: Dropdownmodel[] = [];
    
    selectedDocumentMasterDetails = new Documentmastermodel();
  
    constructor(private route: Router, private formBuilder: FormBuilder, 
      private documentmastermodel : Documentmastermodel, 
      private documentMasterService: DocumentMasterService, 
      private commonService: CommonService,private requestmodel:Requestmodel,
      private report:Reportmodel,
      private sharedService: SharedService,
      private toasterService: ToastrService) {
      this.documentmastermodel = new Documentmastermodel();

}
ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Settings");
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
    
    
      this.sharedService.loggedInStatus = true;
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
    this.sharedService.loading = true;    
    
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
    
    
    //this.getBranchList();

    this.selectedDocumentMasterDetails = this.documentMasterService.getDocumentMasterDetails();
    this.formUser = this.formBuilder.group({
      docType : new FormControl('', [Validators.required]),
      docDesc : new FormControl('', [Validators.required]),
      autoGenYN : new FormControl('', [Validators.required]),
      genType : new FormControl('', [Validators.required]),
      allotYN : new FormControl('', [Validators.required]),
      seriesYN : new FormControl('', [Validators.required]),
      incSeriesYN : new FormControl('', [Validators.required]),
      prefixLength : new FormControl('', [Validators.required]),
      dprYN : new FormControl('', [Validators.required]),
      autoIncrYN : new FormControl('', [Validators.required]),
      
    });   

 if (this.selectedDocumentMasterDetails.docType!= '') {
      this.formUser.patchValue(this.selectedDocumentMasterDetails); 
      this.formUser.patchValue({
                
      });  
       this.editMode = true;
    }
    
    this.sharedService.loading = false;
  }
  
 
  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; } 


 deleteDocumentMasterForm(): void {
    if(this.selectedDocumentMasterDetails.docType != '' ){      
      this.sharedService.loading = true;
      this.requestmodel.strRequest =this.selectedDocumentMasterDetails.docType
      if (confirm("Are you sure, you want to delete this?")) {
            this.documentMasterService.documentMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/docsetting']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }    
        });
      }      
      this.sharedService.loading = false;
    }
  }

  exit(): void {
    this.route.navigate(['/docsetting']);
  }

  
  //Submit user form details //
  submitDocumentMasterForm(): void {  
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
    var selectedDataVal = this.formUser.getRawValue();
    this.formSubmitted = true;
    this.documentmastermodel.docType = this.selectedDocumentMasterDetails.docType ;
this.documentmastermodel.docDesc = selectedDataVal.docDesc;
this.documentmastermodel.autoGenYN = selectedDataVal.autoGenYN;
this.documentmastermodel.genType = selectedDataVal.genType;
this.documentmastermodel.allotYN = selectedDataVal.allotYN;
this.documentmastermodel.seriesYN = selectedDataVal.seriesYN;
this.documentmastermodel.incSeriesYN = selectedDataVal.incSeriesYN;
this.documentmastermodel.prefixLength = selectedDataVal.prefixLength;
this.documentmastermodel.dprYN = selectedDataVal.dprYN;
this.documentmastermodel.autoIncrYN = selectedDataVal.autoIncrYN;
    this.documentmastermodel.loggedInUser = this.loggedInUserID;
    this.documentMasterService.documentMasterSubmitted(this.documentmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/docsetting']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });    
    this.sharedService.loading=false;
  }
}



