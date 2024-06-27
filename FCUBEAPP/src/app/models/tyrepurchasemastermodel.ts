export class Tyrepurchasemastermodel {
    purchaseMasterID : string ="";
      branchCode : string ="";
      purchaseDate : string ="";
      datetime : string ="";
      purchaseType : string ="";
      noVendor : string ="";
      vendorId : string ="";
      vendorName : string ="";
      vendorAddress : string ="";
      vendorGstNo : string ="";
      vendorInvNo : string ="";
      vendorInvDt : string ="";
   
      tyreSacCode : string ="";
      gstType : string ="";
      totalTyresAmt : string ="";
      totalSgstAmt : string ="";
      totalCgstAmt : string ="";
      totalIgstAmt : string ="";
      totalAmt : string ="";
      roundOff : string ="";
      netAmount : string ="";
      remarks : string ="";
      pmtType : string ="";
      neftPmt : string ="";
      creditAc : string ="";
      chequeNo : string ="";
      chequeDate : string ="";
      findocid : string ="";
      findocidJV : string ="";
      refDocAttachedImage : string ="";
      yearID : string ="";
      loggedInUser : string ="";
      tyrePurchaseDtlList: TyrePurchaseDtlListmodel[] = [];
    }
    export class TyrePurchaseDtlListmodel {
        tyreId :  string="";
       purchaseMasterID :  string="";
       purchaseDate :  string="";
       brandID :  string="";
       tyreNo :  string="";
       tyrePattern :  string="";
       tyreModel :  string="";
       tyreAmount :  string="";
       sgstPct :  string="";
       sgstAmt :  string="";
       cgstPct :  string="";
       cgstAmt :  string="";
       igstPct :  string="";
       igstAmt :  string="";
       netTyreAmount :  string="";
       estLifeKM :  string="";
       regroupAmt :  string="";
       currentTyreStatus :  string="";
       currentStatusDate :  string="";
       currentVehicleNo :  string ="";
      }