import { Paginationmodel } from "./paginationmodel";
import { Dieselstatementrptmodel } from "./dieselstatementrptmodel";

export class Dieselstatementrptlistmodel {
    dieselStatementRptlist: Dieselstatementrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
