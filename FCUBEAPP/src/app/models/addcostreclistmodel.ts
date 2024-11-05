import { Paginationmodel } from "./paginationmodel";
import { Addcostrecmstmodel } from "./addcostrecmstmodel";

export class Addcostreclistmodel {
    addCostRecMstList: Addcostrecmstmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
