import { Paginationmodel } from "./paginationmodel";
import { Driversalarystatementmodel } from "./driversalarystatementmodel";

export class Driversalarystatementlistmodel {
  driversalaryList: Driversalarystatementmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}