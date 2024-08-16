import { Paginationmodel } from "./paginationmodel";
import { Sparespurchasemastermodel } from "./sparespurchasemastermodel";

export class Sparespurchasemasterlistmodel {
  sparesList: Sparespurchasemastermodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
