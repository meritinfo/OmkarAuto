using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class ConsignmentList
    {
        public List<ConsignmentModel> cnList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}

