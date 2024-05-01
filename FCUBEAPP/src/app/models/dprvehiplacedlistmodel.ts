import { Paginationmodel } from "./paginationmodel";
import { Dprvehiplacedmodel } from "./dprvehiplacedmodel";

export class Dprvehiplacedlistmodel {
    dprVehiList: Dprvehiplacedmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}