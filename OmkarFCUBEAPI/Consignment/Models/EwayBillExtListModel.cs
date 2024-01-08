using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class EwayBillExtListModel
    {
        public List<EwayBillExtModel> EwaybillextList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

