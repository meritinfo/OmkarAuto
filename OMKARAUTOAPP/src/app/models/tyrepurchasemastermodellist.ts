import { Paginationmodel } from "./paginationmodel";
import { Tyrepurchasemastermodel } from "./tyrepurchasemastermodel";

export class Tyrepurchasemasterlistmodel {
  tyreList: Tyrepurchasemastermodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
