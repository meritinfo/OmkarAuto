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
  
  createdBy: string = "";
  createdDate: string = "";
  modifiedBy: string = "";
  modifiedDate: string = "";


  vehicleAdvBalReceiptDtlList: VehicleadvbalreceiptdtllistModel[] = [];
}


export class VehicleadvbalreceiptdtllistModel {
  tripRouteDtlId: string = "";
  loadBranch: string = "";
  loadMemoNo: string = "";
  loadDate: string = "";
  tripNo: string = "";
  dueAmt: string = "";  
  paidAmt: string = "";  
  received: string = "";
  deduction: string = "";
  tds: string = "";
  extras: string = "";
  dtlRemarks: string = "";   
}
