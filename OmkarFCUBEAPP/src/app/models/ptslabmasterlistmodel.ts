import { Paginationmodel } from "./paginationmodel";
import { Ptslabmastermodel } from "./ptslabmastermodel";

export class Ptslabmasterlistmodel {
    slabList: Ptslabmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
