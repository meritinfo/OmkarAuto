import { Component,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Gstpurchasemodel  } from 'src/app/models/gstpurchasemodel';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { CommonService } from 'src/app/services/common.service';
import { GstpurchaseService } from 'src/app/services/gstpurchase.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-gstpurchaseadd',
  templateUrl: './gstpurchaseadd.component.html',
  styleUrls: ['./gstpurchaseadd.component.css']
})
export class GstpurchaseaddComponent {
  formGSTPurchase!: FormGroup;
  noVenderSelected: boolean=false;
  neftPmtSelected: boolean=false;
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  branchid:string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  tdsAcList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  paymentTypes:Dropdownmodel[]=[];
  seriesDoc: string = "";
  createdBy:string = "";
  modifiedBy:string = "";


  selectedGstpurchaseDetails = new Gstpurchasemodel(); 
  attach1: string = "";
  attach2: string = "";
  
  @ViewChild('attach1Input', {
    static: true
  }) attach1Input: any;
  @ViewChild('attach2Input', {
    static: true
  }) attach2Input: any;


  constructor(private formBuilder: FormBuilder,private route: Router, 
    private gstpurchasemodel: Gstpurchasemodel, private requestmodel:Requestmodel,
    private gstpurchaseService: GstpurchaseService, private sharedService: SharedService,       
    private toasterService: ToastrService,private docrenewalEntryService:DocRenewalEntryService,
    private commonService: CommonService) {
  }

