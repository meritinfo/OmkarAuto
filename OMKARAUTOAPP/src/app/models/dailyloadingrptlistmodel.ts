import { Paginationmodel } from "./paginationmodel";
import { Dailyloadingrptmodel } from "./dailyloadingrptmodel";

export class Dailyloadingrptlistmodel {
    dailyLoadingRptsList: Dailyloadingrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
