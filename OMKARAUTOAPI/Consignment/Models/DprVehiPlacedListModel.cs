using Shared.Models;


namespace Consignment.Models
{
    public class DprVehiPlacedListModel
    {
        public List<DprVehiPlacedModel> DprVehiList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

