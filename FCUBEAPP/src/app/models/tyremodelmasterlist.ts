import { Paginationmodel } from "./paginationmodel";
import { Tyremodelmastermodel } from "./tyremodelmastermodel";

export class Tyremodelmasterlistmodel {
    tyreList: Tyremodelmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}