using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillsListModelLLP
    {
        public List<BillsMasterModelLLP> BillsList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
