import { Paginationmodel } from "./paginationmodel";
import { Detentionrptmodel } from "./detentionrptmodel";

export class Detentionrptlistmodel {
    detentionList: Detentionrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
