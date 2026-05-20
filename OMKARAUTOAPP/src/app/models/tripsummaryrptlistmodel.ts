import { Paginationmodel } from "./paginationmodel";
import { Tripsummaryrptmodel } from "./tripsummaryrptmodel";

export class Tripsummaryrptlistmodel {
    tripSummaryRptlist: Tripsummaryrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
