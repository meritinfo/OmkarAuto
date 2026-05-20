import { Paginationmodel } from "./paginationmodel";
import { Partymislocationmodel } from "./partymislocationsmodel";
export class Partymislocationlistmodel {
    misList: Partymislocationmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
