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
    billSubmitMasterDtlList: BillSubmitMstDtlListmodel[] = [];
}
export class BillSubmitMstDtlListmodel {
    submitDtlId: string = "";
    submitMstId: string = "";
    submitDt: string = "";
    billsMasterId: string = "";
    billAmt: string = "";
    dtlRemarks: string = "";

}
