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
import { Reportmodel } from 'src/app/models/reportmodel';
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
  loginDate: string = '';
  empList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  selectedEmpSalary = new Emppaycalcmodel();
  empsalarymaster = new Empsalarymstmodel();
  emppaycalcmodel = new Emppaycalcmodel();
  empleave = new Empleavemodel();
  reportdetails = new Reportmodel();

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
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
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
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
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

    this.getBranchList();
    this.getEmpList(this.branch);
    this.getYearList();

    this.formUser = this.formBuilder.group({
      branchCode: new FormControl(this.branch, [Validators.required]),
      empId: new FormControl('', [Validators.required]),
      monthYear: new FormControl('', [Validators.required]),
      daysOfMonth: new FormControl('', [Validators.required]),
      holSun: new FormControl('0', [Validators.required]),
      totLeaves: new FormControl('0', ),
      absentDays : new FormControl('0',),
      payDays: new FormControl('0', [Validators.required]),
      affectYear : new FormControl(this.year, [Validators.required]),
      totadjLeaves: new FormControl('0', ),
      totalLoanAdjAmt : new FormControl('0', ),
      totalEarnings : new FormControl('0', [Validators.required]),
      totalDeductions: new FormControl('0', [Validators.required]),
      netPay: new FormControl('0', [Validators.required]),

      arrayErnList: this.formBuilder.array([this.createInitialArray()]), 
      arrayDedList: this.formBuilder.array([this.createInitialArray()]) ,
      arrayLeaveList:this.formBuilder.array([this.createLeaveArray()]) ,
      arrayLoanList:this.formBuilder.array([this.createLoanArray()]) ,
    });
    
    this.sharedService.loading=true;

    this.selectedEmpSalary = this.emppaycalculateService.getEmpPayCalDetails();

    if (this.selectedEmpSalary.transId != '') {   
      this.formUser.controls['empId'].disable();
      this.formUser.controls['monthYear'].disable();      
      this.getEmpList(this.selectedEmpSalary.branchCode);
    }
    this.formUser.controls['daysOfMonth'].disable();
    this.formUser.controls['totadjLeaves'].disable();
    this.formUser.controls['totalLoanAdjAmt'].disable();
    this.formUser.controls['totalEarnings'].disable();
    this.formUser.controls['totalDeductions'].disable();
    this.formUser.controls['netPay'].disable();
    this.formUser.controls['affectYear'].disable();
    this.formUser.controls['payDays'].disable();
    
    
    setTimeout(() => {
      if (this.selectedEmpSalary.transId != '') {    
        this.formUser.patchValue(this.selectedEmpSalary);
        this.formUser.patchValue({
          empId: this.empList.find(e => e.dataId == this.selectedEmpSalary.empId),
          monthYear: this.commonService.formatDate(this.selectedEmpSalary.monthYear),
          totadjLeaves: this.selectedEmpSalary.adjLeaves,
        });
        this.formUser.controls['branchCode'].disable();
        this.editMode = true;  
        this.getEmpPayEarnList();
        this.getEmpPayDedList();
        this.getEmpPayLeaveList();
        this.getEmpPayLoanList();
      }
    }, 2000);
    this.sharedService.loading=false;
  }

  getEmpPayEarnList() {
    this.requestmodel.strRequest = this.selectedEmpSalary.transId;
    this.emppaycalculateService.getEmpPayEarnList(this.requestmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formErnArray.clear();
      for (var i = 0; i < res.empSalaryDtlList.length; i++) {
        this.formErnArray.push(this.createInitialArray());
        this.formErnArray.controls[i].get("edName")?.setValue(res.empSalaryDtlList[i].edName);
        this.formErnArray.controls[i].get("edCode")?.setValue(res.empSalaryDtlList[i].edCode);
        this.formErnArray.controls[i].get("edAmt")?.setValue(res.empSalaryDtlList[i].edAmt);
        this.formErnArray.controls[i].get("actAmt")?.setValue(res.empSalaryDtlList[i].actAmt);
        this.formErnArray.controls[i].get("edName")?.disable();
        this.formErnArray.controls[i].get("edCode")?.disable();
        this.formErnArray.controls[i].get("edAmt")?.disable();  
        this.formErnArray.controls[i].get("actAmt")?.disable();            
      }
    });
  }

  getEmpPayDedList() {
    this.requestmodel.strRequest = this.selectedEmpSalary.transId;
    this.emppaycalculateService.getEmpPayDedList(this.requestmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formDedArray.clear();
      for (var i = 0; i < res.empSalaryDtlList.length; i++) {
        this.formDedArray.push(this.createInitialArray());
        this.formDedArray.controls[i].get("edName")?.setValue(res.empSalaryDtlList[i].edName);
        this.formDedArray.controls[i].get("edCode")?.setValue(res.empSalaryDtlList[i].edCode);
        this.formDedArray.controls[i].get("edAmt")?.setValue(res.empSalaryDtlList[i].edAmt);
        this.formDedArray.controls[i].get("actAmt")?.setValue(res.empSalaryDtlList[i].actAmt);
        this.formDedArray.controls[i].get("edName")?.disable();
        this.formDedArray.controls[i].get("edCode")?.disable();
        this.formDedArray.controls[i].get("edAmt")?.disable();   
        this.formDedArray.controls[i].get("actAmt")?.disable();        
      }
    });
  }

  getEmpPayLeaveList(){
    this.requestmodel.strRequest = this.selectedEmpSalary.transId;
    this.emppaycalculateService.getEmpPayLeaveList(this.requestmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formLeaveArray.clear();
      for (var i = 0; i < res.empLeavesList.length; i++) {
        this.formLeaveArray.push(this.createLeaveArray());
        this.formLeaveArray.controls[i].get("leaveId")?.setValue(res.empLeavesList[i].leaveId);
        this.formLeaveArray.controls[i].get("leaveCode")?.setValue(res.empLeavesList[i].leaveCode);
        this.formLeaveArray.controls[i].get("leaveName")?.setValue(res.empLeavesList[i].leaveName);
        this.formLeaveArray.controls[i].get("totalLeaves")?.setValue(res.empLeavesList[i].totalLeaves);
        this.formLeaveArray.controls[i].get("adjLeaves")?.setValue(res.empLeavesList[i].leavesAdj);        
        this.formLeaveArray.controls[i].get("leaveId")?.disable();
        this.formLeaveArray.controls[i].get("leaveCode")?.disable();
        this.formLeaveArray.controls[i].get("leaveName")?.disable();   
        this.formLeaveArray.controls[i].get("totalLeaves")?.disable();   
        this.formLeaveArray.controls[i].get("accumLeaves")?.disable();   
        this.formLeaveArray.controls[i].get("adjLeaves")?.disable();              
      }
    });
  }

  getEmpPayLoanList(){
    this.requestmodel.strRequest = this.selectedEmpSalary.transId;
    this.emppaycalculateService.getEmpPayLoanList(this.requestmodel).subscribe((res) => {
      this.emppaycalcmodel = res;
      this.formLoanArray.clear();
      for (var i = 0; i < res.empLoanDtlList.length; i++) {
        this.formLoanArray.push(this.createLoanArray());
        this.formLoanArray.controls[i].get("loanId")?.setValue(res.empLoanDtlList[i].loanId);
        this.formLoanArray.controls[i].get("loanNumber")?.setValue(res.empLoanDtlList[i].loanNumber);
        this.formLoanArray.controls[i].get("loanDedId")?.setValue(res.empLoanDtlList[i].loanDedId);
        this.formLoanArray.controls[i].get("dedName")?.setValue(res.empLoanDtlList[i].dedName);
        this.formLoanArray.controls[i].get("loanType")?.setValue(res.empLoanDtlList[i].loanType);
        this.formLoanArray.controls[i].get("loanDate")?.setValue(res.empLoanDtlList[i].loanDate);
        this.formLoanArray.controls[i].get("loanAmt")?.setValue(res.empLoanDtlList[i].loanAmt);
        this.formLoanArray.controls[i].get("balAmt")?.setValue(res.empLoanDtlList[i].balAmt);
        this.formLoanArray.controls[i].get("loanAdjAmt")?.setValue(res.empLoanDtlList[i].loanAdjAmt);
        this.formLoanArray.controls[i].get("loanNumber")?.disable();
        this.formLoanArray.controls[i].get("loanDate")?.disable();   
        this.formLoanArray.controls[i].get("loanAmt")?.disable();   
        this.formLoanArray.controls[i].get("balAmt")?.disable(); 
        this.formLoanArray.controls[i].get("loanAdjAmt")?.disable();    
      }    
    });
  }

 
  getEmpSalaryEarnList() {
    var selectedDataVal=this.formUser.getRawValue();
    this.empsalarymstmodel.empId = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.empsalarymstmodel.fromDate =selectedDataVal.monthYear;
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
    this.empsalarymstmodel.fromDate = selectedDataVal.monthYear;
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
        if(res.empLeavesList[i].leaveCode == "CL" ){          
          this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("1"); 
        }
        else if(res.empLeavesList[i].leaveCode == "EL" ){          
          this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("1.25"); 
        }
        else if(res.empLeavesList[i].leaveCode == "SL" ){          
          this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("1"); 
        }
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
        this.formLoanArray.controls[i].get("loanDedId")?.setValue(res.empLoanDtlList[i].loanDedId);
        this.formLoanArray.controls[i].get("dedName")?.setValue(res.empLoanDtlList[i].dedName);
        this.formLoanArray.controls[i].get("loanType")?.setValue(res.empLoanDtlList[i].loanType);
        this.formLoanArray.controls[i].get("loanDate")?.setValue(res.empLoanDtlList[i].loanDate);
        this.formLoanArray.controls[i].get("loanAmt")?.setValue(res.empLoanDtlList[i].loanAmt);
        this.formLoanArray.controls[i].get("balAmt")?.setValue(res.empLoanDtlList[i].balAmt);
        this.formLoanArray.controls[i].get("loanNumber")?.disable();
        this.formLoanArray.controls[i].get("loanDate")?.disable();   
        this.formLoanArray.controls[i].get("loanAmt")?.disable();   
        this.formLoanArray.controls[i].get("balAmt")?.disable();          
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
      leaveId: ['', []],
      leaveCode: ['', []],
      leaveName: ['', []],
      accumLeaves: ['', []],
      totalLeaves: ['', []],
      adjLeaves: ['', []],
    });
  }

  createLoanArray() {
    return this.formBuilder.group({
      loanId: ['', []],
      loanNumber: ['', []],
      loanDate: ['', []],
      loanType: ['', []],
      loanDedId: ['', []],
      dedName: ['', []],
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

  onchangeLeaves(e:any){
    var totLeave= e.target.value;
    var selectedDataVal = this.formUser.getRawValue();    
    var adjLeaves = selectedDataVal.totadjLeaves;
    if(totLeave==''){
      totLeave='0'
    }
    if(adjLeaves==''){
      adjLeaves='0'
    }
    var dt = selectedDataVal.daysOfMonth;
    var absDays = parseFloat(totLeave)-parseFloat(adjLeaves)
    var payDay = parseFloat(dt)-absDays
    
    this.formUser.patchValue({
      absentDays:absDays,
      payDays:payDay,
    })
    this.calLeaves();
    this.calNetPay()
  }

  calLeaves(){
    var selectedDataVal=this.formUser.getRawValue();    
    var totdays = selectedDataVal.daysOfMonth;
    var absDays = selectedDataVal.absentDays;
    if(totdays==''){
      totdays='0'
    }
    if(absDays==''){
      absDays='0'
    }
    var payday = parseFloat(totdays)-parseFloat(absDays)

    if(payday>=15){
      for (var i = 0; i < selectedDataVal.arrayLeaveList.length; i++) {
        if(selectedDataVal.arrayLeaveList[i].leaveCode == "CL" ){          
            this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("1"); 
        }
        else if(selectedDataVal.arrayLeaveList[i].leaveCode == "EL" ){          
          this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("1.25"); 
        }
        else if(selectedDataVal.arrayLeaveList[i].leaveCode == "SL" ){          
          this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("1"); 
        }
      }
    } 
    else{
      for (var i = 0; i < selectedDataVal.arrayLeaveList.length; i++) {
        this.formLeaveArray.controls[i].get("accumLeaves")?.setValue("0"); 
      }
    }     
  }

  calNetPay(){
    var selectedDataVal=this.formUser.getRawValue();    
    var totdays = selectedDataVal.daysOfMonth;
    var payDay = selectedDataVal.payDays;
    if(totdays==''){
      totdays='0'
    }
    if(payDay==''){
      payDay='0'
    }

    var ern = 0;
    var ded = 0;
    var basic = 0;
    var grossern = 0;
    var grossded = 0;
    var netpay = 0;

    //earning cal
    for (var i = 0; i < selectedDataVal.arrayErnList.length; i++) {
      if(parseFloat(payDay)==parseFloat(totdays)){ 
        ern = parseFloat(selectedDataVal.arrayErnList[i].actAmt);   
      }
      else{
        ern = Math.round(payDay * parseFloat(selectedDataVal.arrayErnList[i].actAmt) / totdays)        
      }
      grossern = grossern + ern;
      this.formErnArray.controls[i].get("edAmt")?.setValue(ern.toString()); 
      if(selectedDataVal.arrayErnList[i].edCode=='1'){
        basic=ern;
      }
    } 

    //deduction cal
    for (var i = 0; i < selectedDataVal.arrayDedList.length; i++) {
      ded = parseFloat(selectedDataVal.arrayDedList[i].actAmt); 
      
      if(selectedDataVal.arrayDedList[i].edCode=='3') {
        ded = Math.round(basic * 12 / 100)       
      }
      else if(selectedDataVal.arrayDedList[i].edCode=='4') //PT
      {        
        if(grossern > 15000 && grossern <= 20000){
          ded = 150; 
        } 
        else if(grossern > 20000){
          ded = 200; 
        } 
        else{
          ded = 0;
        }  
      }
      else if(selectedDataVal.arrayDedList[i].edCode == "5" )  //ESI  
      {
        ded =  Math.ceil(grossern * 0.75 / 100);
      }

      grossded = grossded + ded ;
      this.formDedArray.controls[i].get("edAmt")?.setValue(ded.toString()); 
    } 

    netpay = grossern - grossded;

    this.formUser.patchValue({
      totalEarnings:grossern,
      totalDeductions:grossded,
      netPay:netpay,
    })
  }
    

  calTotAdjLeaves(){
    var selectedDataVal = this.formUser.getRawValue();
    var totAdjLv = 0;
    for (var i = 0; i < selectedDataVal.arrayLeaveList.length; i++) {
      if(selectedDataVal.arrayLeaveList[i].adjLeaves == "" ){          
        totAdjLv = totAdjLv + 0 ; 
      }
      else{          
        totAdjLv = totAdjLv + parseFloat(selectedDataVal.arrayLeaveList[i].adjLeaves); 
      }
    }

    var dt = selectedDataVal.daysOfMonth;
    var totLeave = selectedDataVal.totLeaves;
    var absDays = parseFloat(totLeave)-totAdjLv
    var payDay = parseFloat(dt)-absDays
    
    this.formUser.patchValue({
      absentDays:absDays,
      payDays:payDay,
      totadjLeaves:totAdjLv,
    })
    this.calLeaves();
    this.calNetPay();
  }

  onAdjLeaveChange(i:number,e:any){
    var adjlv = e.target.value;
    var selectedDataVal = this.formUser.getRawValue();
    var totlv = parseFloat(selectedDataVal.arrayLeaveList[i].totalLeaves);
    var acumlv = parseFloat(selectedDataVal.arrayLeaveList[i].accumLeaves);

    if((totlv + acumlv) < parseFloat(adjlv) ){          
      this.toasterService.warning("Adjusted leaves can not be more than Total leaves");
      this.formLeaveArray.controls[i].get("adjLeaves")?.setValue(""); 
      return;
    }
    this.calTotAdjLeaves();
  }

  onLoanadj(i:number,e:any){
    var adjloan = e.target.value;
    var selectedDataVal = this.formUser.getRawValue();
    var totadjloan = 0;
    var index = selectedDataVal.arrayDedList.length ;
    this.formDedArray.push(this.createInitialArray());
    this.formDedArray.controls[index].get("edName")?.setValue(selectedDataVal.arrayLoanList[i].dedName);
    this.formDedArray.controls[index].get("edCode")?.setValue(selectedDataVal.arrayLoanList[i].loanDedId);
    this.formDedArray.controls[index].get("actAmt")?.setValue(adjloan);
    this.formDedArray.controls[index].get("edAmt")?.setValue(adjloan);
    this.formDedArray.controls[index].get("edName")?.disable();
    this.formDedArray.controls[index].get("edCode")?.disable();
    this.formDedArray.controls[index].get("actAmt")?.disable();   
    this.formDedArray.controls[index].get("edAmt")?.disable();
    
    if(selectedDataVal.totalLoanAdjAmt=='' || selectedDataVal.totalLoanAdjAmt=='0') {
        totadjloan =parseFloat(adjloan);
    }
    else {
        totadjloan = parseFloat(selectedDataVal.totalLoanAdjAmt) + parseFloat(adjloan);
    }
    this.formUser.patchValue({
      totalLoanAdjAmt:totadjloan,
    })
  }

  onErnChange(){
    var grossern = 0;
    var grossded = 0;
    var netpay = 0;
    var selectedDataVal = this.formUser.getRawValue();
    for (var i = 0; i < selectedDataVal.arrayErnList.length; i++) {
      grossern = grossern + parseFloat(selectedDataVal.arrayErnList[i].edAmt); 
    } 
     
    grossded = selectedDataVal.totalDeductions ;
    netpay = grossern - grossded;

    this.formUser.patchValue({
      totalEarnings:grossern,
      totalDeductions:grossded,
      netPay:netpay,
    })
  }

  onDedChange(){
    var grossern = 0;
    var grossded = 0;
    var netpay = 0;
    var selectedDataVal = this.formUser.getRawValue();
    for (var i = 0; i < selectedDataVal.arrayDedList.length; i++) {
      grossded = grossded + parseFloat(selectedDataVal.arrayDedList[i].edAmt); 
    } 
     
    grossern = selectedDataVal.totalEarnings ;
    netpay = grossern - grossded;

    this.formUser.patchValue({
      totalEarnings:grossern,
      totalDeductions:grossded,
      netPay:netpay,
    })
  }

  onchangeMonth(e:any){
    var selecteddata = this.formUser.getRawValue();
    if(selecteddata.monthYear!="" && selecteddata.empId?selecteddata.empId.dataId:""!=""){
      this.reportdetails.fromDate = selecteddata.monthYear;
      this.reportdetails.filterStr = selecteddata.empId?selecteddata.empId.dataId:"";
      this.emppaycalculateService.getSelectedEmpDetails(this.reportdetails).subscribe((res: Emppaycalcmodel) => {
        this.selectedEmpSalary = res;
        if (this.selectedEmpSalary.transId != '') {    
          this.formUser.patchValue(this.selectedEmpSalary);
          this.formUser.patchValue({
            empId: this.empList.find(e => e.dataId == this.selectedEmpSalary.empId),
            monthYear: this.commonService.formatDate(this.selectedEmpSalary.monthYear),
            totadjLeaves: this.selectedEmpSalary.adjLeaves,
          });
          this.formUser.controls['branchCode'].disable();
          this.formUser.controls['empId'].disable();
          this.formUser.controls['monthYear'].disable();
          this.editMode = true;  
          this.getEmpPayEarnList();
          this.getEmpPayDedList();
          this.getEmpPayLeaveList();
          this.getEmpPayLoanList();
        }
        else{
          this.editMode = false;  
          var dt = new Date(e.target.value);
          var month=0;
          if(dt.getMonth()==12){
            month = 1;
          }
          else{
            month = dt.getMonth() + 1;      
          }
          var year = dt.getFullYear();
          var days = new Date(year, month, 0).getDate();
          this.formUser.patchValue({
            daysOfMonth:days,
            holSun:'0',
            totLeaves:'0',
            absentDays:'0',
            payDays:days,
          })

          this.getEmpLeavesList();
          this.getEmpLoanList();
          this.getEmpSalaryEarnList();
          this.getEmpSalaryDedList();   
          this.calLeaves();
        }
      });
    }
    else{
      this.editMode = false;  
      var dt = new Date(e.target.value);
      var month=0;
      if(dt.getMonth()==12){
        month = 1;
      }
      else{
        month = dt.getMonth() + 1;      
      }
      var year = dt.getFullYear();
      var days = new Date(year, month, 0).getDate();
      this.formUser.patchValue({
        daysOfMonth:days,
        holSun:'0',
        totLeaves:'0',
        absentDays:'0',
        payDays:days,
      })
      this.getEmpLeavesList();
      this.getEmpLoanList();
      this.getEmpSalaryEarnList();
      this.getEmpSalaryDedList();   
      this.calLeaves();
    }  
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
    this.checkPayExists();    
  }

  onChangeSearch(search: string) {  
    
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  onChangeBranch(e: any) {
    var br= e.target.value;
    this.getEmpList(br);
  }

  checkPayExists(){
    var selecteddata = this.formUser.getRawValue();    
    this.editMode = false;  
    if(selecteddata.monthYear!="" && selecteddata.empId?selecteddata.empId.dataId:""!=""){
      this.reportdetails.fromDate = selecteddata.monthYear;
      this.reportdetails.filterStr = selecteddata.empId?selecteddata.empId.dataId:"";
      this.emppaycalculateService.getSelectedEmpDetails(this.reportdetails).subscribe((res: Emppaycalcmodel) => {
        this.selectedEmpSalary = res;
        if (this.selectedEmpSalary.transId != '') {    
          this.formUser.patchValue(this.selectedEmpSalary);
          this.formUser.patchValue({
            empId: this.empList.find(e => e.dataId == this.selectedEmpSalary.empId),
            monthYear: this.commonService.formatDate(this.selectedEmpSalary.monthYear),
            totadjLeaves: this.selectedEmpSalary.adjLeaves,
          });
          this.formUser.controls['branchCode'].disable();
          this.formUser.controls['empId'].disable();
          this.formUser.controls['monthYear'].disable();
          this.editMode = true;  
          this.getEmpPayEarnList();
          this.getEmpPayDedList();
          this.getEmpPayLeaveList();
          this.getEmpPayLoanList();
        }
      });
    }    
  }



  // addErnItem(index: number): void {
  //   if (this.formErnArray.value[index].edCode != "" && this.formErnArray.value[index].edAmt != "") 
  //   {
  //     this.formErnArray.push(this.createInitialArray());  
  //   }
  //   else {
  //     this.toasterService.warning("Please select Required Fields ");
  //     return;
  //   }  

  // }

  // removeErnItem(index: number) {
  //   this.formErnArray.removeAt(index);
  // }

  // addDedItem(index: number): void {
  //   if (this.formDedArray.value[index].edCode != "" && this.formDedArray.value[index].edAmt != "") 
  //   {
  //     this.formDedArray.push(this.createInitialArray());  
  //   }
  //   else {
  //     this.toasterService.warning("Please select Required Fields ");
  //     return;
  //   }  

  // }

  // removeDedItem(index: number) {
  //   this.formDedArray.removeAt(index);
  // }



  deleteEmpPayCalcForm(): void {
    if (this.selectedEmpSalary.transId != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedEmpSalary.transId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.emppaycalculateService.empPayCalDelete(this.requestmodel).subscribe((res: Responsemodel) => {
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

    this.emppaycalcmodel.transId          = this.selectedEmpSalary.transId ;
    this.emppaycalcmodel.empId            = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.emppaycalcmodel.monthYear        = selectedDataVal.monthYear.toString();
    this.emppaycalcmodel.daysOfMonth      = selectedDataVal.daysOfMonth.toString(),
    this.emppaycalcmodel.holSun           = selectedDataVal.holSun.toString(),
    this.emppaycalcmodel.totLeaves        = selectedDataVal.totLeaves.toString(),
    this.emppaycalcmodel.adjLeaves        = selectedDataVal.totadjLeaves.toString(),
    this.emppaycalcmodel.absentDays       = selectedDataVal.absentDays.toString(),
    this.emppaycalcmodel.payDays          = selectedDataVal.payDays.toString(),
    this.emppaycalcmodel.affectYear       = selectedDataVal.affectYear.toString(),
    this.emppaycalcmodel.totalEarnings    = selectedDataVal.totalEarnings.toString(),
    this.emppaycalcmodel.totalDeductions  = selectedDataVal.totalDeductions.toString(),
    this.emppaycalcmodel.netPay           = selectedDataVal.netPay.toString(),
    this.emppaycalcmodel.branchCode       = selectedDataVal.branchCode.toString(),
    this.emppaycalcmodel.loggedInUser     = this.loggedInUserID,

    this.emppaycalcmodel.empSalaryDtlList = [];

    for (var i = 0; i < selectedDataVal.arrayErnList.length; i++) {
      if(selectedDataVal.arrayErnList[i].edCode != "" && selectedDataVal.arrayErnList[i].edAmt != ""){
        this.emppaycalcmodel.empSalaryDtlList.push({
          'masterId': '',
          'empId': '',
          'fromDate': '',
          'edType': 'E',
          'edCode': selectedDataVal.arrayErnList[i].edCode.toString(),
          'edAmt': selectedDataVal.arrayErnList[i].edAmt.toString(),
          'edName': "",
          'actAmt':""
        });
      }
    }

    for (var i = 0; i < selectedDataVal.arrayDedList.length; i++) {
      if(selectedDataVal.arrayDedList[i].edCode != "" && selectedDataVal.arrayDedList[i].edAmt != ""){
        this.emppaycalcmodel.empSalaryDtlList.push({
          'masterId': '',
          'empId': '',
          'fromDate': '',
          'edType': 'D',
          'edCode': selectedDataVal.arrayDedList[i].edCode.toString(),
          'edAmt': selectedDataVal.arrayDedList[i].edAmt.toString(),
          'edName': "",
          'actAmt':""
        });
      }
    }
   
    //Duplicate Salary Earning/Deduction check
    const foundDuplicateName = this.empsalarymstmodel.empSalaryDtlList.find((data, index) => {
      return this.emppaycalcmodel.empSalaryDtlList.find((x, ind) => x.edCode === data.edCode && index !== ind);
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

    
    this.emppaycalcmodel.empLeavesList = [];

    for (var i = 0; i < selectedDataVal.arrayLeaveList.length; i++) {
      if(selectedDataVal.arrayLeaveList[i].leaveId != "" ){
        var totleave = parseFloat(selectedDataVal.arrayLeaveList[i].totalLeaves) + parseFloat(selectedDataVal.arrayLeaveList[i].accumLeaves)
        this.emppaycalcmodel.empLeavesList.push({
          'transId': '',
          'empId': '',
          'yearId': '',
          'monthYear':'',
          'leaveId': selectedDataVal.arrayLeaveList[i].leaveId.toString(),
          'leaveCode': selectedDataVal.arrayLeaveList[i].leaveCode.toString(),
          'leaveName': "",
          'totalLeaves': totleave.toString(),
          'leavesAdj': selectedDataVal.arrayLeaveList[i].adjLeaves.toString(),
        });
      }
    }

    this.emppaycalcmodel.empLoanDtlList = [];

    for (var i = 0; i < selectedDataVal.arrayLoanList.length; i++) {
      if(selectedDataVal.arrayLoanList[i].leaveId != "" ){
        this.emppaycalcmodel.empLoanDtlList.push({
          'transId': '',
          'empId': '',
          'loanId': selectedDataVal.arrayLoanList[i].loanId.toString(),
          'loanNumber': '',
          'loanDate': '',
          'loanAmt': '',
          'loanType': selectedDataVal.arrayLoanList[i].loanType.toString(),
          'loanDedId': selectedDataVal.arrayLoanList[i].loanDedId.toString(),
          'dedName': selectedDataVal.arrayLoanList[i].dedName.toString(),
          'balAmt': "",
          'monthYear': "",
          'loanAdjAmt': selectedDataVal.arrayLoanList[i].loanAdjAmt.toString(),
        });     
    
      }
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
    