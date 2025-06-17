export class Ccinvmstmodel {
    cciInvMstId: string ="";
    branch: string ="";
    cciInvNo: string ="";
    cciInvDate: string ="";
    vendorId: string ="";
    debitAc: string ="";
    remarks : string ="";
    gstType : string ="";
    lr_YN: string ="";
    totalTaxableAmt : string ="";
    totalSgstAmt : string ="";
    totalCgstAmt : string ="";
    totalIgstAmt : string ="";
    totalInvAmt : string ="";
    createdBy: string = "";
    createdDate: string = "";
    modifiedBy: string = "";
    modifiedDate: string = "";
    yearId : string ="";
    loggedInUser: string = "";  
    ccinvmstDtlList: Ccinvdtlmodel[] = [];
}
export class Ccinvdtlmodel {
    cciInvMstId: string ="";
    containerNo : string ="";
    consignmentId: string ="";
    gcYear  : string ="";
    gcBook  : string ="";
    gcNoteNo : string ="";
    bookingDate: string ="";
    party: string ="";
    chCostId  : string ="";
    taxableAmt : string ="";
    sgstPct : string ="";
    sgstAmt : string ="";
    cgstPct  : string ="";
    cgstAmt  : string ="";
    igstPct  : string ="";
    igstAmt : string ="";
    totalAmt  : string ="";
    dtlRemarks   : string ="";

}
