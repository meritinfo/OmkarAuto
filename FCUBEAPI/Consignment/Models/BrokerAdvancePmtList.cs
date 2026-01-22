using Shared.Models;

namespace Consignment.Models
{
    public class BrokerAdvancePmtList
    {
        public List<BrokerAdvancePmtModel> AdvanceList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}
