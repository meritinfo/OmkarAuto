import { Paginationmodel } from "./paginationmodel";
import { Branchcustomertargetmodel } from "./branchcustomertargetmstmodel";

export class Branchcustomertargetmstlistmodel {
    targetList: Branchcustomertargetmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
