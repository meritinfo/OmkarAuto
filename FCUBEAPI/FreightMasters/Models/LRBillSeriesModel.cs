using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class LRBillSeriesModel
    {
        public string? SeriesId { get; set; }
        public string? SeriesCode { get; set; }
        public string? LR_Bill_type { get; set; }
        public string? BranchCode { get; set; }
        public string? IsActive { get; set; }
        public string? branch { get; set; }
        public string? type { get; set; }

        public string? LoggedInUser { get; set; }
    }
}
