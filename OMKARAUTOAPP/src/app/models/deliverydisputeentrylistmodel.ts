import { Paginationmodel } from "./paginationmodel";
import { Deliverydisputeentrymodel } from "./deliverydisputeentrymodel";

export class Deliverydisputeentrylistmodel {
    disputeList: Deliverydisputeentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}