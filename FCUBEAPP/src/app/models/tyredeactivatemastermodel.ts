export class Tyredeactivatemastermodel {
    deActivateMasterID: string = "";
    deActivateDate: string = "";
    refNo: string = "";
    vehicleMasterid : string = "";
    vehicleNo: string = "";
    kmr : string = "";
    inspectedBy : string = "";
    removedBy : string = "";
    usableTyreAmt : string = "";
    remarks : string = "";
    branchCode: string = "";
    findocid : string = "";
    yearID : string = "";
    loggedInUser : string = "";
    tyreDeActivateDtlList: Tyredeactivatedtlmodel[] = [];
}

export class Tyredeactivatedtlmodel {
    deActivateMasterID: string = "";
    deActivateDate: string = "";
    vehicleMasterid : string = "";
    brandId  : string = "";
    tyreId  : string = "";
    removeStatus  : string = "";
    usableAmount : string = "";
    remarks  : string = "";        
}
