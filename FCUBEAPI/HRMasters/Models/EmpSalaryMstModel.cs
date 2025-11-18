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
    public class EmpSalaryDtlModel
    {
        public string? MasterId { get; set; }
        public string? EmpId { get; set; }
        public string? FromDate { get; set; }
        public string? EdType { get; set; }
        public string? EdCode { get; set; }
        public string? EdAmt { get; set; }
        public string? EdName { get; set; }
        public string? ActAmt { get; set; }
    }
}
