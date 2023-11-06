import { Paginationmodel } from "./paginationmodel";
import { billstatementmodel } from "./billstatementmodel";

export class Billstatementlistmodel {
  billList: billstatementmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
