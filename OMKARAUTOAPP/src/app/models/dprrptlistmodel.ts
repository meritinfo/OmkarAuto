import { Paginationmodel } from "./paginationmodel";
import { Dprrptmodel } from "./dprrptmodel";

export class Dprrptlistmodel {
    dprRptList: Dprrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}