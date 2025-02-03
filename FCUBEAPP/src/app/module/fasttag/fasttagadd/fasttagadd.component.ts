import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reportmodel } from 'src/app/models/reportmodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { FasttagService } from 'src/app/services/fasttag.service';
import { Fasttagmodel } from 'src/app/models/fasttagmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;
type AOA = any[][];


@Component({
  selector: 'app-fasttagadd',
  templateUrl: './fasttagadd.component.html',
  styleUrls: ['./fasttagadd.component.css']
})
export class FasttagaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  accountList:Dropdownmodel[] = [];
  vehicleList:Dropdownmodel[] = [];
  formFastTag!: FormGroup;
  selectedFasttag = new Fasttagmodel()
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
    private requestmodel:Requestmodel,private fasttagmodel:Fasttagmodel,
    private route: Router, private formBuilder: FormBuilder, private commonService: CommonService,
    private sharedService: SharedService,
    private cashReceiptEntryService: CashReceiptEntryService,
    private fasttagService: FasttagService, private toasterService: ToastrService) {
      this.fasttagmodel= new Fasttagmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Fastag Data Import"));
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
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.sharedService.loading=true;   
 
    this.getBranchList();
    this.getAcountList();
    this.getVehicleNoList();

    this.selectedFasttag = this.fasttagService.getFasttagDetails();
    this.formFastTag = this.formBuilder.group({
      branchCode: new FormControl(this.branch, [Validators.required]),
      stmtDate: new FormControl(this.loginDate, [Validators.required]),
      fromDate: new FormControl(this.fromDate, [Validators.required]),
      toDate: new FormControl(this.loginDate, [Validators.required]),
      ftAccount: new FormControl('', [Validators.required]),
      totalFtAmt: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),

      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    
    this.sharedService.loading=false;       
    setTimeout(() => {
      if (this.selectedFasttag.ftMasterID != '') {
        this.formFastTag.patchValue(this.selectedFasttag);
        this.formFastTag.patchValue({
          stmtDate:this.commonService.formatDate(this.selectedFasttag.stmtDate),
          fromDate:this.commonService.formatDate(this.selectedFasttag.fromDate),
          toDate:this.commonService.formatDate(this.selectedFasttag.toDate),
          ftAccount: this.accountList.find(e => e.dataId == this.selectedFasttag.ftAccount),  
        })
        if(this.selectedFasttag.ftmId!="0"){
          this.getFinDocDetails(this.selectedFasttag.ftmId);
        }
        this.editMode=true;
        this.getFasttagInnerGridList();
        this.formFastTag.controls['stmtDate'].disable();     
        this.formFastTag.controls['fromDate'].disable();  
        this.formFastTag.controls['toDate'].disable();  
        this.formFastTag.controls['ftAccount'].disable();     
      }    
    }, 2000);

    this.formFastTag.controls['branchCode'].disable();  
    this.formFastTag.controls["totalFtAmt"].disable();
  }

  get f() { return this.formFastTag.controls; }

  get formArray() {
    return this.formFastTag.get("arrayList") as FormArray;
  }

  
  createInitialArray() {
    return this.formBuilder.group({
      transRefNo:  ['', []],
      vehicleNo:  ['', []],
      transDateTime:  [this.loginDate, []],
      ftAmount:  ['', []],
      dtlRemarks:  ['', []],
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getAcountList(): void {    
    this.requestmodel.strRequest = "F"
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
  addItem(index: number): void {
    var ind = index + 1;
     if (this.formArray.value[index].vehicleNo != "" && this.formArray.value[index].ftAmount != "" ) {
      this.formArray.push(this.createInitialArray());
     } else {
     this.toasterService.warning("Please enter vehicle no ,ftAmount ");
     }
   // this.formArray.controls[ind].get("amount")?.disable();
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  removeItem(index: number) {
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
    }
    //this.formArray.splice(index, 1);
    this.calculateTotal();
  }



  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  calculateAmt(i: number, event: any) {    
    var selectedData = this.formFastTag.getRawValue();   
    if (selectedData.arrayList[i].dslQty!=''&& selectedData.arrayList[i].dslRate!='' ){     
      var pro =  parseFloat(selectedData.arrayList[i].dslQty)*parseFloat(selectedData.arrayList[i].dslRate);
      this.formArray.controls[i].get("amount")?.setValue(pro);
      // totalProAmount = totalProAmount + pro;
    }
    this.calculateTotal();
  }
 
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

  getFasttagInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedFasttag.ftMasterID;
    this.fasttagService.getFasttagInnerGridList(this.requestmodel).subscribe((res) => {
      this.fasttagmodel = res;
      this.formArray.clear();
      
      for (var i = 0; i < res.fastTagDtlList.length; i++) {
        this.formArray.push(this.createInitialArray());   
        this.formArray.controls[i].get("transRefNo")?.setValue(res.fastTagDtlList[i].transRefNo);
        this.formArray.controls[i].get("vehicleNo")?.setValue(this.vehicleList.find(e => e.dataName == res.fastTagDtlList[i].vehicleNo));
        this.formArray.controls[i].get("transDateTime")?.setValue(this.commonService.formatDate(res.fastTagDtlList[i].transDateTime));
        
        this.formArray.controls[i].get("ftAmount")?.setValue(res.fastTagDtlList[i].ftAmount);
        this.formArray.controls[i].get("dtlRemarks")?.setValue(res.fastTagDtlList[i].dtlRemarks);

        this.formArray.controls[i].get("transRefNo")?.disable();
        this.formArray.controls[i].get("vehicleNo")?.disable();
        this.formArray.controls[i].get("transDateTime")?.disable();
        this.formArray.controls[i].get("ftAmount")?.disable();
        this.formArray.controls[i].get("dtlRemarks")?.disable();
        
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

      var selectedDataVal = this.formFastTag.getRawValue();
      var j=0;
      this.formArray.clear();
      for (var i = 0; i < this.data.length; i++) { 
        if (this.data[i+1][0]!="")  
        {  
          if (this.data[i+1][1].toUpperCase() =="Debit")  
          {           
            this.formArray.push(this.createInitialArray());

            var startDt = new Date(this.data[i+1][3]);    
            this.formArray.controls[j].get("transRefNo")?.setValue(this.data[i+1][0]);
            this.formArray.controls[j].get("vehicleNo")?.setValue(this.data[i+1][2]);
            //this.formArray.controls[j].get("transDateTime")?.setValue(startDt.toLocaleDateString('en-CA').toString());
            this.formArray.controls[j].get("transDateTime")?.setValue(this.data[i+1][3]);
            this.formArray.controls[j].get("ftAmount")?.setValue(this.data[i+1][4]);
            this.formArray.controls[j].get("dtlRemarks")?.setValue(this.data[i+1][5]);

            this.formArray.controls[j].get("transRefNo")?.disable();
            this.formArray.controls[j].get("vehicleNo")?.disable();
            this.formArray.controls[j].get("transDateTime")?.disable();
            this.formArray.controls[j].get("ftAmount")?.disable();
            this.formArray.controls[j].get("dtlRemarks")?.disable();

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

  
  addItem(index: number): void {
    var ind = index + 1;
    var selectedData= this.formFastTag.getRawValue();
    var arr= selectedData.arrayList;
    for (var i = 0; i < arr.length; i++) {  
      if(i!=index && arr[index].vehicleNo?arr[index].vehicleNo.dataId:""==arr[i].vehicleNo?arr[i].vehicleNo.dataId:""){
        this.toasterService.warning("Vehicle already exists in grid");
        return;
      }
    }

    if (arr[index].vehicleNo?arr[index].vehicleNo.dataId:""!= "" 
      && arr[index].ftAmount != "") {
     this.formArray.push(this.createInitialArray());
    } 
    else {
     this.toasterService.warning("Please enter vehicle no & Amount");
    }
    this.formArray.controls[ind].get("amount")?.disable();
  }

  removeItem(index: number) {
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
    }
    this.calculateTotal();
  }
  
  calculateTotal() {
    var totalFtAmt= 0;
    var selectedData = this.formFastTag.getRawValue(); 

    for (var i = 0; i < selectedData.arrayList.length; i++) {
      if (selectedData.arrayList[i].ftAmount != "") {
        totalFtAmt = totalFtAmt + parseFloat(selectedData.arrayList[i].ftAmount);
      }        
    }
     
    this.formFastTag.patchValue({
      totalFtAmt:totalFtAmt.toFixed(2),
    });
  }

  exit(): void {
    this.route.navigate(['/fastagimport']);
  }

  deleteDieselStatementForm(): void {
    if(this.selectedFasttag.ftMasterID != '' ){      
    this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedFasttag.ftMasterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.fasttagService.fasttagDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message);
              this.formFastTag.reset();
              this.route.navigate(['/fastagimport']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            }   
        });
      }      
      this.sharedService.loading = false;
    }
  }
 
  saveStatementDetails(): void {
    if (this.formFastTag.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields"); 
      const controls = this.formFastTag.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedDataVal=this.formFastTag.getRawValue();

    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.fasttagmodel.ftMasterID      = this.selectedFasttag.ftMasterID ;
    this.fasttagmodel.branchCode      = selectedDataVal.branchCode;
    this.fasttagmodel.stmtDate        = selectedDataVal.stmtDate;
    this.fasttagmodel.fromDate        = selectedDataVal.fromDate;
    this.fasttagmodel.toDate          = selectedDataVal.toDate;
    this.fasttagmodel.ftAccount       = selectedDataVal.ftAccount?selectedDataVal.ftAccount.dataId:'';
    this.fasttagmodel.remarks         = selectedDataVal.remarks.toString().toUpperCase();
    this.fasttagmodel.totalFtAmt      = selectedDataVal.totalFtAmt;
    this.fasttagmodel.yearID          = this.year;
    this.fasttagmodel.loggedInUser    = this.loggedInUserID;

    this.fasttagmodel.fastTagDtlList = [];

    var arr=selectedDataVal.arrayList;

    for (var i = 0; i < arr.length; i++) {
      if(arr[i].vehicleNo?arr[i].vehicleNo.dataId:""!='' && 
          arr[i].vehicleNo[i].dslQty!='' && arr[i].vehicleNo[i].dslRate!=''){
        this.fasttagmodel.fastTagDtlList.push({
          'ftMasterID':"",
          'transRefNo': arr[i].transRefNo.toString(),   
          'vehicleNo': arr[i].vehicleNo?arr[i].vehicleNo.dataName:"", 
          'transDateTime': arr[i].transDateTime,   
          'ftAmount': arr[i].ftAmount.toString(),   
          'dtlRemarks': arr[i].dtlRemarks.toString(),  
        });
      }
    }

    this.fasttagService.fasttagSave(this.fasttagmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formFastTag.reset();
        this.route.navigate(['/fastagimport']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
        
    this.sharedService.loading=false;
  }
}
