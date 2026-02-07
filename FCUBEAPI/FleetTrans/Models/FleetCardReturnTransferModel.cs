using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class FleetCardReturnTransferModel
    {
        public string? ReturnId { get; set; }
        public string? ReturnBranch { get; set; }
        public string? ReturnDate { get; set; }
        public string? FleetCard { get; set; }
        public string? CardNo { get; set; }
        public string? ReturnAmt { get; set; }
        public string? VehicleMasterId { get; set; }
        public string? VehicleNo { get; set; }
        public string? TransactionId { get; set; }
        public string? Remarks { get; set; }
        public string? LoggedInUser { get; set; }

    }
}
