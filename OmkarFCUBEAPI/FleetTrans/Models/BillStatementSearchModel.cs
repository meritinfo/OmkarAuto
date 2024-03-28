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
        public string Kms { get; set; }
        public string Rate { get; set; }
        public string GtotalRs { get; set; }
        public bool Selected { get; set; }
    }
}
