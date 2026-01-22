using Shared.Models;

namespace Consignment.Models
{
    public class LorryHireListLLPModel
    {
        public List<LorryHireMasterLLPModel> LorryHireList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
