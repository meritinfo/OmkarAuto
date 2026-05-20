import { Paginationmodel } from "./paginationmodel";
import { Driversalaryentrymodel } from "./driversalaryentrymodel";

export class Driversalaryentrylistmodel {
  salaryList: Driversalaryentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}