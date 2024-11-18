import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Addcostrecmstmodel } from 'src/app/models/addcostrecmstmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { AddcostrecorveryrptService } from 'src/app/services/addcostrecorveryrpt.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-addcostrecentryadd',
  templateUrl: './addcostrecentryadd.component.html',
  styleUrls: ['./addcostrecentryadd.component.css']
})
export class AddcostrecentryaddComponent {
  year: string = '';
  branch: string = '';
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  showDateRange = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  calc = true;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  addCostRecList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  costCodeList: Dropdownmodel[] = [];
  docTypeList: Dropdownmodel[] = [];
  othDbCrAcList: Dropdownmodel[] = [];
  accountList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedAddcostrecmst = new Addcostrecmstmodel();
  docDetails = new Reportmodel();
  
  attatchFile1 :string = ""; 
  attatchFile2 :string = ""; 
  
  @ViewChild('attatchFile1Input', {
    static: true
  }) attatchFile1Input: any;

  @ViewChild('attatchFile2Input', {
    static: true
  }) attatchFile2Input: any;


  constructor(private route: Router, private formBuilder: FormBuilder,
    private sharedService: SharedService,private cashreceiptentryService:CashReceiptEntryService,
    private addcostrecmstmodel: Addcostrecmstmodel, private addcostrecorveryrptService: AddcostrecorveryrptService, 
    private commonService: CommonService, private requestmodel:Requestmodel,
    private toasterService: ToastrService ) {
    this.addcostrecmstmodel = new Addcostrecmstmodel();
  }
  
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Addtional Cost Entry");
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

   // this.sharedService.loading = true;

    this.getBranchList();
    this.getYearList();
    this.getaddCostRecList();
    this.getPartyList();     
    this.getothDbCrAcList();

    this.selectedAddcostrecmst = this.addcostrecorveryrptService.getAddcostrecmstDetails();

    this.formUser = this.formBuilder.group({
      branchCode  :new FormControl(this.branch, [Validators.required]),
      transNo  :new FormControl("", [Validators.required]),
      transDate  :new FormControl(this.loginDate, [Validators.required]),
      addCostID :new FormControl("", [Validators.required]),
      addCostType :new FormControl("E", [Validators.required]),
      manualOrDateRange :new FormControl("M", [Validators.required]),
      documentType :new FormControl("LR", [Validators.required]),
      docBranch :new FormControl("",),
      fromDate :new FormControl("",),
      toDate :new FormControl("",),
      totalAmount :new FormControl("",[Validators.required]),
      divisionOption :new FormControl("ME",[Validators.required]),
      partyOption :new FormControl("S",),
      partyCode :new FormControl("",),
      costTot :new FormControl("",),
      othTot :new FormControl("",),
      grossTot :new FormControl("",),
      // tdsRate :new FormControl("",),
      // tdsAmt :new FormControl("",),
      netTot :new FormControl("",),
      remarks :new FormControl("",),
      othDbCrAc :new FormControl("",),
      // tdsAc :new FormControl("",),
      rpType :new FormControl("",),
      creditAc:new FormControl("",),
      neftPmt :new FormControl("",),
      chequeNo :new FormControl("",),
      chequeDate :new FormControl("",),
      modifyRemarks :new FormControl("",),
      arrayList: this.formBuilder.array([this.createInitialArray()]), 
    });

    this.formUser.controls['branchCode'].disable();  
    this.formUser.controls['transNo'].disable();  
    this.formUser.controls['documentType'].disable();  
    this.formUser.controls['totalAmount'].disable();    
    this.formUser.controls['costTot'].disable();    
    this.formUser.controls['othTot'].disable();    
    this.formUser.controls['grossTot'].disable();    
    // this.formUser.controls['tdsAmt'].disable(); 
    this.formUser.controls['netTot'].disable();   
    this.formUser.controls['modifyRemarks'].disable();  
    this.formUser.controls['addCostType'].disable();  
    

