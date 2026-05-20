using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DieselStmtRptModel
    {
        public string? Branch { get; set; }
        public string? Vehicleno { get; set; }
        public string? TransDate { get; set; }
        public string? TransRefNo { get; set; }
        public string? DslQty { get; set; }
        public string? DslRate { get; set; }
        public string? Amount { get; set; }
        public string? TripAdj { get; set; }
        public string? TripNo { get; set; }
        public string? FillingStnName { get; set; }
    }
}
