import { Paginationmodel } from "./paginationmodel";
import { Fasttagmodel } from "./fasttagmodel";

export class Fasttaglistmodel {
    fastTagList: Fasttagmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
