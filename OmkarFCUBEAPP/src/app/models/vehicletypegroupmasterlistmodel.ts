import { Paginationmodel } from "./paginationmodel";
import { Vehicletypegroupmastermodel } from "./vehicletypegroupmastermodel";

export class Vehicletypegroupmasterlistmodel {
    vehicleTypeGroupList: Vehicletypegroupmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
