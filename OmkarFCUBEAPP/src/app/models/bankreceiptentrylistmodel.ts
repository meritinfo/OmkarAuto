import { Paginationmodel } from "./paginationmodel";
import { bankreceiptentrymodel } from "./bankreceiptentrymodel";

export class bankreceiptentrylistmodel {
    bankRecPaymentsList: bankreceiptentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}




