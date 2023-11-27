export class Distancemasterfreightmodel {
    masterID: string = "";
    validFrom: string = "";
    validUpto: string = "";
    fromLocation: string = "";
    fromPoint: string = "";
    loggedInUser: string = "";
    distanceDetailsFreightList: Distancedetailsfreightmodel[] = [];
}

export class Distancedetailsfreightmodel {

    distanceDtlID: string = "";
    masterID: string = "";
    fromLocation: string = "";
    toLocation: string = "";
    kms: string = "";
    index: string = "";
}
