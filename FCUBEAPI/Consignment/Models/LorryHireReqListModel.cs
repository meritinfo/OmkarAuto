using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace Consignment.Models
{
    public class LorryHireReqListModel
    {
        public List<LorryHireReqModel> LorryHireReqList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

