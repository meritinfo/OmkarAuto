using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class PartyMisLocationModel
    {
        public string? PartyId { get; set; }
        public string? Party { get; set; }
        public List<PartyMisLocationDtlModel> PartyMisLocationDetailList { get; set; }
 

    }
    public class PartyMisLocationDtlModel
    {
        public string? PartyId { get; set; }
        public string? LocationId { get; set; }

    }
}
