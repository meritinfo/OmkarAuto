using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Models
{
    public class BranchCustomerTargetMstModel
    {
        public string? Id { get; set; }
        public string? YearId { get; set; }
        public string? BranchCode { get; set; }
        public string? LoggedInUser { get; set; }
        public string? yeardesc { get; set; }
        public string? branch { get; set; }
        public List<BranchCustomerTargetDtl> BranchCustomerTargetDtlList { get; set; }

    }
    public class BranchCustomerTargetDtl
    {
        public string? DtlId { get; set; }
        public string? Id { get; set; }
        public string? YearId { get; set; }
        public string? BranchCode { get; set; }
        public string? AccountId { get; set; }
        public string? TargetAmt { get; set; }


    }
}
