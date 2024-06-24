import { Paginationmodel } from "./paginationmodel";
import { Lorryhiremastermodel } from "./lorryhiremastermodel";


export class Lorryhirelistmodel {
    lorryHireList: Lorryhiremastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
