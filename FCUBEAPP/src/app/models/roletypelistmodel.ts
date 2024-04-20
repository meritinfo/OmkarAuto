import { Paginationmodel } from "./paginationmodel";
import { Roletypemodel } from "./roletypemodel";

export class Roletypelistmodel {
    roleList: Roletypemodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
