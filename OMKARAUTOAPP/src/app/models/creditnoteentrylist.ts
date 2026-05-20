import { Paginationmodel } from "./paginationmodel";
import { Creditnoteentrymodel } from "./creditnoteentrymodel";

export class Creditnoteentrylistmodel {
    creditList: Creditnoteentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
