import { Paginationmodel } from "./paginationmodel";
import { Distancemastertripmodel } from "./distancemastertripmodel";

export class Distancemastertriplistmodel {
    distanceTripList: Distancemastertripmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
