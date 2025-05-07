using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FinanceMasters.Models
{
    public class OpeningBalanceMasterList
    {
        public List<OpeningBalanceMasterModel> OpenbalList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
