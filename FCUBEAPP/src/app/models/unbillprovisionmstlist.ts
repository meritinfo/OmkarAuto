import { Paginationmodel } from "./paginationmodel";
import { Unbilledprovisionmstmodel } from "./unbillprovisionmst";

export class UnbillprovisionmstList  {
    provisionList: Unbilledprovisionmstmodel [] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
