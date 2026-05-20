export class Branchcustomertargetmodel {
    id: string = "";
    yearId: string = "";
    branchCode: string = "";
    branch: string = "";
    yeardesc: string = "";
    loggedInUser: string = "";
    
    branchCustomerTargetDtlList: BranchcustomertargetDtl[] = [];  

}

export class BranchcustomertargetDtl  {
    dtlId: string = "";
    id: string = "";
    yearId : string = "";
    branchCode: string = "";
    accountId: string = "";
    targetAmt : string = "";
}
