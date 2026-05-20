using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DocRenewalRptModel
    {
        public string? RenewalDocName { get; set; }
        public string? TransDate { get; set; }
        public string? VehicleNo { get; set; }
        public string? ValidFromDt { get; set; }
        public string? ValidToDt { get; set; }

        public string? NetAmount { get; set; }
        public string? DocumentRefNo { get; set; }
       

    }
}
