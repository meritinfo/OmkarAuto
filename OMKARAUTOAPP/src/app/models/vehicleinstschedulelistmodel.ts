import { Paginationmodel } from "./paginationmodel";
import { Vehicleinstschedulemodel } from "./vehicleinstschedulemodel";

export class Vehicleinstschedulelistmodel {
    vehicleInstSchedulelist: Vehicleinstschedulemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}