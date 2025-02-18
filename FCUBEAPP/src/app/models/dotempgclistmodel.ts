import { Paginationmodel } from "./paginationmodel";
import { Dotempgcmodel } from "./dotempgcmodel";

export class Dotempgclistmodel {
    doTempGcList: Dotempgcmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
