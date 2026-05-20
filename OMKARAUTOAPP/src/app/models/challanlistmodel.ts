import { Paginationmodel } from "./paginationmodel";
import { Challanmastermodel } from "./challanmastermodel";

export class Challanlistmodel {
  challanList: Challanmastermodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
