import { Paginationmodel } from "./paginationmodel";
import { Consignmentmodel } from "./consignmentmodel";

export class Consignmentlistmodel {
  cnList: Consignmentmodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
