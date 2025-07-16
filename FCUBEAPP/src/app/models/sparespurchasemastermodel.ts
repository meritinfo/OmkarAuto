export class Sparespurchasemastermodel {
  spTransId:  string="";
  transDate:  string="";
  nonVendor:  string="";
  vendorId:  string="";
  vendorInvDt:  string="";
  vendorInvNo:  string="";
  vendorName:  string="";
  vendorAddress:  string="";
  vendorState:  string="";
  vendorGstNo:  string="";
  gstType:  string="";
  totItemAmount:  string="";
  totSgstAmt:  string="";
  totCgstAmt:  string="";
  totIgstAmt:  string="";
  totItemNetAmount:  string="";
  otherAmount:  string="";
  roundOff:  string="";
  netAmount:  string="";
  remarks:  string="";
  pmtType:  string="";
  creditAc:  string="";
  neftPmt:  string="";
  chequeNo:  string="";
  chequeDate:  string="";
  linkFtmId:  string="";
  linkJVFtmId:  string="";
  // auditedYN:  string="";
  // auditDate:  string="";
  // auditedBy:  string="";
  refDocAttachedImage:  string="";
  branchCode:  string="";
  yearID:  string="";
  gstInputTaken: string="";
  loggedInUser:  string="";
  createdBy: string = "";
  createdDate: string = "";
  modifiedBy: string = "";
  modifiedDate: string = "";
 
  sparesPurchaseDtlList: SparesPurchaseDtlListmodel[] = [];

}
export class SparesPurchaseDtlListmodel {
    spTransDtlId:  string="";
      spTransId:  string="";
      transDate:  string="";
      spareLubId:  string="";
      brandId:  string="";
      itemQty:  string="";
      itemRate:  string="";
      itemAmount:  string="";
      sgstPct:  string="";
      sgstAmt:  string="";
      cgstPct:  string="";
      cgstAmt:  string="";
      igstPct:  string="";
      igstAmt:  string="";
      netAmount:  string="";
      remarks: string="";
  }