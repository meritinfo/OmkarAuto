
using Shared.Models;

namespace FleetTrans.Models
{
    public class FastTagListModel
    {
        public List<FastTagModel> FastTagList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
