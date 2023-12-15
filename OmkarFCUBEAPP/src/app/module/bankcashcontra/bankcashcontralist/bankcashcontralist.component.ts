import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { bankreceiptentrylistmodel  } from 'src/app/models/bankreceiptentrylistmodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Cashbankfiltermodel } from 'src/app/models/cashbankfiltermodel';

@Component({
  selector: 'app-bankcashcontralist',
  templateUrl: './bankcashcontralist.component.html',
  styleUrls: ['./bankcashcontralist.component.css']
})

export class BankcashcontralistComponent {
  dtOptions: DataTables.Settings = {};
  allBankCashcontra: bankreceiptentrylistmodel = new bankreceiptentrylistmodel();
  filter: Cashbankfiltermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'docNo',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    branch:'',
    receiptOrPayment: '',
  }

  
  formFilter!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';

  constructor(private cashReceiptEntryService: CashReceiptEntryService, 
    private formBuilder: FormBuilder, 
    private commonService: CommonService, 
    private route: Router) {
  }
  ngOnInit(): void {
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
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 1);
    this.fromDate = today.toLocaleDateString('en-CA').toString();

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
  
    this.cashReceiptEntryService.clearCashReceiptEntryDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      receiptOrPayment: new FormControl('BC',[Validators.required]),  
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.filter.fromDate = this.fromDate;
        this.filter.toDate = this.loginDate;
        this.filter.branch = this.branch;
        this.filter.receiptOrPayment = 'BC';

        this.cashReceiptEntryService.getCashReceiptEntryList(this.filter)
          .subscribe(resp => {
             this.allBankCashcontra = resp;
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
          });
      },
      columns: [ 
        {
          title: 'Doc No ',
          data: 'docNo',
        },    
        {
          title: 'Date',
          data: 'ftmDate',
        },
        {
          title: 'A/c Header',
          data: 'acHeader',
        },       
        {
          title: 'Amount',
          data: 'docAmount',
        },
        {
          title: 'Ref.Type',
          data: 'refType',
        },
        {
          title: 'Ref.No',
          data: 'refNo',
        },
        {
          title: 'On Account Of',
          data: 'accountOf',
        },
        {
          title: 'Remarks',
          data: 'narration',
        },
        {
          title: 'Action',
          data: 'ftmID',
        },
      ],
    };
  }
  //Open new driver master add screen
  bankCashContraAdd(): void {
    this.route.navigate(['/addbankcashcontra']);
  }

  getBankCashContraDetails(Docrenewal: bankreceiptentrymodel): void {
     this.cashReceiptEntryService.setCashReceiptEntryDetails(Docrenewal);
     this.route.navigate(['/bankcashcontraedit']);
     }
  
  search(): void {
    debugger;
    var selectedDataVal=this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.branch = this.branch === '0' ? '' : this.branch;
    this.filter.receiptOrPayment = "BC" ;
    this.filter.search = selectedDataVal.docSeriesNo;
    this.cashReceiptEntryService.getCashReceiptEntryList(this.filter).subscribe(resp => {
        this.allBankCashcontra = resp;
      });
  }
}



