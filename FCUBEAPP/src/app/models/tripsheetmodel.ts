export class Tripsheetmodel {
    tripId: string = "";
    tripBranch: string = "";
    yearId: string = "";
    vehicleMasterID: string = "";
    tripNo: string = "";
    deptDate: string = "";
    endDate: string = "";
    stmtDate: string = "";
    tripStatus: string = "";
    driverMasterID: string = "";
    definedMileage: string = "";
    closingKMR: string = "";
    openingKMR: string = "";
    distanceTripKM: string = "";
    ltsDslToBe: string = "";
    opBalDsl: string = "";
    issuedDslLtrs: string = "";
    issuedDslAmt: string = "";
    dieselPassedLtrs: string = "";
    dieselPassedAmt: string = "";
    dieselVarianceAmt: string = "";
    clBalDsl: string = "";
    opBalDriver: string = "";
    paidDriverAdvance: string = "";
    freightCollByDriver: string = "";
    expensesByDriver: string = "";
    totalBhattaDays: string = "";
    bhattaRate: string = "";
    bhattaAmt: string = "";
    onTimeIncentiveAmt: string = "";
    multiDelIncentiveAmt: string = "";
    penaltyChargedToDr: string = "";
    penaltyRemarks: string = "";
    totalDriverAc: string = "";
    totalAdblueExp: string = "";
    tripBalance: string = "";
    recdFromDriver: string = "";
    netTripBalance: string = "";
    fastagAmount: string = "";
    tripTotalFreight: string = "";
    tripTotalExpenses: string = "";
    expensesByComp: string = "";
    tripCloseBy: string = "";
    tripCloseDt: string = "";
    tripCloseUpdateDt: string = "";
    tripLinkYN: string = "";
    reportDateTime: string = "";
    unloadDateTime: string = "";
    detentionDays: string = "";
    findocid: string = "";
    tripBr: string = "";
    vehicleNo: string = "";
    drName: string = "";  
    nextTrip: string = "";  
    food_Sal_PerDay : string = ""; 
    food_Sal_FromDt: string = ""; 
    food_Sal_ToDt : string = ""; 
    food_Sal_Days : string = ""; 
    food_Sal_Amt : string = ""; 
    rtaChallanDesc  : string = ""; 
    rtaChallanAmt   : string = ""; 
    loggedInUser: string = "";

    driverList: DriverDetails[] = [];
    routeList: RouteDetails[] = [];
    dieselList: DieselDetails[] = [];
    adblueList: AdblueDetails[] = [];
    fasttagList: FasttagDetails[] = [];
    drExpList: TripDrExpDetails[] = [];
    cmpExpList: TripCmpExpDetails[] = [];
}

export class DriverDetails {
    pmtId: string = "";
    pmtBranch : string = "";
    pmtDate : string = "";
    transType : string = "";
    amountPaid: string = "";
    remarks : string = "";
    pmtType : string = "";
}

export class RouteDetails {
    loadId : string = "";
    loadBranch : string = "";
    loadDate : string = "";
    loadType : string = "";
    loadFor : string = "";
    loadMemoNo: string = "";
    loadingFrom : string = "";
    consignorName: string = "";
    loadingTo : string = "";
    consigneeName: string = "";
    loadWt: string = "";
    unloadWt: string = "";
    hireAmt : string = "";
    remarks : string = "";        
}

export class DieselDetails {
    detailID: string = "";
    transDate: string = "";
    dslQty: string = "";
    dslRate: string = "";
    amount : string = "";
    remarks: string = "";
}


export class AdblueDetails {
    tripId: string = "";
    pmtId: string = "";
    issueBranch: string = "";
    issueDate: string = "";
    issueParticulars : string = "";
    adblueLtrs: string = "";
    adblueAmt: string = "";
}


export class FasttagDetails {
    detailID: string = "";
    transDate: string = "";
    ftAmount: string = "";
    remarks: string = "";
}

export class TripDrExpDetails {
    expId: string = "";
    expParticulars: string = "";
    expAmt: string = "";
}

export class TripCmpExpDetails {
    enrouteExpId: string = "";
    expId: string = "";
    expParticulars: string = "";
    expAmt: string = "";
}