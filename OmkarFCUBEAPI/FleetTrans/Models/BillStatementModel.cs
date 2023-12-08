

namespace FleetTrans.Models
{
    public class BillStatementModel
    {
        public string? MasterID { get; set; }
        public string? BillStation { get; set; }
        public string? SeriesCode { get; set; }
        public string? Bill_StmtNo { get; set; }
        public string? BillDate { get; set; }
     //   public string? BillStatus { get; set; }
        public string? PartyCode { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? FromPoint { get; set; }
        public string? ToPoint { get; set; }
        //   public string? PlantCode { get; set; }
        //  public string? SuppYN { get; set; }

        //       public string? GcNoteNo { get; set; }
        public string? TotFreight { get; set; }
        public string? TotExtraChrg { get; set; }
        public string? TotSubTotal { get; set; }
        public string? GstType { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotalBillAmt { get; set; }
      //  public string? Ftmid { get; set; }
     //   public string? LinkedYN { get; set; }
      //  public string? YearID { get; set; }
    //    public string? Remarks { get; set; }
     //   public string? TotRecdAmt { get; set; }
     //   public string? TotDedAmt { get; set; }
     //   public string? TotTdsAmt { get; set; }
    //    public string? Einv_Gst_Irn { get; set; }
  //      public string? Einv_Gst_AckNo { get; set; }
    //    public string? Einv_Gst_AckDt { get; set; }
        public string? LoggedInUser { get; set; }
        public string? YearId { get; set; }
        public List<BillStatementSearchModel> BillStatementListData { get; set; }


    }
}
