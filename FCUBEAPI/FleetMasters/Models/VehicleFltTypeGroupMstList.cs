using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class VehicleFltTypeGroupMstList
    {
        public List<VehicleFltTypeGroupMstModel>FltList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}
