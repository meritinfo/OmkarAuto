import { Paginationmodel } from "./paginationmodel";
import { Brandmastermodel } from "./brandmastermodel";

export class Brandmasterlistmodel {
  brandList: Brandmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
