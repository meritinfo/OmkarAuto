import { Paginationmodel } from "./paginationmodel";
import { Trippaymentsrptmodel } from "./trippaymentsrptmodel";

export class Trippaymentsrptlistmodel {
    tripPaymentsRptlist: Trippaymentsrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
