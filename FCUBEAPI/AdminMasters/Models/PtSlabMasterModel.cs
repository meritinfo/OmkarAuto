using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Models
{
    public class PtSlabMasterModel
    {
        public string? PtId { get; set; }
        public string? StateCode { get; set; }
        public string? RangeFrom { get; set; }
        public string? RangeTo{ get; set; }
        public string? PtDedAmt { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
