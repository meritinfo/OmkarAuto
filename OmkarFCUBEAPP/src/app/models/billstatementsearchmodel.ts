
import { Billstatementsearchlistmodel } from "./billstatementsearchlistmodel";

export class Billstatementsearchmodel {

    consignmentID: string = "";
    bookedAt: string = "";
    gcNoteNo: string = "";
    bookingDate: string = "";
    vehicleNo: string = "";
    productName: string = "";
    noPackages: string = "";
    gtotalRs: string = "";
    selected: boolean = true;
    billStatementListData: Billstatementsearchmodel[]=[];
}
