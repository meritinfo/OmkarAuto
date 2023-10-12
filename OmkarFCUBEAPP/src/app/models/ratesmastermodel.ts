export class Ratesmastermodel {
    masterID: string = "";
    accountid: string = "";
    fromPlace: string = "";
    validFrom: string = "";
    validUpto: string = "";
    rateMethod: string = "";
    rateTypeId: string = "";
    rateForStateOrToPlace: string = "";

    ratesMasterDetailsList: RatesMasterDetailsList[] = [];
}

export class RatesMasterDetailsList {
    dtlId: string = "";
    masterID: string = "";
    destState: string = "";
    toPlace: string = "";
    index: string = "";
    rateTypeId: string = "";
    rate: string = "";

    
}
