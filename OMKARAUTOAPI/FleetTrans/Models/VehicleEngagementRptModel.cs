using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VehicleEngagementRptModel
    {
        public string? VehicleNo { get; set; }
        public string? LrNo { get; set; }
        public string? LrDate { get; set; }
        public string? LrFrom { get; set; }
        public string? LrTo { get; set; }
        public string? PartyName { get; set; }
        public string? BrokerName { get; set; }
        public string? ChallanNumber { get; set; }
        public string? ExpectedReportingDate { get; set; }
        public string? ActualReportingDate { get; set; }
        public string? LrFreight { get; set; }
        public string? ChallanHire { get; set; }
        public string? DeliveryAckStatus { get; set; }
        public string? BillStatus { get; set; }

    }
}
