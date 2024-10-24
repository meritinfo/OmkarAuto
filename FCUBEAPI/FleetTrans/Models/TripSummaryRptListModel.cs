using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripSummaryRptListModel
    {
        public List<TripSummaryRptModel> TripSummaryRptlist { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
