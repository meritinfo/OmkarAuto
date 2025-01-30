import { Paginationmodel } from "./paginationmodel";
import { Gstpctvaluesmodel } from "./gstpctvaluesmodel";

export class Gstpctvalueslistmodel {
    pctList: Gstpctvaluesmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
