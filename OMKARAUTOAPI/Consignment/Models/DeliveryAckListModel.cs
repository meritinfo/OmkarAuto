using Shared.Models;

namespace Consignment.Models
{
    public class DeliveryAckListModel
    {
        public List<DeliveryAckPodModel> AckList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
