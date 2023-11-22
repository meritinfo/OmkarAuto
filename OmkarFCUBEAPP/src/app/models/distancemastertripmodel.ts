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
    distanceDtlID: string = "";
    masterID: string = "";
    fromLocation: string = "";
    toLocation: string = "";
    toLocationName: string = "";
    fromLocationName: string = "";
    kms: string = "";
    index: string = "";
    enrouteExpTruck: string = "";
    enrouteExpTrailer: string = "";
    enrouteExpCarCarrier: string = "";
    enrouteExpEmpty: string = "";
    enrouteExpRemarks: string = "";
    definedTollExp: string = "";
    
}
