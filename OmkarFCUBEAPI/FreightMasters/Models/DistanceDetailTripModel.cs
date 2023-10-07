

namespace FreightMasters.Models
{
    public class DistanceDetailTripModel
    {
        public string? DistanceDtlID { get; set; }
        public string? MasterID { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? KMS { get; set; }
        public string? EnrouteExpTruck { get; set; }

    
 

        public string? EnrouteExpTrailer { get; set; }
        public string? EnrouteExpCarCarrier{ get; set; }
        public string? EnrouteExpEmpty { get; set; }
        public string? EnrouteExpRemarks { get; set; }
        public string? DefineTollExp { get; set; }
        public string? Index { get; set; }

    }
}
