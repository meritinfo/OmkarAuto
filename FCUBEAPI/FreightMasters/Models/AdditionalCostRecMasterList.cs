using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class AdditionalCostRecMasterList
    {
        public List<AdditionalCostRecMasterModel> AdditionalList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
