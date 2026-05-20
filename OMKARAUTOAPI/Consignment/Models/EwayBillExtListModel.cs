using Shared.Models;

namespace Consignment.Models
{
    public class EwayBillExtListModel
    {
        public List<EwayBillExtModel> EwaybillextList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

