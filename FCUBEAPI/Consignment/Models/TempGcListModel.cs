using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class TempGcListModel
    {
        public List<TempGcModel> TempGcList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

