
using Shared.Models;

namespace FleetMasters.Models
{
    public class VehicleFltMasterList
    {
        public List<VehicleFltMasterModel> vehicleFltMasterList { get; set; }
        
        public PaginationMetaData PageMetaData { get; set; }
    }
}
