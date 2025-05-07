using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace HRMasters.Models
{
    public class EmpPayGenList
    {
        public List<EmpPayGenModel> PayGenMstList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
