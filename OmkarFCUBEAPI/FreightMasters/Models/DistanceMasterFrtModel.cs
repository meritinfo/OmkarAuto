

namespace FreightMasters.Models
{
    public class DistanceMasterFrtModel
    {
        public string? MasterID { get; set; }
        public string? ValidFrom { get; set; }
        public string? ValidUpto { get; set; }
        public string? FromLocation { get; set; }

        public string? LoggedInUser { get; set; }
    }
}
