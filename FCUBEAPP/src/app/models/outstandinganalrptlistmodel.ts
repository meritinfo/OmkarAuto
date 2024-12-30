import { Paginationmodel } from "./paginationmodel";
import { Outstandinganalrptmodel } from "./outstandinganalrptmodel";

export class Outstandinganalrptlistmodel {
    outstandingAnalList: Outstandinganalrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}