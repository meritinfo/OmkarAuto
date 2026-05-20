import { Paginationmodel } from "./paginationmodel";
import { AdditionalcostrecmasterModel } from "./additionalcostrecmastermodel";

export class Additionalcostrecmasterlistmodel {
    additionalList: AdditionalcostrecmasterModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}