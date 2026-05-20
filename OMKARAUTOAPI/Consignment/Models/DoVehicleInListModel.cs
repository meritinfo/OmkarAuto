using Shared.Models;

namespace Consignment.Models
{
    public class DoVehicleInListModel
    {
        public List<DoVehicleInModel> DoVehicleInList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

