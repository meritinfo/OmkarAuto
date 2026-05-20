using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class EmpPayGenModel
    {
        public string? SlNo { get; set; }
        public string? PsId { get; set; }
        public string? MonthYear { get; set; }
        public string? BranchCode { get; set; }
        public string? PayType { get; set; }
        public string? EmpId { get; set; }
        public string? EmpCode { get; set; }
        public string? EmpName { get; set; }
        public string? DaysOfMonth { get; set; }
        public string? WorkedDays { get; set; }
        public string? HolSun { get; set; }
        public string? EL_Days { get; set; }
        public string? CL_Days { get; set; }
        public string? SL_Days { get; set; }
        public string? LossOfPayDays { get; set; }
        public string? PayDays { get; set; }     
        public string? BasicRate { get; set; }
        public string? HraRate { get; set; }
        public string? FdaRate { get; set; }
        public string? OthRate1 { get; set; }
        public string? OthRate2 { get; set; }
        public string? BasicEarn { get; set; }
        public string? HraEarn { get; set; }
        public string? FdaEarn { get; set; }
        public string? Oth1Earn { get; set; }
        public string? Oth2Earn { get; set; }
        public string? TotalEarn { get; set; }
        public string? PfDed { get; set; }
        public string? EsiDed { get; set; }
        public string? TdsDed { get; set; }
        public string? PtDed { get; set; }
        public string? SalAdvDed { get; set; }
        public string? LoanDed { get; set; }
        public string? TotalDed { get; set; }
        public string? NetPay { get; set; }
        public string? BalSalAdvAmt { get; set; }
        public string? BalLoanAmt { get; set; }
        public string? BalEL { get; set; }
        public string? BalCL { get; set; }
        public string? BalSL { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }
        public string? LoggedInUser { get; set; }

    }
}
