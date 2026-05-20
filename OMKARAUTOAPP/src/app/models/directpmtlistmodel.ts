import { Paginationmodel } from "./paginationmodel";
import { Directpmtmodel } from "./directpmtmodel";

export class Directpmtlistmodel {
    pmtList: Directpmtmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
