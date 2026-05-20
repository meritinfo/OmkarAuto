import { Paginationmodel } from "./paginationmodel";
import { Fleetgroupmastermodel } from "./fleetgroupmastermodel";

export class Fleetgroupmasterlist {
        fleetGroupMasterLst: Fleetgroupmastermodel[] = [];
        pageMetaData: Paginationmodel = new Paginationmodel;
}
