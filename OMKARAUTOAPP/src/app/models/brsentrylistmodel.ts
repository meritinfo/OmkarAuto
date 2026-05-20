import { Paginationmodel } from "./paginationmodel";
import { Brsentrymodel } from "./brsentrymodel";

export class BrsEntrylistmodel {
  brsEntryList: Brsentrymodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
