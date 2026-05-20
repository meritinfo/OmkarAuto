using Shared.Models;

namespace Consignment.Models
{
    public class ConsignmentList
    {
        public List<ConsignmentModel> cnList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

