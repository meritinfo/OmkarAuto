
namespace FleetTrans.Models
{
    public class TripSheetInnerGridListModel
    {
        public List<LRDetailsModel>? LRDetailsList { get; set; }
        public List<DieselDetailsModel>? DieselDetailsList { get; set; }
        public List<DriverAdvanceModel>? DriverAdvanceList { get; set; }
    }

    public class LRDetailsModel
    {
        public string? ConsignmentID { get; set; }
        public string? GcNoteNo { get; set; }
        public string? CneeCode { get; set; }
        public string? CnorInvNo { get; set; }
        public string? EwayBillNo { get; set; }
        public string? EwayBillDate { get; set; }
        public string? EwayBillExpDate { get; set; }
    }
    public class DieselDetailsModel
    {
        public string? PmtId { get; set; }
        public string? PmtDate { get; set; }
        public string? QtyLtrs { get; set; }
        public string? RatePerLtr { get; set; }
        public string? AmountPaid { get; set; }
    }
    public class DriverAdvanceModel
    {
        public string? PmtId { get; set; }
        public string? PmtDate { get; set; }
        public string? AmountPaid { get; set; }
    }
}
