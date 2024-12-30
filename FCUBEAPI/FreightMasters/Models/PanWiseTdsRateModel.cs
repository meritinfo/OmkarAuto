using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class PanWiseTdsRateModel
    {
        public string? Rateid { get; set; }
        public string? PanNo { get; set; }
        public string? OwnerName { get; set; }
        public string? ValidFrom { get; set; }
        public string? ValidUpto { get; set; }
        public string? TdsRate { get; set; }
        public string? IsActive { get; set; }
        public string? TdsCertUpload { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