  ngOnInit() {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "GST Purchase Entry");     
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }

    var userbranchcode = sessionStorage.getItem('userBranch')?.toString();  
    if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
      this.branchid = userbranchcode;
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
    
    this.fromDate = this.minDate ;
    
    this.formGSTPurchase = this.formBuilder.group({
      branchCode: new FormControl(this.branchid,[Validators.required]),
      transDate: new FormControl(this.loginDate, [Validators.required]),
      gstType: new FormControl('NA', [Validators.required]),
      pmtType: new FormControl('', [Validators.required]),
      noVender: new FormControl('',),
      vendorName: new FormControl('',[Validators.required]),
      vendorAddress: new FormControl('',[Validators.required]),
      vendorState: new FormControl('',[Validators.required]),
      vendorGST: new FormControl('',[Validators.required]),
      vendorId: new FormControl('',[Validators.required]),
      vendorInvNo: new FormControl('',[Validators.required]),
      vendorInvDt: new FormControl(this.loginDate,[Validators.required]),
      totalItemAmt: new FormControl('0',[Validators.required]),
      totalSgstAmt: new FormControl('0',),
      totalCgstAmt: new FormControl('0',),
      totalIgstAmt: new FormControl('0',),
      totalAmount: new FormControl('0',[Validators.required]),
      tDSAmt: new FormControl('0',),
      tdsAc : new FormControl('',[Validators.required]),
      roundOff: new FormControl('0',),
      netAmount: new FormControl('0',[Validators.required]),
      creditAc: new FormControl('',),
      neftPmt:new FormControl('',),
      chequeNo:new FormControl('',[Validators.required]),
      chequeDate:new FormControl(this.loginDate,[Validators.required]),
      //inputEligible:new FormControl('Y',),
      modifyRemarks:new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()])      
    });
    
    this.formGSTPurchase.controls["vendorName"].disable();      
    this.formGSTPurchase.controls["vendorAddress"].disable();      
    this.formGSTPurchase.controls["vendorState"].disable();      
    this.formGSTPurchase.controls["vendorGST"].disable();

    this.formGSTPurchase.controls['totalItemAmt'].disable();
    this.formGSTPurchase.controls['totalSgstAmt'].disable();
    this.formGSTPurchase.controls['totalCgstAmt'].disable();
    this.formGSTPurchase.controls['totalIgstAmt'].disable();
    this.formGSTPurchase.controls['totalAmount'].disable();
    this.formGSTPurchase.controls['netAmount'].disable();

    this.formGSTPurchase.controls["vendorName"].clearValidators();      
    this.formGSTPurchase.controls["vendorAddress"].clearValidators();      
    this.formGSTPurchase.controls["vendorState"].clearValidators();      
    this.formGSTPurchase.controls["vendorGST"].clearValidators();
    
    this.formGSTPurchase.controls["vendorName"].updateValueAndValidity();      
    this.formGSTPurchase.controls["vendorAddress"].updateValueAndValidity();      
    this.formGSTPurchase.controls["vendorState"].updateValueAndValidity();      
    this.formGSTPurchase.controls["vendorGST"].updateValueAndValidity();
    
    this.formGSTPurchase.controls['chequeNo'].disable();      
    this.formGSTPurchase.controls['chequeDate'].disable();   

    this.formGSTPurchase.controls['chequeNo'].clearValidators();      
    this.formGSTPurchase.controls['chequeDate'].clearValidators(); 
    this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
    this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();
    

    this.formArray.controls[0].get("sgstPct")?.disable();      
    this.formArray.controls[0].get("cgstPct")?.disable();   
    this.formArray.controls[0].get("igstPct")?.disable();
    this.formArray.controls[0].get("sgstAmt")?.disable();      
    this.formArray.controls[0].get("cgstAmt")?.disable();   
    this.formArray.controls[0].get("igstAmt")?.disable();
    this.formArray.controls[0].get("totAmount")?.disable();


    this.sharedService.loading=true;
    this.getDebitAcList();
    this.getBranchList();
    this.getVendorList();
    this.getTdsAcList();
    this.getStateList();

    this.selectedGstpurchaseDetails = this.gstpurchaseService.getGstPurchageDetails();

    if (this.selectedGstpurchaseDetails.masterid != '') {   
      this.formGSTPurchase.controls['transDate'].disable();
    }
    
    this.formGSTPurchase.controls['vendorId'].enable(); 
    this.formGSTPurchase.controls['modifyRemarks'].disable();  
    this.formGSTPurchase.controls['neftPmt'].disable();

    this.formGSTPurchase.controls['chequeNo'].clearValidators();      
    this.formGSTPurchase.controls['chequeDate'].clearValidators();  
    this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
    this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();
      
    this.formGSTPurchase.controls['tdsAc'].clearValidators();  
    this.formGSTPurchase.controls['tdsAc'].updateValueAndValidity();

    this.paymentTypes= [      
      {
        dataId: "M",
        dataName: "Cash"
      },
      {
        dataId: "B",
        dataName: "Bank"
      },
      {
        dataId: "H",
        dataName: "Happay"
      },
      {
        dataId: "D",
        dataName: "Vendor"
      },
      {
        dataId: "A",
        dataName: "Adjust"
      },
    ];

    if (this.selectedGstpurchaseDetails.masterid != '') {    
      if (this.selectedGstpurchaseDetails.vendorId == '' || this.selectedGstpurchaseDetails.vendorId=='0')
      {
        this.paymentTypes= [      
          {
            dataId: "M",
            dataName: "Cash"
          },
          {
            dataId: "B",
            dataName: "Bank"
          },
          {
            dataId: "H",
            dataName: "Happay"
          },
        ];
      }    
      this.getPaymentCreditAcList(this.selectedGstpurchaseDetails.pmtType);
    }

    setTimeout(() => {
      if (this.selectedGstpurchaseDetails.masterid != '') {    
        this.attach1 = Constants.UploadFolderPath + 'gstpurchase/attatchFile1/' + this.selectedGstpurchaseDetails.attatchFile1;
        this.attach2 = Constants.UploadFolderPath + 'gstpurchase/attatchFile2/' + this.selectedGstpurchaseDetails.attatchFile2;
        this.formGSTPurchase.controls['modifyRemarks'].enable();  
        this.formGSTPurchase.patchValue(this.selectedGstpurchaseDetails);        
        if(this.selectedGstpurchaseDetails.findocid!="0"){
          this.getFinDocDetails(this.selectedGstpurchaseDetails.findocid);
        }
        this.formGSTPurchase.patchValue({
          transDate: this.commonService.formatDate(this.selectedGstpurchaseDetails.transDate),
          vendorInvDt: this.commonService.formatDate(this.selectedGstpurchaseDetails.vendorInvDt),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedGstpurchaseDetails.vendorId),
          tDSAmt:this.selectedGstpurchaseDetails.tdsAmt,
          neftPmt:''
        });
        if (this.selectedGstpurchaseDetails.vendorId == '' || this.selectedGstpurchaseDetails.vendorId=='0')
        {      
          this.formGSTPurchase.patchValue({
            noVender: 'A',
            vendorId: ''
          });
          this.formGSTPurchase.controls['tDSAmt'].disable(); 
          this.formGSTPurchase.controls['tdsAc'].disable();     
          this.formGSTPurchase.controls['vendorId'].disable();        
          this.formGSTPurchase.controls["vendorName"].enable();      
          this.formGSTPurchase.controls["vendorAddress"].enable();      
          this.formGSTPurchase.controls["vendorState"].enable();     
          this.formGSTPurchase.controls["vendorGST"].enable();

          this.formGSTPurchase.controls['vendorId'].clearValidators(); 
          this.formGSTPurchase.controls['vendorName'].setValidators([Validators.required]);
          this.formGSTPurchase.controls['vendorAddress'].setValidators([Validators.required]);    
          this.formGSTPurchase.controls["vendorState"].setValidators([Validators.required]);    
          this.formGSTPurchase.controls['vendorGST'].setValidators([Validators.required]);      
        }
        else {  
          this.formGSTPurchase.patchValue({
            noVender: ''
          });    
          this.formGSTPurchase.controls['tDSAmt'].enable();   
          this.formGSTPurchase.controls['tdsAc'].enable();   
          this.formGSTPurchase.controls['vendorId'].enable();        
          this.formGSTPurchase.controls["vendorName"].disable();      
          this.formGSTPurchase.controls["vendorAddress"].disable();     
          this.formGSTPurchase.controls["vendorState"].disable();    
          this.formGSTPurchase.controls["vendorGST"].disable();

          this.formGSTPurchase.controls['vendorId'].setValidators([Validators.required]);
          this.formGSTPurchase.controls['vendorName'].clearValidators(); 
          this.formGSTPurchase.controls['vendorAddress'].clearValidators();    
          this.formGSTPurchase.controls["vendorState"].clearValidators();    
          this.formGSTPurchase.controls['vendorGST'].clearValidators(); 
        }
        this.formGSTPurchase.controls['vendorId'].updateValueAndValidity();     
        this.formGSTPurchase.controls["vendorName"].updateValueAndValidity();      
        this.formGSTPurchase.controls["vendorAddress"].updateValueAndValidity();    
        this.formGSTPurchase.controls["vendorState"].updateValueAndValidity();    
        this.formGSTPurchase.controls["vendorGST"].updateValueAndValidity();

        this.formGSTPurchase.controls['chequeNo'].disable();      
        this.formGSTPurchase.controls['chequeDate'].disable();   
        
        if(this.selectedGstpurchaseDetails.pmtType=="B"){           
          this.formGSTPurchase.controls['neftPmt'].enable();
          if (this.selectedGstpurchaseDetails.neftPmt=='Y'){
            this.formGSTPurchase.patchValue({
              neftPmt: 'Y'
            });
            this.formGSTPurchase.controls['chequeNo'].clearValidators();      
            this.formGSTPurchase.controls['chequeDate'].clearValidators();  
          }
          else { 
            this.formGSTPurchase.patchValue({
              neftPmt: ''
            });           
            this.formGSTPurchase.controls['chequeNo'].enable();      
            this.formGSTPurchase.controls['chequeDate'].enable(); 
            this.formGSTPurchase.controls['chequeNo'].setValidators([Validators.required]);
            this.formGSTPurchase.controls['chequeDate'].setValidators([Validators.required]); 
          }
          this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
          this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();
        }      
        this.createdBy = this.selectedGstpurchaseDetails.createdBy + " " + this.selectedGstpurchaseDetails.createdDate;
        this.modifiedBy = this.selectedGstpurchaseDetails.modifiedBy + " " + this.selectedGstpurchaseDetails.modifiedDate;    
        this.editMode = true;
        this.getGstPurchageInnerGridList(); 
        this.formGSTPurchase.controls['noVender'].disable();
        this.formGSTPurchase.controls['pmtType'].disable();
      }
    }, 2000);
    this.formGSTPurchase.controls['branchCode'].disable();
    this.sharedService.loading = false;
  }

  
  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.commonService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getDebitAcList(){
    this.requestmodel.strRequest= '';
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.debitAcList = res;
    });
  }

  getVendorList(){
    this.requestmodel.strRequest= 'D';
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.vendorList = res;
    });
  }
  
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }
  
  getTdsAcList(){
    this.gstpurchaseService.getTdsAcList().subscribe((res) => {
      this.tdsAcList = res;
    });
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

  
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    if(selectedValue=="B"){      
      this.formGSTPurchase.controls['neftPmt'].enable();
      this.formGSTPurchase.controls['chequeNo'].enable();      
      this.formGSTPurchase.controls['chequeDate'].enable();   
      
      this.formGSTPurchase.controls['chequeNo'].setValidators([Validators.required]);
      this.formGSTPurchase.controls['chequeDate'].setValidators([Validators.required]);
    }
    else{
      this.formGSTPurchase.patchValue({
        neftPmt: ''
      });
      this.formGSTPurchase.controls['neftPmt'].disable();
      this.formGSTPurchase.controls['chequeNo'].disable();      
      this.formGSTPurchase.controls['chequeDate'].disable();   

      this.formGSTPurchase.controls['chequeNo'].clearValidators();      
      this.formGSTPurchase.controls['chequeDate'].clearValidators();  
    }
     
    this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
    this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();

    this.getPaymentCreditAcList(selectedValue);
  }

  onNeftChk(e: any) {   
    this.neftPmtSelected=!this.neftPmtSelected;
    if (this.neftPmtSelected){
      this.formGSTPurchase.controls['chequeNo'].disable();      
      this.formGSTPurchase.controls['chequeDate'].disable();   
      this.formGSTPurchase.controls['chequeNo'].clearValidators();      
      this.formGSTPurchase.controls['chequeDate'].clearValidators();   
    }
    else {
      this.formGSTPurchase.controls['chequeNo'].enable();      
      this.formGSTPurchase.controls['chequeDate'].enable();   
      this.formGSTPurchase.controls['chequeNo'].setValidators([Validators.required]);
      this.formGSTPurchase.controls['chequeDate'].setValidators([Validators.required]);
    }
    this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
    this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();
  }
  
  getPaymentCreditAcList(e: any){
    this.requestmodel.strRequest= e.toString();
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditacList = res;
    });
  }


  onChkNoVender(e: any) {  
    this.noVenderSelected=!this.noVenderSelected;
    if (this.noVenderSelected){
      this.paymentTypes= [      
        {
          dataId: "M",
          dataName: "Cash"
        },
        {
          dataId: "B",
          dataName: "Bank"
        },
        {
          dataId: "H",
          dataName: "Happay"
        },
      ];

      this.formGSTPurchase.patchValue({
        vendorId:'',
      });
      
      this.formGSTPurchase.controls['tDSAmt'].disable();  
      this.formGSTPurchase.controls['tdsAc'].disable();   
      this.formGSTPurchase.controls['vendorId'].disable();        
      this.formGSTPurchase.controls["vendorName"].enable();      
      this.formGSTPurchase.controls["vendorAddress"].enable();   
      this.formGSTPurchase.controls["vendorState"].enable();     
      this.formGSTPurchase.controls["vendorGST"].enable();

      this.formGSTPurchase.controls['vendorId'].clearValidators(); 
      this.formGSTPurchase.controls['vendorName'].setValidators([Validators.required]);
      this.formGSTPurchase.controls['vendorAddress'].setValidators([Validators.required]); 
      this.formGSTPurchase.controls["vendorState"].setValidators([Validators.required]); 
      this.formGSTPurchase.controls['vendorGST'].setValidators([Validators.required]);      
    }
    else { 
      this.paymentTypes= [      
        {
          dataId: "M",
          dataName: "Cash"
        },
        {
          dataId: "B",
          dataName: "Bank"
        },
        {
          dataId: "H",
          dataName: "Happay"
        },
        {
          dataId: "D",
          dataName: "Vendor"
        },
        {
          dataId: "A",
          dataName: "Adjust"
        },
      ];

      this.formGSTPurchase.controls['tDSAmt'].enable();  
      this.formGSTPurchase.controls['tdsAc'].enable();  
       
      this.formGSTPurchase.controls['vendorId'].enable();        
      this.formGSTPurchase.controls["vendorName"].disable();      
      this.formGSTPurchase.controls["vendorAddress"].disable();    
      this.formGSTPurchase.controls["vendorState"].disable();    
      this.formGSTPurchase.controls["vendorGST"].disable();

      this.formGSTPurchase.controls['vendorId'].setValidators([Validators.required]);
      this.formGSTPurchase.controls['vendorName'].clearValidators(); 
      this.formGSTPurchase.controls['vendorAddress'].clearValidators();  
      this.formGSTPurchase.controls["vendorState"].clearValidators();    
      this.formGSTPurchase.controls['vendorGST'].clearValidators(); 
    }
    this.formGSTPurchase.controls['vendorId'].updateValueAndValidity();     
    this.formGSTPurchase.controls["vendorName"].updateValueAndValidity();      
    this.formGSTPurchase.controls["vendorAddress"].updateValueAndValidity();  
    this.formGSTPurchase.controls["vendorState"].updateValueAndValidity();     
    this.formGSTPurchase.controls["vendorGST"].updateValueAndValidity();  
  }

  getGstPurchageInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedGstpurchaseDetails.masterid;
    var gsttype = this.formGSTPurchase.value.gstType;
    this.gstpurchaseService.getGstPurchageInnerGridList(this.requestmodel).subscribe((res) => {
      this.gstpurchasemodel = res;
      this.formArray.clear();
      for (let i = 0; i < res.gstPurchaseDetailsList.length; i++) {
        this.formArray.push(this.createInitialArray()); 
        if(gsttype=='NA'){    
          this.formArray.controls[i].get("sgstPct")?.disable();      
          this.formArray.controls[i].get("cgstPct")?.disable();   
          this.formArray.controls[i].get("igstPct")?.disable();
        }
        else if(gsttype=='SC'){    
          this.formArray.controls[i].get("sgstPct")?.enable();      
          this.formArray.controls[i].get("cgstPct")?.enable();   
          this.formArray.controls[i].get("igstPct")?.disable();
        }
        else if(gsttype=='IG'){    
          this.formArray.controls[i].get("sgstPct")?.disable();      
          this.formArray.controls[i].get("cgstPct")?.disable();   
          this.formArray.controls[i].get("igstPct")?.enable();
        }
        
        this.formArray.controls[i].get("sgstAmt")?.disable();
        this.formArray.controls[i].get("cgstAmt")?.disable();
        this.formArray.controls[i].get("igstAmt")?.disable();
        this.formArray.controls[i].get("totAmount")?.disable();

        this.formArray.controls[i].get("debitAc")?.setValue(this.debitAcList.find(e => e.dataId == res.gstPurchaseDetailsList[i].debitAc));
        this.formArray.controls[i].get("narration")?.setValue(res.gstPurchaseDetailsList[i].narration);
        this.formArray.controls[i].get("sacHsnCode")?.setValue(res.gstPurchaseDetailsList[i].sacHsnCode);
        this.formArray.controls[i].get("subLedger")?.setValue(res.gstPurchaseDetailsList[i].subLedger);        
        this.formArray.controls[i].get("itemAmt")?.setValue(res.gstPurchaseDetailsList[i].itemAmt);
        this.formArray.controls[i].get("sgstPct")?.setValue(res.gstPurchaseDetailsList[i].sgstPct);
        this.formArray.controls[i].get("sgstAmt")?.setValue(res.gstPurchaseDetailsList[i].sgstAmt);
        this.formArray.controls[i].get("cgstPct")?.setValue(res.gstPurchaseDetailsList[i].cgstPct);
        this.formArray.controls[i].get("cgstAmt")?.setValue(res.gstPurchaseDetailsList[i].cgstAmt);
        this.formArray.controls[i].get("igstPct")?.setValue(res.gstPurchaseDetailsList[i].igstPct);
        this.formArray.controls[i].get("igstAmt")?.setValue(res.gstPurchaseDetailsList[i].igstAmt);
        this.formArray.controls[i].get("totAmount")?.setValue(res.gstPurchaseDetailsList[i].totAmount);
      }
    });
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formGSTPurchase.controls; }
  get formArray() {
    return this.formGSTPurchase.get("arrayList") as FormArray;
  }

  changeGstType(e:any){
    var gsttype= e.target.value;
    for (var i=0; i<this.formArray.controls.length;i++){
      if(gsttype=='NA'){    
        this.formArray.controls[i].get("sgstPct")?.disable();      
        this.formArray.controls[i].get("cgstPct")?.disable();   
        this.formArray.controls[i].get("igstPct")?.disable();
      }
      else if(gsttype=='SC'){    
        this.formArray.controls[i].get("sgstPct")?.enable();      
        this.formArray.controls[i].get("cgstPct")?.enable();   
        this.formArray.controls[i].get("igstPct")?.disable();
      }
      else if(gsttype=='IG'){    
        this.formArray.controls[i].get("sgstPct")?.disable();      
        this.formArray.controls[i].get("cgstPct")?.disable();   
        this.formArray.controls[i].get("igstPct")?.enable();
      }
    }
  }

 

  createInitialArray() {
    return this.formBuilder.group({
      debitAc:  ['', []],
      narration:  ['', []],
      sacHsnCode:  ['', []],
      subLedger:  ['', []],
      itemAmt: ['0', []],
      sgstPct: ['0', []],
      sgstAmt: ['0', []],
      cgstPct:['0', []],
      cgstAmt: ['0', []],
      igstPct: ['0', []],
      igstAmt: ['0', []],
      totAmount: ['0', []],
      refDocNo: ['', []],
    });
  }
  
  onAmtChange(){
    var selectedDataVal= this.formGSTPurchase.getRawValue();
    var selArray= selectedDataVal.arrayList;
    var itemAmt = 0,sgstPct = 0,sgstAmt = 0,cgstPct = 0,cgstAmt = 0,igstPct = 0,igstAmt = 0,totAmount = 0;
    var totalItemAmt = 0,totalSgstAmt = 0,totalCgstAmt = 0,totalIgstAmt = 0,totalAmount = 0;

    for (let i = 0; i < selArray.length; i++) {
      if(selArray[i].itemAmt!=''){
        itemAmt = parseFloat(selArray[i].itemAmt);        
        sgstPct = selArray[i].sgstPct==''?0:parseFloat(selArray[i].sgstPct);
        cgstPct = selArray[i].cgstPct==''?0:parseFloat(selArray[i].cgstPct);
        sgstPct = selArray[i].sgstPct==''?0:parseFloat(selArray[i].sgstPct);
        totAmount = itemAmt;
        totalItemAmt = totalItemAmt + itemAmt;

        if(selArray[i].sgstPct!=''){
          sgstAmt = itemAmt * sgstPct / 100;
          totAmount = totAmount + sgstAmt;
          totalSgstAmt = totalSgstAmt + sgstAmt;
          this.formArray.controls[i].get("sgstAmt")?.setValue(sgstAmt.toFixed(2));
        }
        if(selArray[i].cgstPct!=''){
          cgstAmt = itemAmt * cgstPct / 100;
          totAmount = totAmount + cgstAmt;
          totalCgstAmt = totalCgstAmt + cgstAmt;
          this.formArray.controls[i].get("cgstAmt")?.setValue(cgstAmt.toFixed(2));
        }
        if(selArray[i].igstPct!=''){
          igstAmt = itemAmt * igstPct / 100;
          totAmount = totAmount + igstAmt;
          totalIgstAmt = totalIgstAmt + igstAmt;
          this.formArray.controls[i].get("igstAmt")?.setValue(cgstAmt.toFixed(2));
        }    
        
        
        totalAmount = totalAmount + totalSgstAmt + totalCgstAmt + totalIgstAmt;
        this.formArray.controls[i].get("totAmount")?.setValue(totAmount.toFixed(2));
      }
    }
    var netAmount = totalAmount + parseFloat(selectedDataVal.roundOff==''?0:selectedDataVal.roundOff);

    this.formGSTPurchase.patchValue({
      totalItemAmt: totalItemAmt.toFixed(2),
      totalSgstAmt: totalSgstAmt.toFixed(2),
      totalCgstAmt: totalCgstAmt.toFixed(2),
      totalIgstAmt: totalIgstAmt.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
    });
  }


  onTdsChange(e: any) {
    var selectedValue = e.target.value;    
    var tDSAmt = 0;
    if(selectedValue!=""){
      tDSAmt= parseFloat(selectedValue);
    }
    if(tDSAmt>0){
      this.formGSTPurchase.controls['tdsAc'].setValidators([Validators.required]);
      this.formGSTPurchase.controls['tdsAc'].updateValueAndValidity();
    }  
    else{      
      this.formGSTPurchase.controls['tdsAc'].clearValidators();  
      this.formGSTPurchase.controls['tdsAc'].updateValueAndValidity();
    }
  }
  
  onRounding(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    var totAmt = 0;
    var rndoff = 0;
    if (selectedDataVal.totalAmount!=""){
      totAmt = parseFloat(selectedDataVal.totalAmount)
    }
    if (selectedValue!=""){
      rndoff = parseFloat(selectedValue)
    }
    var nettot = totAmt + rndoff;
    this.formGSTPurchase.patchValue({
      netAmount:nettot.toFixed(2),
    });
  }

  addItem(i: number): void {
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    var totamt = parseFloat(selectedDataVal.arrayList[i].totAmount);
    var narr = selectedDataVal.arrayList[i].narration;
    var actid = this.debitAcList.find(e => e.dataName == selectedDataVal.arrayList[i].debitAc.dataName) 
    if (typeof actid !== 'undefined' && actid !== null && 
        actid.dataId!="" && actid.dataId!="0") {
        //ignore
    }
    else{
      this.toasterService.warning("Please Enter Valid Account Name in grid ");          
      return;
    }
    if (narr != "" && totamt > 0) 
    {
      this.formArray.push(this.createInitialArray());  
      if(selectedDataVal.gstType=='NA'){    
        this.formArray.controls[i+1].get("sgstPct")?.disable();      
        this.formArray.controls[i+1].get("cgstPct")?.disable();   
        this.formArray.controls[i+1].get("igstPct")?.disable();
      }
      else if(selectedDataVal.gstType=='SC'){    
        this.formArray.controls[i+1].get("sgstPct")?.enable();      
        this.formArray.controls[i+1].get("cgstPct")?.enable();   
        this.formArray.controls[i+1].get("igstPct")?.disable();
      }
      else if(selectedDataVal.gstType=='IG'){    
        this.formArray.controls[i+1].get("sgstPct")?.disable();      
        this.formArray.controls[i+1].get("cgstPct")?.disable();   
        this.formArray.controls[i+1].get("igstPct")?.enable();
      }
      this.formArray.controls[i+1].get("sgstAmt")?.disable();      
      this.formArray.controls[i+1].get("cgstAmt")?.disable();   
      this.formArray.controls[i+1].get("igstAmt")?.disable();
      this.formArray.controls[i+1].get("totAmount")?.disable();

    }
    else {
      this.toasterService.warning("Please select Required Fields in Grid");
      return;
    }   
  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this?")) {
      this.formArray.removeAt(index);
      this.onAmtChange();
    }
  }


  deleteGstPurchageForm(): void {
    if (this.selectedGstpurchaseDetails.masterid != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedGstpurchaseDetails.masterid;
      if (confirm("Are you sure, you want to delete this?")) {
        this.gstpurchaseService.gstPurchageDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formGSTPurchase.reset();
            this.route.navigate(['/gstpurchaselist']);
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
    this.route.navigate(['/gstpurchaselist']);
  }

 

  //Submit form details //
  submitGstPurchageForm(): void {
    if (this.formGSTPurchase.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formGSTPurchase.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
              
    if (this.formGSTPurchase.controls['arrayList'].invalid) {
      this.toasterService.warning("Details fields are mandatory");
      return;
    }
    
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    // const d3 = this.minDate?Date.parse(this.minDate):0;
    // const d2 = this.maxDate?Date.parse(this.maxDate):0;
    // const d4 = selectedDataVal.transDate?Date.parse(selectedDataVal.transDate):0;
    // if (d3>d4 || d2<d4 ) {
    //   this.formGSTPurchase.patchValue({
    //     transDate: ''
    //   });
    //   this.toasterService.warning("Invalid Trans date");
    //   return
    // }
    let d3 =  new Date(this.minDate);
    let d2 =  new Date(this.maxDate);
    let d4 =  new Date(selectedDataVal.transDate);
    if (d3>d4 || d2<d4 ) {
      this.formGSTPurchase.patchValue({
        transDate: ''
      });
      this.toasterService.warning("Invalid Trans date");
      return
    }

    if(selectedDataVal.pmtType=="" || selectedDataVal.pmtType=="SELECT"){
      this.toasterService.warning("Please Select Pmt Type ");
      return;
    }

    if(selectedDataVal.creditAc=="" || selectedDataVal.creditAc=="SELECT"){
      this.toasterService.warning("Please Select Credit Account ");
      return;
    }

    this.gstpurchasemodel.masterid      = this.selectedGstpurchaseDetails.masterid ;
    this.gstpurchasemodel.transDate     = selectedDataVal.transDate ; 
    this.gstpurchasemodel.branchCode    = selectedDataVal.branchCode ; 
    this.gstpurchasemodel.pmtType       = selectedDataVal.pmtType ;    
    this.gstpurchasemodel.gstType       = selectedDataVal.gstType ; 
    this.gstpurchasemodel.noVender      = selectedDataVal.noVender?"Y":"N";
    this.gstpurchasemodel.vendorId      = selectedDataVal.vendorId? selectedDataVal.vendorId.dataId:"" ;   
    this.gstpurchasemodel.vendorName    = selectedDataVal.vendorName.toString().toUpperCase() ;  
    this.gstpurchasemodel.vendorAddress = selectedDataVal.vendorAddress.toString().toUpperCase() ;  
    this.gstpurchasemodel.vendorState   = selectedDataVal.vendorState ; 
    this.gstpurchasemodel.vendorGST     = selectedDataVal.vendorGST.toString().toUpperCase() ;  
    this.gstpurchasemodel.vendorInvNo   = selectedDataVal.vendorInvNo.toString().toUpperCase() ;  
    this.gstpurchasemodel.vendorInvDt   = selectedDataVal.vendorInvDt ; 
    this.gstpurchasemodel.totalItemAmt  = selectedDataVal.totalItemAmt ; 
    this.gstpurchasemodel.totalSgstAmt  = selectedDataVal.totalSgstAmt ; 
    this.gstpurchasemodel.totalCgstAmt  = selectedDataVal.totalCgstAmt ; 
    this.gstpurchasemodel.totalIgstAmt  = selectedDataVal.totalIgstAmt ; 
    this.gstpurchasemodel.totalAmount   = selectedDataVal.totalAmount ; 
    this.gstpurchasemodel.tdsAmt        = selectedDataVal.tDSAmt ; 
    this.gstpurchasemodel.tdsAc         = selectedDataVal.tdsAc ; 
    this.gstpurchasemodel.roundOff      = selectedDataVal.roundOff ;    
    this.gstpurchasemodel.netAmount     = selectedDataVal.netAmount.toString() ;     
    this.gstpurchasemodel.creditAc      = selectedDataVal.creditAc ;     
    this.gstpurchasemodel.neftPmt       = this.neftPmtSelected? 'Y':'N' ;    
    this.gstpurchasemodel.chequeNo      = selectedDataVal.chequeNo ;    
    this.gstpurchasemodel.chequeDate    = selectedDataVal.chequeDate ; 
    this.gstpurchasemodel.inputEligible = 'Y';
    this.gstpurchasemodel.attatchFile1  = selectedDataVal.attatchFile1; 
    this.gstpurchasemodel.attatchFile2  = selectedDataVal.attatchFile2; 
    this.gstpurchasemodel.yearId        = this.year ;  
    this.gstpurchasemodel.modifyRemarks = selectedDataVal.modifyRemarks.toString().toUpperCase() ;  
    this.gstpurchasemodel.loggedInUser  = this.loggedInUserID; 

    this.gstpurchasemodel.gstPurchaseDetailsList = [];

    for (let i = 0; i < selectedDataVal.arrayList.length; i++) { 
      if (selectedDataVal.arrayList[i].debitAc.dataId != "" && parseFloat(selectedDataVal.arrayList[i].totAmount) > 0) {
        var actid = this.debitAcList.find(e => e.dataName == selectedDataVal.arrayList[i].debitAc.dataName) 
        if (typeof actid !== 'undefined' && actid !== null && 
            actid.dataId!="" && actid.dataId!="0") {
            //ignore
        }
        else{
          this.toasterService.warning("Please Enter Valid Account Name in grid ");          
          return;
        }

        this.gstpurchasemodel.gstPurchaseDetailsList.push({
          'masterid': '',
          'debitAc':    selectedDataVal.arrayList[i].debitAc?selectedDataVal.arrayList[i].debitAc.dataId:'',
          'narration':  selectedDataVal.arrayList[i].narration.toString().toUpperCase(),
          'sacHsnCode': selectedDataVal.arrayList[i].sacHsnCode.toString().toUpperCase(),
          'subLedger':  selectedDataVal.arrayList[i].subLedger,
          'itemAmt':    selectedDataVal.arrayList[i].itemAmt,
          'sgstPct':    selectedDataVal.arrayList[i].sgstPct,
          'sgstAmt':    selectedDataVal.arrayList[i].sgstAmt,
          'cgstPct':    selectedDataVal.arrayList[i].cgstPct,
          'cgstAmt':    selectedDataVal.arrayList[i].cgstAmt,
          'igstPct':    selectedDataVal.arrayList[i].igstPct,
          'igstAmt':    selectedDataVal.arrayList[i].igstAmt,
          'totAmount':  selectedDataVal.arrayList[i].totAmount,
          'refDocNo':   selectedDataVal.arrayList[i].refDocNo.toString().toUpperCase(),
        });
      }
    }

    let formData = new FormData();
    this.formSubmitted = true;
    formData.append('attatchFile1', this.attach1Input.nativeElement.files[0]);
    formData.append('attatchFile2', this.attach2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.gstpurchasemodel));

   
    this.sharedService.loading=true;

    this.gstpurchaseService.gstPurchageDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formGSTPurchase.reset();
        this.route.navigate(['/gstpurchaselist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    
    this.sharedService.loading=false;
  }
  

}
