export class Openingbalancemodel {
    yearID: string="";
    branchCode: string="";
    branchName: string="";
    
    openingBalDetailList: OpeningBalanceDetailModel[]=[];
}

export class OpeningBalanceDetailModel{
    accountID: string="";
    openingBalanceAmt: string="";
    openingBalanceCrDr: string="";
}
