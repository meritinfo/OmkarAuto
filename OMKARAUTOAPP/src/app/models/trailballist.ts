import { Paginationmodel } from "./paginationmodel";
import { Trailbalmodel } from "./trailbalmodel";

export class Trailballist {
    trailList: Trailbalmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
