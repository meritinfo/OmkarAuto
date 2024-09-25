import { Paginationmodel } from "./paginationmodel";
import {Benificiarymastermodel } from "./benificiarymastermodel";

export class Benificiarymasterlistmodel {

    benificiaryList: Benificiarymastermodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
