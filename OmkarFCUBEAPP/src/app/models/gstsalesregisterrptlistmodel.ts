import { Paginationmodel } from "./paginationmodel";
import { Gstsalesregisterrptmodel } from "./gstsalesregisterrptmodel";

export class Gstsalesrptlistmodel {
    gstSalesList: Gstsalesregisterrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
