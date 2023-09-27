import { Paginationmodel } from "./paginationmodel";
import { Journalentrymodel } from "./journalentrymodel";

export class Journalentrylistmodel {
  JournalEntryList: Journalentrymodel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}