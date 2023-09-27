import { Dieselstatementsearchlistrequestmodel } from "./dieselstatementsearchlistrequestmodel";
import { Dieselstatementsearchmodel } from "./dieselstatementsearchmodel";

export class Dieselstatementsaverequest {
    statementBranch: string = "";
    statementDate: string = "";
    fromDate: string = "";
    toDate: string = "";
    vendor: string = "";
    remarks: string = "";
    totalDslLtrs: string = "";
    totalCashAdv: string = "";
    totalNetAmount: string = "";
    branchCode: string = "";
    yearId: string = "";
    loggedInUser: string = "";
    dieselStatementListData: Dieselstatementsearchmodel[] = [];
}
