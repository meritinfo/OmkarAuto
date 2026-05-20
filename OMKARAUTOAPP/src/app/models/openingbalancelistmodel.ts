import { Paginationmodel } from "./paginationmodel";
import { Openingbalancemodel } from "./openingbalancemodel";

export class Openingbalancelistmodel {
    openbalList: Openingbalancemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
