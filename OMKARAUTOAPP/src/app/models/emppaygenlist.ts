import { Paginationmodel } from "./paginationmodel";
import { Emppaygenmodel } from "./emppaygenmodel";

export class Emppaygenlist {
    payGenMstList: Emppaygenmodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
