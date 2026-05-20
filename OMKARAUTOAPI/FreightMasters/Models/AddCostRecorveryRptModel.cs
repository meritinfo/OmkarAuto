using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class AddCostRecorveryRptModel
    {
        public string? Branch { get; set; }
        public string? TransNo { get; set; }
        public string? TransDate { get; set; }
        public string? AddCostDescription { get; set; }
        public string? AddCostType { get; set; }
        public string? Amount { get; set; }
        public string? OthTot { get; set; }
        public string? NetTot { get; set; }
        
    }
}
