using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class GSTRegisterRptModel
    {
        public string? Branch { get; set; }
        public string? BillInvNo { get; set; }
        public string? BillInvDate { get; set; }
        public string? PartyVendorName { get; set; }
        public string? PartyVendorGstNo { get; set; }
        public string? Amt { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstAmt { get; set; }
        public string? GrandTotal { get; set; }
    }
}
