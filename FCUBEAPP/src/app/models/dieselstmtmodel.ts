import { Dieselstmtdtlsmodel } from "./dieselstmtdtlsmodel";

export class Dieselstmtmodel {
    dfMasterID: string = "";
    dfAccount: string = "";
    accountName: string = "";
    fromDate: string = "";
    toDate: string = "";
    stmtDate: string = "";
    ftmidHsd: string = "";
    remarks: string = "";
    totalDslLtrs: string = "";
    totalDslAmt: string = "";
    branchCode: string = "";
    yearId: string = "";
    loggedInUser: string = "";
    
    dieselStmtDtlsList: Dieselstmtdtlsmodel[]=[];
}
