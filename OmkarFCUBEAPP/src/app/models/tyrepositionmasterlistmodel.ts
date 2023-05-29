import { Paginationmodel } from "./paginationmodel";
import { Tyrepositionmastermodel } from "./tyrepositionmastermodel";

export class Tyrepositionmasterlistmodel {
  tyrePositionMasterList: Tyrepositionmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
