
import { Paginationmodel } from "./paginationmodel";
import { Deliveryackpodmodel } from "./deliveryackpodmodel";

export class Deliveryackpodlistmodel {
    ackList: Deliveryackpodmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}