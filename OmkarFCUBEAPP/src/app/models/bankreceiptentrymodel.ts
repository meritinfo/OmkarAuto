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
    neftPmt : string = "";
    uTRNo : string = "";
    linkedYN  : string = "";
    yearID    : string = "";
    branchCode     : string = "";
    modifyRemarks     : string = "";
    acHeader:string = "";
    accountOf:string = "";
    narration:string = "";
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