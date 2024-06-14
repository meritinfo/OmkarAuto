using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BillsTypeModel
    {
        public string? BillTypeId { get; set; }

        public string? BillTypeDesc { get; set; }
        public string? MainAc { get; set; }
        public string? OtherAc { get; set; }
        public string? OtherAc2 { get; set; }
        public string? OtherAc3 { get; set; }
        public string? SACCode { get; set; }
        public string? LoggedInUser { get; set; }

    }
}
