
using Shared.Models;

namespace FleetTrans.Models
{
    public class DieselStatementList
    {
        public List<DieselStatementModel> DieselList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
