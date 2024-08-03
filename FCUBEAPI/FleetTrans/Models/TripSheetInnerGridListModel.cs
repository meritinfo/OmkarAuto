
namespace FleetTrans.Models
{
    public class TripSheetInnerGridListModel
    {
        public string? Incentive { get; set; }
        public List<LRDetailsModel>? LRDetailsList { get; set; }
        public List<DieselDetailsModel>? DieselDetailsList { get; set; }
        public List<DriverAdvanceModel>? DriverAdvanceList { get; set; }
     //   public List<MiscListModel>? MiscList { get; set; }
      //  public List<AdblueListmodel>? AdblueList { get; set; }
    }

    public class LRDetailsModel
    {
        public string? ConsignmentID { get; set; }
        public string? GcNoteNo { get; set; }
        public string? CnDest { get; set; }
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
        public string? VendorName { get; set; }
        public string? Adj { get; set; }
    }
    public class DriverAdvanceModel
    {
        public string? PmtId { get; set; }
        public string? PmtDate { get; set; }
        public string? AmountPaid { get; set; }
        public string? Ptype { get; set; }
        public string? Adj2 { get; set; }
    }
}
