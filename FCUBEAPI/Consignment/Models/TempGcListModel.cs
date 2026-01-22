using Shared.Models;

namespace Consignment.Models
{
    public class TempGcListModel
    {
        public List<TempGcModel> TempGcList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

