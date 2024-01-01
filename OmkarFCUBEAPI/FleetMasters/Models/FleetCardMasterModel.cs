using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Models
{
    public class FleetCardMasterModel
    {
        public string? CardId { get; set; }
        public string? CardType { get; set; }
        public string? CardCode { get; set; }
        public string? CardNo { get; set; }
        public string? CardPin { get; set; }
        public string? CardLedgerAc { get; set; }
        public string? VehicleNo { get; set; }
        public string? DriverName { get; set; }
        public string? DriverLicNo { get; set; }
        public string? MobileNo { get; set; }
        public string? IsActive { get; set; }
        public string? LoggedInUser { get; set; }

    }
}
