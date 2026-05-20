using Shared.Models;

namespace Consignment.Models
{
    public class ChallanListModel
    {
        public List<ChallanMasterModel> ChallanList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
