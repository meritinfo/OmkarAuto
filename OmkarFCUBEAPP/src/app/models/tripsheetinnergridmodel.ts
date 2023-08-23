export class Tripsheetinnergridmodel {
    lRDetailsList: Lrdetailsmodel[] = [];
    dieselDetailsList: Dieseldetailsmodel[] = [];
    driverAdvanceList: Driveradvancemodel[] = [];
}

export class Lrdetailsmodel {
    consignmentID: string = "";
    gcNoteNo: string = "";
    cneeCode: string = "";
    cnorInvNo: string = "";
    ewayBillNo: string = "";
    ewayBillDate: string = "";
    ewayBillExpDate: string = "";
}

export class Dieseldetailsmodel {
    pmtId: string = "";
    pmtDate: string = "";
    qtyLtrs: string = "";
    ratePerLtr: string = "";
    amountPaid: string = "";
}

export class Driveradvancemodel {
    pmtId: string = "";
    pmtDate: string = "";
    amountPaid: string = "";
}