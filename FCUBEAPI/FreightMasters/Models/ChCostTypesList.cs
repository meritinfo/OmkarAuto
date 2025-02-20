using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class ChCostTypesList
    {
        public List<ChCostTypesModel> CostList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
