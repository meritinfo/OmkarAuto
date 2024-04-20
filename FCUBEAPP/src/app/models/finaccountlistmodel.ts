
import { Paginationmodel } from "./paginationmodel";
import { Finaccountmodel } from "./finaccountmodel";

export class Finaccountlistmodel {
    finaccountList: Finaccountmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
