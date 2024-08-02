using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class VehicleInstPmtModel
    {
        public string PmtId { get; set; }
        public string PmtDate { get; set; }

        public string BranchCode { get; set; }
        public string VehicleMasterid { get; set; }
        public string InstNo { get; set; }
        public string InstId { get; set; }
        public string AdvPayable_1 { get; set; }
        public string PriAmt { get; set; }
        public string IntAmt { get; set; }
        public string TotAmt { get; set; }
        public string Remarks { get; set; }
        public string PmtType { get; set; }
        public string NeftYN { get; set; }
        public string CheqNo { get; set; }
        public string CheqDate { get; set; }
        public string CreditAc { get; set; }
        public string Findocid { get; set; }
        public string Yearid { get; set; }
        public string Branch { get; set; }
        public string VehicleNo { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
