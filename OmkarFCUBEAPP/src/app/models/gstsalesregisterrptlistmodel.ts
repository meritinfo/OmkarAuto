import { Paginationmodel } from "./paginationmodel";
import { Gstsalesregisterrptmodel } from "./gstsalesregisterrptmodel";

export class Gstsalesrptlistmodel {
    gstSalesRegisterRptlist: Gstsalesregisterrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
