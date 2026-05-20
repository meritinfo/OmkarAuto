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
        public string? VendorName { get; set; }
        public string? VehicleNo { get; set; }
        public string? HsdAdvTyps { get; set; }
        public string? DslQty { get; set; }
        public string? DslRate { get; set; }
        public string? Amount { get; set; }
    }
}
