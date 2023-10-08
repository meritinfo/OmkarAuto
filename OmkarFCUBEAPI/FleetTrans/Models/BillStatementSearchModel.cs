namespace FleetTrans.Models
{
    public class BillStatementSearchModel
    {
        public string ConsignmentID { get; set; }
        public string BookedAt { get; set; }
        public string GcNoteNo { get; set; }
        public string BookingDate { get; set; }
        public string VehicleNo { get; set; }
        public string ProductName { get; set; }
        public string NoPackages { get; set; }
        public string FreightRs { get; set; }
        public string StatisticalRs { get; set; }
        public string HandlingRs { get; set; }
        public string LoadingDetnRs { get; set; }
        public string EnrouteRs { get; set; }
        public string MiscRs { get; set; }
        public string ExtrasRs { get; set; }
        public string UnloadingRs { get; set; }
        public string DetentionRs { get; set; }
        public string OthersRs { get; set; }
        public string GtotalRs { get; set; }
        public bool Selected { get; set; }
    }
}
