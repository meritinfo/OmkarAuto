import { Paginationmodel } from "./paginationmodel";
import { Billsubmitmastermodel } from "./billsubmitmastermodel";

export class Billsubmitmasterlistmodel {
    submitList: Billsubmitmastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
