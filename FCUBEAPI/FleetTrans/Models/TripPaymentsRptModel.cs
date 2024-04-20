using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripPaymentsRptModel
    {
        public string PaymentBr { get; set; }
        public string PmtDate { get; set; }
        public string VehicleNo { get; set; }
        public string TripNo { get; set; }
        public string OriginPlace { get; set; }
        public string Destination { get; set; }
        public string TransType { get; set; }
        public string QtyLtrs { get; set; }
        public string AmountPaid { get; set; }
        public string PmtType { get; set; }
        
        public string CreditAffect { get; set; }

    }
}
