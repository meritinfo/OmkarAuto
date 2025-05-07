using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Models
{
    public class TripStatusRptListModel
    {
        public List<TripStatusRptModel> TripStatusRptlist { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
