export class Distancemastertripmodel {
    masterID: string = "";
    validFrom: string = "";
    validUpto: string = "";
    fromLocation: string = "";
    locationName: string = "";
    loggedInUser: string = "";
    distanceDetailsTripList: Distancedetailstripmodel[] = [];
    
}

export class Distancedetailstripmodel {
    masterID: string = "";
    fromLocation: string = "";
    toLocation: string = "";
    kms: string = "";
    enrouteExpTruck: string = "";
    enrouteExpTrailer: string = "";
    enrouteExpCarCarrier: string = "";
    enrouteExpEmpty: string = "";
    enrouteExpRemarks: string = "";
    definedTollExp: string = "";    
}
