using FinanceMasters.Models;
using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FinanceMaster.Models
{
    public class CnorCneeGstList
    {
        public List<CnorCneeGstModel> GstList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
