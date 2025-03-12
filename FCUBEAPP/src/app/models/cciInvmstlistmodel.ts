import { Paginationmodel } from "./paginationmodel";
import { Ccinvmstmodel } from "./cciInvmstmodel";

export class CciInvmstlistmodel {
    invoiceList: Ccinvmstmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
