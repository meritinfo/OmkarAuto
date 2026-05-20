using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMasters.Models
{
    public class BenBankResult
    {
        public string? status { get; set; }
        public string? message { get; set; }
        public string? EssentialsAccount { get; set; }
        public string? EssentialsIFSC { get; set; }
        public string? IFSC { get; set; }
        public string? Name { get; set; }
        public string? Mobile { get; set; }
        public string? Response { get; set; }
    }
}
