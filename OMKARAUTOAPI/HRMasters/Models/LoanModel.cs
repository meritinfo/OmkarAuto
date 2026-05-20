using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class LoanModel
    {
        public string? LoanRepayId { get; set; }
        public string? LoanId { get; set; }
        public string? LoanNumber { get; set; }
        public string? LoanDate { get; set; }
        public string? EmpId { get; set; }
        public string? EmpCode { get; set; }
        public string? EmpName { get; set; }
        public string? BranchCode { get; set; }
        public string? LoanAmt { get; set; }
        public string? LoanType { get; set; }
        public string? LoanTp { get; set; }
        public string? AmountCleared { get; set; }
        public string? RepaymentMonths { get; set; }
        public string? LoanPayAmt { get; set; }
        public string? YearId { get; set; }
        public string? Remarks { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUser { get; set; }
    }
}
