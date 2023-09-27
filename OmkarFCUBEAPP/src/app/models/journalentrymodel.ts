export class Journalentrymodel {
  ftmId: string = "";
  ftmDate: string = "";
  docType: string = "";
  docSeries: string = "";
  docNo: string = "";
  seriesDoc: string = "";
  remarks: string = "";
  refType: string = "";
  refNo: string = "";
  docAmount: string = "";
  linkedYN  : string = "";
  yearID    : string = "";
  branchCode     : string = "";
  modifyRemarks     : string = "";
 
  detailList: JournalentryDetailmodel[] = [];

}
export class JournalentryDetailmodel {
  ftdID : string = "";
  ftmID: string = "";
  ftmDate: string = "";
  slNo : string = "";
  typeSign  : string = "";
  amount: string = "";
  accountId : string = "";

  narration : string = "";
  costRefNo: string = "";
  reference : string = "";
  branchCode : string = "";

}