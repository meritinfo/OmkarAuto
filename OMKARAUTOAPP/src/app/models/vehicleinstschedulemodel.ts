import { Vehicleinstscheduledtlmodel } from "./vehicleinstscheduledtlmodel";

export class Vehicleinstschedulemodel {
    masterID        : string = "";    
    vehicleMasterId : string = "";
    vehicleNo       : string = "";   
    loanType        : string = "";   
    loanTp          : string = "";  
    startDate       : string = "";  
    endDate         : string = "";  
    noOfMonths      : string = "";  
    principalEmi    : string = "";  
    interestEmi     : string = "";  
    totalEmi        : string = "";  
    scheudleType    : string = "";  
    totalPrincipal  : string = "";  
    totalInterest   : string = "";  
    totalLoanAmt    : string = "";  
    remarks         : string = "";  
    createdBy: string = "";
    createdDate: string = "";
    modifiedBy: string = "";
    modifiedDate: string = "";
    loggedInUser    : string = "";  
    instScheduleDtls: Vehicleinstscheduledtlmodel[] = [];
}
