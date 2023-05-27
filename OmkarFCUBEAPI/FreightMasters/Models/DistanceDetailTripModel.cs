

namespace FreightMasters.Models
{
    public class DistanceDetailTripModel
    {
        public string? DistanceDtlID { get; set; }
        public string? MasterID { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? KMS { get; set; }
        public string? EnrouteExpTaurus { get; set; }
        public string? EnrouteExpTaurusRemarks { get; set; }
        public string? TollTaxTaurus { get; set; }
        public string? TollTaxTaurusRemarks { get; set; }
        public string? OthExpTaurus { get; set; }
        public string? OthExpTaurusRemarks { get; set; }
        public string? EnrouteExpTrailer { get; set; }
        public string? EnrouteExpTrailerRemarks { get; set; }
        public string? TollTaxTrailer { get; set; }
        public string? TollTaxTrailerRemarks { get; set; }
        public string? OthExpTrailer { get; set; }
        public string? OthExpTrailerRemarks { get; set; }
        public string? EnrouteExpEmpty { get; set; }
        public string? EnrouteExpEmptyRemarks { get; set; }
        public string? TollTaxEmpty { get; set; }
        public string? TollTaxEmptyRemarks { get; set; }
        public string? OthExpEmpty { get; set; }
        public string? OthExpEmptyRemarks { get; set; }
    }
}
