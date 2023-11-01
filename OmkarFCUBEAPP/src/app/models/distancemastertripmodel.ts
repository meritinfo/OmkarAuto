export class Distancemastertripmodel {
    masterID: string = "";
    validFrom: string = "";
    validUpto: string = "";
    fromLocation: string = "";
    loggedInUser: string = "";
    distanceDetailsTripList: Distancedetailstripmodel[] = [];
    
}

export class Distancedetailstripmodel {
    masterID: string = "";
    fromLocation: string = "";
    toLocation: string = "";
    //toLocat: string = "";
    kms: string = "";
    index: string = "";
    enrouteExpTruck: string = "";
    enrouteExpTrailer: string = "";
    enrouteExpCarCarrier: string = "";
    enrouteExpEmpty: string = "";
    enrouteExpRemarks: string = "";
    defineTollExp: string = "";
    
}
