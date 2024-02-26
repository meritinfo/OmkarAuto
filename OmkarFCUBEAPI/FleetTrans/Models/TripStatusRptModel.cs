using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripStatusRptModel
    {
        public string Branch { get; set; }
        public string TripId { get; set; }
        public string TripOpenDate { get; set; }
        public string VehicleNo { get; set; }
        public string TripNo { get; set; }
        public string ExpectedReportingDt { get; set; }
        public string ExUlDate { get; set; }
        public string DistanceTripKM_1 { get; set; }
        public string FromPoint { get; set; }
        public string ToPoint { get; set; }
        public string TripStatus { get; set; }
        public string TripCloseDt { get; set; }
        public string TripLinkYN { get; set; }
        public string LoadType { get; set; }
    }



}
