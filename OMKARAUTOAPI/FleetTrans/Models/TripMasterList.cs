
using Shared.Models;

namespace FleetTrans.Models
{
    public class TripMasterList
    {
        public List<TripMasterModel> tripSheetList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
