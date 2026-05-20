import { Paginationmodel } from "./paginationmodel";
import { Billstypemodel } from "./billstypemastermodel";

export class Billstypelistmodel {
  typeList: Billstypemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}