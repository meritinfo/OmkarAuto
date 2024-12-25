using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class SparesStockRptModel
    {
        public string? SpareLubName { get; set; }
        public string? BrandName { get; set; }
        public string? OpeningQty { get; set; }
        public string? PurchQty { get; set; }
        public string? IssueQty { get; set; }
    }
}
