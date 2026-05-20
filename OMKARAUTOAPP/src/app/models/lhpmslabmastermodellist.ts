import { Paginationmodel } from "./paginationmodel";
import { Lhpmslabmastermodel } from "./lhpmslabmastermodel";


export class Lhpmslabmasterlistmodel {
    slabList: Lhpmslabmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
