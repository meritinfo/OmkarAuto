using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Models
{
    public class SparesStockRptListModel
    {
        public List<SparesStockRptModel> SparesStockRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
