import { Paginationmodel } from "./paginationmodel";
import { Journalentrymodel } from "./journalentrymodel";

export class Journalentrylistmodel {
  journalEntList: Journalentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}