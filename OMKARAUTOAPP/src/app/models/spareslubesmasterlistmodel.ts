import { Paginationmodel } from "./paginationmodel";
import { Spareslubesmastermodel } from "./sparelubesmastermodel";

export class Spareslubesmasterlistmodel {
    sparesList: Spareslubesmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
