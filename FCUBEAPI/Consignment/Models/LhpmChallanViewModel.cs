using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class LhpmChallanViewModel
    {
        //
        public string? TruckNo { get; set; }
        public string? TotalHire { get; set; }
        public string? TotalAdvance { get; set; }
        public string? TotalBalance { get; set; }
        public string? AdvPaid { get; set; }
        public string? BalPaid { get; set; }
        public string? AdvDed { get; set; }
        public string? BalDed { get; set; }
    }
}
