
using Shared.Models;

namespace FreightMasters.Models
{
    public class ProductGroupMasterList
    {
        public List<ProductGroupMasterModel> ProductGroupList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
