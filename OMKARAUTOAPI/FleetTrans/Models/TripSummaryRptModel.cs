using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripSummaryRptModel
    {
        public string TripBranch { get; set; }
        public string TripNo { get; set; }
        public string VehicleNo { get; set; }
        public string StmtDate { get; set; }
        public string DeptDate { get; set; }
        public string EndDate { get; set; }
        public string NoOfDays { get; set; }
        public string DistanceTripKM { get; set; }
        public string TripTotalFreight { get; set; }
        public string TripTotalExpenses { get; set; }
        public string TripMargin { get; set; }
        public string MarginPerKM { get; set; }
        public string TripStatus { get; set; }
         
    }
}
