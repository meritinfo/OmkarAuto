export class Subledgermodel {
    subLedgerId: string="";
    ledgerAc: string="";
    createOrPredefined: string="";
    preDefinedQuery: string="";
    validateWithDocNo: string="";
    validateTable: string="";
    validateTableField: string="";
    acname: string="";
    loggedInUser: string="";
    subLedgerMasterDtlList: subLedgerMasterDtlList[] = [];
}
export class subLedgerMasterDtlList {
    subLedgerId :  string="";
    ledgerAc :  string="";
    subLedgerDesc :  string="";    
}

