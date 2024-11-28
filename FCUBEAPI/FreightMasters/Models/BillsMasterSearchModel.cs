using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillsMasterSearchModel
    {
        public string? ConsignmentID { get; set; }
        public string? BookingPlace { get; set; }
        public string? BookingDate { get; set; }
        public string? GcNoteNo { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? RateRs { get; set; }
        public string? FreightRs { get; set; }
        public string? StatisticalRs { get; set; }
        public string? FovRs { get; set; }
        public string? DoorCollRs{ get; set; }
        public string? HandlingRs { get; set; }
        public string? LoadingDetnRs { get; set; }
        public string? EnrouteRs { get; set; }
        public string? MiscRs { get; set; }
        public string? DoorDelRs { get; set; }
        public string? UnLoadingRs { get; set; }
        public string? UnLoadingDetnRs { get; set; }
        public string? ExtrasRS { get; set; }
        public string? OthersRs { get; set; }
        public string? SubTotalRs { get; set; }
        public string? GstType { get; set; }
        public string? CgstAmt { get; set; }
        public string? SgstAmt { get; set; }
        public string? IgstAmt { get; set; }
        public string? NonGstAmt1 { get; set; }
        public string? NonGstAmt2 { get; set; }
        public string? GtotalRs { get; set; }
        public string? Remarks1 { get; set; }
        public string? Remarks2 { get; set; }
        public string? Remarks3 { get; set; }
        public string? SuppBillDetRemarks { get; set; }
        public string? OtherAmt { get; set; }
        public bool Selected { get; set; }


    }
}
