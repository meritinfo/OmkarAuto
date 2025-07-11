import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { VehicleinstscheduleService } from 'src/app/services/vehicleinstschedule.service';
import { Vehicleinstschedulemodel } from 'src/app/models/vehicleinstschedulemodel';
import { VehicleInstPmtService } from 'src/app/services/vehicleinstpmt.service';

import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
type AOA = any[][];



@Component({
  selector: 'app-vehicleinstscheduleadd',
  templateUrl: './vehicleinstscheduleadd.component.html',
  styleUrls: ['./vehicleinstscheduleadd.component.css']
})
export class VehicleinstscheduleaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  vehicleList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  selectedVehicleinsts = new Vehicleinstschedulemodel();
  ratesmstmodel = new Vehicleinstschedulemodel();
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  createdBy : string = "";
  modifiedBy: string = "";
  importTrue= false;
  autoCalTrue= true;
  rowaddTrue = false;
  responseDetails = new Responsemodel();  
  loginDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private vehicleinstschedulemodel: Vehicleinstschedulemodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private vehicleinstscheduleService: VehicleinstscheduleService,
    private vehicleInstPmtService: VehicleInstPmtService, private toasterService: ToastrService) {
    this.vehicleinstschedulemodel = new Vehicleinstschedulemodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle EMI Details");      
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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

    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    
    this.formUser = this.formBuilder.group({
      vehicleMasterId : new FormControl('', [Validators.required]),
      loanType        : new FormControl('', [Validators.required]),    
      startDate       : new FormControl(this.loginDate, [Validators.required]),   
      endDate         : new FormControl('', [Validators.required]),   
      noOfMonths      : new FormControl('', [Validators.required]),   
      principalEmi    : new FormControl('', [Validators.required]),  
      interestEmi     : new FormControl('', [Validators.required]),  
      totalEmi        : new FormControl('', [Validators.required]),  
      scheudleType    : new FormControl('A', [Validators.required]), 
      totalPrincipal  : new FormControl('', [Validators.required]),
      totalInterest   : new FormControl('', [Validators.required]),
      totalLoanAmt    : new FormControl('', [Validators.required]),  
      remarks         : new FormControl('', ), 
      arrayList: this.formBuilder.array([this.createInitialArray()])  
    });

    this.formUser.controls['noOfMonths'].disable();    

    this.sharedService.loading=true;
    this.getVehicleNoList();
    this.selectedVehicleinsts = this.vehicleinstscheduleService.getvehicletypemasterDetails();

    setTimeout(() => {
      if (this.selectedVehicleinsts.masterID != '') {    
        this.createdBy = this.selectedVehicleinsts.createdBy + " " + this.selectedVehicleinsts.createdDate;
        this.modifiedBy = this.selectedVehicleinsts.modifiedBy + " " + this.selectedVehicleinsts.modifiedDate;   
        this.formUser.patchValue(this.selectedVehicleinsts);
        this.formUser.patchValue({
          startDate: this.commonService.formatDate(this.selectedVehicleinsts.startDate),
          endDate: this.commonService.formatDate(this.selectedVehicleinsts.endDate),
          vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedVehicleinsts.vehicleMasterId), 
        });
        this.editMode = true;
        this.formUser.controls['vehicleMasterId'].disable();
        this.formUser.controls['loanType'].disable();
        this.getVehicleinstscheduleInnerGrid();
      }
    }, 2000);
    this.sharedService.loading=false;
  }
  
    
  getVehicleinstscheduleInnerGrid(): void {
    this.requestmodel.strRequest = this.selectedVehicleinsts.masterID;
    this.vehicleinstscheduleService.getVehicleinstscheduleInnerGrid(this.requestmodel).subscribe((res) => {
      this.ratesmstmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.instScheduleDtls.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("instNo")?.setValue(res.instScheduleDtls[i].instNo);
        this.formArray.controls[i].get("instDate")?.setValue(this.commonService.formatDate(res.instScheduleDtls[i].instDate));
        this.formArray.controls[i].get("pri_InstAmt")?.setValue(res.instScheduleDtls[i].pri_InstAmt);
        this.formArray.controls[i].get("int_InstAmt")?.setValue(res.instScheduleDtls[i].int_InstAmt);
        this.formArray.controls[i].get("tot_InstAmt")?.setValue(res.instScheduleDtls[i].tot_InstAmt);
        this.formArray.controls[i].get("dtlRemarks")?.setValue(res.instScheduleDtls[i].dtlRemarks);
        
        this.formArray.controls[i].get("instNo")?.disable();
        this.formArray.controls[i].get("instDate")?.disable();
        this.formArray.controls[i].get("pri_InstAmt")?.disable();
        this.formArray.controls[i].get("int_InstAmt")?.disable();
        this.formArray.controls[i].get("tot_InstAmt")?.disable();
        this.formArray.controls[i].get("dtlRemarks")?.disable();
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      instNo: ['', []],
      instDate: ['', []],
      pri_InstAmt: ['', []],
      int_InstAmt: ['', []],
      tot_InstAmt: ['', []],
      dtlRemarks: ['', []],
    });
  }
  
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
 
  selectEvent(item: any) {
    var vehi = item.dataId;
    var selectedData = this.formUser.getRawValue();
    if(selectedData.loanType==""){
      this.toasterService.warning("Please select Loan Type");
      this.formUser.patchValue({
        vehicleMasterId: "",
      })
      return;
    }
    else{
      this.requestmodel.strRequest = vehi;
      this.requestmodel.strRequest1 = selectedData.loanType;

      this.vehicleInstPmtService.checkVehicleLoanType(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formUser.controls["loanType"].disable();
        }
        else {
          this.toasterService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            vehicleMasterId:""
          });
        }      
      });
    }
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };


  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
  };
  calNoOfMonths(){
    var selectedDataVal = this.formUser.getRawValue();
    var nomon = "";
    var months=0;
    if(selectedDataVal.startDate!="" && selectedDataVal.endDate!=""){
      const startDt = new Date(selectedDataVal.startDate);
      const endDt = new Date(selectedDataVal.endDate);

      months = (endDt.getFullYear() - startDt.getFullYear()) * 12;
      months -= startDt.getMonth() + 1;
      months += endDt.getMonth() + 2;
      nomon = months.toString();     
    }
    this.formUser.patchValue({
      noOfMonths: nomon,
    });
  }

  changeType(tp:string){      
    this.autoCalTrue = true;
    this.importTrue = false;    
    this.rowaddTrue = false;

    var selectedDataVal = this.formUser.getRawValue();
    if(selectedDataVal.noOfMonths==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please select Start and End Dates ");
      return;      
    }
    if(selectedDataVal.principalEmi==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please enter Principal EMI Amt ");
      return;
    }
    if(selectedDataVal.interestEmi==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please enter Interest EMI Amt ");
      return;
    }
    if(selectedDataVal.totalEmi==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please enter Total EMI Amt ");
      return;
    }
    if(selectedDataVal.totalPrincipal==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please enter Total Principal Amt ");
      return;
    }
    if(selectedDataVal.totalInterest==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please enter Total Interest Amt ");
      return;
    }
    if(selectedDataVal.totalLoanAmt==""){
      this.formUser.patchValue({
        scheudleType: "A",
      });
      this.toasterService.warning("Please enter Total Loan Amt ");
      return;
    }
    
    this.autoCalTrue = false;
    this.importTrue = false;    
    this.rowaddTrue = false;

    if(tp=="M"){
      this.formArray.clear();
      this.rowaddTrue = true;  
      this.autoCalTrue = false;
      this.formArray.push(this.createInitialArray());  
    }
    else if(tp=="A"){
      this.autoCalTrue = true;
    }
    else if(tp=="I"){
      this.importTrue = true;  
      this.autoCalTrue = false;
    }
  }

  autoCalculate(){
    var selectedDataVal = this.formUser.getRawValue();
    if(selectedDataVal.noOfMonths==""){
      this.toasterService.warning("Please select Start and End Dates ");
      return;
    }
    if(selectedDataVal.principalEmi==""){
      this.toasterService.warning("Please enter Principal EMI Amt ");
      return;
    }
    if(selectedDataVal.interestEmi==""){
      this.toasterService.warning("Please enter Interest EMI Amt ");
      return;
    }
    if(selectedDataVal.totalEmi==""){
      this.toasterService.warning("Please enter Total EMI Amt ");
      return;
    }
    var startDt = new Date(selectedDataVal.startDate);    
    var year = startDt.getFullYear();
    var month = startDt.getMonth();
    var noofmon = parseInt(selectedDataVal.noOfMonths);
    var priEmi = parseFloat(selectedDataVal.principalEmi);
    var intEmi = parseFloat(selectedDataVal.interestEmi);
    var totEmi = parseFloat(selectedDataVal.totalEmi);
    
    this.formArray.clear();
    for (var i = 0; i < noofmon; i++) {
      month = month + 1;
      if (month>11)
      {
        month = 0;
        year = year + 1;
      }
       
      this.formArray.push(this.createInitialArray());
      this.formArray.controls[i].get("instNo")?.setValue(i + 1);
      this.formArray.controls[i].get("instDate")?.setValue(startDt.toLocaleDateString('en-CA').toString());
      this.formArray.controls[i].get("pri_InstAmt")?.setValue(priEmi.toString());
      this.formArray.controls[i].get("int_InstAmt")?.setValue(intEmi.toString());
      this.formArray.controls[i].get("tot_InstAmt")?.setValue(totEmi.toString());
      this.formArray.controls[i].get("dtlRemarks")?.setValue("");
      this.formArray.controls[i].get("instNo")?.disable();
      this.formArray.controls[i].get("instDate")?.disable();
      this.formArray.controls[i].get("pri_InstAmt")?.disable();
      this.formArray.controls[i].get("int_InstAmt")?.disable();
      this.formArray.controls[i].get("tot_InstAmt")?.disable();
      
      startDt.setMonth(month);
      startDt.setFullYear(year);
    }
  }

  data: AOA = [[1, 2]];
  // wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  // fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      var selectedDataVal = this.formUser.getRawValue();
      var startDt = new Date(selectedDataVal.startDate);    
      var year = startDt.getFullYear();
      var month = startDt.getMonth();   
      
      this.formArray.clear();
      for (var i = 0; i < this.data.length; i++) { 
        month = month + 1;  
        if (this.data[i+1][2]!="")  
        {
          if (month>11)
          {
            month = 0;
            year = year + 1;
          }
           
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("instNo")?.setValue(i + 1);
          this.formArray.controls[i].get("instDate")?.setValue(startDt.toLocaleDateString('en-CA').toString());
          this.formArray.controls[i].get("pri_InstAmt")?.setValue(this.data[i+1][0]);
          this.formArray.controls[i].get("int_InstAmt")?.setValue(this.data[i+1][1]);
          this.formArray.controls[i].get("tot_InstAmt")?.setValue(this.data[i+1][2]);
          this.formArray.controls[i].get("dtlRemarks")?.setValue("");
          this.formArray.controls[i].get("instNo")?.disable();
          this.formArray.controls[i].get("instDate")?.disable();
          this.formArray.controls[i].get("pri_InstAmt")?.disable();
          this.formArray.controls[i].get("int_InstAmt")?.disable();
          this.formArray.controls[i].get("tot_InstAmt")?.disable();

          startDt.setMonth(month);
          startDt.setFullYear(year);
        } 
        else{
          i = this.data.length;
        }         
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }



  
  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }

  addItem(index: number): void {
    var selectedDataVal= this.formUser.getRawValue()
    if (selectedDataVal.arrayList[index].instDate != "" && selectedDataVal.arrayList[index].tot_InstAmt != "") {
      this.formArray.push(this.createInitialArray()); 
    }    
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }       
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
    this.formArray.removeAt(index);
  }
  }


  deleteVehicleinstscheduleForm(): void {
    if (this.selectedVehicleinsts.masterID != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedVehicleinsts.masterID;
      if (confirm("Are you sure, you want to delete this?")) {
        this.vehicleinstscheduleService.vehicleinstschedulemstDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/emimasterlist']);
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
    this.route.navigate(['/emimasterlist']);
  }

  submitVehicleinstscheduleForm(): void {
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
              
    if (this.formUser.controls['arrayList'].invalid) {
      this.toasterService.warning("Details fields are mandatory");
      return;
    }
    
    var selectedDataVal=this.formUser.getRawValue();
    this.vehicleinstschedulemodel.masterID = this.selectedVehicleinsts.masterID ;
    this.vehicleinstschedulemodel.vehicleMasterId = selectedDataVal.vehicleMasterId?selectedDataVal.vehicleMasterId.dataId:"";
    this.vehicleinstschedulemodel.loanType = selectedDataVal.loanType;       
    this.vehicleinstschedulemodel.startDate  = selectedDataVal.startDate;       
    this.vehicleinstschedulemodel.endDate  = selectedDataVal.endDate;          
    this.vehicleinstschedulemodel.noOfMonths = selectedDataVal.noOfMonths.toString(); 
    this.vehicleinstschedulemodel.principalEmi = selectedDataVal.principalEmi.toString();   
    this.vehicleinstschedulemodel.interestEmi  = selectedDataVal.interestEmi.toString();  
    this.vehicleinstschedulemodel.totalEmi  = selectedDataVal.totalEmi.toString();  
    this.vehicleinstschedulemodel.scheudleType  = selectedDataVal.scheudleType;    
    this.vehicleinstschedulemodel.totalPrincipal  = selectedDataVal.totalPrincipal.toString();
    this.vehicleinstschedulemodel.totalInterest  = selectedDataVal.totalInterest.toString();
    this.vehicleinstschedulemodel.totalLoanAmt  = selectedDataVal.totalLoanAmt.toString();
    this.vehicleinstschedulemodel.remarks  = selectedDataVal.remarks.toString().toUpperCase();
    this.vehicleinstschedulemodel.loggedInUser = this.loggedInUserID; 

    this.vehicleinstschedulemodel.instScheduleDtls = [];
    if(selectedDataVal.arrayList.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      return;
    }
    var totpriEmi = 0;
    var totintEmi = 0;
    var totEmi = 0;

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if(selectedDataVal.arrayList[i].tot_InstAmt!=''){
        totpriEmi = totpriEmi + parseFloat(selectedDataVal.arrayList[i].pri_InstAmt)
        totintEmi = totintEmi + parseFloat(selectedDataVal.arrayList[i].int_InstAmt)
        totEmi = totEmi + parseFloat(selectedDataVal.arrayList[i].tot_InstAmt)

        this.vehicleinstschedulemodel.instScheduleDtls.push({
          'masterID': '',
          'vehicleMasterId': '',
          'instNo': selectedDataVal.arrayList[i].instNo.toString(),          
          'instDate': selectedDataVal.arrayList[i].instDate,       
          'pri_InstAmt': selectedDataVal.arrayList[i].pri_InstAmt.toString(),    
          'int_InstAmt': selectedDataVal.arrayList[i].int_InstAmt.toString(),    
          'tot_InstAmt': selectedDataVal.arrayList[i].tot_InstAmt.toString(),    
          'dtlRemarks': selectedDataVal.arrayList[i].dtlRemarks.toString().toUpperCase(),     
          'paidAmt': "", 
        });
      }
    }
    
    if(parseFloat(selectedDataVal.totalPrincipal)!=totpriEmi){
      this.toasterService.warning("Total of EMI Principal Amt is not matching with Total Principal");
      return;
    }
    if(parseFloat(selectedDataVal.totalInterest)!=totintEmi){
      this.toasterService.warning("Total of EMI Interest Amt is not matching with Total Interest");
      return;
    }
    if(parseFloat(selectedDataVal.totalLoanAmt)!=totEmi){
      this.toasterService.warning("Total of EMI Amt is not matching with Total Loan Amt");
      return;
    }
    
    this.sharedService.loading=true;
    this.formSubmitted = true;
    this.vehicleinstscheduleService.vehicleinstschedulemstSubmitted(this.vehicleinstschedulemodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/emimasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }    
    });        
    this.sharedService.loading=false;
  }
}
