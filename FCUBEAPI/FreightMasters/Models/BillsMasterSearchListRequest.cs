using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillsMasterSearchListRequest
    {
        public string BillingParty { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FromPlace { get; set; }
        public string ToPlace { get; set; }
        public string BillNo { get; set; }
        public string CnorPlantCode { get; set; }
    }
}
