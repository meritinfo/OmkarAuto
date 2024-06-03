import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { EmpsalaryService } from 'src/app/services/empsalary.service';
import { Empsalarymstlistmodel } from 'src/app/models/empsalarymstlistmodel';
import { Empsalarymstmodel } from 'src/app/models/empsalarymstmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { EmpmasterService } from 'src/app/services/empmaster.service';

@Component({
  selector: 'app-empsalaryadd',
  templateUrl: './empsalaryadd.component.html',
  styleUrls: ['./empsalaryadd.component.css']
})
export class EmpsalaryaddComponent {
  
  loggedInUserID: string = '';
  year: string = '';
  empList: Dropdownmodel[] = [];
  earningList: Dropdownmodel[] = [];
  deductionList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  selectedEmpSalary = new Empsalarymstmodel();
  empsalarymaster = new Empsalarymstmodel();

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
    private commonService: CommonService, private empsalaryService: EmpsalaryService,
    private toasterService: ToastrService,  private empmasterService: EmpmasterService) {
    this.empsalarymstmodel = new Empsalarymstmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Employee Salary Master");      
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
    
    this.formUser = this.formBuilder.group({
      empId: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      grossSalary: new FormControl('', [Validators.required]),
      arrayErnList: this.formBuilder.array([this.createInitialArray()]), 
      arrayDedList: this.formBuilder.array([this.createInitialArray()]) 
    });
    
    this.sharedService.loading=true;
    this.getEmpList();
    this.getEarningList();
    this.getDeductionList();

    this.selectedEmpSalary = this.empsalaryService.getEmpSalaryDetails();

    if (this.selectedEmpSalary.masterId != '') {   
      this.formUser.controls['empId'].disable();
    }

    setTimeout(() => {
      if (this.selectedEmpSalary.masterId != '') {    
        this.formUser.patchValue(this.selectedEmpSalary);
        this.formUser.patchValue({
          fromDate: this.commonService.formatDate(this.selectedEmpSalary.fromDate),
          empId: this.empList.find(e => e.dataId == this.selectedEmpSalary.empId),
        });
        this.editMode = true;
        this.getEmpSalaryEarnList();
        this.getEmpSalaryDedList();
      }
    }, 2000);
    this.sharedService.loading=false;
  }

  getEmpSalaryEarnList(): void {
    this.requestmodel.strRequest = this.selectedEmpSalary.masterId;
    this.empsalaryService.getEmpSalaryEarnList(this.requestmodel).subscribe((res) => {
      this.empsalarymstmodel = res;
      this.formErnArray.clear();
      for (var i = 0; i < res.empSalaryDtlList.length; i++) {
        this.formErnArray.push(this.createInitialArray());
        this.formErnArray.controls[i].get("edCode")?.setValue(res.empSalaryDtlList[i].edCode);
        this.formErnArray.controls[i].get("edAmt")?.setValue(res.empSalaryDtlList[i].edAmt);
      }
    });
  }

  getEmpSalaryDedList(): void {
    this.requestmodel.strRequest = this.selectedEmpSalary.masterId;
    this.empsalaryService.getEmpSalaryDedList(this.requestmodel).subscribe((res) => {
      this.empsalarymstmodel = res;
      this.formDedArray.clear();
      for (var i = 0; i < res.empSalaryDtlList.length; i++) {
        this.formDedArray.push(this.createInitialArray());
        this.formDedArray.controls[i].get("edCode")?.setValue(res.empSalaryDtlList[i].edCode);
        this.formDedArray.controls[i].get("edAmt")?.setValue(res.empSalaryDtlList[i].edAmt);
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      edCode: ['', []],
      edAmt: ['', []],
    });
  }

  getEmpList(): void {
    this.empmasterService.getEmpList().subscribe((res: Dropdownmodel[]) => {
      this.empList = res;
    });
  }

  getEarningList(): void {
    this.empsalaryService.getSalaryEarningList().subscribe((res) => {
      this.earningList = res;
    });
  }
  getDeductionList(): void {
    this.empsalaryService.getSalaryDeductionList().subscribe((res) => {
      this.deductionList = res;
    });
  }
  
  get f() { return this.formUser.controls; }

  get formErnArray() {
    return this.formUser.get("arrayErnList") as FormArray;
  }
  get formDedArray() {
    return this.formUser.get("arrayDedList") as FormArray;
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

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
        amt = Math.round(parseFloat(selectedDataVal.grossSalary) * 60 / 100)
      }
      else if(selType == "2")//HRA
      {
        amt = Math.round(parseFloat(selectedDataVal.grossSalary) * 40 / 100)
      }
    }
    else
    {
      amt = Math.round(parseFloat(selectedDataVal.grossSalary)) - 
            Math.round(parseFloat(selectedDataVal.arrayErnList[0].edAmt))
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
    
    if(selType == "3") // PF
    {
      amt = Math.round((parseFloat(selectedDataVal.grossSalary) * 60 / 100) * 12 / 100);
    }
    else if(selType == "5" && parseFloat(selectedDataVal.grossSalary) <= 21000 )  //ESI  
    {
      amt = Math.ceil(parseFloat(selectedDataVal.grossSalary) * 0.75 / 100);
    }
    else if(selType == "4" )  //PT 
    {
      if(parseFloat(selectedDataVal.grossSalary) > 15000 &&  parseFloat(selectedDataVal.grossSalary) <= 20000)  {
        amt = 150;
      }
      if(parseFloat(selectedDataVal.grossSalary) > 20000)  {
        amt = 200;
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



  deleteEmpSalaryMasterForm(): void {
    if (this.selectedEmpSalary.masterId != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedEmpSalary.masterId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.empsalaryService.empSalaryDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/empsalmstlist']);
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
    this.route.navigate(['/empsalmstlist']);
  }

  //Submit form details //
  submitEmpSalaryMasterForm(): void {
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
    var selectedDataVal=this.formUser.getRawValue();

    this.empsalarymstmodel.masterId     = this.selectedEmpSalary.masterId ;
    this.empsalarymstmodel.empId        = selectedDataVal.empId?selectedDataVal.empId.dataId:"";
    this.empsalarymstmodel.fromDate     = selectedDataVal.fromDate;
    this.empsalarymstmodel.grossSalary  = selectedDataVal.grossSalary.toString(),
    this.empsalarymstmodel.loggedInUser = this.loggedInUserID,

    this.empsalarymstmodel.empSalaryDtlList = [];
    var grsAmt = 0;
    for (var i = 0; i < selectedDataVal.arrayErnList.length; i++) {
      if(selectedDataVal.arrayErnList[i].edCode != "" && selectedDataVal.arrayErnList[i].edAmt != ""){
        grsAmt = grsAmt + parseFloat(selectedDataVal.arrayErnList[i].edAmt);
        this.empsalarymstmodel.empSalaryDtlList.push({
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

    if(grsAmt != parseFloat(selectedDataVal.grossSalary)){
      this.toasterService.warning("Total Earning Details is not matching with Gross Salary");
      return;
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
          'edName': "",
          'actAmt':""
        });
      }
    }
   
    //Duplicate Salary Earning/Deduction check
    const foundDuplicateName = this.empsalarymstmodel.empSalaryDtlList.find((data, index) => {
      return this.empsalarymstmodel.empSalaryDtlList.find((x, ind) => x.edCode === data.edCode && index !== ind);
    });

    if (foundDuplicateName) {
      this.toasterService.warning(" Duplicate Salary Earning/Deduction ");
      return;
    }

    if(this.empsalarymstmodel.empSalaryDtlList.length == 0){
      this.toasterService.warning(" Select Salary Earning/Deduction ");
      return;
    }
   

    
    this.sharedService.loading=true;
    this.empsalaryService.empSalarySubmitted(this.empsalarymstmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/empsalmstlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    
    this.sharedService.loading=false;
  }

}
