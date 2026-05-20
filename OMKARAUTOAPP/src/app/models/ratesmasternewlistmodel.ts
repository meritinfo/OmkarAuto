import { Paginationmodel } from "./paginationmodel";
import { Ratesmasternewmodel } from "./ratesmasternewmodel";

export class Ratesmasternewlistmodel {
    newList: Ratesmasternewmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
