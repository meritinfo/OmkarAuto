using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TripEnrouteExpByCompanyModel
    {
        public string? EnrouteExpId { get; set; }
        public string? VehicleID { get; set; }
        public string? ExpBranch { get; set; }
        public string? ExpDate { get; set; }
        public string? ExpId { get; set; }
        public string? Remarks { get; set; }
        public string? ExpAmount { get; set; }
        public string? PmtType { get; set; }
        public string? CreditAc { get; set; }
        public string? NeftYN { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDate { get; set; }
        public string? TripAdjYN { get; set; }
        public string? FtmId { get; set; }
        public string? YearId { get; set; }
        public string? bname { get; set; }
      
        public string? LoggedInUser { get; set; }
    }
}
