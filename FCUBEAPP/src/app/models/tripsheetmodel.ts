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
    tripBalance: string = "";
    recdFromDriver: string = "";
    netTripBalance: string = "";
    fastagAmount: string = "";
    tripTotalFreight: string = "";
    tripTotalAdvance: string = "";
    tripCloseBy: string = "";
    tripCloseDt: string = "";
    tripCloseUpdateDt: string = "";
    tripLinkYN: string = "";
    findocid: string = "";
    tripBr: string = "";
    vehicleNo: string = "";
    drName: string = "";        
    loggedInUser: string = "";

    driverList: DriverDetails[] = [];
    routeList: RouteDetails[] = [];
    dieselList: DieselDetails[] = [];
    expList: TripDrExpDetails[] = [];
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
    hireAmt : string = "";
    advAmt : string = "";
    remarks : string = "";        
}

export class DieselDetails {
    detailID: string = "";
    accountName: string = "";
    transDate: string = "";
    dslQty: string = "";
    dslRate: string = "";
    amount : string = "";
    remarks: string = "";
}
export class TripDrExpDetails {
    tripDtlId: string = "";
    tripId: string = "";
    expId: string = "";
    expParticulars: string = "";
    expAmt: string = "";
  }