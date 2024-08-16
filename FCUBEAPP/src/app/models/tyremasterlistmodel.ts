import { Paginationmodel } from "./paginationmodel";
import { TyrePurchaseDtlListmodel } from "./tyrepurchasemastermodel";

export class Tyremasterlistmodel {
    tyreList: TyrePurchaseDtlListmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}