using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class HrMasterModel
    {
        public string? HRId { get; set; }
        public string? HRCode { get; set; }
        public string? Description { get; set; }
        public string? HrType { get; set; }
        public string? HrTypeDesc { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
