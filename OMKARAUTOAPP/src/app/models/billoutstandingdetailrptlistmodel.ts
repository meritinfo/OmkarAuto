import { Paginationmodel } from "./paginationmodel";
import { Billoutstandingdetailrptmodel } from "./billoutstandingdetailrptmodel";

export class Billoutstandingdetailrptlistmodel {

    billOutstandingRptList: Billoutstandingdetailrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
