using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class DocumentMasterList
    {
        public List<DocumentMasterModel> DocList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
