using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Models
{
    public class FinAccountsMasterList
    {
        public List<FinAccountsMasterModel> FinaccountList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
