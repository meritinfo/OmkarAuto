

namespace Consignment.Models
{
    public class ConsignmentTripModel
    {
        public string? TripBranch { get; set; }
        public string? YearId { get; set; }
        public string? VehicleMasterID { get; set; }
        public string? OpenThrough { get; set; }
        public string? TripStatus { get; set; }
        public string? ConsignorPayParty { get; set; }
        public string? CompNonCompStatus { get; set; }
        public string? LoadingFrom { get; set; }
        public string? Destination { get; set; }
        public string? Contents { get; set; }
        public string? LoadEmptyType { get; set; }
    }
}
