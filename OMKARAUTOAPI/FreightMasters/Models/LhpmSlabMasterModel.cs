using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class LhpmSlabMasterModel
    {
        public string? LhpmSlabID { get; set; }
        public string? VehCode { get; set; }
        public string? FromDt { get; set; }
        public string? ToDt { get; set; }
        public string? HireFrom { get; set; }
        public string? HireTo { get; set; }
        public string? LhpmAmt { get; set; }
        public string? Vcode { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
