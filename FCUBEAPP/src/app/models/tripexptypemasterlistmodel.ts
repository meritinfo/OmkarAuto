import { Paginationmodel } from "./paginationmodel";
import { TripexptypemasterModel } from "./tripexptypemastermodel";

export class Tripexptypemasterlistmodel {
    expTypeList: TripexptypemasterModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
