import { Paginationmodel } from "./paginationmodel";
import { Vehiclefltmastermodel } from "./vehiclefltmastermodel";

export class Vehiclefltmasterlistmodel {
    vehicleFltMasterList: Vehiclefltmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
