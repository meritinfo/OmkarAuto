using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class ChallanListModel
    {
        public List<ChallanMasterModel> ChallanList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
