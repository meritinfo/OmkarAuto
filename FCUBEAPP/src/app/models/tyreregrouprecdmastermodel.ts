export class Tyreregrouprecdmastermodel {
  regroupRecdMasterID : string ="";
  branchCode : string ="";
  recdDate : string ="";
  vendorId : string ="";
  vendorName : string ="";
  vendorBillNo : string ="";
  vendorBillDt : string =""; 
  remarks : string ="";  
  totalAmt : string ="";
  sgstPct : string ="";
  sgstAmt : string ="";
  cgstPct : string ="";
  cgstAmt : string ="";
  igstPct : string ="";
  igstAmt : string ="";
  otherAmt: string ="";
  roundOffAmt : string ="";
  netBillAmt : string ="";
  pmtType : string ="";
  finDocID : string ="";
  chequeNo : string ="";
  chequeDt : string ="";
  creditAc : string ="";
  attatchFile : string ="";
  yearID : string ="";
  loggedInUser : string ="";
  tyreRegroupRecdDtlList: TyreRegroupRecdDtlListmodel[] = [];
}

export class TyreRegroupRecdDtlListmodel {
  regroupRecdMasterID  : string = "";
  brandId  : string = "";
  tyreId  : string = "";
  regroupDoneYN  : string = "";
  regroupAmount  : string = "";
  remarks  : string = "";
  regroupIssueDtlId  : string = "";
}