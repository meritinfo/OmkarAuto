using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class LHPMVarianceRptListModel
    {
        public List<LHPMVarianceRptModel> LHPMVarianceRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
