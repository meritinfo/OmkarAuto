import { Paginationmodel } from "./paginationmodel";
import { Lrbillseriesmodel } from "./lrbillseriesmodel";


export class Lrbillserieslistmodel {
    lrbillseriesList: Lrbillseriesmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
