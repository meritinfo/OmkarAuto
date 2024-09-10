using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class SparesPurchaseRptListModel
    {
        public List<SparesPurchaseRptModel> SparesPurchaseRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
