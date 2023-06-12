
namespace FleetMasters.Models
{
    /// <summary>
    /// Vehicle Type master class model for Vehicle Type Master 
    /// </summary>
    public class VehicleTypeMasterModel
    {
        public string? VehicleTypeID { get; set; }
        public string? VehicleTypeDesc { get; set; }
        public string? VehicleTypeGroupId { get; set; }
        public string? IsActive { get; set; }
        public string? LoggedInUser { get; set; }
    }
}

