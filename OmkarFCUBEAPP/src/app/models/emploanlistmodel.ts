import { Paginationmodel } from "./paginationmodel";
import { Emploanmodel } from "./emploanmodel";

export class Emploanlistmodel {
    loanList: Emploanmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
