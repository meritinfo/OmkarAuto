import { Paginationmodel } from "./paginationmodel";
import { Trippaymentsmodel } from "./trippaymentsmodel";

export class Trippaymentslistmodel {
  tripPaymentsList: Trippaymentsmodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
