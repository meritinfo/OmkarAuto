import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reportmodel } from 'src/app/models/reportmodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DieselstmtService } from 'src/app/services/dieselstmt.service';
import { Dieselstmtmodel } from 'src/app/models/dieselstmtmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
type AOA = any[][];


@Component({
  selector: 'app-dieselstmtadd',
  templateUrl: './dieselstmtadd.component.html',
  styleUrls: ['./dieselstmtadd.component.css']
})
export class DieselstmtaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  accountList:Dropdownmodel[] = [];
  formDieselStatement!: FormGroup;
  selectedDieselStmtDetails = new Dieselstmtmodel()
  seriesDoc: string = "";

  keywordLocation = 'dataName';
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  importTrue= false;

  formSubmitted = false;
  responseDetails = new Responsemodel();
 
  constructor(private reportmodel: Reportmodel, 
    private requestmodel:Requestmodel,private dieselStatementmodel:Dieselstmtmodel,
    private route: Router, private formBuilder: FormBuilder, private commonService: CommonService,
    private sharedService: SharedService,
    private cashReceiptEntryService: CashReceiptEntryService,
    private dieselstatementService: DieselstmtService, private toasterService: ToastrService) {
      this.dieselStatementmodel= new Dieselstmtmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Diesel Data Import"));
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
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

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
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
    this.sharedService.loading=true;   
 
    this.getBranchList();
    this.getAcountList();

    this.selectedDieselStmtDetails = this.dieselstatementService.getDieselStatementDetails();
    this.formDieselStatement = this.formBuilder.group({
      branchCode: new FormControl(this.branch, [Validators.required]),
      stmtDate: new FormControl(this.loginDate, [Validators.required]),
      fromDate: new FormControl(this.fromDate, [Validators.required]),
      toDate: new FormControl(this.loginDate, [Validators.required]),
      dfAccount: new FormControl('', [Validators.required]),
      totalDslLtrs: new FormControl(''),
      totalDslAmt: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),

      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    
    this.sharedService.loading=false;       
    setTimeout(() => {
      if (this.selectedDieselStmtDetails.dfMasterID != '') {
        this.formDieselStatement.patchValue(this.selectedDieselStmtDetails);
        this.formDieselStatement.patchValue({
          stmtDate:this.commonService.formatDate(this.selectedDieselStmtDetails.stmtDate),
          fromDate:this.commonService.formatDate(this.selectedDieselStmtDetails.fromDate),
          toDate:this.commonService.formatDate(this.selectedDieselStmtDetails.toDate),
          dfAccount: this.accountList.find(e => e.dataId == this.selectedDieselStmtDetails.dfAccount),  
        })
        if(this.selectedDieselStmtDetails.ftmidHsd!="0"){
          this.getFinDocDetails(this.selectedDieselStmtDetails.ftmidHsd);
        }
        this.editMode=true;
        this.getDieselStmtInnerGridList();
        this.formDieselStatement.controls['stmtDate'].disable();     
        this.formDieselStatement.controls['fromDate'].disable();  
        this.formDieselStatement.controls['toDate'].disable();  
        this.formDieselStatement.controls['dfAccount'].disable();     
      }    
    }, 2000);

    this.formDieselStatement.controls['branchCode'].disable();  
    this.formDieselStatement.controls["totalDslLtrs"].disable();
    this.formDieselStatement.controls["totalDslAmt"].disable();
  }

  get f() { return this.formDieselStatement.controls; }
  get formArray() {
    return this.formDieselStatement.get("arrayList") as FormArray;
  }

  
  createInitialArray() {
    return this.formBuilder.group({
      transRefNo:  ['', []],
      vehicleNo:  ['', []],
      transDateTime:  ['', []],
      dslQty:  ['', []],
      dslRate:  ['', []],
      amount:  ['', []],
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getAcountList(): void {    
    this.requestmodel.strRequest="D"
    this.cashReceiptEntryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
    });
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

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
 
  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.cashReceiptEntryService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }

  getDieselStmtInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedDieselStmtDetails.dfMasterID;
    this.dieselstatementService.getDieselStatementInnerGridList(this.requestmodel).subscribe((res) => {
      this.dieselStatementmodel = res;
      this.formArray.clear();
      
      for (var i = 0; i < res.dieselStmtDtlsList.length; i++) {
        this.formArray.push(this.createInitialArray());   
        this.formArray.controls[i].get("transRefNo")?.setValue(res.dieselStmtDtlsList[i].transRefNo);
        this.formArray.controls[i].get("vehicleNo")?.setValue(res.dieselStmtDtlsList[i].vehicleNo);
        this.formArray.controls[i].get("transDateTime")?.setValue(res.dieselStmtDtlsList[i].transDateTime);
        this.formArray.controls[i].get("dslQty")?.setValue(res.dieselStmtDtlsList[i].dslQty);
        this.formArray.controls[i].get("dslRate")?.setValue(res.dieselStmtDtlsList[i].dslRate);
        this.formArray.controls[i].get("amount")?.setValue(res.dieselStmtDtlsList[i].amount);

        this.formArray.controls[i].get("transRefNo")?.disable();
        this.formArray.controls[i].get("vehicleNo")?.disable();
        this.formArray.controls[i].get("transDateTime")?.disable();
        this.formArray.controls[i].get("dslQty")?.disable();
        this.formArray.controls[i].get("dslRate")?.disable();     
        this.formArray.controls[i].get("amount")?.disable();   
      }
    });  
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
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellText: true, cellDates: true });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'dd-MM-yyyy HH:mm:ss' }));

      var selectedDataVal = this.formDieselStatement.getRawValue();
      var j=0;
      this.formArray.clear();
      for (var i = 0; i < this.data.length; i++) { 
        if (this.data[i+1][0]!="")  
        {  
          if (this.data[i+1][1]=="Debit" && this.data[i+1][5]=="DIESEL" && this.data[i+1][9]=="Settled")  
          {           
            this.formArray.push(this.createInitialArray());

            var startDt = new Date(this.data[i+1][3]);    
            this.formArray.controls[j].get("transRefNo")?.setValue(this.data[i+1][0]);
            this.formArray.controls[j].get("vehicleNo")?.setValue(this.data[i+1][2]);
            //this.formArray.controls[j].get("transDateTime")?.setValue(startDt.toLocaleDateString('en-CA').toString());
            this.formArray.controls[j].get("transDateTime")?.setValue(this.data[i+1][3]);
            this.formArray.controls[j].get("dslQty")?.setValue(this.data[i+1][7]);
            this.formArray.controls[j].get("dslRate")?.setValue(this.data[i+1][6]);
            this.formArray.controls[j].get("amount")?.setValue(this.data[i+1][8]);

            this.formArray.controls[j].get("transRefNo")?.disable();
            this.formArray.controls[j].get("vehicleNo")?.disable();
            this.formArray.controls[j].get("transDateTime")?.disable();
            this.formArray.controls[j].get("dslQty")?.disable();
            this.formArray.controls[j].get("dslRate")?.disable();     
            this.formArray.controls[j].get("amount")?.disable();  

            j ++; 
          }
        } 
        else{
          i = this.data.length;
        }         
      }
    };     
    reader.readAsBinaryString(target.files[0]);
    
    setTimeout(() => {
      this.calculateTotal();
    }, 2000);
  }


  
  calculateTotal() {
    var totalDslLtrs= 0;
    var totalDslAmt= 0;

    var selectedData = this.formDieselStatement.getRawValue(); 

    for (var i = 0; i < selectedData.arrayList.length; i++) {
      if (selectedData.arrayList[i].dslQty != "") {
        totalDslLtrs = totalDslLtrs + parseFloat(selectedData.arrayList[i].dslQty);
      }
      if (selectedData.arrayList[i].amount != "") {
        totalDslAmt = totalDslAmt + parseFloat(selectedData.arrayList[i].amount);
      }            
    }
     
    this.formDieselStatement.patchValue({
      totalDslLtrs:totalDslLtrs.toFixed(2),
      totalDslAmt: totalDslAmt.toFixed(2),
    });
  }

  exit(): void {
    this.route.navigate(['/dieselimplist']);
  }

  deleteDieselStatementForm(): void {
    if(this.selectedDieselStmtDetails.dfMasterID != '' ){      
    this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedDieselStmtDetails.dfMasterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.dieselstatementService.dieselStatementDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message);
              this.formDieselStatement.reset();
              this.route.navigate(['/dieselimplist']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            }   
        });
      }
      
    this.sharedService.loading=false;
    }
  }

 
  saveStatementDetails(): void {
    if (this.formDieselStatement.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formDieselStatement.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedDataVal=this.formDieselStatement.getRawValue();

    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.dieselStatementmodel.dfMasterID      = this.selectedDieselStmtDetails.dfMasterID ;
    this.dieselStatementmodel.branchCode      = selectedDataVal.branchCode;
    this.dieselStatementmodel.stmtDate        = selectedDataVal.stmtDate;
    this.dieselStatementmodel.fromDate        = selectedDataVal.fromDate;
    this.dieselStatementmodel.toDate          = selectedDataVal.toDate;
    this.dieselStatementmodel.dfAccount       = selectedDataVal.dfAccount?selectedDataVal.dfAccount.dataId:'';
    this.dieselStatementmodel.remarks         = selectedDataVal.remarks;  
    this.dieselStatementmodel.totalDslLtrs    = selectedDataVal.totalDslLtrs;
    this.dieselStatementmodel.totalDslAmt     = selectedDataVal.totalDslAmt;
    this.dieselStatementmodel.yearId          = this.year;
    this.dieselStatementmodel.loggedInUser    = this.loggedInUserID;

    this.dieselStatementmodel.dieselStmtDtlsList = [];

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if(selectedDataVal.arrayList[i].transRefNo!=''){
        this.dieselStatementmodel.dieselStmtDtlsList.push({
          'dfMasterID':"",
          'transRefNo': selectedDataVal.arrayList[i].transRefNo.toString(),   
          'vehicleNo': selectedDataVal.arrayList[i].vehicleNo.toString(),   
          'transDateTime': selectedDataVal.arrayList[i].transDateTime.toString(),   
          'dslQty': selectedDataVal.arrayList[i].dslQty.toString(),   
          'dslRate': selectedDataVal.arrayList[i].dslRate.toString(),   
          'amount': selectedDataVal.arrayList[i].amount.toString(), 
        });
      }
    }

    this.dieselstatementService.dieselStatementSave(this.dieselStatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formDieselStatement.reset();
        this.route.navigate(['/dieselimplist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
        
    this.sharedService.loading=false;
  }
}
