import { Paginationmodel } from "./paginationmodel";
import { Billsmastermodel } from "./billsmastermodel";

export class Billsmasterlistmodel {
  billsList: Billsmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
