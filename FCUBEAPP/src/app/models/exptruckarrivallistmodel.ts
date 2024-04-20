import { Paginationmodel } from "./paginationmodel";
import { Exptruckarrivalmodel } from "./exptruckarrivalmodel";

export class Exptruckarrivallistmodel {
    expTruckArrRptslist: Exptruckarrivalmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
