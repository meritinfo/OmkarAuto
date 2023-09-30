import { Paginationmodel } from "./paginationmodel";
import { Cashreceiptentrymodel } from "./cashreceiptentrymodel";

export class Cashreceiptentrylistmodel {
    cashRecPaymentsList: Cashreceiptentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
