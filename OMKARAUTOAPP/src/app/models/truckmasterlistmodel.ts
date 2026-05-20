import { Paginationmodel } from "./paginationmodel";
import { Truckmastermodel } from "./truckmastermodel";

export class Truckmasterlistmodel {
    truckList: Truckmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
