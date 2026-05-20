import { Paginationmodel } from "./paginationmodel";
import { Tyreregrouprecdmastermodel } from "./tyreregrouprecdmastermodel";

export class Tyreregrouprecdmasterlistmodel {
    tyreRegroupRecdList: Tyreregrouprecdmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
