import { Dprdtlsmodel } from "./dprdtlsmodel";

export class Dprvehiplacedmodel {
    vehiclePlacedId : string = "";
    dprId : string = "";
    dprDate : string = "";
    payParty: string = "";
    partyName : string = "";
    origin : string = "";		
    fromPlace : string = "";
    destination : string = "";		
    toPlace : string = "";
    vehicleEngagedBy : string = "";
    brokerId : string = "";
    brokerName:string = "";
    vehicleNo : string = "";
    vehOwnerName : string = "";
    vehAdd1 : string = "";
    vehAdd2 : string = "";
    ownerPan : string = "";
    vehOwnerMobile : string = "";
    vehInsValidDate : string = "";
    vehFitValidDate : string = "";
    vehPermitValidDate : string = "";
    driverName : string = "";
    driverMob1 : string = "";
    challanChrgWt : string = "";
    ratePerTon : string = "";
    lorryHire : string = "";
    advance1 : string = "";
    advance2 : string = "";
    advance3 : string = "";
    advanceAmt : string = "";
    balanceAmt : string = "";
    assignToStaff : string = "";
    vehicleRptDateTime : string = "";
    placementStatus : string = "";
    placementStatusRemarks: string = "";
    noofLr: string = "";
    loggedInUser : string = "";    
    createdBy: string = "";
    createdDate: string = "";
    modifiedBy: string = "";
    modifiedDate: string = "";

    dprDtls: Dprdtlsmodel[] = [];    
}
