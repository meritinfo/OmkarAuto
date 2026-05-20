using Shared.Models;

namespace Consignment.Models
{
    public class DoVehiPlacedListModel
    {
        public List<DoVehiPlacedModel> DoVehiPlacedList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

