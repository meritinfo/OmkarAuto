import { Paginationmodel } from "./paginationmodel";
import { Custwizardmodel } from "./custwizardmodel";

export class Custwizardlistmodel {
    custList: Custwizardmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
