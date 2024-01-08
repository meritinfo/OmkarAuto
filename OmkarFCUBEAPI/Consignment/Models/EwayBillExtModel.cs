namespace Consignment.Models
{
    /// <summary>
    /// Response class model for response
    /// </summary>
    public class EwayBillExtModel
    {       
        public string? BookedAt { get; set; }
        public string? BookingDate { get; set; }
        public string? GcNoteNo { get; set; }
        public string? FromLocation { get; set; }
        public string? Destination { get; set; }
        public string? EwayBillNo { get; set; }
        public string? EwayBillDate { get; set; }
        public string? EwayBillExpDate { get; set; }
        public string? PartyName { get; set; }
        public string? Consignor { get; set; }
        public string? Consignee { get; set; }
        public string? VehicleNo { get; set; }
        public string? FromPin { get; set; }
        public string? AccountCity { get; set; }
        public string? CnorState { get; set; }
        public string? AccountAddress1 { get; set; }
        public string? AccountAddress2 { get; set; }
        public string? AccountAddress3 { get; set; }
    }
}
