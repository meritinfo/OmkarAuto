export class BankCashContraModel {
    ftmId: string = "";
    ftmDate: string = "";
    docType: string = "";
    docSeries: string = "";
    docNo: string = "";
    seriesDoc: string = "";
    remarks: string = "";
    refType: string = "";
    refNo: string = "";
    docAmount: string = "";
    neftPmt : string = "";
    uTRNo : string = "";
    linkedYN  : string = "";
    yearID    : string = "";
    branchCode     : string = "";
    modifyRemarks     : string = "";
   
    detailList: BankCashContraDetailmodel[] = [];

}
export class BankCashContraDetailmodel {
    ftdID : string = "";
    ftmID: string = "";
    ftmDate: string = "";
    slNo : string = "";
    typeSign  : string = "";
    amount: string = "";
    accountId : string = "";
    chequeNo : string = "";
chequeDate : string = "";
  
    narration : string = "";
    costRefNo: string = "";
    reference : string = "";
    branchCode : string = "";
  
}