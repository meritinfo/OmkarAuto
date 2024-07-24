import { Paginationmodel } from "./paginationmodel";
import { Tyredeactivatemastermodel } from "./tyredeactivatemastermodel";

export class Tyredeactivatemasterlistmodel {
    tyreDeActivateList: Tyredeactivatemastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}