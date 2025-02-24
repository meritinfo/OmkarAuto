import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Documentallotmentmodel } from 'src/app/models/documentallotmentmodel';
import { CommonService } from 'src/app/services/common.service';
import { DocumentallotmentService } from 'src/app/services/documentallotment.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Schedulemodel } from 'src/app/models/schedulemodel';



@Component({
  selector: 'app-adddocumentallottment',
  templateUrl: './adddocumentallottment.component.html',
  styleUrls: ['./adddocumentallottment.component.css']
})
export class AdddocumentallottmentComponent {
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
  responseDetails = new Responsemodel();
  docReqDetails = new Schedulemodel();
  branchList: Dropdownmodel[] = [];
  
  selectedDocumentallotmentDetails = new Documentallotmentmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private documentallotmentmodel : Documentallotmentmodel, 
    private documentallotmentService: DocumentallotmentService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.documentallotmentmodel = new Documentallotmentmodel();
    
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Allotment");
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
    
    
    this.getBranchList();

    this.selectedDocumentallotmentDetails = this.documentallotmentService.getDocumentallotmentDetails();
    this.formUser = this.formBuilder.group({
      branchCode  : new FormControl(this.branch,[Validators.required]),
      docType  : new FormControl('CN',[Validators.required]),
      docNumCode  : new FormControl('',[Validators.required]),
      allotDate  : new FormControl( this.loginDate,[Validators.required]),
      rangeFrom  : new FormControl('',[Validators.required]),
      rangeTo  : new FormControl('',[Validators.required]),
      docCount  : new FormControl('',[Validators.required]),
      docStatus  : new FormControl('O',[Validators.required]),
      docCloseDate  : new FormControl('',),
      autoGenYN  : new FormControl('Y',[Validators.required]),
      remarks  : new FormControl('SELF',),
    });   

    this.formUser.controls['docCount'].disable();   
    this.formUser.controls['docNumCode'].disable(); 
    this.formUser.controls["docCloseDate"].disable();  

    if (this.selectedDocumentallotmentDetails.docAllotId!= '') {
      this.formUser.patchValue(this.selectedDocumentallotmentDetails); 
      this.formUser.patchValue({
        allotDate:this.commonService.formatDate(this.selectedDocumentallotmentDetails.allotDate),   
        docCloseDate:this.commonService.formatDate(this.selectedDocumentallotmentDetails.docCloseDate),         
      });  
      if(this.selectedDocumentallotmentDetails.docStatus=="C"){
        this.formUser.controls["docCloseDate"].enable();
      }
      this.formUser.controls['branchCode'].disable();    
      this.formUser.controls['docType'].disable();    
      this.editMode = true;
    }
    else{
      this.getDocNumCode();
    }
    
    this.sharedService.loading = false;
  }
 
  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; } 

   //Get Branch List details //
   getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  checkDocumentRange() { 
    if (this.selectedDocumentallotmentDetails.docAllotId == "")
    {      
      var selectedDataVal = this.formUser.getRawValue();
      this.docReqDetails.warningTimeStart = selectedDataVal.docType;
      this.docReqDetails.publishStart = selectedDataVal.rangeFrom;
      this.docReqDetails.publishEnd = selectedDataVal.rangeTo;
      var docCount = 0;
      var doccode = selectedDataVal.docNumCode.toString();
      var rangeFrom = selectedDataVal.rangeFrom ? selectedDataVal.rangeFrom.toString().substring(0, doccode.length) :"";
      var rangeTo = selectedDataVal.rangeTo ? selectedDataVal.rangeTo.toString().substring(0, doccode.length) :"";

      if(selectedDataVal.rangeFrom!="" && doccode != rangeFrom){
        this.toasterService.warning("Range From sholud Start With DocNumCode");
        this.formUser.patchValue({
          rangeFrom: "",
          docCount:""
        });       
        return;       
      }  
      if(selectedDataVal.rangeTo!="" && doccode != rangeTo){
        this.toasterService.warning("Range To sholud Start With DocNumCode");  
        this.formUser.patchValue({
          rangeTo:"",
          docCount:""
        });     
        return;       
      }  
      if(selectedDataVal.rangeFrom!="" && selectedDataVal.rangeTo!=""){
        docCount = parseInt(selectedDataVal.rangeTo) - parseInt(selectedDataVal.rangeFrom);
        if(docCount > 1000){
          this.toasterService.warning("Doc Count sholud not be more than 1000");   
          this.formUser.patchValue({
            rangeFrom: "",
            rangeTo:"",
            docCount:""
          });    
          return;
        }            
      } 

      this.documentallotmentService.chkDocumentRange(this.docReqDetails).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formUser.patchValue({            
            docCount: docCount + 1
          });  
        }
        else{
          this.toasterService.warning(this.responseDetails.message);    
          this.formUser.patchValue({
            rangeFrom: "",
            rangeTo:"",
            docCount:""
          });       
        }
      });
    }
  }

  getDocNumCode(): void {
    var selectedDataVal = this.formUser.getRawValue();
    this.requestmodel.strRequest = selectedDataVal.branchCode;
    this.documentallotmentService.getDocumentNumcode(this.requestmodel).subscribe((res) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formUser.patchValue({
          docNumCode: this.responseDetails.message,
        });  
      }
    });
  }

  onStatusChange(e:any){
    var status = e.target.value;
    if(status=="O"){
      this.formUser.controls["docCloseDate"].disable();
    }
    else{
      this.formUser.controls["docCloseDate"].enable();
    }
  }
   
  deleteDocumentAllotmentForm(): void {
    if(this.selectedDocumentallotmentDetails.docAllotId != '' ){      
      this.sharedService.loading = true;
      this.requestmodel.strRequest =this.selectedDocumentallotmentDetails.docAllotId
      if (confirm("Are you sure, you want to delete this?")) {
            this.documentallotmentService.documentallotmentDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/docallotlist']);
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
    this.route.navigate(['/docallotlist']);
  }

  
  //Submit user form details //
  submitDocumentallotmentForm(): void {  
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
    this.documentallotmentmodel.docAllotId = this.selectedDocumentallotmentDetails.docAllotId ;
    this.documentallotmentmodel.branchCode= selectedDataVal.branchCode;
    this.documentallotmentmodel.docType = selectedDataVal.docType.toString();
    this.documentallotmentmodel.docNumCode = selectedDataVal.docNumCode.toString();
    this.documentallotmentmodel.allotDate = selectedDataVal.allotDate;
    this.documentallotmentmodel.rangeFrom = selectedDataVal.rangeFrom.toString();
    this.documentallotmentmodel.rangeTo = selectedDataVal.rangeTo.toString();
    this.documentallotmentmodel.docCount = selectedDataVal.docCount.toString();
    this.documentallotmentmodel.docStatus = selectedDataVal.docStatus.toString();
    this.documentallotmentmodel.docCloseDate = selectedDataVal.docCloseDate;
    this.documentallotmentmodel.autoGenYN = selectedDataVal.autoGenYN;
    this.documentallotmentmodel.loggedInUser = this.loggedInUserID;
    this.documentallotmentmodel.remarks = selectedDataVal.remarks.toString().toUpperCase();

    this.documentallotmentService.documentallotmentSubmitted(this.documentallotmentmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/docallotlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });    
    this.sharedService.loading=false;
  }
}



