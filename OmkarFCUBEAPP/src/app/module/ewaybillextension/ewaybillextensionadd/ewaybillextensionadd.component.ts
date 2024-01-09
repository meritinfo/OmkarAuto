import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ewaybillextmodel  } from 'src/app/models/ewaybillextmodel';
import { Ewaybillextlistmodel } from 'src/app/models/ewaybillextlistmodel';
import { EwaybillextService } from 'src/app/services/ewaybillext.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ewaybillextensionadd',
  templateUrl: './ewaybillextensionadd.component.html',
  styleUrls: ['./ewaybillextensionadd.component.css']
})
export class EwaybillextensionaddComponent {  
    loggedInUserID: string = '';
    formUser!: FormGroup;
    userSubmitted = false;
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;
    responseDetails = new Responsemodel();
    stateList: Dropdownmodel[] = [];  
  
    selectedEwaybillextDetails = new Ewaybillextmodel();
  
    constructor(private route: Router, private formBuilder: FormBuilder, 
      private ewaybillextmodel: Ewaybillextmodel, 
      private toasterService: ToastrService,private requestmodel:Requestmodel,
      private ewaybillextService: EwaybillextService, private sharedService: SharedService,
      private commonService: CommonService) {
      this.ewaybillextmodel = new Ewaybillextmodel();
    }
  
    ngOnInit(): void {
      
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Ewaybill Extention");
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
      
      this.sharedService.loading=true;
      this.getdebitAc();
  
      this.selectedEwaybillextDetails = this.ewaybillextService.getEwaybillextDetails();
      this.formUser = this.formBuilder.group({
        bookedAt: new FormControl('',),
        bookingDate: new FormControl('',),
        gcNoteNo: new FormControl('',),
        ewayBillNo:new FormControl('',),
        ewayBillDate:new FormControl('',),
        ewayBillExpDate: new FormControl('',),
        vehicleNo:  new FormControl('',),
        fromLocation:  new FormControl('',),
        fromPin :  new FormControl('',),
        destination:  new FormControl('',),
        partyName:  new FormControl('',),
        consignor:  new FormControl('',),
        consignee: new FormControl('',),
        accountCity:  new FormControl('',),
        cnorState: new FormControl('',),
        accountAddress1: new FormControl('',),
        accountAddress2:  new FormControl('',),
        accountAddress3:  new FormControl('',),
        reason: new FormControl('Others',[Validators.required]),
        remarks: new FormControl('',[Validators.required]),
        state: new FormControl('',[Validators.required]),
        kMS: new FormControl('100',[Validators.required]),
        mode: new FormControl('1',[Validators.required]), 
        consignmentStatus: new FormControl('M',[Validators.required]), 
      });
      
      setTimeout(() => {
        if (this.selectedEwaybillextDetails.ewayBillNo != '') {
          this.formUser.patchValue(this.selectedEwaybillextDetails);    
          this.formUser.patchValue({
            bookingDate: this.commonService.formatDate(this.selectedEwaybillextDetails.bookingDate),
            ewayBillDate: this.commonService.formatDate(this.selectedEwaybillextDetails.ewayBillDate),
            ewayBillExpDate: this.commonService.formatDate(this.selectedEwaybillextDetails.ewayBillExpDate),
          })  
          
          this.formUser.controls['ewayBillNo'].disable();          
          this.formUser.controls['ewayBillNo'].disable();
          this.formUser.controls['bookedAt'].disable();
          this.formUser.controls['bookingDate'].disable();
          this.formUser.controls['gcNoteNo'].disable();
          this.formUser.controls['ewayBillNo'].disable();
          this.formUser.controls['ewayBillDate'].disable();
          this.formUser.controls['ewayBillExpDate'].disable();
          this.formUser.controls['vehicleNo'].disable();
          this.formUser.controls['fromLocation'].disable();
          this.formUser.controls['fromPin'].disable();
          this.formUser.controls['destination'].disable();
          this.formUser.controls['partyName'].disable();
          this.formUser.controls['consignor'].disable();
          this.formUser.controls['consignee'].disable();
          this.formUser.controls['accountCity'].disable();
          this.formUser.controls['cnorState'].disable();
          this.formUser.controls['accountAddress1'].disable();
          this.formUser.controls['accountAddress2'].disable();
          this.formUser.controls['accountAddress3'].disable();

          this.editMode = true;
        }          
      }, 2000);
      this.sharedService.loading=false;
    }
    // convenience getter for easy access to contact form fields
    get f() { return this.formUser.controls; }
  
    getdebitAc(): void {
      this.commonService.getStateList().subscribe((res) => {
        this.stateList = res;
      });
    }
   
    exit(): void {
      this.route.navigate(['/ewaybillext']);
    }
  
    caluculatekms(e:any){
      var selPin= e.target.value;
      //code 
    }

    //Submit user form details //
    submitDocRenewalMasterForm(): void {
      this.userSubmitted = true;
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
      this.sharedService.loading=true;
      var selectedDataVal =this.formUser.getRawValue();
      this.ewaybillextmodel.ewayBillNo = selectedDataVal.ewayBillNo ;
      this.ewaybillextmodel.ewayBillDate = selectedDataVal.ewayBillDate ;
      this.ewaybillextmodel.ewayBillExpDate = selectedDataVal.ewayBillExpDate;
      this.ewaybillextmodel.gcNoteNo= selectedDataVal.gcNoteNo;
      this.ewaybillextmodel.bookingDate= selectedDataVal.bookingDate;
      this.ewaybillextmodel.vehicleNo = selectedDataVal.vehicleNo;
      this.ewaybillextmodel.accountCity = selectedDataVal.accountCity?selectedDataVal.accountCity:"";
      this.ewaybillextmodel.accountAddress1 = selectedDataVal.accountAddress1?selectedDataVal.accountAddress1:"";
      this.ewaybillextmodel.accountAddress2 = selectedDataVal.accountAddress2?selectedDataVal.accountAddress2:"";
      this.ewaybillextmodel.accountAddress3 = selectedDataVal.accountAddress3?selectedDataVal.accountAddress3:"";
      this.ewaybillextmodel.fromPin = selectedDataVal.fromPin;
      this.ewaybillextmodel.kMS = selectedDataVal.kMS;
      this.ewaybillextmodel.mode = selectedDataVal.mode;
      this.ewaybillextmodel.reason = selectedDataVal.reason;
      this.ewaybillextmodel.state = selectedDataVal.state;      
      this.ewaybillextmodel.consignmentStatus = selectedDataVal.consignmentStatus;
      this.ewaybillextmodel.loggedInUser = this.loggedInUserID;  
  
      this.ewaybillextService.ewaybillextDetailsSubmitted(this.ewaybillextmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        console.log(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/ewaybillext']);
      });
      this.sharedService.loading=false;
    }
  }
  
  
  
  