    if (this.selectedAddcostrecmst.masterID != '') {
      this.getcostCodeList(this.selectedAddcostrecmst.addCostID);
      var selectedValue = this.selectedAddcostrecmst.rpType;
      if(selectedValue=='M') {selectedValue = 'C'}
      this.getAccountList(selectedValue); 
    }

    setTimeout(() => {
      if (this.selectedAddcostrecmst.masterID != '') {
        this.formUser.controls['modifyRemarks'].enable();          
        this.attatchFile1 = Constants.UploadFolderPath + 'addcostrecentry/attatchFile1/' + this.selectedAddcostrecmst.attatchFile1;
        this.attatchFile2 = Constants.UploadFolderPath + 'addcostrecentry/attatchFile2/' + this.selectedAddcostrecmst.attatchFile2;
        this.formUser.patchValue(this.selectedAddcostrecmst);  
        this.formUser.patchValue({
          transDate:this.commonService.formatDate(this.selectedAddcostrecmst.transDate),
          fromDate:this.commonService.formatDate(this.selectedAddcostrecmst.fromDate),
          toDate:this.commonService.formatDate(this.selectedAddcostrecmst.toDate),
          chequeDate:this.commonService.formatDate(this.selectedAddcostrecmst.chequeDate),
        })   
        if (this.selectedAddcostrecmst.neftPmt=="N"){
          this.formUser.patchValue({      
            neftPmt:""
          });
        }    
        if (this.selectedAddcostrecmst.rpType == 'B'){
          this.formUser.controls['neftPmt'].enable();
          this.formUser.controls['chequeNo'].enable();
          this.formUser.controls['chequeDate'].enable();
        }
        else { 
          this.formUser.controls['neftPmt'].disable();
          this.formUser.controls['chequeNo'].disable();
          this.formUser.controls['chequeDate'].disable();
        }      
        if (this.selectedAddcostrecmst.manualOrDateRange === "M") {
          this.showDateRange = false;
          this.formUser.controls['totalAmount'].disable();     
        }
        else{
          this.showDateRange = true;
          this.formUser.controls['totalAmount'].enable();      
        }     
        this.editMode = true;
        this.formUser.controls['transNo'].disable();   
        this.formUser.controls['transDate'].disable();     
      }  
      else{
        this.getTransNo();
      }
    }, 2000); 
    
    this.sharedService.loading=false; 
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
  
  get formArray() {  
    return this.formUser.get("arrayList") as FormArray;
  }


  createInitialArray() {
    return this.formBuilder.group({
      selected: [''],
      docYear: [''],
      docBranch: [''],
      docNo: [''],
      docId: [''],
      freightRs: [''],
      chargewt: [''],
      costCode: [''],
      costAmt:[''],
      othAmt:[''],
      totAmt:[''],
      narration:[''],
    });
  }

