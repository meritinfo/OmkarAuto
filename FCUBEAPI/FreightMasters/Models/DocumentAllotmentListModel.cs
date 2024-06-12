

namespace FreightMasters.Models
{
    public class DocumentAllotmentListModel
    {
        public List<DocumentAllotmentModel> DocumentAllotmentLists{ get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
