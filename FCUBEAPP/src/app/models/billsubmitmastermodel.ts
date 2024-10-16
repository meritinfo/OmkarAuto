import { BillSubmitMstDtlListmodel } from "./billsubmitmstdtllistmodel";

export class Billsubmitmastermodel {
    submitMstId: string = "";
    submitStn: string = "";
    submitNo: string = "";
    submitDt: string = "";
    submitType: string = "";
    courierCo: string = "";
    courierDocketNo: string = "";
    partyCode: string = "";
    submitLocation: string = "";
    deptId: string = "";
    billsUptoDt: string = "";
    kindAttnTo: string = "";
    remarks: string = "";
    partyAcceptDt: string = "";
    partyAccceptRemarks: string = "";
    totalSubmitAmt: string = "";
    yearID: string = "";
    loggedInUser: string = "";
    sname: string = "";
    lname: string = "";
    dname: string = "";

    billSubmitMasterDtlList: BillSubmitMstDtlListmodel[] = [];
}

