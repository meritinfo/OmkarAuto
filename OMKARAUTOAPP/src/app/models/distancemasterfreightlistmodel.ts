import { Paginationmodel } from "./paginationmodel";
import { Distancemasterfreightmodel } from "./distancemasterfreightmodel";

export class Distancemasterfreightlistmodel {
    distanceFrtList: Distancemasterfreightmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
