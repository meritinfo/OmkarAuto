import { Paginationmodel } from "./paginationmodel";
import { Tyreregroupissuemastermodel } from "./tyreregroupissuemastermodel";

export class Tyreregroupissuemasterlistmodel {
    tyreRegroupIssueList: Tyreregroupissuemastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
