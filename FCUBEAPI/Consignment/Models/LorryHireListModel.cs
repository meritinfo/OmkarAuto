using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class LorryHireListModel
    {
        public List<LorryHireMasterModel> LorryHireList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

