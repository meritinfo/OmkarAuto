import { Paginationmodel } from "./paginationmodel";
import { Tempgcmodel } from "./tempgcmodel";

export class Tempgclistmodel {
  tempGcList: Tempgcmodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
