
namespace FreightMasters.Models
{
    public class DistanceDetailFrtModel
    {
        public string? DistanceDtlID { get; set; }
        public string? MasterID { get; set; }

        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public string? ToLocationName { get; set; }
        public string? FromLocationName { get; set; }
        public string? KMS { get; set; }
        public string? Index { get; set; }
    }
}
