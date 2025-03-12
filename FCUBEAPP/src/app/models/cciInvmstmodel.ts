export class Ccinvmstmodel {
    cciInvMstId: string ="";
    cciInvNo: string ="";
    cciInvDate: string ="";
    remarks : string ="";
    gstType : string ="";
    totalTaxableAmt : string ="";
    totalSgstAmt : string ="";
    totalCgstAmt : string ="";
    totalIgstAmt : string ="";
    totalInvAmt : string ="";
    yearId : string ="";
    loggedInUser: string = "";  
    ccinvmstDtlList: Ccinvdtlmodel[] = [];
}
export class Ccinvdtlmodel {
    cciInvDtlId : string ="";
    cciInvMstId: string ="";
    containerNo : string ="";
    gcYear  : string ="";
    gcBook  : string ="";
    gcNoteNo : string ="";
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
