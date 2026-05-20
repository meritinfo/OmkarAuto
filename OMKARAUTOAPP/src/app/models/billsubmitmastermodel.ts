
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
    submitPoNo: string = "";
    yearID: string = "";
    loggedInUser: string = "";
    sname: string = "";
    lname: string = "";
    dname: string = "";
    party: string = "";
    createdBy: string = "";
    createdDate: string = "";
    modifiedBy: string = "";
    modifiedDate: string = "";

    billSubmitMasterDtlList: BillSubmitMstDtlListmodel[] = [];
}

export class BillSubmitMstDtlListmodel {
    submitMstId: string = "";
    submitDt: string = "";
    billsMasterId: string = "";
    billAmt: string = "";
    dtlRemarks: string = "";
    billNo: string = "";
    billDate: string = "";
}