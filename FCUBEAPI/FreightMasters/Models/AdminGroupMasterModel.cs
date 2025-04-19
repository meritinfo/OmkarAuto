using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class AdminGroupMasterModel
    {
        public string? AdminGrpId { get; set; }
        public string? AdminGrpDesc { get; set; }
        public string? SortId { get; set; }
        public string? ActiveYN { get; set; }
        public string? LoggedInUser { get; set; }

    }
}
