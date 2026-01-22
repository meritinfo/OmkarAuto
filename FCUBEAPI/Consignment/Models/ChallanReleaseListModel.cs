using Shared.Models;

namespace Consignment.Models
{
    public class ChallanReleaseListModel
    {
        public List<ChallanReleaseModel> ReleaseList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
