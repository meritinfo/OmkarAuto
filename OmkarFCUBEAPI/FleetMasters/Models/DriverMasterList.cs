using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class DriverMasterList
    {
        public List<DriverMasterModel> DriverList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
