

namespace FreightMasters.Models
{
    public class DistanceTripEditModel
    {
        public string? DistanceDtlID { get; set; }
        public string? MasterID { get; set; }
        public string? ValidUpto { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? Kms { get; set; }
        public string? EnrouteExpTruck { get; set; }
        public string? EnrouteExpTrailer { get; set; }
        public string? EnrouteExpCarCarrier { get; set; }
        public string? EnrouteExpEmpty { get; set; }
        public string? EnrouteExpRemarks { get; set; }
        public string? DefinedTollExp { get; set; }
    }
}
