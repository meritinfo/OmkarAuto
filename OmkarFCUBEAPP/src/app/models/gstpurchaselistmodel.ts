import { Paginationmodel } from "./paginationmodel";
import { Gstpurchasemodel  } from './gstpurchasemodel';


export class Gstpurchaselistmodel {
    gstpurchaseList: Gstpurchasemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
