using Shared.Models;

namespace Consignment.Models
{
    public class UnBillProvisionMstList
    {
        public List<UnBillProvisionMstModel> ProvisionList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
