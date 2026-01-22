using Shared.Models;

namespace Consignment.Models
{
    public class LorryHireReqListModel
    {
        public List<LorryHireReqModel> LorryHireReqList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

