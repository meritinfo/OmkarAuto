import { Paginationmodel } from "./paginationmodel";
import { bankreceiptentrymodel } from "./bankreceiptentrymodel";

export class bankreceiptentrylistmodel {
    bankRecptpaymentsList: bankreceiptentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}




