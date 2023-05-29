import { Paginationmodel } from "./paginationmodel";
import { Destinationmodel } from "./destinationmodel";

export class Destinationlistmodel {
    destinationList: Destinationmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
