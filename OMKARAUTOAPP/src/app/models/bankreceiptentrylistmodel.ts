import { Paginationmodel } from "./paginationmodel";
import { bankreceiptentrymodel } from "./bankreceiptentrymodel";

export class bankreceiptentrylistmodel {
    recPaymentsList: bankreceiptentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}




