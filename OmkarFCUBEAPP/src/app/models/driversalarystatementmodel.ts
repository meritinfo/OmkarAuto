import { Driversalarydetailmodel } from "./driversalarydetailmodel";

export class Driversalarystatementmodel {
    masterId: string = "";
    transDt: string = "";
    fromDt: string = "";
    toDt: string = "";
 
   // pmtType: string = "";
    remarks: string = "";
    totalSalaryAmt: string = "";
    totalPoolAmt: string = "";
    totalNetPayAmt: string = "";
    pmtType: string = "";
    creditAc: string = "";
    yearId: string = "";
    loggedInUser: string = "";
    driverSalaryListData: Driversalarydetailmodel[] = [];
   
   
}
