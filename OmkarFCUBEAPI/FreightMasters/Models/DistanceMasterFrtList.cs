using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DistanceMasterFrtList
    {
        public List<DistanceMasterFrtModel> DistanceFrtList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
