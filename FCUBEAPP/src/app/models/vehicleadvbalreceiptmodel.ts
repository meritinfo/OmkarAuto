export class VehicleadvbalreceiptModel {
    transId: string = "";
 transBranch: string = "";
 transDate: string = "";
 tripsUptoDate: string = "";
 vehicleMasterId: string = "";
 cheqCashAmt: string = "";
 tripOnAcAdj: string = "";
 onAcAdjAmt: string = "";
 amtRecd: string = "";
 amtDed: string = "";
 amtTDS: string = "";
 amtExtras: string = "";
 totalAmtRecd: string = "";
 remarks: string = "";
 receiptType: string = "";
 neftYN: string = "";
 chequeNo: string = "";
 chequeDate: string = "";
 debitAc: string = "";
 finDocid: string = "";
 finDocidJV: string = "";
 yearId: string = "";
 vehicleNo: string = "";
 branchName: string = "";
 loggedInUser: string = "";


 vehicleAdvBalReceiptDtlList: VehicleadvbalreceiptdtllistModel[] = [];
}
export class VehicleadvbalreceiptdtllistModel {
     transDtlId: string = "";
     transId: string = "";
     transBranch: string = "";
     transDate: string = "";
     vehicleMasterId: string = "";
     tripNo: string = "";
   //  tripYear: string = "";
     //tripRouteDtlId: string = "";
     received: string = "";
     deduction: string = "";
     tds: string = "";
     extras: string = "";
     dtlRemarks: string = "";
     yearId: string = "";
    
  

}
