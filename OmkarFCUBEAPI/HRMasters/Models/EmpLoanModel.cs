using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class EmpLoanModel
    {
        public string? TransId { get; set; }
        public string? LoanId { get; set; }
        public string? LoanNumber { get; set; }
        public string? LoanDate { get; set; }
        public string? EmpId { get; set; }
        public string? LoanAmt { get; set; }
        public string? LoanType { get; set; }
        public string? LoanDedId { get; set; }
        public string? DedName { get; set; }
        public string? BalAmt { get; set; }
        public string? MonthYear { get; set; }
        public string? LoanAdjAmt { get; set; }
    }
}
