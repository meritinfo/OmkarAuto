export class Tyreregroupissuemastermodel {
  regroupIssMasterID : string ="";
  regroupIssDate : string ="";
  issueIncharge : string ="";
  vendorId : string ="";
  vendorName : string ="";
  remarks : string ="";
  approvedYN : string ="";
  branchCode : string ="";
  yearID : string ="";
  loggedInUser : string ="";
  tyreRegroupIssueDtlList: TyreRegroupIssueDtlListmodel[] = [];
}

export class TyreRegroupIssueDtlListmodel {
  regroupIssMasterID : string ="";
  regroupIssDate : string ="";
  brandId :  string="";
  tyreId :  string="";
  remarks : string ="";
  branchCode : string ="";
  yearID : string ="";
}