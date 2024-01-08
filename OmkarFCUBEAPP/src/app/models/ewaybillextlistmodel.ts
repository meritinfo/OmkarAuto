import { Paginationmodel } from "./paginationmodel";
import { Ewaybillextmodel } from "./ewaybillextmodel";

export class Ewaybillextlistmodel {
    ewaybillextList: Ewaybillextmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
