import { Paginationmodel } from "./paginationmodel";
import { Tripstatusrptmodel } from "./tripstatusrptmodel";

export class Tripstatusrptlistmodel {
    tripStatusRptlist: Tripstatusrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
