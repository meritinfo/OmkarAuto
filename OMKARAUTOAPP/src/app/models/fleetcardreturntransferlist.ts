import { Paginationmodel } from "./paginationmodel";
import { Fleetcardreturntransfermodel } from "./fleetcardreturntransfermodel";

export class Fleetcardreturntransferlist {
    fleetCardReturnTransferLst : Fleetcardreturntransfermodel[] = [];
    pageMetaData               : Paginationmodel = new Paginationmodel;
}

