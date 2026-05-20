using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class SparesHistoryRptModel
    {
        public string? SpareLubName { get; set; }
        public string? BrandName { get; set; }
        public string? VehicleNo { get; set; }
        public string? TransDate { get; set; }
        public string? StockType { get; set; }
        public string? KmReading { get; set; }
        public string? ItemQty { get; set; }
        public string? NetAmount { get; set; }
        public string? Remarks { get; set; }
    }
}
