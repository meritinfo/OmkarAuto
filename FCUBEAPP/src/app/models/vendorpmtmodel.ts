export class Vendorpmtmodel {
    transId: string = "";   
    transBranch: string = "";   
    transDate: string = "";   
    billsUptoDate: string = "";   
    vendorId: string = "";    
    vendor: string = "";   
    totalAmtPaid: string = "";   
    totalAmtDed: string = "";   
    totalAmtTDS: string = "";   
    totalAmtExtras: string = "";   
    netAmtPaid: string = "";   
    remarks: string = "";   
    pmtType: string = "";   
    neftYN: string = "";   
    chequeNo: string = "";   
    chequeDate: string = "";   
    creditAc: string = "";   
    finDocid: string = "";   
    finDocidJV: string = "";   
    yearId: string = "";    
    createdBy: string = "";
    createdDate: string = "";
    modifiedBy: string = "";
    modifiedDate: string = "";
    loggedInUser: string = "";
    
    vendorPmtDetailList: Vendorpmtdetailmodel[]=[];
}

export class Vendorpmtdetailmodel {
    pmtForm: string = "";    
    vendorBillMasterId: string = "";     
    vehicleNo: string = "";  
    creditAc: string = "";     
    vendorInvNo: string = "";     
    vendorInvDt: string = "";  
    netAmount : string = "";    
    amtPaid: string = "";    
    amtDed: string = "";    
    amtTDS: string = "";    
    amtExtras: string = "";    
    dtlRemarks: string = "";  
}




