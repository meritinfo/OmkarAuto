export class Tripsheetinnergridmodel {
    lrDetailsList: Lrdetailsmodel[] = [];
    dieselDetailsList: Dieseldetailsmodel[] = [];
    driverAdvanceList: Driveradvancemodel[] = [];
}

export class Lrdetailsmodel {
    cneeCode: string = "";
    cnorInvNo: string = "";
    consignmentID: string = "";
    ewayBillDate: string = "";
    ewayBillExpDate: string = "";
    ewayBillNo: string = "";
    gcNoteNo: string = "";
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