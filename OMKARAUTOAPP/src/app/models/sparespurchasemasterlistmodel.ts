import { Paginationmodel } from "./paginationmodel";
import { Sparespurchasemastermodel } from "./sparespurchasemastermodel";

export class Sparespurchasemasterlistmodel {
  purchaseList: Sparespurchasemastermodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
