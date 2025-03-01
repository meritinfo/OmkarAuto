import { Paginationmodel } from "./paginationmodel";
import { Freightgstmastermodel } from "./freightgstmastermodel";

export class Freightgstmasterlistmodel {
    gstList: Freightgstmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}