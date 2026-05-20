using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class RatesMasterNewModel
    {
        public string? RateId { get; set; }
        public string? PartyId { get; set; }
        public string? ValidFrom { get; set; }
        public string? ValidUpto { get; set; }
        public string? VehTypeId { get; set; }
        public string? RateTypeId { get; set; }
        public string? FromLocationType { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocationType { get; set; }
        public string? ProductType { get; set; }
        public string? party { get; set; }
        public string? location { get; set; }
        public string? LoggedInUser { get; set; }
        public List<RatesDetailNewModel> RatesMasterNewDetailList { get; set; }
    }
    public class RatesDetailNewModel
    {
        public string?RateDtlId { get; set; }
        public string? RateId { get; set; }

        public string? Destination { get; set; }
        public string? ProductId { get; set; }
        public string? RateRs { get; set; }

    }
}
