import { Paginationmodel } from "./paginationmodel";
import { ChallanreleaseModel } from "./challanreleasemodel";
export class Challanreleaselistmodel {
    releaseList: ChallanreleaseModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}