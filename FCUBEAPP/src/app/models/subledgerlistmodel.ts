import { Paginationmodel } from "./paginationmodel";
import { Subledgermodel } from "./subledgermodel";

export class Subledgerlistmodel {
    subList: Subledgermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
