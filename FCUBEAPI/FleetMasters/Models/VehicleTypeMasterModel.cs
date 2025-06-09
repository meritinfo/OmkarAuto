
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
        public string? TonCap { get; set; }
        public string? RunPerDayKM { get; set; }

        public string? LoggedInUser { get; set; }
        public List<VehicleTypeDetailModel> vehicletypeDetailList { get; set; }
    }
    public class VehicleTypeDetailModel
    {
        public string? VehTypeId { get; set; }
        public string? VehTypeAlias { get; set; }
    }
}

