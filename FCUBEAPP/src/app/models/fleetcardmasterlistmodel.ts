import { Paginationmodel } from "./paginationmodel";
import { Fleetcardmastermodel } from "./fleetcardmastermodel";

export class Fleetcardmasterlistmodel {
  cardList: Fleetcardmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}