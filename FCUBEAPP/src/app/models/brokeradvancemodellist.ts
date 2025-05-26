import { Paginationmodel } from "./paginationmodel";
import { BrokeradvancepmtModel } from "./brokeradvancepmtmodel";

export class Brokeradvancepmtlistmodel {
    advanceList: BrokeradvancepmtModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
