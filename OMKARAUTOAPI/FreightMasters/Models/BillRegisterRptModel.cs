using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillRegisterRptModel
    {
        public string? BillStnName { get; set; }
        public string? CollStnName { get; set; }
        public string? BillNo { get; set; }
        public string? BillDate { get; set; }
        public string? DueDate { get; set; }
        public string? PartyName { get; set; }
        public string? PartyGstNo { get; set; }
        public string? TotalGtotal { get; set; }
        public string? MrNo { get; set; }
        public string? MrDate { get; set; }
       
    }
}
