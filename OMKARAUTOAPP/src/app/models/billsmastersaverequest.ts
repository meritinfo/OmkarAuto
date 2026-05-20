import { Billsmastersearchmodel } from "./billsmastersearchmodel";

export class Billsmastersaverequest {
    billingParty: string = "";
    fromPlace: string = "";
    toPlace: string = "";
    cnorPlantCode: string = "";
    productId: string = "";
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
    loggedInUser: string = "";
    billsMasterListData: Billsmastersearchmodel[] = [];
}
