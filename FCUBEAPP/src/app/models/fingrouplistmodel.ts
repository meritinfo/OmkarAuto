import { Paginationmodel } from "./paginationmodel";
import { Fingroupmodel } from "./fingroupmodel";

export class Fingrouplistmodel {
    finGroupList: Fingroupmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
