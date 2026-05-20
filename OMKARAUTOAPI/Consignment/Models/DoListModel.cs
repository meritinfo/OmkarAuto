using Shared.Models;

namespace Consignment.Models
{
    public class DoListModel
    {
        public List<DoModel> DoList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

