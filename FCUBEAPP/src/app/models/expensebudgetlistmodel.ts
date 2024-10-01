import { Paginationmodel } from "./paginationmodel";
import { Expensebudgetmodel } from "./expensebudgetmodel";

export class Expensebudgetlistmodel {
    expenseList: Expensebudgetmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
