import { Paginationmodel } from "./paginationmodel";
import { Dovehiplacedmodel } from "./dovehiplacedmodel";

export class Dovehiplacedlistmodel {
    doVehiPlacedList: Dovehiplacedmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
