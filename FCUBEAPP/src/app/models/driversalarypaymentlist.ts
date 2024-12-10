import { Paginationmodel } from "./paginationmodel";
import { Driversalarypaymentmodel } from "./driversalarypaymentmodel";

export class Driversalarylistmodel {
  salaryList: Driversalarypaymentmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}