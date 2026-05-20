import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Emploanmodel } from 'src/app/models/emploanmodel';
import { Emploanlistmodel } from 'src/app/models/emploanlistmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { EmploanService } from 'src/app/services/emploan.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { EmpmasterService } from 'src/app/services/empmaster.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-emploanrepayadd',
  templateUrl: './emploanrepayadd.component.html',
  styleUrls: ['./emploanrepayadd.component.css']
})
export class EmploanrepayaddComponent {
  loggedInUserID: string = '';
  formEmployee!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  year: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch: string = '';
  createdBy: string = "";
  modifiedBy: string = "";

  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  empList: Dropdownmodel[] = [];
  LoanList: Dropdownmodel[] = [];
  loanAmtDetails= new Dropdownmodel();
  selectedEmploanmodelDetails = new Emploanmodel();

  constructor(private route: Router, private formBuilder: FormBuilder,
    private emploanmodel: Emploanmodel, private emploanService: EmploanService,
                                  private sharedService : SharedService,
    private commonService: CommonService,private empmasterService: EmpmasterService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.emploanmodel = new Emploanmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Loans & Advances Repayments"));
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

    //setTimeout(() => {
      this.getEmpList();
    //}, 2000);   

    this.selectedEmploanmodelDetails = this.emploanService.getEmpLoanDetails();
    this.formEmployee = this.formBuilder.group({
      empId : new FormControl('', [Validators.required]),         
      paymentDate : new FormControl(this.loginDate, [Validators.required]),             
      loanId : new FormControl('', [Validators.required]),          
      loanAmt : new FormControl('',),          
      amountCleared : new FormControl('',),        
      balance : new FormControl('',),        
      loanPayAmt : new FormControl('', [Validators.required]),           
      remarks : new FormControl('',[Validators.required]),       
    });
    
    this.formEmployee.controls["loanAmt"].disable(); 
    this.formEmployee.controls["amountCleared"].disable(); 
    this.formEmployee.controls["balance"].disable(); 


    setTimeout(() => {
      if (this.selectedEmploanmodelDetails.loanRepayId != '') {
        this.getLoanList(this.selectedEmploanmodelDetails.empId);
        this.formEmployee.patchValue(this.selectedEmploanmodelDetails);
        var bal = parseFloat(this.selectedEmploanmodelDetails.loanAmt) - parseFloat(this.selectedEmploanmodelDetails.amountCleared)
        this.formEmployee.patchValue({
          paymentDate: this.commonService.formatDate(this.selectedEmploanmodelDetails.loanDate),        
          empId: this.empList.find(e => e.dataId == this.selectedEmploanmodelDetails.empId),
          balance: bal.toString(),
        })       

        this.formEmployee.controls['empId'].disable(); 
        this.formEmployee.controls['loanId'].disable(); 
        this.createdBy = this.selectedEmploanmodelDetails.createdBy + " " + this.selectedEmploanmodelDetails.createdDate;
        this.modifiedBy = this.selectedEmploanmodelDetails.modifiedBy + " " + this.selectedEmploanmodelDetails.modifiedDate;   

        this.editMode = true;
      }
    }, 2000);
  }

  
  getEmpList(): void {
    this.empmasterService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }


  getLoanList(emp:string): void {
    this.requestmodel.strRequest = emp;
    this.emploanService.getLoanList(this.requestmodel).subscribe((res) => {
      this.LoanList = res;
      if(this.LoanList.length==0){        
        if (this.selectedEmploanmodelDetails.loanRepayId == '') {
          this.toasterService.warning("No Pending Loans Repay");
        }
      }
    });  
  }

  get f() { return this.formEmployee.controls; }
  
  selectEvent(item: any) {
    var empid = item.dataId;  
    this.getLoanList(empid);    
  }

  onChangeSearch(search: string) {
     // do something
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
    return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  onLoanChange(e: any){
    var loanId = e.target.value;
    this.requestmodel.strRequest = loanId;
    this.emploanService.getLoanAmountDetails(this.requestmodel).subscribe((res: Dropdownmodel) => {
      this.loanAmtDetails = res;
      var bal=parseFloat(this.loanAmtDetails.dataId) - parseFloat(this.loanAmtDetails.dataName)
      this.formEmployee.patchValue({
        loanAmt : this.loanAmtDetails.dataId,
        amountCleared : this.loanAmtDetails.dataName,
        balance : bal.toString(),
      }) 
    });
  }

  deleteEmpLoanRepayForm(): void {
    if (this.selectedEmploanmodelDetails.loanRepayId != '') {
      this.requestmodel.strRequest = this.selectedEmploanmodelDetails.loanRepayId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.emploanService.empLoanRepayDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formEmployee.reset();
            this.route.navigate(['/loansrepaylist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
  
  exit(): void {
    this.route.navigate(['/loansrepaylist']);
  }

  submitEmpLoanRepayForm() {
    if (this.formEmployee.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formEmployee.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }

    var selectedDataVal = this.formEmployee.getRawValue();
    if(parseFloat(selectedDataVal.loanPayAmt)>0){
      //ignore
    }else{      
      this.toasterService.warning("Plaese Enter Repay Amount");
    }
    this.formSubmitted = true;
    this.emploanmodel.loanRepayId     = this.selectedEmploanmodelDetails.loanRepayId.toString();             
    this.emploanmodel.empId           = selectedDataVal.empId.dataId;    
    this.emploanmodel.loanId          = selectedDataVal.loanId;           
    this.emploanmodel.loanDate        = selectedDataVal.paymentDate ;          
    this.emploanmodel.loanAmt         = selectedDataVal.loanPayAmt ;           
    this.emploanmodel.yearId          = this.year ;            
    this.emploanmodel.remarks         = selectedDataVal.remarks.toUpperCase().toString()   ; 
    this.emploanmodel.loggedInUser    = this.loggedInUserID;    

    this.emploanService.empLoanRepaySubmitted(this.emploanmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formEmployee.reset();
        this.route.navigate(['/loansrepaylist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }


}
    