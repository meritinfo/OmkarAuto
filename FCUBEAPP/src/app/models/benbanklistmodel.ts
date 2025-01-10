import { Paginationmodel } from "./paginationmodel";
import { Benbankmodel } from "./benbankmodel";

export class Benbanklistmodel {
    benList: Benbankmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}