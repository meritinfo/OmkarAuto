import { Paginationmodel } from "./paginationmodel";
import { Maintanencemastermodel } from "./maintanencemastermodel";

export class Maintanencemasterlistmodel {
    maintanenceList: Maintanencemastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
