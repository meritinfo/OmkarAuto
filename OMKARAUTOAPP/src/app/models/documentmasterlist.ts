import { Paginationmodel } from "./paginationmodel";
import { Documentmastermodel } from "./documentmastermodel";

export class Documentmasterlistmodel {
  docList: Documentmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}