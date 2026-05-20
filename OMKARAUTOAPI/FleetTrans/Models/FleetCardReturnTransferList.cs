using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class FleetCardReturnTransferList
    {

        public List<FleetCardReturnTransferModel> FleetCardReturnTransferLst { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
