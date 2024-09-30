import { Paginationmodel } from "./paginationmodel";
import {Benificiarymastermodel } from "./benificiarymastermodel";

export class Benificiarymasterlistmodel {

    beneficiaryList: Benificiarymastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
