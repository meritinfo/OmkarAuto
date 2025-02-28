using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class FreightGstMasterModel
    {
        public string? FreightId { get; set; }
        public string? FreightDesc { get; set; }
        public string? SacCode { get; set; }
        public string? SgstPct { get; set; }
        public string? CgstPct { get; set; }
        public string? IgstPct { get; set; }
        public string? LinkColumn { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
