import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { EmppaycalculateService } from 'src/app/services/emppaycalculate.service';
import { Empsalarymstlistmodel } from 'src/app/models/empsalarymstlistmodel';
import { Empsalarymstmodel } from 'src/app/models/empsalarymstmodel';
import { Emppaycalcmodel } from 'src/app/models/emppaycalcmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Empleavemodel } from 'src/app/models/empleavemodel';
  

@Component({
  selector: 'app-empsalcalculationadd',
  templateUrl: './empsalcalculationadd.component.html',
  styleUrls: ['./empsalcalculationadd.component.css']
})
export class EmpsalcalculationaddComponent {
  loggedInUserID: string = '';
  branch: string = '';
  year: string = '';
  dt: Date = new Date();
  empList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  selectedEmpSalary = new Emppaycalcmodel();
  empsalarymaster = new Empsalarymstmodel();
  emppaycalcmodel = new Emppaycalcmodel();
  empleave = new Empleavemodel();

  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();

  constructor(private empsalarymstmodel: Empsalarymstmodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private emppaycalculateService: EmppaycalculateService,
    private toasterService: ToastrService) {
    this.empsalarymstmodel = new Empsalarymstmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Salary Calculation");      
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }

    this.getEmpList(this.branch);
    this.getBranchList();
    this.getYearList();

    this.formUser = this.formBuilder.group({
      branchCode: new FormControl('', [Validators.required]),
      empId: new FormControl('', [Validators.required]),
      monthYear: new FormControl('', [Validators.required]),
      daysOfMonth: new FormControl('', [Validators.required]),
      holSun: new FormControl('', [Validators.required]),
      totLeaves: new FormControl('', ),
      totadjLeaves: new FormControl('', ),
      absentDays : new FormControl('',),
      payDays: new FormControl('', [Validators.required]),
      affectYear : new FormControl('', [Validators.required]),
      totalEarnings : new FormControl('', [Validators.required]),
      totalDeductions: new FormControl('', [Validators.required]),
      netPay: new FormControl('', [Validators.required]),

      arrayErnList: this.formBuilder.array([this.createInitialArray()]), 
      arrayDedList: this.formBuilder.array([this.createInitialArray()]) ,
      arrayLeaveList:this.formBuilder.array([this.createLeaveArray()]) ,
      arrayLoanList:this.formBuilder.array([this.createLoanArray()]) ,
    });
    
    this.sharedService.loading=true;

    this.selectedEmpSalary = this.emppaycalculateService.getEmpPayCalDetails();

    if (this.selectedEmpSalary.transId != '') {   
      this.formUser.controls['empId'].disable();
    }

