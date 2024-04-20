import { Paginationmodel } from "./paginationmodel";
import { Usermodel } from "./usermodel";

export class Userlistmodel {
    userList: Usermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
