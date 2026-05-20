import { Paginationmodel } from "./paginationmodel";
import { Tripmastermodel } from "./tripmastermodel";

export class Tripmasterlistmodel {
  tripSheetList: Tripmastermodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}