    setTimeout(() => {
      if (this.selectedEmpSalary.transId != '') {    
        this.formUser.patchValue(this.selectedEmpSalary);
        this.formUser.patchValue({
          //mo: this.commonService.formatDate(this.selectedEmpSalary.fromDate),
          empId: this.empList.find(e => e.dataId == this.selectedEmpSalary.empId),
        });
        this.editMode = true;  
        this.getEmpSalaryEarnList();
        this.getEmpSalaryDedList();
      }
    }, 2000);
    this.sharedService.loading=false;
  }

  dateformat(e:any):void{
    this.dt = new Date(e.target.value);
    const formatter = new Intl.DateTimeFormat('fr', { month: 'short' });
    var mnt = formatter.format(this.dt);
    var yr = this.dt.getFullYear();
    this.formUser.patchValue({
      monthYear: mnt + "-" + yr.toString(),
    })     
  }

  getEmpLeavesList(){
    var selectedDataVal=this.formUser.getRawValue();
    this.empleave.empId = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.empleave.yearId =selectedDataVal.affectYear;
    this.emppaycalculateService.getEmpLeaveList(this.empleave).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formLeaveArray.clear();
      for (var i = 0; i < res.empLeavesList.length; i++) {
        this.formLeaveArray.push(this.createLeaveArray());
        this.formLeaveArray.controls[i].get("leaveId")?.setValue(res.empLeavesList[i].leaveId);
        this.formLeaveArray.controls[i].get("leaveCode")?.setValue(res.empLeavesList[i].leaveCode);
        this.formLeaveArray.controls[i].get("leaveName")?.setValue(res.empLeavesList[i].leaveName);
        this.formLeaveArray.controls[i].get("totalLeaves")?.setValue(res.empLeavesList[i].totalLeaves);
        this.formLeaveArray.controls[i].get("leaveId")?.disable();
        this.formLeaveArray.controls[i].get("leaveCode")?.disable();
        this.formLeaveArray.controls[i].get("leaveName")?.disable();   
        this.formLeaveArray.controls[i].get("totalLeaves")?.disable();   
        this.formLeaveArray.controls[i].get("accumLeaves")?.disable();        
      }
    });
  }

  getEmpLoanList(){
    var selectedDataVal=this.formUser.getRawValue();
    this.requestmodel.strRequest = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.emppaycalculateService.getEmpLoanList(this.requestmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formLoanArray.clear();
      for (var i = 0; i < res.empLoanDtlList.length; i++) {
        this.formLoanArray.push(this.createLoanArray());
        this.formLoanArray.controls[i].get("loanId")?.setValue(res.empLoanDtlList[i].loanId);
        this.formLoanArray.controls[i].get("loanNumber")?.setValue(res.empLoanDtlList[i].loanNumber);
        this.formLoanArray.controls[i].get("loanDate")?.setValue(res.empLoanDtlList[i].loanDate);
        this.formLoanArray.controls[i].get("loanAmt")?.setValue(res.empLoanDtlList[i].loanAmt);
        this.formLoanArray.controls[i].get("balAmt")?.setValue(res.empLoanDtlList[i].balAmt);
        this.formLoanArray.controls[i].get("loanId")?.disable();
        this.formLoanArray.controls[i].get("loanNumber")?.disable();
        this.formLoanArray.controls[i].get("loanDate")?.disable();   
        this.formLoanArray.controls[i].get("loanAmt")?.disable();   
        this.formLoanArray.controls[i].get("balAmt")?.disable();        
      }
    });
  }

  getEmpSalaryEarnList() {
    var selectedDataVal=this.formUser.getRawValue();
    this.empsalarymstmodel.empId = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.empsalarymstmodel.fromDate =this.dt.toLocaleDateString('en-CA').toString();
    this.emppaycalculateService.getEmpSalaryEarnList(this.empsalarymstmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formErnArray.clear();
      for (var i = 0; i < res.empSalaryDtlList.length; i++) {
        this.formErnArray.push(this.createInitialArray());
        this.formErnArray.controls[i].get("edName")?.setValue(res.empSalaryDtlList[i].edName);
        this.formErnArray.controls[i].get("edCode")?.setValue(res.empSalaryDtlList[i].edCode);
        this.formErnArray.controls[i].get("actAmt")?.setValue(res.empSalaryDtlList[i].edAmt);
        this.formErnArray.controls[i].get("edName")?.disable();
        this.formErnArray.controls[i].get("edCode")?.disable();
        this.formErnArray.controls[i].get("actAmt")?.disable();        
      }
    });
  }

  getEmpSalaryDedList() {
    var selectedDataVal=this.formUser.getRawValue();
    this.empsalarymstmodel.empId = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.empsalarymstmodel.fromDate = this.dt.toLocaleDateString('en-CA').toString();
    this.emppaycalculateService.getEmpSalaryDedList(this.empsalarymstmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formDedArray.clear();
      for (var i = 0; i < res.empSalaryDtlList.length; i++) {
        this.formDedArray.push(this.createInitialArray());
        this.formDedArray.controls[i].get("edName")?.setValue(res.empSalaryDtlList[i].edName);
        this.formDedArray.controls[i].get("edCode")?.setValue(res.empSalaryDtlList[i].edCode);
        this.formDedArray.controls[i].get("actAmt")?.setValue(res.empSalaryDtlList[i].edAmt);
        this.formDedArray.controls[i].get("edName")?.disable();
        this.formDedArray.controls[i].get("edCode")?.disable();
        this.formDedArray.controls[i].get("actAmt")?.disable();        
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      edName: ['', []],
      edCode: ['', []],
      actAmt: ['', []],
      edAmt: ['', []],
    });
  }

  createLeaveArray() {
    return this.formBuilder.group({
      lName: ['', []],
      lCode: ['', []],
      lBal: ['', []],
      lTot: ['', []],
      lUsed: ['', []],
    });
  }

  createLoanArray() {
    return this.formBuilder.group({
      loanId: ['', []],
      loanNumber: ['', []],
      loanDate: ['', []],
      loanType: ['', []],
      loanAmt: ['', []],
      balAmt: ['', []],
      loanAdjAmt: ['', []],
    });
  }

  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      this.formUser.patchValue({
        affectYear:this.yearList[0].dataId,
      }) 
   });
  }

  searchSalary(){   
    this.getNoOfDays();
    this.getEmpLeavesList();
    this.getEmpLoanList();
    this.getEmpSalaryEarnList();
    this.getEmpSalaryDedList();
  }

  getNoOfDays(){
    var month=0;
    if(this.dt.getMonth()==12){
      month = 1;
    }
    else{
      var month = this.dt.getMonth() + 1;      
    }
    var year = this.dt.getFullYear();
    var days = new Date(year, month, 0).getDate();
    this.formUser.patchValue({
      daysOfMonth:days,
      holSun:'',
      totLeaves:'',
      absentDays:'',
      payDays:days,
    })
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getEmpList(br :string): void {
    this.requestmodel.strRequest = br;
    this.emppaycalculateService.getBranchEmpList(this.requestmodel).subscribe((res: Dropdownmodel[]) => {
      this.empList = res;
    });
  }

  PayCalc(){

  }

  
  get f() { return this.formUser.controls; }

  get formErnArray() {
    return this.formUser.get("arrayErnList") as FormArray;
  }
  get formDedArray() {
    return this.formUser.get("arrayDedList") as FormArray;
  }
  get formLoanArray() {
    return this.formUser.get("arrayLoanList") as FormArray;
  }
  get formLeaveArray() {
    return this.formUser.get("arrayLeaveList") as FormArray;
  }
  
  

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {  
    // do something
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  onChangeBranch(e: any) {
    var br= e.target.value();
    this.getEmpList(br);
  }

  earningSelect(i: number,e: any){
    var selType = e.target.value;
    var selectedDataVal=this.formUser.getRawValue();
    if (selectedDataVal.grossSalary == ""){
      this.toasterService.warning("Please Enter Gross Salary");
      this.formErnArray.controls[i].get("edCode")?.setValue("");
      return;
    }
    var amt = 0;
    if(i == 0){
      if(selType == "1")//Basic
      {
        amt = Math.round(parseInt(selectedDataVal.grossSalary) * 60 / 100)
      }
      else if(selType == "2")//HRA
      {
        amt = Math.round(parseInt(selectedDataVal.grossSalary) * 40 / 100)
      }
    }
    else
    {
      amt = Math.round(parseInt(selectedDataVal.grossSalary)) - 
            Math.round(parseInt(selectedDataVal.arrayErnList[0].edAmt))
    }
    this.formErnArray.controls[i].get("edAmt")?.setValue(amt);

  }

  deductionSelect(i: number,d: any){
    var selType = d.target.value;
    var selectedDataVal=this.formUser.getRawValue();
    var amt = 0;
    if (selectedDataVal.grossSalary == ""){
      this.toasterService.warning("Please Enter Gross Salary");
      this.formDedArray.controls[i].get("edCode")?.setValue("");      
      return;
    }
    if(i == 0){
      if(selType == "3") // PF
      {
        amt = Math.round((parseInt(selectedDataVal.grossSalary) * 60 / 100) * 12 / 100);
      }
      else if(selType == "5" && parseInt(selectedDataVal.grossSalary) <= 21000 )  //ESI  
      {
        amt = Math.round(parseInt(selectedDataVal.grossSalary) * 0.75 / 100);
      }
    }
    
    this.formDedArray.controls[i].get("edAmt")?.setValue(amt);
        
  }

  addErnItem(index: number): void {
    if (this.formErnArray.value[index].edCode != "" && this.formErnArray.value[index].edAmt != "") 
    {
      this.formErnArray.push(this.createInitialArray());  
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }  

  }

  removeErnItem(index: number) {
    this.formErnArray.removeAt(index);
  }

  addDedItem(index: number): void {
    if (this.formDedArray.value[index].edCode != "" && this.formDedArray.value[index].edAmt != "") 
    {
      this.formDedArray.push(this.createInitialArray());  
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }  

  }

  removeDedItem(index: number) {
    this.formDedArray.removeAt(index);
  }



  deleteEmpPayCalcForm(): void {
    if (this.selectedEmpSalary.transId != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedEmpSalary.transId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.emppaycalculateService.empSalaryDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/salcalclist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
      this.sharedService.loading=false;
    }
  }

  exit(): void {
    this.route.navigate(['/salcalclist']);
  }

  //Submit form details //
  submitEmpPayCalcForm(): void {
    this.formSubmitted = true;
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
    var selectedDataVal=this.formUser.getRawValue();

    this.empsalarymstmodel.masterId     = this.selectedEmpSalary.transId ;
    this.empsalarymstmodel.empId        = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.empsalarymstmodel.fromDate     = selectedDataVal.fromDate;
    this.empsalarymstmodel.grossSalary  = selectedDataVal.grossSalary.toString(),
    this.empsalarymstmodel.loggedInUser = this.loggedInUserID,

    this.empsalarymstmodel.empSalaryDtlList = [];

    for (var i = 0; i < selectedDataVal.arrayErnList.length; i++) {
      if(selectedDataVal.arrayErnList[i].edCode != "" && selectedDataVal.arrayErnList[i].edAmt != ""){
        this.empsalarymstmodel.empSalaryDtlList.push({
          'masterId': '',
          'empId': '',
          'fromDate': '',
          'edType': 'E',
          'edCode': selectedDataVal.arrayErnList[i].edCode.toString(),
          'edAmt': selectedDataVal.arrayErnList[i].edAmt.toString(),
          'edName': ""
        });
      }
    }

    for (var i = 0; i < selectedDataVal.arrayDedList.length; i++) {
      if(selectedDataVal.arrayDedList[i].edCode != "" && selectedDataVal.arrayDedList[i].edAmt != ""){
        this.empsalarymstmodel.empSalaryDtlList.push({
          'masterId': '',
          'empId': '',
          'fromDate': '',
          'edType': 'D',
          'edCode': selectedDataVal.arrayDedList[i].edCode.toString(),
          'edAmt': selectedDataVal.arrayDedList[i].edAmt.toString(),
          'edName': ""
        });
      }
    }
   
    //Duplicate Salary Earning/Deduction check
    const foundDuplicateName = this.empsalarymstmodel.empSalaryDtlList.find((data, index) => {
      return this.empsalarymstmodel.empSalaryDtlList.find((x, ind) => x.edCode === data.edCode && index !== ind);
    });
    if (foundDuplicateName) {
      this.toasterService.warning(" Duplicate Salary Earning/Deduction ");
      this.sharedService.loading=false;
      return;
    }
    if(selectedDataVal.arrayDedList.length == 0){
      this.toasterService.warning(" Select Salary Earning/Deduction ");
      this.sharedService.loading=false;
      return;
    }

    this.emppaycalculateService.empPayCalSubmitted(this.emppaycalcmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/salcalclist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    
    this.sharedService.loading=false;
  }

}
    