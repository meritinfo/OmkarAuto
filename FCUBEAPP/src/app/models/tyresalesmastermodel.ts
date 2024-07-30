export class Tyresalesmastermodel {
    masterID : string ="";
    transDate : string ="";
    saleIncharge : string ="";
    nonCustomer : string ="";
    customerId : string ="";
    customerName : string ="";
    customerAdd : string ="";
    customerGstNo: string ="";
    pmtType: string ="";
    gstType : string ="";
    tyreAmount : string ="";
    sgstPct : string ="";
    sgstAmt : string ="";
    cgstPct : string ="";
    cgstAmt : string ="";
    igstPct : string ="";
    igstAmt : string ="";
    totalAmount : string ="";
    roundOff : string ="";
    netAmount : string ="";
    remarks : string ="";
    approvedYN : string ="";
    branchCode : string ="";
    yearID: string ="";
    loggedInUser : string ="";   
    tyreSalesDtlList: Tyresalesdtllistmodel[] = [];     
}

export class Tyresalesdtllistmodel {
    masterID : string ="";
    transDate : string ="";
    brandId  : string = "";
    tyreId  : string = "";
    tyreAmt : string ="";
    remarks : string ="";
    branchCode : string ="";
    yearID: string ="";   
}
