using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FreightMasters.Models
{
    public class BillRegisterRptListModel
    {
        public List<BillRegisterRptModel> BillRegisterRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
