using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripPaymentsModel
    {
        public string? PmtId { get; set; }
        public string? PmtBranch { get; set; }
        public string? PmtDate { get; set; }
        public string? VehicleMasterID { get; set; }
        public string? TripNo { get; set; }
        public string? TripMasterId { get; set; }
       
        public string? TransType { get; set; }
        public string? AmountPaid { get; set; }
        public string? Remarks { get; set; }
        public string? PmtType { get; set; }
        public string? NeftPmt { get; set; }
        public string? CreditAc { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? Findocid { get; set; }
        public string? SeriesDoc { get; set; }
        public string? AdjInTrip { get; set; }
        public string? QtyLtrs { get; set; }
        public string? RatePerLtr { get; set; }
        public string? YearId { get; set; }
        public string? BName { get; set; }
        public string? VehicleNo { get; set; }
        public string? LoggedInUser { get; set; }
     
    }
}
