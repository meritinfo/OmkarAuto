export class Unbilledprovisionmstmodel {
  id  :string = "";
  yearId  :string = "";
  provisionDate  :string = "";
  yeardesc :string = "";
  loggedInUser: string = "";
  unBillProvisionDtlList: UnbillprovisiondtlModel[] = [];  
}

export class UnbillprovisiondtlModel {
  id : string = "";
  branchCode : string = "";
  partyCode : string = "";
  amount : string = "";
  branchName : string = "";
  partyName : string = "";
}
