import { Paginationmodel } from "./paginationmodel";
import { Vehicleengagementrptmodel } from "./vehicleengagementrptmodel";

export class Vehicleengagementrptlistmodel {
    vehicleEngagementRptList: Vehicleengagementrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
