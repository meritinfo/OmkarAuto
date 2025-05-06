
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CciInvmstlistmodel } from 'src/app/models/cciInvmstlistmodel';
import { Ccinvmstmodel } from 'src/app/models/cciInvmstmodel';
import { CciInvoiceMstService } from 'src/app/services/cciInvmst.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-cciinvoicemstadd',
  templateUrl: './cciinvoicemstadd.component.html',
  styleUrls: ['./cciinvoicemstadd.component.css']
})
export class CciinvoicemstaddComponent {
   loggedInUserID: string = '';
    formUser!: FormGroup;
    year: string = '';
    branch: string = '';
    loginDate: string = '';
    fromDate: string = '';
    maxDate: string = '';
    gcYear: string = '';
    pct: string = '';
    gtyp: string = '';
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
    createdBy : string = "";
    modifiedBy: string = "";
    stateList: Dropdownmodel[] = [];
    sparesList: Dropdownmodel[] = [];
    maintList: Dropdownmodel[] = [];
    branchList: Dropdownmodel[] = [];
    vehicleList : Dropdownmodel[] = [];
    chList: Dropdownmodel[] = [];
    modelList: Dropdownmodel[] = [];
    vendorList: Dropdownmodel[] = [];
    locationList: Dropdownmodel[] = [];
    vehicleTypeList: Dropdownmodel[] = [];
    creditAcList: Dropdownmodel[] = [];
    ccinvoicemstmodel = new Ccinvmstmodel();
    refDocAttachedImage: string = "";
  
    @ViewChild('attachmentInput', {
      static: true
    }) attachmentInput: any;
  
    selectedCciInvMstDetail = new Ccinvmstmodel();
  
    constructor(private route: Router, private formBuilder: FormBuilder, 
      private ccinvmstmodel: Ccinvmstmodel, 
      private cciInvoiceMstService:CciInvoiceMstService, 
      private commonService: CommonService,private toastrService: ToastrService,
      private requestmodel:Requestmodel) {
      this.ccinvmstmodel = new Ccinvmstmodel();

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "CCI Invoice Entry");
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



  this.selectedCciInvMstDetail = this.cciInvoiceMstService.getCciinvoiceMasterDetails();
  this.formUser = this.formBuilder.group({
    cciInvMstId : new FormControl('',),
    cciInvNo : new FormControl('',[Validators.required]),
    cciInvDate  : new FormControl(this.loginDate,[Validators.required]),
    remarks  : new FormControl('',),
    gstType : new FormControl('NA',[Validators.required]),
    totalTaxableAmt : new FormControl('',),
    totalSgstAmt : new FormControl('',[Validators.required]),
    totalCgstAmt : new FormControl('',[Validators.required]),
    totalIgstAmt : new FormControl('',[Validators.required]),
    totalInvAmt : new FormControl('',[Validators.required]),
    YearId  : new FormControl('',),
   
   
    arrayList: this.formBuilder.array([this.createVehicleArray()]),
  }); 

  this.getChCostList();
 // this.getVendorList();
  this.getBranchList();

  this.formTyreArray.controls[0].get("gcNoteNo")?.disable();   
  this.formTyreArray.controls[0].get("gcBook")?.disable();   
  this.formTyreArray.controls[0].get("sgstAmt")?.disable(); 
  this.formTyreArray.controls[0].get("sgstPct")?.disable(); 
  this.formTyreArray.controls[0].get("cgstAmt")?.disable(); 
  this.formTyreArray.controls[0].get("cgstPct")?.disable(); 
  this.formTyreArray.controls[0].get("igstAmt")?.disable(); 
  this.formTyreArray.controls[0].get("igstPct")?.disable();
  // this.formTyreArray.controls[0].get("netAmount")?.disable(); 
 // this.formTyreArray.controls[0].get("itemAmount")?.disable(); 

