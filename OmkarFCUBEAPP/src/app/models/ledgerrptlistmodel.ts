
import { Paginationmodel } from "./paginationmodel";
import { Ledgerrptmodel  } from './ledgerrptmodel';

export class Ledgerrptlistmodel {
    ledgersList: Ledgerrptmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
