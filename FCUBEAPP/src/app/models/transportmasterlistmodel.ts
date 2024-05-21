import { Paginationmodel } from "./paginationmodel";
import { Transportmastermodel } from "./transportmastermodel";

export class Transportmasterlistmodel {
    transportMastersList: Transportmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
