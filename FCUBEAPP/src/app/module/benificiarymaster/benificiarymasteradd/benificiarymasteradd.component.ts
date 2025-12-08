
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Benificiarymastermodel  } from 'src/app/models/benificiarymastermodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { BenificiaryMasterService } from 'src/app/services/benificiarymaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Constants } from 'src/app/common/constants';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-benificiarymasteradd',
  templateUrl: './benificiarymasteradd.component.html',
  styleUrls: ['./benificiarymasteradd.component.css']
})
export class BenificiarymasteraddComponent {
  loggedInUserID: string = '';
  branch: string = '';
  formBenMaster!: FormGroup;
  apvblk = false;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  minDate:string = '';
  maxDate: string = '';
  loginDate:string = '';
  fromDate: string = '';
  cancelCheqAttach: string = '';
  vendorAttachedfile: string = '';

  responseDetails = new Responsemodel();
  report = new Reportmodel();
  stateList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];
  bankList: Dropdownmodel[] = [];

  @ViewChild('cancelCheqAttachInput', {
    static: true
  }) cancelCheqAttachInput: any;
  @ViewChild('vendorAttachedfileInput', {
    static: true
  }) vendorAttachedfileInput: any;

  selectedBenMaster = new Benificiarymastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder,
    private benificiarymastermodel: Benificiarymastermodel, 
    private benificiaryMasterService: BenificiaryMasterService,
    private commonService: CommonService,
                                        private sharedService : SharedService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.benificiarymastermodel = new Benificiarymastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Beneficiary Master"));
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
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;
    }

    this.getEmpList();  
    this.getStateList();
    this.getBenBankList();

    this.selectedBenMaster = this.benificiaryMasterService.getBenificiaryMasterDetails();

    this.formBenMaster = this.formBuilder.group({
      benType : new FormControl('',[Validators.required]),
      benCode : new FormControl('',[Validators.required,Validators.minLength(2)]),
      benName : new FormControl('',[Validators.required,Validators.minLength(2)]),
      benCoAcName : new FormControl('',[Validators.required]),
      benAdd1 : new FormControl('',[Validators.required,Validators.minLength(2)]),
      benAdd2 : new FormControl('',[Validators.required,Validators.minLength(2)]),
      benAdd3 : new FormControl('',[Validators.required,Validators.minLength(2)]),
      pinCode : new FormControl('',),
      stateCode : new FormControl('',[Validators.required]),
      benPhone : new FormControl('',),
      benMobile : new FormControl('',),
      benEmail : new FormControl('',),
      bankId : new FormControl('',),
      benBankBranch : new FormControl('',),
      benBankAcNo : new FormControl('',),
      benBankIfsc : new FormControl('',),
      amountLimit : new FormControl('',),
      remarks : new FormControl('',),
      cancelCheqAttach : new FormControl('',),
      vendorAttachedfile : new FormControl('',),
      benRefByEmployeeId : new FormControl('',),
      approvedYN : new FormControl('N',),
      approvedRemarks : new FormControl('',),
      blockYN : new FormControl('N',),
      blockReason : new FormControl('',),
      panNo : new FormControl('',),
      globalYN : new FormControl('Y',[Validators.required]),
      bankName: new FormControl('',),
    });

    this.formBenMaster.controls['benCode'].disable();
    this.formBenMaster.controls['approvedYN'].disable(); 
    this.formBenMaster.controls['approvedRemarks'].disable(); 
    this.formBenMaster.controls['blockYN'].disable(); 
    this.formBenMaster.controls['blockReason'].disable(); 

    if (this.selectedBenMaster.masterId  != '') {
      this.cancelCheqAttach = Constants.UploadFolderPath + 'beneificiary/' + this. selectedBenMaster.cancelCheqAttach;
      this.vendorAttachedfile = Constants.UploadFolderPath + 'beneificiary/' + this. selectedBenMaster.vendorAttachedfile;
      
      this.formBenMaster.patchValue(this. selectedBenMaster);
      this.getUserBenApproveBlock();       
      this.formBenMaster.controls['benType'].disable(); 
      this.editMode = true;
    }
  }

  get f() { return this.formBenMaster.controls; }

  
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  getEmpList(): void {
    this.commonService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }
  getBenBankList(): void {
    this.commonService.getBenBankList().subscribe((res) => {
      this.bankList = res;
    });
  }

  benTypeChange(e:any): void {
    this.requestmodel.strRequest = e.target.value;
    this.benificiaryMasterService.getBenCode(this.requestmodel).subscribe((res) => {
      if(res.status){
        this.formBenMaster.patchValue({      
          benCode: res.message
        });
      }
    });
  }
  
  getUserBenApproveBlock(): void {
    this.requestmodel.strRequest = this.loggedInUserID;
    this.apvblk = false;
    this.formBenMaster.controls['approvedYN'].disable(); 
    this.formBenMaster.controls['approvedRemarks'].disable(); 
    this.formBenMaster.controls['blockYN'].disable(); 
    this.formBenMaster.controls['blockReason'].disable(); 

    this.benificiaryMasterService.getUserBenApproveBlock(this.requestmodel).subscribe((res) => {
      if(res.status){
        this.apvblk = true;
        this.formBenMaster.controls['approvedYN'].enable(); 
        this.formBenMaster.controls['approvedRemarks'].enable(); 
        this.formBenMaster.controls['blockYN'].enable(); 
        this.formBenMaster.controls['blockReason'].enable(); 
      }
    });
  }

  verifyBankAc(){
    var selectedData = this.formBenMaster.getRawValue();
    this.report.filterStr = this.selectedBenMaster.masterId;
    this.report.filterStr1 = selectedData.benBankAcNo;
    this.report.filterStr2 = selectedData.benBankIfsc;
    this.report.filterStr3 = this.loggedInUserID;

    if(this.report.filterStr1==""){
      this.toasterService.warning("Please Enter Bank Account No");
      return;
    }
    if(this.report.filterStr2==""){
      this.toasterService.warning("Please Enter Bank IFSC");
      return;
    }
    this.benificiaryMasterService.getBankAccountVerify(this.report).subscribe((res) => {
      if(res.status){
        this.formBenMaster.patchValue({      
          bankName: res.message
        });
        this.apvblk = false;
      }      
    });
  }

  exit(): void {
    this.route.navigate(['/benmasterlist']);
  }

  deleteBenificiaryMasterForm(): void {
    if (this. selectedBenMaster.masterId != '') {
      this.requestmodel.strRequest = this. selectedBenMaster.masterId
      if (confirm("Are you sure, you want to delete this?")) {
        this.benificiaryMasterService.BenificiaryMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formBenMaster.reset();
            this.route.navigate(['/benmasterlist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
      }
    }
  }


  chkDuplicateBenAccountNo(){
    
    var selectedData = this.formBenMaster.getRawValue();
    
  
      this.requestmodel.strRequest = selectedData.benBankAcNo;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.benificiaryMasterService.chkDuplicateBenAccountNo(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formBenMaster.patchValue({
            benBankAcNo: ''
    
          });
          
        }
      });
    }
  

  submitBenificiaryMasterForm() {
if (this.formBenMaster.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formBenMaster.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toasterService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}
    this.formSubmitted = true;
    var selectedDataVal = this.formBenMaster.getRawValue()
    this.benificiarymastermodel.masterId = this.selectedBenMaster.masterId ;
    this.benificiarymastermodel.benType = selectedDataVal.benType;
    this.benificiarymastermodel.benCode = selectedDataVal.benCode;
    this.benificiarymastermodel.benName = selectedDataVal.benName.toString().toUpperCase();
    this.benificiarymastermodel.benCoAcName = selectedDataVal.benCoAcName.toString().toUpperCase();
    this.benificiarymastermodel.benAdd1 = selectedDataVal.benAdd1.toString().toUpperCase();
    this.benificiarymastermodel.benAdd2 = selectedDataVal.benAdd2.toString().toUpperCase();
    this.benificiarymastermodel.benAdd3 = selectedDataVal.benAdd3.toString().toUpperCase();
    this.benificiarymastermodel.pinCode = selectedDataVal.pinCode;
    this.benificiarymastermodel.stateCode = selectedDataVal.stateCode;
    this.benificiarymastermodel.benPhone = selectedDataVal.benPhone;
    this.benificiarymastermodel.benMobile = selectedDataVal.benMobile;
    this.benificiarymastermodel.benEmail = selectedDataVal.benEmail;
    this.benificiarymastermodel.bankId = selectedDataVal.bankId.toString().toUpperCase();
    this.benificiarymastermodel.benBankBranch = selectedDataVal.benBankBranch.toString().toUpperCase();
    this.benificiarymastermodel.benBankAcNo = selectedDataVal.benBankAcNo;
    this.benificiarymastermodel.benBankIfsc = selectedDataVal.benBankIfsc;
    this.benificiarymastermodel.amountLimit = selectedDataVal.amountLimit;
    this.benificiarymastermodel.remarks = selectedDataVal.remarks.toString().toUpperCase();
    this.benificiarymastermodel.cancelCheqAttach = selectedDataVal.cancelCheqAttach;
    this.benificiarymastermodel.vendorAttachedfile = selectedDataVal.vendorAttachedfile;
    this.benificiarymastermodel.benRefByEmployeeId = selectedDataVal.benRefByEmployeeId;
    this.benificiarymastermodel.approvedYN = selectedDataVal.approvedYN;
    this.benificiarymastermodel.approvedDate = selectedDataVal.approvedDate;
    this.benificiarymastermodel.approvedRemarks = selectedDataVal.approvedRemarks.toString().toUpperCase();
    this.benificiarymastermodel.blockYN = selectedDataVal.blockYN;
    this.benificiarymastermodel.blockReason = selectedDataVal.blockReason.toString().toUpperCase();
    this.benificiarymastermodel.panNo = selectedDataVal.panNo.toString().toUpperCase();
    this.benificiarymastermodel.globalYN = selectedDataVal.globalYN;
    this.benificiarymastermodel.branchCode = this.branch;
    this.benificiarymastermodel.loggedInUserID= this.loggedInUserID;

    let formData = new FormData();
    formData.append('cancelCheqAttach', this.cancelCheqAttachInput.nativeElement.files[0]);
    formData.append('vendorAttachedfile', this.vendorAttachedfileInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.benificiarymastermodel));

    this.benificiaryMasterService.benificiarymasterDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formBenMaster.reset();
        this.route.navigate(['/benmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

}

