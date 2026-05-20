import { Paginationmodel } from "./paginationmodel";
import { Vehicleflttypemstmodel } from "./vehicleflttypemstmodel";

export class Vehicleflttypemstlist {
    fltList: Vehicleflttypemstmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}