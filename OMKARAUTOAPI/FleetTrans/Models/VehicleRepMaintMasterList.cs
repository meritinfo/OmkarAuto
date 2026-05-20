using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Models
{
    public class VehicleRepMaintMasterList
    {
        public List<VehicleRepMaintMasterModel> MaintList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
