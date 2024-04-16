export class Gstpurchasemodel {
    masterid:           string = "";
    transDate:          string = "";
    branchCode:         string = "";
    branchName:         string = "";
    gstType:            string = "";
    pmtType:            string = "";
    findocid:            string = "";
    noVender:           string = "";
    vendorId:           string = "";
    vendorName:         string = "";
    vendorAddress:      string = "";
    vendorState:        string = "";
    vendorGST:          string = "";    
    vendorInvNo:        string = "";
    vendorInvDt:        string = "";
    inputEligible:      string = "";
    totalItemAmt:       string = "";
    totalSgstAmt:       string = "";
    totalCgstAmt:       string = "";
    totalIgstAmt:       string = "";
    totalAmount:        string = "";
    tdsAmt:             string = "";
    tdsAc:              string = "";
    roundOff:           string = "";
    netAmount:          string = "";
    creditAc:           string = ""; 
    neftPmt:            string = "";
    chequeNo:           string = "";
    chequeDate:         string = "";
    yearId:             string = "";
    attatchFile1:       string = "";
    attatchFile2:       string = "";
    modifyRemarks:      string = "";
    loggedInUser:       string = "";

    gstPurchaseDetailsList: Gstaccountdetailsmodel[] = [];  

}

export class Gstaccountdetailsmodel {
    masterid: string = "";
    debitAc: string = "";
    narration: string = "";
    sacHsnCode: string = "";
    subLedger: string = "";
    itemAmt: string = "";
    sgstPct: string = "";
    sgstAmt: string = "";
    cgstPct: string = "";
    cgstAmt: string = "";
    igstPct: string = "";
    igstAmt: string = "";
    totAmount: string = "";
    refDocNo: string = "";
}