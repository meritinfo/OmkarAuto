export class Ratesmastermodel {
    masterID: string = "";
    accountid: string = "";
    fromPlace: string = "";
    validFrom: string = "";
    validUpto: string = "";
    rateMethod: string = "";
    fromPoint: string = "";
    accountName: string = "";
    rateTypeId: string = "";
    vehicleTypeGroupId : string = "";
    rateDesc: string = "";
    rateForStateOrToPlace: string = "";   
    loggedInUser: string = "";
    freightRatesDetailsList: RatesMasterDetailsList[] = [];  

}

export class RatesMasterDetailsList {
    dtlId: string = "";
    masterID: string = "";
    destState: string = "";
    toPlace: string = "";
    rate: string = "";
}
