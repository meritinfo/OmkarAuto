using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class BillStatementList
    {
        public List<BillStatementModel> BillList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
