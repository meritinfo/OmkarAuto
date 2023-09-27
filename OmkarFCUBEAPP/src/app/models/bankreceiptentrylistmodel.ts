import { Paginationmodel } from "./paginationmodel";
import { bankreceiptentrymodel } from "./bankreceiptentrymodel";

export class bankreceiptentrylistmodel {
    BankRecptpaymentsList: bankreceiptentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}




