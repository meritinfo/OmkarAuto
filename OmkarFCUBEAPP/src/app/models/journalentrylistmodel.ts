import { Paginationmodel } from "./paginationmodel";
import { Journalentrymodel } from "./journalentrymodel";

export class Journalentrylistmodel {
  docRenewalMasterList: Journalentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}