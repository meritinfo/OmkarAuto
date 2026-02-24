import { Paginationmodel } from "./paginationmodel";
import { Debitnotemodel } from "./debitnotemodel";

export class Debitnotelistmodel {
    debitList: Debitnotemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
