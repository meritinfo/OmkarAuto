using Shared.Models;

namespace Consignment.Models
{
    public class DprListModel
    {
        public List<DprModel> DprList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

