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

@Component({
  selector: 'app-emploanadd',
  templateUrl: './emploanadd.component.html',
  styleUrls: ['./emploanadd.component.css']
})
export class EmploanaddComponent{
  loggedInUserID: string = '';
  formEmployee!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  year: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch: string = '';
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  empList: Dropdownmodel[] = [];
  selectedEmploanmodelDetails = new Emploanmodel();

  constructor(private route: Router, private formBuilder: FormBuilder,
    private emploanmodel: Emploanmodel, private emploanService: EmploanService,
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
        .find(((aa: { menuName: string; }) => aa.menuName === "Loans & Advances Entry"));
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
    


    setTimeout(() => {
      this.getEmpList();
    }, 2000);

    setTimeout(() => {
      this.selectedEmploanmodelDetails = this.emploanService.getEmpLoanDetails();
      this.formEmployee = this.formBuilder.group({
        empId : new FormControl('', [Validators.required]),         
        loanDate : new FormControl(this.loginDate, [Validators.required]),             
        loanType : new FormControl('', [Validators.required]),          
        loanAmt : new FormControl('', [Validators.required]),        
        repaymentMonths : new FormControl('', [Validators.required]),           
        remarks : new FormControl('',[Validators.required]),       
      });

      if (this.selectedEmploanmodelDetails.loanId != '') {
        this.formEmployee.patchValue(this.selectedEmploanmodelDetails);
        this.formEmployee.patchValue({
          loanDate: this.commonService.formatDate(this.selectedEmploanmodelDetails.loanDate),        
          empId: this.empList.find(e => e.dataId == this.selectedEmploanmodelDetails.empId),
        })

        this.formEmployee.controls['empId'].disable(); 
        this.editMode = true;
      }
    }, 2000);
  }

  
  getEmpList(): void {
    this.empmasterService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }

  get f() { return this.formEmployee.controls; }
  
  selectEvent(item: any) {
    // do something with selected item
    // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
    return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  deleteEmpLoanForm(): void {
    if (this.selectedEmploanmodelDetails.loanId != '') {
      this.requestmodel.strRequest = this.selectedEmploanmodelDetails.loanId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.emploanService.empLoanDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formEmployee.reset();
            this.route.navigate(['/loansentrylist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
  
  exit(): void {
    this.route.navigate(['/loansentrylist']);
  }

  submitEmpLoanForm() {
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
    this.formSubmitted = true;
    this.emploanmodel.loanId          = this.selectedEmploanmodelDetails.loanId.toString();             
    this.emploanmodel.empId           = selectedDataVal.empId.dataId;    
    this.emploanmodel.loanDate        = selectedDataVal.loanDate;           
    this.emploanmodel.loanType        = selectedDataVal.loanType.toUpperCase().toString()   ;          
    this.emploanmodel.loanAmt         = selectedDataVal.loanAmt ;           
    this.emploanmodel.branchCode      = this.branch.toString();           
    this.emploanmodel.repaymentMonths = selectedDataVal.repaymentMonths.toString()   ;           
    this.emploanmodel.yearId          = this.year ;            
    this.emploanmodel.remarks         = selectedDataVal.remarks.toUpperCase().toString()   ; 
    this.emploanmodel.loggedInUser    = this.loggedInUserID;    

    this.emploanService.empLoanSubmitted(this.emploanmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formEmployee.reset();
        this.route.navigate(['/loansentrylist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }


}
  