using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.ExtendedProperties;
using DocumentFormat.OpenXml.Math;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DailyLoadingRptModel
    {
        public string? TripBranchName { get; set; }
        public string? NewTripDate { get; set; }
        public string? VehicleNo { get; set; }
        public string? TripNo { get; set; }
        public string? LoadEmptyType { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? OpenThrough { get; set; }
        public string? PartyName { get; set; }
        public string? LoadContents { get; set; }
        public string? LoadingFor { get; set; }
        public string? LRNo { get; set; }
    }

}
