import { Paginationmodel } from "./paginationmodel";
import { Dieselstmtmodel } from "./dieselstmtmodel";

export class Dieselstmtlistmodel {
    dieselList: Dieselstmtmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
