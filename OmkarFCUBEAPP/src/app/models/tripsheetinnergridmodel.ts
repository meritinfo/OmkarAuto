import { AdblueListmodel, MiscListmodel } from "./tripsheetmodel";

export class Tripsheetinnergridmodel {
    incentive: string="";
    lrDetailsList: Lrdetailsmodel[] = [];
    dieselDetailsList: Dieseldetailsmodel[] = [];
    driverAdvanceList: Driveradvancemodel[] = [];
    miscList: MiscListmodel[] = [];
    adblueList: AdblueListmodel[] = [];
}

export class Lrdetailsmodel {
    cneeCode: string = "";
    cnorInvNo: string = "";
    cnDest: string = "";
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
    vendorName: string = "";
    adj: string = "";
}

export class Driveradvancemodel {
    pmtId: string = "";
    pmtDate: string = "";
    amountPaid: string = "";
    ptype: string = "";
    adj2: string = "";
}