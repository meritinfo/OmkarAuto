import { Paginationmodel } from "./paginationmodel";
import { Employeemodel } from "./employeemodel";

export class Empmasterlistmodel {
    empList: Employeemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
