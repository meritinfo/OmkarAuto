import { Paginationmodel } from "./paginationmodel";
import { Dovehicleinmodel } from "./dovehicleinmodel";

export class Dovehicleinlistmodel {
    doVehicleInList: Dovehicleinmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
