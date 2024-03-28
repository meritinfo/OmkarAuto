import { Billstatementsearchmodel } from "./billstatementsearchmodel";

export class billstatementmodel {
    masterID: string = "";
    billStation: string = "";
    seriesCode: string = "";
    bill_StmtNo: string = "";
    billDate: string = "";
    fromPoint : string = "";
    toPoint : string = "";
    partyCode: string = "";
    fromDate: string = "";
    toDate: string = "";
    suppYN: string = "";
    partyRefNo: string = "";
    totFreight: string = "";
    totExtraChrg: string = "";
    totSubTotal: string = "";
    gstType: string = "";
    sgstPct: string = "";
    sgstAmt: string = "";
    cgstPct: string = "";
    cgstAmt: string = "";
    igstPct: string = "";
    igstAmt: string = "";
    totalBillAmt: string = "";
    remarks: string = "";
    yearId: string = "";
    loggedInUser: string = "";
    fPlace: string = "";
    billStatementListData: Billstatementsearchmodel[] = [];
}
