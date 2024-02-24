using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class EmpSalaryMstModel
    {
        public string? MasterId { get; set; }
        public string? EmpId { get; set; }
        public string? EmpCode { get; set; }
        public string? EmpName { get; set; }
        public string? FromDate { get; set; }
        public string? GrossSalary { get; set; }
        public string? LoggedInUser { get; set; }
        public List<EmpSalaryDtlModel> empSalaryDtlList { get; set; }
    }
}
