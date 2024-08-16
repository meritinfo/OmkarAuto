using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreightMasters.Models;

namespace FreightMasters.Models
{
    public class UnBilledRptListModel
    {
        public List<UnBilledRptModel> UnBilledRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
