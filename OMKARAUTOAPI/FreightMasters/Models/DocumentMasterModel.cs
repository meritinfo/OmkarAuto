using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DocumentMasterModel
    {
        public string? DocType { get; set; }
        public string? DocDesc { get; set; }
        public string? AutoGenYN { get; set; }
        public string? GenType { get; set; }
        public string? AllotYN { get; set; }
        public string? SeriesYN { get; set; }
        public string? IncSeriesYN { get; set; }
        public string? PrefixLength { get; set; }
        public string? DprYN { get; set; }
        public string? AutoIncrYN { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
