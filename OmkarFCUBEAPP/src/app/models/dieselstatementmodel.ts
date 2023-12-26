export class Dieselstatementmodel {
    masterID: string = "";
    dfVendor: string = "";
    vendor: string = "";
    billStmtNo: string = "";
    billStmtDate: string = "";
    fromDate: string = "";
    toDate: string = "";
    location: string = "";
    remarks: string = "";
    totalDslLtrs: string = "";
    totalDslAmt: string = "";
    totalCashAdv: string = "";
    totalNetAmount: string = "";
    branchCode: string = "";
    yearId: string = "";
    loggedInUser: string = "";
    
    dieselStatementListData: Dieselstatementsearchmodel[]=[];
}

export class Dieselstatementsearchmodel {
    pmtId: string = "";
    branch: string = "";
    pmtDate: string = "";
    vehicleNo: string = "";
    hsdAdvType: string = "";
    transDesc: string = "";
    qtyLtrs: string = "";
    ratePerLtr: string = "";
    amountPaid: string = "";
    remarks: string = "";
    selected: boolean = false;
}




