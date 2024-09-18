using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class LhPayableStatusRptModel
    {
        public string? ChStnName { get; set; }
        public string? ChallanNo { get; set; }
        public string? ChallanDateTime { get; set; }
        public string? ChFromPlace { get; set; }
        public string? ChToPlace { get; set; }
        public string? BalPayAt { get; set; }
        public string? BrokerName { get; set; }
        public string? BrokerMblNo { get; set; }
        public string? TruckNo { get; set; }
        public string? HireAmt { get; set; }
        public string? HirePaid { get; set; }
        public string? TotDed { get; set; }
        public string? ExtHamali { get; set; }
        public string? ExtDeten { get; set; }
        public string? ExtOth { get; set; }
    }
}
