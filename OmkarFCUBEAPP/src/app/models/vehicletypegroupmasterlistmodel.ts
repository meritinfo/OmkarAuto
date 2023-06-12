import { Paginationmodel } from "./paginationmodel";
import { Vehicletypegroupmastermodel } from "./vehicletypegroupmastermodel";

export class Vehicletypegroupmasterlistmodel {
    vehicleTypeGroupMasterList: Vehicletypegroupmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
