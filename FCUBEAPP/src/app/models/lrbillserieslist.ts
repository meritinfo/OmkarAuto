import { Paginationmodel } from "./paginationmodel";
import { Lrbillseriesmodel } from "./lrbillseriesmodel";


export class Lrbillserieslistmodel {
    seriesList: Lrbillseriesmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
