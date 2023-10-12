import { Paginationmodel } from "./paginationmodel";
import { Ratesmastermodel } from "./ratesmastermodel";

export class Ratesmasterlistmodel {
    ratesMasterList: Ratesmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
