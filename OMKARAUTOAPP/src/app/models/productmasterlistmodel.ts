import { Paginationmodel } from "./paginationmodel";
import { Productmastermodel } from "./productmastermodel";

export class Productmasterlistmodel {
    productmasterList: Productmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
