
import { Paginationmodel } from "./paginationmodel";
import { Ledgerdetailmodel  } from './ledgerdetailmodel';

export class Ledgerdetaillistmodel {
    ledgerList: Ledgerdetailmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
