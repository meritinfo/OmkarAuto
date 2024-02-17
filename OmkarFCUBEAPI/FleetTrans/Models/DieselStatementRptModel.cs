using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DieselStatementRptModel
    {
        public string? Branch { get; set; }
        public string? PmtDate { get; set; }
        public string? VehicleNo { get; set; }
        public string? TripNo { get; set; }
        public string? QtyLtrs { get; set; }

        public string? RatePerLtr { get; set; }
        public string? AmountPaid { get; set; }
        public string? PmtType { get; set; }
    }
}
