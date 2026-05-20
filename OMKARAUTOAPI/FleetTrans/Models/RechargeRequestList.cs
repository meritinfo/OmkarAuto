using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class RechargeRequestList
    {
        public List<RechargeRequestModel> RechargeRequestLst { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
