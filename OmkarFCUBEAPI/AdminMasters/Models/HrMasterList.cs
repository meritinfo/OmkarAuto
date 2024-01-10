using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Models
{
    public class HrMasterList
    {
        public List<HrMasterModel> HrList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
