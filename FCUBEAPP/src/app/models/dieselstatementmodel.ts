
import { Dieselstmtdtlsmodel } from "./dieselstmtdtlsmodel";

export class Dieselstatementmodel {
    masterID: string = "";
    dfVendor: string = "";
    vendor: string = "";
    billStmtNo: string = "";
    billStmtDate: string = "";
    fromDate: string = "";
    toDate: string = "";
    findocid: string = "";
    location: string = "";
    transType:string = "";
    rate: string = "";
    statementFlag: string = "";
    remarks: string = "";
    totalDslLtrs: string = "";
    grossDslAmt: string = "";
    discRateLtr: string = "";
    discAmt: string = "";
    totalDslAmt: string = "";
    tdsRate: string = "";
    tdsAmt: string = "";
    totalCashAdv: string = "";
    totalNetAmount: string = ""; 
    branchCode: string = "";
    yearId: string = "";
    driverId: string = "";
    createdBy: string = "";
    createdDate: string = "";
    modifiedBy: string = "";
    modifiedDate: string = "";
    loggedInUser: string = "";
    dieselStatementListData: Dieselstatementsearchmodel[]=[];
    dieselStmtDtlsList: Dieselstmtdtlsmodel[]=[];
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




