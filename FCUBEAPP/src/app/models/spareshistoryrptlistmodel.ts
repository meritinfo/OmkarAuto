import { Paginationmodel } from "./paginationmodel";
import { Spareshistoryrptmodel } from "./spareshistoryrptmodel";

export class Spareshistoryrptlistmodel {
    sparessHistoryRptList: Spareshistoryrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
