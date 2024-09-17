import { Paginationmodel } from "./paginationmodel";
import { Sparespurchaserptmodel } from "./sparespurchaserptmodel";

export class Sparespurchaserptlistmodel {
    sparesPurchaseRptList: Sparespurchaserptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}