  //Get Branch List details //
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  }    

  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
    
  getothDbCrAcList() : void {
    this.requestmodel.strRequest="IE"
    this.cashreceiptentryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.othDbCrAcList = res;
    });
  }

  getaddCostRecList(): void {
    this.commonService.getAddCostRecList().subscribe((res) => {
      this.addCostRecList = res;
    });
  }

  onaddCostchange(e:any){
    this.getcostCodeList(e.target.value);
  }
  
  getcostCodeList(addcode:string){
    this.requestmodel.strRequest = addcode;
    this.commonService.getcostCodeList(this.requestmodel).subscribe((res) => {
      this.costCodeList = res;
    });
  }

  getTransNo(): void {
    this.requestmodel.strRequest = this.branch;
    this.requestmodel.strRequest1 = this.year;
    this.addcostrecorveryrptService.getAddCostRecEntryTranNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formUser.patchValue({
          transNo: this.responseDetails.message
        });
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

  changeEntry(selectedValue: string) {
    if (selectedValue === "M") {
      this.showDateRange = false;
      this.formUser.controls['totalAmount'].disable();  
      this.formUser.controls['divisionOption'].disable();  
      this.formUser.patchValue({      
        divisionOption:"ME"
      });
      this.formArray.push(this.createInitialArray());
    }
    else{
      this.showDateRange = true;
      this.formUser.controls['totalAmount'].enable();  
      this.formUser.controls['divisionOption'].enable();  
      this.formArray.clear();    
    }   
  }

  
  changePmtType(e: any) {
    var selectedValue = e.target.value;    

    if (selectedValue == 'B'){
      this.formUser.controls['neftPmt'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDate'].enable();
    }
    else { 
      this.formUser.controls['neftPmt'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDate'].disable();
    } 
    
    if(selectedValue=='M') {selectedValue = 'C'}

    this.getAccountList(selectedValue);   
  }
  
  getAccountList(tp:string): void {    
    this.requestmodel.strRequest= tp;
    this.cashreceiptentryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
    });
  }

  search(){    
    var selectedData = this.formUser.getRawValue();
    this.docDetails.fromDate = selectedData.fromDate ;
    this.docDetails.toDate = selectedData.toDate ;
    this.docDetails.filterStr = selectedData.documentType ;
    this.docDetails.filterStr1 = selectedData.docBranch ;
     
    this.addcostrecorveryrptService.getAddCostRecEntrySearchList(this.docDetails).subscribe((res) => {
      this.formArray.clear();
      var arr = res.addCostRecDtlList;
      if(typeof arr === 'undefined' || arr === null) {
        this.toasterService.warning("No data found");
        return;
      }

      for (var i = 0; i < res.addCostRecDtlList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("docYear")?.setValue(res.addCostRecDtlList[i].docYear);
        this.formArray.controls[i].get("docBranch")?.setValue(res.addCostRecDtlList[i].docBranch);  
        this.formArray.controls[i].get("docNo")?.setValue(res.addCostRecDtlList[i].docNo); 
        this.formArray.controls[i].get("docId")?.setValue(res.addCostRecDtlList[i].docId); 
        this.formArray.controls[i].get("freightRs")?.setValue(res.addCostRecDtlList[i].freightRs); 
        this.formArray.controls[i].get("chargewt")?.setValue(res.addCostRecDtlList[i].chargewt); 

        this.formArray.controls[i].get("selected")?.enable();
        this.formArray.controls[i].get("docYear")?.disable();
        this.formArray.controls[i].get("docBranch")?.disable();
        this.formArray.controls[i].get("docNo")?.disable();
        this.formArray.controls[i].get("docId")?.disable();
        this.formArray.controls[i].get("costCode")?.disable();
        this.formArray.controls[i].get("costAmt")?.disable();
        this.formArray.controls[i].get("othAmt")?.disable();
        this.formArray.controls[i].get("totAmt")?.disable();
        this.formArray.controls[i].get("narration")?.disable();
      }     
    });
  }
  
  selectedData(i: number, e: any) { 
    var selectedData = this.formUser.getRawValue();
    if(e.target.checked){
      this.formArray.controls[i].get("costCode")?.enable();
      if (selectedData.divisionOption=="ME"){
        this.formArray.controls[i].get("costAmt")?.enable();
      }
      else{
        this.formArray.controls[i].get("costAmt")?.disable();
      }
      this.formArray.controls[i].get("othAmt")?.enable();
      this.formArray.controls[i].get("narration")?.enable();
    }
    else{
      this.formArray.controls[i].get("costCode")?.disable();
      this.formArray.controls[i].get("costAmt")?.disable();
      this.formArray.controls[i].get("othAmt")?.disable();
      this.formArray.controls[i].get("narration")?.disable();
    }
  }  
  

  getDocDtls(i:number){
    var selectedData = this.formUser.getRawValue();   
    this.docDetails.filterStr = selectedData.documentType ;
    this.docDetails.filterStr1 = selectedData.arrayList[i].docYear ;
    this.docDetails.filterStr2 = selectedData.arrayList[i].docBranch ;
    this.docDetails.filterStr3 = selectedData.arrayList[i].docNo ;
     
    this.addcostrecorveryrptService.getAddCostRecEntryDocDetails(this.docDetails).subscribe((res) => {
      var doc = res.addCostRecDtlList.length>0?res.addCostRecDtlList[0].docId:'';
      if (typeof doc === 'undefined' || doc === null || doc === '') {
        this.toasterService.warning("Doc does not Exists");
        this.formArray.controls[i].get("docNo")?.setValue("");
        return;
      }
      else{
        this.formArray.controls[i].get("docNo")?.setValue(res.addCostRecDtlList[0].docNo);
        this.formArray.controls[i].get("docId")?.setValue(res.addCostRecDtlList[0].docId);
        this.formArray.controls[i].get("freightRs")?.setValue(res.addCostRecDtlList[i].freightRs); 
        this.formArray.controls[i].get("chargewt")?.setValue(res.addCostRecDtlList[i].chargewt); 
        this.formArray.controls[i].get("totAmt")?.setValue("");
        this.formArray.controls[i].get("selected")?.setValue("Y");

        this.formArray.controls[i].get("docNo")?.disable();
        this.formArray.controls[i].get("docId")?.disable();
        this.formArray.controls[i].get("selected")?.disable();
        this.formArray.controls[i].get("totAmt")?.disable();
      }
    });
  }

  addItem(index: number): void { 
    if (this.formArray.value[index].docId!= "" ) {
      this.formArray.push(this.createInitialArray());
    } 
    else {
      this.toasterService.warning("Please select Required Fields");
    }
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
    this.calcTot(); 
  }

  calcCostAmt(){
    var selectedData = this.formUser.getRawValue();
    var totfreightRs = 0,totchargewt = 0, totalAmount = 0,costAmt = 0, cnt=0
    if(selectedData.totalAmount!=''){
      totalAmount = parseFloat(selectedData.totalAmount);
    }   
    if(selectedData.divisionOption ==  "ME"){
      for(var i = 0; i < selectedData.arrayList.length; i++){
        this.formArray.controls[i].get("costAmt")?.setValue("");   
        this.formArray.controls[i].get("othAmt")?.setValue("");   
        this.formArray.controls[i].get("totAmt")?.setValue(""); 
        this.formArray.controls[i].get("costAmt")?.enable();  
      }   
    }
    else{
      for(var i = 0; i < selectedData.arrayList.length; i++){
        if(selectedData.arrayList[i].selected){
          cnt = cnt + 1;
          var freightRs = 0 ,chargewt=0
          if(selectedData.arrayList[i].freightRs!=''){
            freightRs = parseFloat(selectedData.arrayList[i].freightRs);
          }
          if(selectedData.arrayList[i].freightRs!=''){
            chargewt = parseFloat(selectedData.arrayList[i].chargewt);
          }  
          totfreightRs = totfreightRs + freightRs;
          totchargewt = totchargewt + chargewt;
        } 
      }
      for(var i = 0; i < selectedData.arrayList.length; i++){
        if(selectedData.arrayList[i].selected){
          if(selectedData.divisionOption ==  "DF"){
            costAmt = (totalAmount *  parseFloat(selectedData.arrayList[i].freightRs))/totfreightRs
          }        
          else if(selectedData.divisionOption ==  "DW"){
            costAmt = (totalAmount *  parseFloat(selectedData.arrayList[i].chargewt))/totchargewt
          }       
          else if(selectedData.divisionOption ==  "DE"){
            costAmt = (totalAmount /cnt)
          }  
          this.formArray.controls[i].get("costAmt")?.setValue(costAmt.toFixed(2));
          this.formArray.controls[i].get("othAmt")?.setValue("");   
          this.formArray.controls[i].get("totAmt")?.setValue(costAmt.toFixed(2));  
          this.formArray.controls[i].get("costAmt")?.disable();      
        } 
      }
      var tdsRate = selectedData.tdsRate==""?0:parseFloat(selectedData.tdsRate);
      var grossTot = parseFloat(selectedData.totalAmount);
      var tdsAmt = grossTot * tdsRate/100;
      var netTot = grossTot + tdsAmt;

      this.formUser.patchValue({ 
        costTot: grossTot.toFixed(2), 
        grossTot: grossTot.toFixed(2),     
        tdsAmt: tdsAmt.toFixed(2),
        netTot: netTot.toFixed(2),
      });
    }    
  }


  calcTot(){    
    var selectedData = this.formUser.getRawValue();
    var tot = 0, totalAmount = 0, costTot = 0, othTot = 0, grossTot = 0

    for(var i = 0; i < selectedData.arrayList.length; i++){
      if(selectedData.arrayList[i].selected){
        tot = 0
        if(selectedData.arrayList[i].costAmt!=''){
          costTot = costTot + parseFloat(selectedData.arrayList[i].costAmt);
          tot = tot + parseFloat(selectedData.arrayList[i].costAmt);
        }
        if(selectedData.arrayList[i].othAmt!=''){
          othTot = othTot + parseFloat(selectedData.arrayList[i].othAmt);
          tot = tot + parseFloat(selectedData.arrayList[i].othAmt);
        }      
        this.formArray.controls[i].get("totAmt")?.setValue(tot.toFixed(2));
        this.formArray.controls[i].get("costCode")?.enable();
        this.formArray.controls[i].get("othAmt")?.enable();
        totalAmount = totalAmount + tot;
        grossTot = grossTot + tot;
      } 
    }
    var tdsRate = selectedData.tdsRate==""?0:parseFloat(selectedData.tdsRate);
    var tdsAmt = grossTot * tdsRate/100;
    var netTot = grossTot + tdsAmt;

    this.formUser.patchValue({ 
      othTot: othTot.toFixed(2),
      grossTot: grossTot.toFixed(2),     
      tdsAmt: tdsAmt.toFixed(2),
      netTot: netTot.toFixed(2),
      costTot: selectedData.totalAmount,
    });

    if(selectedData.divisionOption=="ME"){
      this.formUser.patchValue({       
        costTot: costTot.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      });
    }      
  }

  onDivOptChange(e: any){
    var selectedData = this.formUser.getRawValue();
    var divOpt = e.target.value;
    if(divOpt ==  "ME"){
      for(var i = 0; i < selectedData.arrayList.length; i++){
        this.formArray.controls[i].get("costAmt")?.enable();  
      }   
    }
    else{
      for(var i = 0; i < selectedData.arrayList.length; i++){
        this.formArray.controls[i].get("costAmt")?.disable();  
      }   
    }
  }

  onTdsChange(e: any) { 
    var selectedData = this.formUser.getRawValue();
    var tdsRate = e.target.value;
    var tdsAmt = parseFloat(selectedData.grossTot) * tdsRate/100;
    var netTot = parseFloat(selectedData.grossTot) + tdsAmt;
    this.formUser.patchValue({       
      tdsAmt: tdsAmt.toFixed(2),
      netTot: netTot.toFixed(2),
    });
  }  
  

  deleteAddCostRecEntryForm(): void {
    if(this.selectedAddcostrecmst.masterID != '' ){      
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedAddcostrecmst.masterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.addcostrecorveryrptService.addcostrecmstDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/addcostentrylist']);
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
    this.route.navigate(['/addcostentrylist']);
  }
  
  submitAddCostRecEntrySave(): void {
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

    this.formSubmitted = true;
    var selectedDataValue = this.formUser.getRawValue();
    this.addcostrecmstmodel.masterID              = this.selectedAddcostrecmst.masterID ;   
    this.addcostrecmstmodel.branchCode= selectedDataValue.branchCode.toString();
    this.addcostrecmstmodel.transNo = selectedDataValue.transNo.toString();
    this.addcostrecmstmodel.transDate = selectedDataValue.transDate.toString();
    this.addcostrecmstmodel.addCostID = selectedDataValue.addCostID.toString();
    this.addcostrecmstmodel.addCostType = selectedDataValue.addCostType.toString();
    this.addcostrecmstmodel.manualOrDateRange = selectedDataValue.manualOrDateRange.toString();
    this.addcostrecmstmodel.documentType = selectedDataValue.documentType.toString();
    this.addcostrecmstmodel.docBranch = selectedDataValue.docBranch.toString();
    this.addcostrecmstmodel.fromDate = selectedDataValue.fromDate.toString();
    this.addcostrecmstmodel.toDate = selectedDataValue.toDate.toString();
    this.addcostrecmstmodel.totalAmount = selectedDataValue.totalAmount.toString();
    this.addcostrecmstmodel.divisionOption = selectedDataValue.divisionOption.toString();
    this.addcostrecmstmodel.partyOption = selectedDataValue.partyOption.toString();
    this.addcostrecmstmodel.partyCode = selectedDataValue.partyCode.toString();
    this.addcostrecmstmodel.costTot = selectedDataValue.costTot.toString();
    this.addcostrecmstmodel.othTot = selectedDataValue.othTot.toString();
    this.addcostrecmstmodel.grossTot = selectedDataValue.grossTot.toString();
    // this.addcostrecmstmodel.tdsRate = selectedDataValue.tdsRate.toString();
    // this.addcostrecmstmodel.tdsAmt = selectedDataValue.tdsAmt.toString();
    // this.addcostrecmstmodel.tdsAc = selectedDataValue.tdsAc.toString();
    this.addcostrecmstmodel.tdsRate = "";
    this.addcostrecmstmodel.tdsAmt = "";
    this.addcostrecmstmodel.tdsAc = "";
    this.addcostrecmstmodel.netTot = selectedDataValue.netTot.toString();
    this.addcostrecmstmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.addcostrecmstmodel.othDbCrAc = selectedDataValue.othDbCrAc.toString();
    this.addcostrecmstmodel.rpType = selectedDataValue.rpType.toString();
    this.addcostrecmstmodel.creditAc = selectedDataValue.creditAc.toString();
    this.addcostrecmstmodel.neftPmt = selectedDataValue.neftPmt?"Y":"N";
    this.addcostrecmstmodel.chequeNo = selectedDataValue.chequeNo.toString();
    this.addcostrecmstmodel.chequeDate = selectedDataValue.chequeDate.toString();
    this.addcostrecmstmodel.modifyRemarks       = selectedDataValue.modifyRemarks.toString().toUpperCase();
    this.addcostrecmstmodel.yearId              = this.year;
    this.addcostrecmstmodel.loggedInUser        = this.loggedInUserID;

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].selected){
        this.addcostrecmstmodel.addCostRecDtlList.push({
          'masterID' : "",
          'addCostID' :"",
          'documentType':selectedDataValue.documentType.toString(),
          'docYear' : selectedDataValue.arrayList[i].docYear.toString(),
          'docBranch' : selectedDataValue.arrayList[i].docBranch.toString(),
          'docNo' : selectedDataValue.arrayList[i].docNo.toString(),
          'docId' : selectedDataValue.arrayList[i].docId.toString(),
          'freightRs':"",
          'chargewt':"",
          'costCode' : selectedDataValue.arrayList[i].costCode.toString(),
          'costAmt': selectedDataValue.arrayList[i].costAmt.toString(),
          'othAmt' : selectedDataValue.arrayList[i].othAmt.toString(),
          'totAmt' : selectedDataValue.arrayList[i].totAmt.toString(),
          'narration' : selectedDataValue.arrayList[i].narration.toString(),
        })
      }
    }
    let formData = new FormData();
    formData.append('attatchFile1', this.attatchFile1Input.nativeElement.files[0]); 
    formData.append('attatchFile2', this.attatchFile2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.addcostrecmstmodel));

    this.sharedService.loading = true;
    this.addcostrecorveryrptService.saveAddcostrecmstDetails(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/addcostentrylist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });    
    this.sharedService.loading=false;
  }
}

