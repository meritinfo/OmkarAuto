
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Expensebudgetlistmodel } from 'src/app/models/expensebudgetlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { ExpenseBudgetService } from 'src/app/services/expensebudgets.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-expensebudgetsadd',
  templateUrl: './expensebudgetsadd.component.html',
  styleUrls: ['./expensebudgetsadd.component.css']
})
export class ExpensebudgetsaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  editMode= false;
  formSubmitted = false;
  keywordLocation = 'dataName';
    
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  modelList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  expensebudgetsmodel = new Expensebudgetlistmodel();
  refDocAttachedImage: string = "";

  selectedExpensebudgetDetail = new Expensebudgetlistmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private expenseBudgetService: ExpenseBudgetService, 
                          private sharedService : SharedService,
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.expensebudgetsmodel = new Expensebudgetlistmodel();
  }

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Define Expenses Budgets");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
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
  var dashboard = sessionStorage.getItem('dashboard')?.toString();
  if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
    this.dashboard = dashboard;
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
  
   this.formUser = this.formBuilder.group({
    branchCode : new FormControl('',[Validators.required]),
    arrayList: this.formBuilder.array([this.createTyreArray()]),
  });
  
  this.getBranchList();
  this.getGetFinAcList();
}

get f() { return this.formUser.controls; }

get formTyreArray() {
  return this.formUser.get("arrayList") as FormArray;    
}

createTyreArray() {
  return this.formBuilder.group({
    accountId: [''],
    budgetRs: [''],    
  });
}

getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}

getExpenseBudgetsInnerGridList(): void {
 // this.requestmodel.strRequest = this.selectedExpensebudgetDetail.branchCode; 
  this.expenseBudgetService.getExpensebudgetInnerGridList(this.requestmodel).subscribe((res) => {
    this.formTyreArray.clear();
    this.expensebudgetsmodel = res;
    for (var i = 0; i < res.expenseList.length; i++) {
      this.formTyreArray.push(this.createTyreArray());
      this.formTyreArray.controls[i].get("accountId")?.setValue(res.expenseList[i].accountId);  
      this.formTyreArray.controls[i].get("budgetRs")?.setValue(res.expenseList[i].budgetRs);   
     
    }     
  });
}

addItem(i: number): void {    
  var selectedDate = this.formUser.getRawValue();
  if (this.formTyreArray.value[i].accountId != "" && this.formTyreArray.value[i].budgetRs!="" ) {
    this.formTyreArray.push(this.createTyreArray());
  }  
  else{
    this.toastrService.warning("Please Enter Mandatory  Fields in Detail ");   
  }
}

removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
  this.formTyreArray.removeAt(index);  }
} 
getGetFinAcList(){
  this.commonService.GetFinAcList().subscribe((res) => {
    this.creditacList = res;    
  }); 
} 
getDetail(e:any){
  this.requestmodel.strRequest = e.target.value;
  
  this.expenseBudgetService.getExpensebudgetInnerGridList(this.requestmodel).subscribe((res) => {
    this.formTyreArray.clear();
    this.expensebudgetsmodel = res;
    for (var i = 0; i < res.expenseList.length; i++) {
      this.formTyreArray.push(this.createTyreArray());
      this.formTyreArray.controls[i].get("accountId")?.setValue(res.expenseList[i].accountId);  
      this.formTyreArray.controls[i].get("budgetRs")?.setValue(res.expenseList[i].budgetRs);   
     
    }     
  });
  setTimeout(() => {    
    this.formTyreArray.push(this.createTyreArray());
  }, 1000);

}

expenseBudgetDelete(): void {  
  var selectedDataValue = this.formUser.getRawValue();
   this.requestmodel.strRequest =selectedDataValue.branchCode ;
    if (confirm("Are you sure, you want to delete this?")) {
          this.expenseBudgetService.cnorExpensebudgetDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/budgetexp']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
      });
    }
}
  
exit(): void {
  this.route.navigate([this.dashboard]);
}   
  
submitExpenseBudgetForm(): void {
  if (this.formUser.invalid) {
    this.toastrService.warning("Please Enter Mandatory Fields ");   
    const controls = this.formUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastrService.warning(name + "Fields is Invalid");   
      }
    }
    return;
  }

  var selectedDataValue = this.formUser.getRawValue();

 
  this.expensebudgetsmodel.expenseList = [];

     
  for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
    if (selectedDataValue.arrayList[i].accountId == ""  ) {
      this.toastrService.warning("Please Enter Account");
      return;
    } 
    if ( parseFloat(selectedDataValue.arrayList[i].budgetRs)==0 ) {
      this.toastrService.warning("Please Enter Amount");
      return;
    } 
      this.expensebudgetsmodel.expenseList.push({
        'yearId':this.year,   
        'branchCode': selectedDataValue.branchCode,
        'accountId': selectedDataValue.arrayList[i].accountId.toString(),
        'budgetRs': selectedDataValue.arrayList[i].budgetRs.toString(),    
      }) 
    }   
  
  
  if(this.expensebudgetsmodel.expenseList.length==0){
    this.toastrService.warning("Please enter atleast one Record in Details");
    return;
  }
  const foundDuplicateName = this.expensebudgetsmodel.expenseList.find((data, index) => {
    return this.expensebudgetsmodel.expenseList.find((x, ind) => x.accountId === data.accountId && index !== ind);
  })
  if (foundDuplicateName) {
    this.toastrService.warning("Duplicate  Account in details grid not allowed");
    return;
  }

  

  this.formSubmitted = true;

  this.expenseBudgetService.ExpensebudgetSubmitted(this.expensebudgetsmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toastrService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/budgetexp']);
    }
    else {
      this.toastrService.warning(this.responseDetails.message);
    }      
  });
}  
}

