import { Paginationmodel } from "./paginationmodel";
import { Productgroupmastermodel } from "./productgroupmastermodel";

export class Productgroupmasterlistmodel {
    productGroupList: Productgroupmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
