import { Paginationmodel } from "./paginationmodel";
import { Branchmodel } from "./branchmodel";

export class Branchmasterlistmodel {
  BranchMasterList: Branchmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