  this.formUser.controls["totalSgstAmt"].disable();
  this.formUser.controls["totalCgstAmt"].disable();
  this.formUser.controls["totalIgstAmt"].disable();
  this.formUser.controls["totalTaxableAmt"].disable();
  this.formUser.controls["totalInvAmt"].disable();  

  // this.formUser.controls['totItemNetAmount'].disable(); 
  // if (this.selectedCciInvMstDetail.vrmTransId  != '') {      
  //   this.getCreditAcList(this.selectedvehiclerepmaintMasterDetail.pmtType);
  // }

  if (this.selectedCciInvMstDetail.cciInvMstId  != '') {
    setTimeout(() => {
    
     // this.refDocAttachedImage = Constants.UploadFolderPath + 'vehicleRepairs/refDocAttachedImage/' + this.selectedvehiclerepmaintMasterDetail.refDocAttachedImage;
     this.createdBy = this.selectedCciInvMstDetail.createdBy + " " + this.selectedCciInvMstDetail.createdDate;
     this.modifiedBy = this.selectedCciInvMstDetail.modifiedBy + " " + this.selectedCciInvMstDetail.modifiedDate;   
      this.formUser.patchValue(this.selectedCciInvMstDetail);
      this.formUser.patchValue({
        cciInvDate : this.commonService.formatDate(this.selectedCciInvMstDetail.cciInvDate ),


       // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
       // vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vehicleMasterId),
      })  
     
      this.formUser.controls["gstType"].disable();  
      this.formUser.controls["cciInvDate"].disable();
      this.formUser.controls["cciInvNo"].disable();
   
      // this.formTyreArray.controls[0].get("availQty")?.disable();
      this.formTyreArray.controls[0].get("containerNo")?.disable();   
      this.formTyreArray.controls[0].get("gcNoteNo")?.disable(); 
      this.formTyreArray.controls[0].get("gcYear")?.disable(); 
      this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
      this.formTyreArray.controls[0].get("cgstAmt")?.disable();  
      this.formTyreArray.controls[0].get("igstAmt")?.disable();  
      this.formTyreArray.controls[0].get("sgstPct")?.disable();   
      this.formTyreArray.controls[0].get("cgstPct")?.disable();  
      this.formTyreArray.controls[0].get("igstPct")?.disable();   
       this.formTyreArray.controls[0].get("totalAmt")?.disable(); 
      // this.formTyreArray.controls[0].get("itemAmount")?.disable();       
                
  
      this.getCcInvMasterInnerGridList();
      this.editMode =true;
    }, 2000);  
  }
}
get f() { return this.formUser.controls; }

  get formTyreArray() {
    return this.formUser.get("arrayList") as FormArray;    
  }

  selectEvent(item: any) {
    // do something with selected item
    this.formUser.patchValue({
      vendorName: item.dataName
    })
    this.requestmodel.strRequest = item.dataId;
    this.commonService.getVendorDetails(this.requestmodel).subscribe((res) => {
      this.formUser.patchValue({
        vendorAddress: res.strRequest,
        vendorGstNo: res.strRequest1,
      })
    });  

  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getChCostList(): void {
    this.cciInvoiceMstService.getChCostList().subscribe((res) => {
      this.chList = res;
    });
  }

  cciInvoiceMstDelete(): void {
      if(this.selectedCciInvMstDetail.cciInvMstId  != '' ){
      this.requestmodel.strRequest =this.selectedCciInvMstDetail.cciInvMstId 
        if (confirm("Are you sure, you want to delete this?")) {
              this.cciInvoiceMstService.cciInvoiceMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status) {
                this.toastrService.success(this.responseDetails.message);
                this.formUser.reset();
                this.route.navigate(['/ccinvoicelist']);
              }
              else {
                this.toastrService.warning(this.responseDetails.message);
              }
          });
        }
      }
    }
      
    exit(): void {
      this.route.navigate(['/ccinvoicelist']);
    }  

     createVehicleArray() {
        return this.formBuilder.group({
          cciInvDtlId: [''],
          cciInvMstId: [''],
          containerNo: [''],
          gcYear: [''],
          gcBook: [''],
          gcNoteNo: [''],
          chCostId: ['' ,[Validators.required]],
          taxableAmt: ['',],
          sgstPct: [''],
          sgstAmt: [''],
          cgstPct: [''],
          cgstAmt: [''],
          igstPct: [''],
          igstAmt: [''],
          totalAmt: [''],
          dtlRemarks: [''],
        });
      }
  
    getCcInvMasterInnerGridList(): void {
      this.requestmodel.strRequest = this.selectedCciInvMstDetail.cciInvMstId; 
      this.cciInvoiceMstService.getCciInvoiceMasterInnerGridList(this.requestmodel).subscribe((res) => {
        this.formTyreArray.clear();
        this.ccinvmstmodel = res;
        for (var i = 0; i < res.ccinvmstDtlList.length; i++) {
          this.formTyreArray.push(this.createVehicleArray());
          this.formTyreArray.controls[i].get("cciInvDtlId")?.setValue(res.ccinvmstDtlList[i].cciInvDtlId);
          this.formTyreArray.controls[i].get("cciInvMstId")?.setValue(res.ccinvmstDtlList[i].cciInvMstId);  
          this.formTyreArray.controls[i].get("containerNo")?.setValue(res.ccinvmstDtlList[i].containerNo); 
          this.formTyreArray.controls[i].get("gcYear")?.setValue(res.ccinvmstDtlList[i].gcYear);  
          this.formTyreArray.controls[i].get("gcBook")?.setValue(res.ccinvmstDtlList[i].gcBook);   
          this.formTyreArray.controls[i].get("gcNoteNo")?.setValue(res.ccinvmstDtlList[i].gcNoteNo);         
          this.formTyreArray.controls[i].get("chCostId")?.setValue(res.ccinvmstDtlList[i].chCostId);  
          this.formTyreArray.controls[i].get("taxableAmt")?.setValue(res.ccinvmstDtlList[i].taxableAmt);    
        
          this.formTyreArray.controls[i].get("sgstPct")?.setValue(res.ccinvmstDtlList[i].sgstPct);   
          this.formTyreArray.controls[i].get("sgstAmt")?.setValue(res.ccinvmstDtlList[i].sgstAmt);  
          this.formTyreArray.controls[i].get("cgstPct")?.setValue(res.ccinvmstDtlList[i].cgstPct);  
          this.formTyreArray.controls[i].get("cgstAmt")?.setValue(res.ccinvmstDtlList[i].cgstAmt);  
          this.formTyreArray.controls[i].get("igstPct")?.setValue(res.ccinvmstDtlList[i].igstPct);  
          this.formTyreArray.controls[i].get("igstAmt")?.setValue(res.ccinvmstDtlList[i].igstAmt);  
          this.formTyreArray.controls[i].get("totalAmt")?.setValue(res.ccinvmstDtlList[i].totalAmt); 
          this.formTyreArray.controls[i].get("dtlRemarks")?.setValue(res.ccinvmstDtlList[i].dtlRemarks); 
        
          // this.formTyreArray.controls[i].get("availQty")?.disable();
          this.formTyreArray.controls[i].get("containerNo")?.disable();    
          this.formTyreArray.controls[i].get("gcNoteNo")?.disable();  
          this.formTyreArray.controls[i].get("gcBook")?.disable();  
          this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
           this.formTyreArray.controls[i].get("sgstAmt")?.disable();     
          this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
          this.formTyreArray.controls[i].get("cgstPct")?.disable();  
          this.formTyreArray.controls[i].get("sgstPct")?.disable(); 
          this.formTyreArray.controls[i].get("igstPct")?.disable(); 
          this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
           this.formTyreArray.controls[i].get("totalAmt")?.disable(); 
          // this.formTyreArray.controls[0].get("itemAmount")?.disable();   
  
          if (this.selectedCciInvMstDetail.gstType == "IG") {   
            this.formTyreArray.controls[i].get("sgstPct")?.disable();   
            this.formTyreArray.controls[i].get("cgstPct")?.disable();  
           // this.formTyreArray.controls[i].get("igstPct")?.enable();  
          }    
          else if (this.selectedCciInvMstDetail.gstType == "SC")  {      
           // this.formTyreArray.controls[i].get("sgstPct")?.enable();   
           // this.formTyreArray.controls[i].get("cgstPct")?.enable();  
            this.formTyreArray.controls[i].get("igstPct")?.disable();  
          }
          else{              
            this.formTyreArray.controls[i].get("sgstPct")?.disable();   
            this.formTyreArray.controls[i].get("cgstPct")?.disable();  
            this.formTyreArray.controls[i].get("igstPct")?.disable();  
          } 
        }     
      });

    }

    gstChange(){

    }
    getCnDetail(i:number): void {
      var selectedData = this.formUser.getRawValue();  
      this.requestmodel.strRequest = selectedData.arrayList[i].containerNo; 
      this.cciInvoiceMstService.getCnDetail(this.requestmodel).subscribe((res) => {
      // this.formTyreArray.clear();
        this.ccinvmstmodel = res;
      //  for (var i = 0; i < res.ccinvmstDtlList.length; i++) {
      //     this.formTyreArray.push(this.createVehicleArray());
       if( selectedData.arrayList[i].containerNo){
           if (res.ccinvmstDtlList[0]) {
            if(selectedData.gstType!=''){
            this.formUser.controls["gstType"].disable(); 
           }
            this.formTyreArray.controls[i].get("chCostId")?.enable(); 
            this.formTyreArray.controls[i].get("sgstAmt")?.disable(); 
            this.formTyreArray.controls[i].get("sgstPct")?.disable(); 
            this.formTyreArray.controls[i].get("cgstAmt")?.disable(); 
            this.formTyreArray.controls[i].get("cgstPct")?.disable(); 
            this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
            this.formTyreArray.controls[i].get("igstPct")?.disable(); 
            this.formTyreArray.controls[i].get("totalAmt")?.disable(); 
          //  this.formTyreArray.controls[i].get("taxableAmt")?.disable(); 
            this.formTyreArray.controls[i].get("gcNoteNo")?.setValue(res.ccinvmstDtlList[0].gcNoteNo);
            this.formTyreArray.controls[i].get("gcBook")?.setValue(res.ccinvmstDtlList[0].gcBook);
            this.formTyreArray.controls[i].get("gcYear")?.setValue(res.ccinvmstDtlList[0].gcYear);
           // this.formTyreArray.controls[i].get("containerNo")?.setValue(res.ccinvmstDtlList[i].containerNo);
          
         
  
  
             this.formTyreArray.controls[i].get("gcNoteNo")?.disable();   
             this.formTyreArray.controls[i].get("gcBook")?.disable();  
          }
         else{
            this.toastrService.warning("invalid container no");
            this.formTyreArray.controls[i].get("gcNoteNo")?.setValue('');
            this.formTyreArray.controls[i].get("gcBook")?.setValue('');
          }
  
       
        }    else{
          this.formTyreArray.controls[i].get("gcNoteNo")?.setValue('');
          this.formTyreArray.controls[i].get("gcBook")?.setValue('');

        } 
      });
    }
    getChCostDetail(i:number): void {
      var selectedDataval = this.formUser.getRawValue(); 
    
      if (selectedDataval.gstType!=""){
      
      this.requestmodel.strRequest = selectedDataval.arrayList[i].chCostId; 
      this.cciInvoiceMstService.getChCostDetail(this.requestmodel).subscribe((res) => {
        this.responseDetails = res;
        this.pct = this.responseDetails.message;
        var sgpct =0;
        var igpct =0;
        var sgamt =0;
        var igamt =0;
        if(selectedDataval.gstType=='SC'){
          sgpct = parseFloat(this.pct)/2;
          sgamt = selectedDataval.arrayList[i].taxableAmt*sgpct/100;
          igamt=0;
        }
        else if(selectedDataval.gstType=='IG'){
          igpct = parseFloat(this.pct);
          igamt = selectedDataval.arrayList[i].taxableAmt*igpct/100;
          sgamt=0;
        }  
        this.formTyreArray.controls[i].get("sgstPct")?.setValue(sgpct); 
        this.formTyreArray.controls[i].get("cgstPct")?.setValue(sgpct); 
        this.formTyreArray.controls[i].get("sgstAmt")?.setValue(sgamt.toFixed(2)); 
        this.formTyreArray.controls[i].get("cgstAmt")?.setValue(sgamt.toFixed(2)); 
        this.formTyreArray.controls[i].get("igstPct")?.setValue(igpct);
        this.formTyreArray.controls[i].get("igstAmt")?.setValue(igamt.toFixed(2)); 
        
        var totamt = 0
        totamt = sgamt+sgamt+igamt+ parseFloat(selectedDataval.arrayList[i].taxableAmt);
        this.formTyreArray.controls[i].get("totalAmt")?.setValue(totamt);
        
        this.formTyreArray.controls[i].get("totalAmt")?.disable();  
        this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
        this.formTyreArray.controls[i].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i].get("sgstAmt")?.disable();  
        this.formTyreArray.controls[i].get("sgstPct")?.disable();  
        this.formTyreArray.controls[i].get("igstAmt")?.disable();  
        this.formTyreArray.controls[i].get("igstPct")?.disable();  
        this.formTyreArray.controls[i].get("chCostId")?.enable(); 
        this.calculateTotal();   
      });
    }
    else{
      this.toastrService.warning("Please select gst Type");
      this.formTyreArray.controls[i].get("taxableAmt")?.setValue('');
    }
    }
    

    calculateTotal(){
      var totalInvAm = 0;
      var totalSgstAm = 0;
      var totalCgstAm= 0;
      var totalIgstAm = 0;
      var totalTaxableAm = 0;
      var selectedData = this.formUser.getRawValue();  
   
      for (let i = 0; i < selectedData.arrayList.length; i++) {
       totalSgstAm = totalSgstAm + parseFloat( selectedData.arrayList[i].sgstAmt);
       totalCgstAm = totalCgstAm + parseFloat(selectedData.arrayList[i].cgstAmt);
       totalIgstAm = totalIgstAm + parseFloat(selectedData.arrayList[i].igstAmt);
       totalTaxableAm  = totalTaxableAm + parseFloat(selectedData.arrayList[i].taxableAmt);
       totalInvAm = totalInvAm + parseFloat(selectedData.arrayList[i].totalAmt);
      }
   
     
        this.formUser.patchValue({
          totalSgstAmt : totalSgstAm,
          totalCgstAmt : totalCgstAm,
          totalIgstAmt : totalIgstAm,
          totalTaxableAmt : totalTaxableAm,
          totalInvAmt: totalInvAm,
  
         // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
         // vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vehicleMasterId),
        })  
       
      

    }
   
    addItem(index: number): void {
      if (this.formTyreArray.value[index].containerNo != "" && this.formTyreArray.value[index].chCostId != "" )
    {
      this.formTyreArray.push(this.createVehicleArray());
             // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
            // this.calculateTotal();
            var i= index+1;
            this.formTyreArray.controls[i].get("gcNoteNo")?.disable();   
            this.formTyreArray.controls[i].get("gcBook")?.disable();   
            this.formTyreArray.controls[i].get("sgstAmt")?.disable(); 
            this.formTyreArray.controls[i].get("sgstPct")?.disable(); 
            this.formTyreArray.controls[i].get("cgstAmt")?.disable(); 
            this.formTyreArray.controls[i].get("cgstPct")?.disable(); 
            this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
            this.formTyreArray.controls[i].get("igstPct")?.disable();
      }
      else {
       this.toastrService.warning("Please select Required Fields ");
        return;
     } 
    }
    removeItem(index: number){ 
      if (confirm("Are you sure, you want to delete this row?")) {
        this.formTyreArray.removeAt(index);  
        //this.onPctChange();
        this.calculateTotal();
      }
    }
    
  submitCciInvMasterForm(): void {
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }
      return;
    }

    var selectedDataValue = this.formUser.getRawValue();
    
  this.ccinvmstmodel.cciInvMstId = this.selectedCciInvMstDetail.cciInvMstId ;
  this.ccinvmstmodel.cciInvNo= selectedDataValue.cciInvNo;
  this.ccinvmstmodel.cciInvDate = selectedDataValue.cciInvDate
  this.ccinvmstmodel.remarks= selectedDataValue.remarks.toString().toUpperCase(),  
  this.ccinvmstmodel.gstType= selectedDataValue.gstType;
  this.ccinvmstmodel.totalTaxableAmt= selectedDataValue.totalTaxableAmt.toString();
 // this.ccinvmstmodel.nonVendor= selectedDataValue.nonVendor?"Y":"N";
 // this.ccinvmstmodel.vendorId= selectedDataValue.vendorId.dataId?selectedDataValue.vendorId.dataId:'';
  this.ccinvmstmodel.totalSgstAmt= selectedDataValue.totalSgstAmt.toString();;
  this.ccinvmstmodel.totalCgstAmt= selectedDataValue.totalCgstAmt.toString();;
  this.ccinvmstmodel.totalIgstAmt= selectedDataValue.totalIgstAmt.toString();;
  this.ccinvmstmodel.totalInvAmt= selectedDataValue.totalInvAmt.toString();;
  
 // this.vehiclerepmaintMaster.vendorGstNo= selectedDataValue.vendorGstNo.toString().toUpperCase();

 // this.vehiclerepmaintMaster.branchCode = this.branch;
  this.ccinvmstmodel.yearId= this.year;
  this.ccinvmstmodel.loggedInUser=  this.loggedInUserID;

  this.ccinvmstmodel.ccinvmstDtlList = [];
    if(selectedDataValue.netAmount=="" || parseFloat(selectedDataValue.netAmount)==0 ){
      this.toastrService.warning("Total Net Amount should not be zero");
      return;
    }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].containerNo == ""  ) {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        this.ccinvmstmodel.ccinvmstDtlList.push({
          'cciInvDtlId': "",
          'cciInvMstId': "",
          'containerNo': selectedDataValue.arrayList[i].containerNo,
          'gcYear': selectedDataValue.arrayList[i].gcYear,
          'gcBook': selectedDataValue.arrayList[i].gcBook,
          'gcNoteNo':selectedDataValue.arrayList[i].gcNoteNo,
          'chCostId': selectedDataValue.arrayList[i].chCostId,
          'taxableAmt': selectedDataValue.arrayList[i].taxableAmt.toString(),
          'sgstPct': selectedDataValue.arrayList[i].sgstPct.toString(),
          'sgstAmt': selectedDataValue.arrayList[i].sgstAmt.toString(),
          'cgstPct': selectedDataValue.arrayList[i].sgstPct.toString(),
          'cgstAmt': selectedDataValue.arrayList[i].cgstAmt.toString(),
          'igstPct': selectedDataValue.arrayList[i].igstPct.toString(),
          'igstAmt': selectedDataValue.arrayList[i].igstAmt.toString(),
          'totalAmt': selectedDataValue.arrayList[i].totalAmt.toString(),
          'dtlRemarks': selectedDataValue.arrayList[i].dtlRemarks.toString().toLowerCase(),        
        }) 
      }   
    } 
    
    // if(this.ccinvmstmodel.ccinvmstDtlList.length==0){
    //   this.toastrService.warning("Please enter atleast one Record in Details");
    //   return;
    // }

    
    this.formSubmitted = true;
    //formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
    //formData.append('datadetails', JSON.stringify(this.vehiclerepmaintMaster));  

    this.cciInvoiceMstService.cciInvoiceMasterSubmitted(this.ccinvmstmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/ccinvoicelist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
} 




  