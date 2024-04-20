import { Paginationmodel } from "./paginationmodel";
import { Driversalarystatementmodel } from "./driversalarystatementmodel";

export class Driversalarystatementlistmodel {
  driverSalaryList: Driversalarystatementmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}