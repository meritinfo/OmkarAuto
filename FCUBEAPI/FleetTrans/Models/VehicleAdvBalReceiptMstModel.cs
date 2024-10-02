using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VehicleAdvBalReceiptMstModel
    {
        public string? TransId { get; set; }
        public string? TransBranch { get; set; }
        public string? TransDate { get; set; }
        public string? TripsUptoDate { get; set; }
        public string? VehicleMasterId { get; set; }
        public string? CheqCashAmt { get; set; }
        public string? TripOnAcAdj { get; set; }
        public string? OnAcAdjAmt { get; set; }
        public string? AmtRecd { get; set; }
        public string? AmtDed { get; set; }
        public string? AmtTDS { get; set; }
        public string? AmtExtras { get; set; }
        public string? TotalAmtRecd { get; set; }

        public string? Remarks { get; set; }
        public string? ReceiptType { get; set; }
        public string? NeftYN { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? DebitAc { get; set; }

        public string? FinDocid { get; set; }

        public string? FinDocidJV { get; set; }
        public string? YearId { get; set; }
        public string? Vehicle { get; set; }
        public string? VehicleNo { get; set; }
        public string? BranchName{ get; set; }
        public string? LoggedInUser { get; set; }
      
        public List<VehicleAdvBalReceiptDtlListmodel>? VehicleAdvBalReceiptDtlList { get; set; }

    }
    public class VehicleAdvBalReceiptDtlListmodel
    {
        public string? TripRouteDtlId { get; set; }
        public string? LoadBranch { get; set; }
        public string? LoadMemoNo { get; set; }
        public string? LoadDate { get; set; }
        public string? TripNo { get; set; }
        public string? DueAmt { get; set; }
        public string? PaidAmt { get; set; }
        public string? Received { get; set; }
        public string? Deduction { get; set; }
        public string? TDS { get; set; }
        public string? Extras { get; set; }
        public string? DtlRemarks { get; set; }

    }

}
