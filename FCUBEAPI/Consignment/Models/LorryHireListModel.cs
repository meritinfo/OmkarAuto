
using Shared.Models;

namespace Consignment.Models
{
    public class LorryHireListModel
    {
        public List<LorryHireMasterModel> LorryHireList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

