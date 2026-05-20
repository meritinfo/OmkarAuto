using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VehicleAdvBalReceiptMstLLPList
    {
        public List<VehicleAdvBalReceiptMstLLPModel> AdvanceList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
