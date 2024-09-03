import { Paginationmodel } from "./paginationmodel";
import { Tripsheetmodel } from "./tripsheetmodel";

export class Tripsheetlistmodel {
  tripSheetList: Tripsheetmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}