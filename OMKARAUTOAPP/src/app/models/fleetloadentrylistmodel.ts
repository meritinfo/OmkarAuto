import { Paginationmodel } from "./paginationmodel";
import { Fleetloadentrymodel } from "./fleetloadentrymodel";

export class Fleetloadentrylistmodel {
    loadEntryList: Fleetloadentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}