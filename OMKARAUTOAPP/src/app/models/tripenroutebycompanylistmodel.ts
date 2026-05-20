import { Paginationmodel } from "./paginationmodel";
import { TripenrouteexpbycompanyModel } from "./tripenroutebycompanymodel";
export class Tripenroutebycompanylistmodel { 

    companyList: TripenrouteexpbycompanyModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
