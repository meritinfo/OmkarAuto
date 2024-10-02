using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class GSTRegisterRptListModel
    {
        public List<GSTRegisterRptModel> GSTRegisterRptList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
