import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { BrsEntrylistmodel  } from 'src/app/models/brsentrylistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Brsentrymodel } from 'src/app/models/brsentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { OpbrsentryService } from 'src/app/services/opbrsentry.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Cardmodel } from 'src/app/models/cardmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-addbrsentry',
  templateUrl: './addbrsentry.component.html',
  styleUrls: ['./addbrsentry.component.css']
})

export class AddbrsentryComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  cardDetails = new Cardmodel();
  ledgerAcList: Dropdownmodel[] = [];
  debitAcList: Dropdownmodel[] = [];
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  year: string = '';
  selectedBrsEntryDetails = new Brsentrymodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private brsEntryModel: Brsentrymodel, private OpbrsentryService: OpbrsentryService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel,private sharedService: SharedService) {
    this.brsEntryModel = new Brsentrymodel();
  }
  ngOnInit(): void {
    this.sharedService.loading = false;
    this.editMode = false;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Opening Bank Reco Entry"));
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
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }

    this.getBankAcList();
    this.getBankDebitAcList();
    this.selectedBrsEntryDetails = this.OpbrsentryService.getOpBrsEntryDetails();
    this.formUser = this.formBuilder.group({
      transDate: new FormControl('',[Validators.required]),
      bankAc: new FormControl('',[Validators.required]),
      docNo: new FormControl('',),
      debitRs: new FormControl('',),
      creditRs: new FormControl('',),
      chequeNo: new FormControl('',[Validators.required]),
      chequeDate: new FormControl('',[Validators.required]),
      narration: new FormControl('',[Validators.required]),
      clearDate: new FormControl('',),
      amountRs: new FormControl('',[Validators.required]),
      typesign: new FormControl('',[Validators.required]),
      otherAc: new FormControl('',[Validators.required]),
    });

    setTimeout(() => {
      if (this.selectedBrsEntryDetails.transId != '') {
        this.formUser.patchValue(this.selectedBrsEntryDetails);
        this.formUser.patchValue({      
          transDate: this.commonService.formatDate(this.selectedBrsEntryDetails.transDate),
          chequeDate: this.commonService.formatDate(this.selectedBrsEntryDetails.chequeDate),
          typeSign: this.selectedBrsEntryDetails.typesign
        })     
        this.editMode = true;
        this.sharedService.loading = false;
      }
    }, 2000);
  }

  get f() { return this.formUser.controls; }

  opBrsEntryDelete(): void {
    if(this.selectedBrsEntryDetails.transId!= '' ){
      this.requestmodel.strRequest =this.selectedBrsEntryDetails.transId
      if (confirm("Are you sure, you want to delete this?")) {
        this.OpbrsentryService.opBrsEntryDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toastrService.success(this.responseDetails.message); 
            this.formUser.reset();
            this.route.navigate(['/opbankrecoentry']);
          }
          else{
            this.toastrService.warning(this.responseDetails.message);        
          }    
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/opbankrecoentry']);
  }

  getBankAcList(): void {
    this.commonService.getBankAcList().subscribe((res) => {
      this.ledgerAcList = res;
    });
  }

  getBankDebitAcList(): void {
    this.commonService.getBankDebitAcList().subscribe((res) => {
      this.debitAcList = res;
    });
  }

  submitBrsEntryForm(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }    
      return;
    }
    this.brsEntryModel.transId = this.selectedBrsEntryDetails.transId;
    var selectedDataValue = this.formUser.getRawValue();
    this.brsEntryModel.transDate= selectedDataValue.transDate;
    this.brsEntryModel.bankAc = selectedDataValue.bankAc;
    this.brsEntryModel.debitRs = "0";
    this.brsEntryModel.creditRs = "0";
    this.brsEntryModel.chequeNo = selectedDataValue.chequeNo;
    this.brsEntryModel.chequeDate = selectedDataValue.chequeDate;
    this.brsEntryModel.clearDate = "";
    this.brsEntryModel.yearId = this.year;
    this.brsEntryModel.narration = selectedDataValue.narration;
    this.brsEntryModel.amountRs = selectedDataValue.amountRs;
    this.brsEntryModel.typesign = selectedDataValue.typesign;
    this.brsEntryModel.otherAc = selectedDataValue.otherAc;
    this.brsEntryModel.loggedInUser = this.loggedInUserID;

    this.OpbrsentryService.opBrsEntryDetailsSubmitted(this.brsEntryModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toastrService.success("Saved Successfully"); 
        this.formUser.reset();
        this.route.navigate(['/opbankrecoentry']);
      }
      else{
        this.toastrService.warning(this.responseDetails.message);        
      }       
    });
  }
}





