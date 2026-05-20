using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace HRMasters.Models
{
    public class EmpSalaryMstList
    {
        public List<EmpSalaryMstModel> EmpSalaryList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
