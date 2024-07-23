import { Paginationmodel } from "./paginationmodel";
import { Mrmodel  } from './mrmodel';

export class Mrlistmodel {
    mrList: Mrmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}

