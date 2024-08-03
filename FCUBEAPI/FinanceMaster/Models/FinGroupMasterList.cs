using FinanceMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMasters.Models
{
    public class FinGroupMasterList
    {
        public List<FinGroupMasterModel> FinGroupList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
