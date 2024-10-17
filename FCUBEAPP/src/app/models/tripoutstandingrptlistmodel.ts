import { Paginationmodel } from "./paginationmodel";
import { Tripoutstandingrptmodel } from "./tripoutstandingrptmodel";

export class Tripoutstandingrptlistmodel {
    tripOutstandingRptlist: Tripoutstandingrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
