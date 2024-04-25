import { Paginationmodel } from "./paginationmodel";
import { Dprmodel } from "./dprmodel";

export class Dprlistmodel {
    dprList: Dprmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}