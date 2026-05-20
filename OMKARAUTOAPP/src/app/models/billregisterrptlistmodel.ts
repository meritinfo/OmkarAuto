import { Paginationmodel } from "./paginationmodel";
import { Billregisterrptmodel } from "./billregisterrptmodel";

export class Billregisterrptlistmodel {

    billRegisterRptList: Billregisterrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
