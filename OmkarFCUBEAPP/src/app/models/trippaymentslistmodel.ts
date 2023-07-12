import { Paginationmodel } from "./paginationmodel";
import { Trippaymentsmodel } from "./trippaymentsmodel";

export class Trippaymentslistmodel {
  TripPaymentsList: Trippaymentsmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
