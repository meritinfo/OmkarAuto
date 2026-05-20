import { Paginationmodel } from "./paginationmodel";
import { Sparesstockrptmodel } from "./sparesstockrptmodel";

export class Sparesstockrptlistmodel {
    sparesStockRptList: Sparesstockrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
