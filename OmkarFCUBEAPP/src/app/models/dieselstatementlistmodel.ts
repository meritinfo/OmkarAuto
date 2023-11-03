import { Paginationmodel } from "./paginationmodel";
import { Dieselstatementmodel } from "./dieselstatementmodel";

export class Dieselstatementlistmodel {
  dieselList: Dieselstatementmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
