import { Paginationmodel } from "./paginationmodel";
import { Documentallotmentmodel } from "./documentallotmentmodel";

export class Documentallotmentlistmodel {
    documentAllotmentLists: Documentallotmentmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
