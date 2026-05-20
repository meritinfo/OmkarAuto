import { Paginationmodel } from "./paginationmodel";
import { Tyreactivatemastermodel } from "./tyreactivatemastermodel";

export class Tyreactivatemasterlistmodel {
    tyreActivateList: Tyreactivatemastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}