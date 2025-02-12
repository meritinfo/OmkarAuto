export class bankreceiptentrymodel {
    ftmID: string = "";
    ftmDate: string = "";
    docType: string = "";
    docSeries: string = "";
    docNo: string = "";
    seriesDoc: string = "";
    remarks: string = "";
    refType: string = "";
    refNo: string = "";
    docAmount: string = "";
    linkedYN  : string = "";
    neftPmt : string = "";
    uTRNo : string = "";
    modifyRemarks     : string = "";
    yearID    : string = "";
    acHeader:string = "";
    accountOf:string = "";
    narration:string = "";
    branchCode     : string = "";
    onAcBranchYN : string = "";
    onAcBranchCode : string = "";
    loggedInUser:string = "";
   
    detailList: BankreceiptpaymentDetailmodel[] = [];

}
export class BankreceiptpaymentDetailmodel {
    slNo : string = "";
    typeSign  : string = "";
    amount: string = "";
    accountID : string = "";
    chequeNo : string = "";
    chequeDate : string = "";  
    narration : string = "";
    reference : string = "";  
}