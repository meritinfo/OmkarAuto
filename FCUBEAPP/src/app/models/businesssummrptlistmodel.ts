import { Paginationmodel } from "./paginationmodel";
import { Businesssummrptmodel } from "./businesssummrptmodel";

export class Businesssummrptlistmodel {
    businessSummRptList: Businesssummrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
