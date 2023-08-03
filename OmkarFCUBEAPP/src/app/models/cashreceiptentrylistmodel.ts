import { Paginationmodel } from "./paginationmodel";
import { Cashreceiptentrymodel } from "./cashreceiptentrymodel";

export class Cashreceiptentrylistmodel {
    CashRecPaymentsList: Cashreceiptentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
