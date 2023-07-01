import { Paginationmodel } from "./paginationmodel";
import { Branchmodel } from "./branchmodel";

export class Branchmasterlistmodel {
  branchMasterList: Branchmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
