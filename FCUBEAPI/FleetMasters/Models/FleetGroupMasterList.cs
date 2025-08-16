using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class FleetGroupMasterList
    {
        public List<FleetGroupMasterModel> FleetGroupMasterLst { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
