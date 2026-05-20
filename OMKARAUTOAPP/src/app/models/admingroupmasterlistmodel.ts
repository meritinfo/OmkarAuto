import { Paginationmodel } from "./paginationmodel";
import { Admingroupmastermodel } from "./admingroupmastermodel";

export class Admingroupmasterlistmodel {
    adminList: Admingroupmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}



