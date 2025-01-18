import { Paginationmodel } from "./paginationmodel";
import { Domodel } from "./domodel";

export class Dolistmodel {
    doList: Domodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
