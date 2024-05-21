using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class ClassificationMasterModel
    {
        public string?ClasstId { get; set; }
        public string?ClassDesc { get; set; }
        public string?IsActive { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
