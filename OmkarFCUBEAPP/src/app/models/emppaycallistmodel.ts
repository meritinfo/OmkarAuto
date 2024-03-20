import { Paginationmodel } from "./paginationmodel";
import { Emppaycalcmodel } from "./emppaycalcmodel";

export class Emppaycallistmodel {
    empPayCalcMstList: Emppaycalcmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
