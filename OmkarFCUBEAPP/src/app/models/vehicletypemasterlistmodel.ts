import { Paginationmodel } from "./paginationmodel";
import { Vehicletypemastermodel } from "./vehicletypemastermodel";

export class Vehicletypemasterlistmodel {
    vehicleTypeMasterList: Vehicletypemastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
