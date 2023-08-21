export class Distancemasterfreightmodel {
    masterID: string = "";
    validFrom: string = "";
    validUpto: string = "";
    fromLocation: string = "";
    loggedInUser: string = "";
    distanceDetailsFreightList: Distancedetailsfreightmodel[] = [];
}

export class Distancedetailsfreightmodel {
    masterID: string = "";
    fromLocation: string = "";
    toLocation: string = "";
    kms: string = "";
    index: string = "";
}
