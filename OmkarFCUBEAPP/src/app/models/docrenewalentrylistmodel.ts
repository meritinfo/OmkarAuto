import { Paginationmodel } from "./paginationmodel";
import { Docrenewalentrymodel } from "./docrenewalentrymodel";

export class Docrenewalentrylistmodel {
  docRenewalList: Docrenewalentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
