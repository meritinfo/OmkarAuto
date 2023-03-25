

namespace FleetMasters.Models
{
    /// <summary>
    /// Vehicle Type Group class model for Vehicle Type Group Master 
    /// </summary>
    public class VehicleTypeGroupMasterModel
    {
        public string? VehicleTypeGroupId { get; set; }
        public string? VehicleTypeGroupName { get; set; }
        public string? IsActive { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
