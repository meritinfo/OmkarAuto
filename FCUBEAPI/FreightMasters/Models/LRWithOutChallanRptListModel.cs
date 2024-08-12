using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreightMasters.Models;

namespace FreightMasters.Models
{
    public class LRWithOutChallanRptListModel
    {
        public List<LRWithOutChallanRptModel> LRWithOutChallanRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
