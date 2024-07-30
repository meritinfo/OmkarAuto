import { Paginationmodel } from "./paginationmodel";
import { Tyresalesmastermodel } from "./tyresalesmastermodel";

export class Tyresalesmasterlistmodel {
    tyreSalesList: Tyresalesmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
