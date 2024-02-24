import { Empsalarydtlmodel } from "./empsalarydtlmodel";

export class Empsalarymstmodel {
    masterId : string = "";
    empId : string = "";
    empCode : string = "";
    empName : string = "";
    fromDate : string = "";
    grossSalary : string = "";
    loggedInUser  : string = "";      
    empSalaryDtlList: Empsalarydtlmodel[] = []; 
}
