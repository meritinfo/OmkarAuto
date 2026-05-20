using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FreightMasters.Models
{
    public class DriverLicRptListModel
    {
        public List<DriverLicRptModel> DriverLicRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
