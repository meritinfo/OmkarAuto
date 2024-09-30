using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class LHPMVarianceRptModel
    {
        public string? ChStnName { get; set; }
        public string? ChallanNo { get; set; }
        public string? ChallanDate { get; set; }
        public string? VehGroupCode { get; set; }
        public string? VehicleDesc { get; set; }
        public string? TptName { get; set; }
        public string? TotalHire { get; set; }
        public string? EstimateAdvLhpm { get; set; }
        public string? EstimateBalLhpm { get; set; }
        
    }
}
