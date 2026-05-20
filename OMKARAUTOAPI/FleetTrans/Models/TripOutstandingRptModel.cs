using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripOutstandingRptModel
    {
        public string VehicleNo { get; set; }
        public string TripNo { get; set; }
        public string TripDate { get; set; }
        public string OwnMarket { get; set; }
        public string ChBrCode { get; set; }
        public string ChallanNo { get; set; }
        public string TripFromPlace { get; set; }
        public string TripToPlace { get; set; }
        public string TptName { get; set; }
        public string TotalHire { get; set; }
        public string RecdAmt { get; set; }
        public string DedAmt { get; set; }
        public string TdsAmt { get; set; }
        public string ExtraAmt { get; set; }
    }
}
