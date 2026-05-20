import { Paginationmodel } from "./paginationmodel";
import { Vehicleinstpmtmodel } from "./vehicleinstpmtmodel";

export class Vehicleinstpmtlistmodel {
    pmtList: Vehicleinstpmtmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}