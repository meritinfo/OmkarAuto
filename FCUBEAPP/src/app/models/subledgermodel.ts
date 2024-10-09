export class Subledgermodel {
    subLedgerId: string="";
    ledgerAc: string="";
    createOrPredefined: string="";
    preDefinedQuery: string="";
    validateWithDocNo: string="";
    validateTable: string="";
    validateTableField: string="";
    fName: string="";
    tName: string="";
    acname: string="";
    loggedInUser: string="";
    subLedgerMasterDtlList: subLedgerMasterDtlList[] = [];
}
export class subLedgerMasterDtlList {
    subLedgerDtlId :  string="";
    subLedgerId :  string="";
    ledgerAc :  string="";
    subLedgerDesc :  string="";
    
  }

