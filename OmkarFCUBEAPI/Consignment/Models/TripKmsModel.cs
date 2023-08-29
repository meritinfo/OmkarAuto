using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class TripKmsModel
    {
        public string? KMS { get; set; }
        public string? EnrouteExpTruck { get; set; }
        public string? EnrouteExpTrailer { get; set; }
        public string? EnrouteExpCarCarrier { get; set; }
        public string? EnrouteExpEmpty { get; set; }
        public string? DefinedTollExp { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }


    }
}
