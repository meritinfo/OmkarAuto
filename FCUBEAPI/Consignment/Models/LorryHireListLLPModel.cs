using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class LorryHireListLLPModel
    {
        public List<LorryHireMasterLLPModel> LorryHireList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }

    }
}
