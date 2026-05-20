import { Paginationmodel } from "./paginationmodel";
import { Hrmastermodel } from "./hrmastermodel";

export class Hrmasterlistmodel {
    hrList: Hrmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
