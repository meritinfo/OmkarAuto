using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class DriverSalaryEntryModel
    {
        public string? Transid { get; set; }
        public string? TransBranch { get; set; }
        public string? TransDate { get; set; }
        public string? DriverId { get; set; }
        public string? SalFromDate { get; set; }
        public string? SalToDate { get; set; }
        public string? NoOfDays { get; set; }
        public string? GrossSalary { get; set; }
        public string? LopDeduction { get; set; }
        public string? PfDeduction { get; set; }
        public string? EsiDeduction { get; set; }
        public string? OthDeduction { get; set; }
        public string? NetSalary { get; set; }
        public string? Remarks { get; set; }
        public string? PmtType { get; set; }
        public string? CreditAc { get; set; }
        public string? NeftYN { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDt { get; set; }
        public string? Branch { get; set; }
        public string? LoggedInUser { get; set; }
    }
}
