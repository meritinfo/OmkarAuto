using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class ExpTruckArrRptModel
    {
        public string? ExpectedDate { get; set; }
        public string? TripId { get; set; }
        public string? LoadingDate { get; set; }
        public string? VehicleNo { get; set; }
        public string? LoadingBranch { get; set; }
        public string? LoadingFrom { get; set; }
        public string? Destination { get; set; }
        public string? MatLoadType { get; set; }
        public string? PartyName { get; set; }
        public string? DriverName { get; set; }
        public string? DriverPhone { get; set; }
    }
}
