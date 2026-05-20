using Shared.Models;

namespace Consignment.Models
{
    public class ChallanListModelLLP
    {
        public List<ChallanMasterModelLLP> ChallanList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
