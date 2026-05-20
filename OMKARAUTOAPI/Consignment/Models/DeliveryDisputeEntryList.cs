using Shared.Models;

namespace Consignment.Models
{
    public class DeliveryDisputeEntryList
    {
        public List<DeliveryDisputeEntryModel> DisputeList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
