import { Fasttagdtlsmodel } from "./fasttagdtlsmodel";

export class Fasttagmodel {
    ftMasterID: string = "";
    ftAccount  : string = "";
    accountName: string = "";
    fromDate: string = "";
    toDate: string = "";
    stmtDate: string = "";
    remarks: string = "";
    totalFtAmt: string = "";
    ftmId: string = "";
    branchCode: string = "";
    yearID: string = "";
    loggedInUser: string = "";

    fastTagDtlList: Fasttagdtlsmodel[]=[];
}
