using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class AddCostRecDtlModel
    {
        public string? MasterID { get; set; }
        public string? AddCostID { get; set; }
        public string? DocumentType { get; set; }
        public string? DocYear { get; set; }
        public string? DocBranch { get; set; }
        public string? DocNo { get; set; }
        public string? DocId { get; set; }
        public string? FreightRs { get; set; }
        public string? Chargewt { get; set; }  
        public string? CostCode { get; set; }
        public string? CostAmt { get; set; }
        public string? OthAmt { get; set; }
        public string? TotAmt { get; set; }
        public string? Narration { get; set; }
        
    }
}
