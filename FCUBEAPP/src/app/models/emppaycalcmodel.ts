import { Empsalarydtlmodel } from "./empsalarydtlmodel";
import { Empleavemodel } from "./empleavemodel";
import { Emploanpaymodel } from "./emploanpaymodel";

export class Emppaycalcmodel {
    transId: string = "";
    payType: string = "";
    monthYear: string = "";
    empId: string = "";
    empCode: string = "";
    empName: string = "";
    daysOfMonth: string = "";
    holSun: string = "";
    totLeaves: string = "";
    adjLeaves: string = "";
    absentDays : string = "";
    payDays: string = "";
    affectYear : string = "";
    totalEarnings : string = "";
    totalDeductions: string = "";
    netPay: string = "";
    remarks : string = "";
    branchCode : string = "";
    loggedInUser: string = "";
    empSalaryDtlList:Empsalarydtlmodel[] = []; 
    empLeavesList:Empleavemodel[]=[];
    empLoanDtlList:Emploanpaymodel[]=[];
}
