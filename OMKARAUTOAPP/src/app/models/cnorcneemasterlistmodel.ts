import { Paginationmodel } from "./paginationmodel";
import { Cnorcneemastermodel } from "./cnorcneemastermodel";

export class Cnorcneemasterlistmodel {
  consigneeList: Cnorcneemastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
