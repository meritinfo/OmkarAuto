
namespace FleetTrans.Models
{
    public class TripSheetInnerGridListModel
    {
       // public string? Incentive { get; set; }
        public List<TripRouteDtlModel>? TripRouteDtlList { get; set; }
        public List<TripDrPaymentDetails>? TripDrPaymentDetailsList { get; set; }
        public List<TripDrExpDetails>? TripDrExpDetailsList { get; set; }
        public List<TripDslByDriver>? TripDslByDriverList { get; set; }
        public List<TripDslByPetroCard>? TripDslByPetroCardList { get; set; }
        public List<TripAdblueDetails>? TripAdblueDetailsList { get; set; }
        //   public List<TripDslByDriver>? MiscList { get; set; }
        //  public List<AdblueListmodel>? AdblueList { get; set; }
    }

    public class TripRouteDtlModel
    {
        public string? TripRouteDtlId { get; set; }
        public string? TripId { get; set; }
        public string? VehicleMasterId { get; set; }
        public string? TripNo { get; set; }
        public string? TripDate { get; set; }
        public string? OwnMarket { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? ChallanNo { get; set; }
        public string? ChallanId { get; set; }
        public string? TotalHire { get; set; }
        public string? AdvHire { get; set; }
        public string? Remarks { get; set; }
        public string? AmtRecd { get; set; }
        public string? AmtDed { get; set; }
        public string? AmtTDS { get; set; }
        public string? AmtExtra { get; set; }
        public string? YearId { get; set; }
    }
    public class TripDrPaymentDetails
    {
        public string? TripDtlId { get; set; }
        public string? TripId { get; set; }
        public string? TripPaymentId { get; set; }
        public string? PmtType { get; set; }
        public string? PmtDate { get; set; }
        public string? PmtRemarks { get; set; }
        public string? PmtAmt { get; set; }
    }
    public class TripDrExpDetails
    {
        public string? TripDtlId { get; set; }
        public string? TripId { get; set; }
        public string? TripPaymentId { get; set; }
        public string? PmtType { get; set; }
        public string? PmtDate { get; set; }
        public string? PmtRemarks { get; set; }
        public string? PmtAmt { get; set; }

    }
    public class TripDslByDriver
    {
        public string? TripDtlId { get; set; }
        public string? TripId { get; set; }
        public string? PmtType { get; set; }
        public string? PmtDate { get; set; }
        public string? PmtRemarks { get; set; }
        public string? DslLtrs { get; set; }
        public string? DslRate { get; set; }
        public string? DslAmt { get; set; }

    }
    public class TripDslByPetroCard
    {
        public string? TripDtlId { get; set; }
        public string? TripId { get; set; }
        public string? DfdDtlId { get; set; }
        public string? PmtDate { get; set; }
      
        public string? DslLtrs { get; set; }
        public string? DslRate { get; set; }
        public string? DslAmt { get; set; }

    }
    public class TripAdblueDetails
    {
        public string? TripDtlId { get; set; }
        public string? TripId { get; set; }
        public string? IssueBranch { get; set; }
        public string? IssueDate { get; set; }
        public string? IssueParticulars { get; set; }
        public string? AdblueLtrs { get; set; }
        public string? AdblueAmt { get; set; }
       

    }
}
