using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class EmpPayCalcModel
    {
        public string? TransId { get; set; }
        public string? PayType { get; set; }
        public string? MonthYear { get; set; }
        public string? EmpId { get; set; }
        public string? EmpCode { get; set; }
        public string? EmpName { get; set; }
        public string? DaysOfMonth { get; set; }
        public string? HolSun { get; set; }
        public string? TotLeaves { get; set; }
        public string? AdjLeaves { get; set; }
        public string? AbsentDays { get; set; }
        public string? PayDays { get; set; }
        public string? AffectYear { get; set; }
        public string? TotalEarnings { get; set; }
        public string? TotalDeductions { get; set; }
        public string? NetPay { get; set; }
        public string? Remarks { get; set; }
        public string? BranchCode { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUser { get; set; }
        public List<EmpSalaryDtlModel> empSalaryDtlList { get; set; }
        public List<EmpLeaveModel> empLeavesList { get; set; }
        public List<EmpLoanModel> empLoanDtlList { get; set; }

    }
}
