export class Tyreactivatemastermodel {
    activateMasterID: string = "";
    activateDate: string = "";
    refNo: string = "";
    vehicleMasterid : string = "";
    vehicleNo: string = "";
    kmr : string = "";
    inspectedBy : string = "";
    fittedBy : string = "";
    tyreAmt : string = "";
    othAmt : string = "";
    netAmt : string = "";
    remarks : string = "";
    branchCode: string = "";
    findocid : string = "";
    yearID : string = "";
    loggedInUser : string = "";
    tyreActivateDtlList: Tyreactivatedtlmodel[] = [];
}

export class Tyreactivatedtlmodel {
    activateMasterID: string = "";
    activateDate: string = "";
    vehicleMasterid : string = "";
    brandId  : string = "";
    tyreId  : string = "";
    tyrePosID  : string = "";
    tyreCostAmt : string = "";
    remarks  : string = "";        
}
