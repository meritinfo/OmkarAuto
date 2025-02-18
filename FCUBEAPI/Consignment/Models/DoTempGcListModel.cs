using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class DoTempGcListModel
    {
        public List<DoTempGcModel> DoTempGcList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

