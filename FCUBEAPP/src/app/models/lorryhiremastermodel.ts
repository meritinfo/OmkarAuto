import { Lorryhiredetailmodel } from "./lorryhiredetailmodel";

export class Lorryhiremastermodel {
    masterId: string = "";
    pmtStation: string = "";
    pmtNo: string = "";
    pmtDate : string = "";
    pmtType : string = "";
    onAcBranchYN: string = "";
    onAcBranch: string = "";
    cardId: string = "";
    chequePayeeName: string = "";
    benId : string = "";
    totalHireAmt : string = "";
    totalHamaliAmt: string = "";
    totalDetenAmt: string = "";
    totalOtherAmt : string = "";
    totalOther2Amt : string = "";
    totalOther3Amt : string = "";
    totalNetAmt : string = "";
    totalRecoveryAmt : string = "";
    totalLhpmAmt : string = "";
    totalOthDedAmt : string = "";
    totalOth2DedAmt : string = "";
    totalTdsAmt : string = "";
    creditAc : string = "";
    chequeNo : string = "";
    chequeDt : string = "";
    neftPmt : string = "";
    remarks : string = "";
    finDocid : string = "";
    finDocidJV : string = "";
    findocIdOpp : string = "";
    yearId : string = "";
    modifyRemarks : string = "";
    pmtStn : string = "";
    loggedInUserID : string = "";
    lhpmDetails: Lorryhiredetailmodel[] = [];
}
