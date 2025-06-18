export class Unbilledprovisionmstmodel {
    id  :string = "";
    yearId  :string = "";
    provisionDate  :string = "";
     yeardesc :string = "";


    loggedInUser: string = "";
    unBillProvisionDtlList: UnbillprovisiondtlModel[] = [];  

}

export class UnbillprovisiondtlModel {
    dtlId: string = "";
    id : string = "";
    branchCode : string = "";
      partyCode : string = "";
    amount : string = "";
      finDocid  : string = "";
       branchName : string = "";
        partyName : string = "";
}
