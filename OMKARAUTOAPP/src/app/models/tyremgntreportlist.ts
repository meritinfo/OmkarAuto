import { Paginationmodel } from "./paginationmodel";
import { Tyremgntreportmodel } from "./tyremgntreportmodel";

export class Tyremgntreportlist {
    tyreList: Tyremgntreportmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}