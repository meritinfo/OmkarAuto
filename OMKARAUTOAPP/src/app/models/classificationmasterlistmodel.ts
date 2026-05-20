import { Paginationmodel } from "./paginationmodel";
import { Classificationmastermodel } from "./classificationmastermodel";

export class Classificationmasterlistmodel {
classificationMastersList: Classificationmastermodel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
