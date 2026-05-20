import { Paginationmodel } from "./paginationmodel";
import { ChcosttypesModel } from "./chcosttypesmodel";

export class Chcosttypeslistmodel {
costList: ChcosttypesModel[] = [];
  pageMetaData: Paginationmodel = new Paginationmodel;
}
