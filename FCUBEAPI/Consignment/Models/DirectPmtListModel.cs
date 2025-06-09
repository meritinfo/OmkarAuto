using Shared.Models;

namespace Consignment.Models
{
    public class DirectPmtListModel
    {
        public List<DirectPmtModel> PmtList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
