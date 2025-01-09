import { DriverDetails,RouteDetails,DieselDetails,AdblueDetails,FasttagDetails,TripDrExpDetails,TripCmpExpDetails } from "./tripmastermodel";

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
    emptyMileage:  string = "";
    emptyKMs:  string = "";
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
    detnRate : string = "";
    detnAmount: string = "";
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
    paidToDriver: string = "";
    loggedInUser: string = "";

    driverList: DriverDetails[] = [];
    routeList: RouteDetails[] = [];
    dieselList: DieselDetails[] = [];
    adblueList: AdblueDetails[] = [];
    fasttagList: FasttagDetails[] = [];
    drExpList: TripDrExpDetails[] = [];
    cmpExpList: TripCmpExpDetails[] = [];
}





