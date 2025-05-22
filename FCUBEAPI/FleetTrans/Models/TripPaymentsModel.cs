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
        public string? PaidToDesc { get; set; }        
        public string? VehicleMasterID { get; set; }       
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
        public string? WithLRYN { get; set; }
        public string? ConsignmentId { get; set; }
        public string? GcNoteNo { get; set; }
        public string? BookingDate { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? Kmr { get; set; }
        public string? Attachment1 { get; set; }
        public string? Attachment2 { get; set; }
        public string? BName { get; set; }
        public string? VehicleNo { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
     
    }
}
