using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DistanceMasterTripRptModel
    {
        public string? OriginPlace { get; set; }
        public string? CentreName { get; set; }
        public string? Destination { get; set; }
        public string? KMS { get; set; }
        public string? EnrouteExpTruck { get; set; }
        public string? EnrouteExpTrailer { get; set; }
        public string? EnrouteExpCarCarrier { get; set; }
        public string? EnrouteExpEmpty { get; set; }
        public string? EnrouteExpRemarks { get; set; }




    }
}
