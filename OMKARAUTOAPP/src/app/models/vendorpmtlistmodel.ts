import { Paginationmodel } from "./paginationmodel";
import { Vendorpmtmodel } from "./vendorpmtmodel";

export class Vendorpmtlistmodel {
    vendorPmtList: Vendorpmtmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
