import { Paginationmodel } from "./paginationmodel";
import { Empsalarymstmodel } from "./empsalarymstmodel";

export class Empsalarymstlistmodel {
    empSalaryList: Empsalarymstmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
