using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FleetTrans.Models
{
    public class VehicleInstScheduleListModel
    {
        public List<VehicleInstScheduleModel> VehicleInstSchedulelist { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
