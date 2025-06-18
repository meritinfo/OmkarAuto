using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Models
{
    public class UnBillProvisionMstModel
    {
        public string? Id { get; set; }
        public string? YearId { get; set; }
        public string? yeardesc{ get; set; }
        public string? ProvisionDate { get; set; }


        public string? LoggedInUser { get; set; }
        public List<UnBillProvisionDtlModel> UnBillProvisionDtlList { get; set; }
    }
    public class UnBillProvisionDtlModel
    {
        public string? DtlId { get; set; }
        public string? Id { get; set; }

        public string? BranchCode { get; set; }
        public string? PartyCode { get; set; }
        public string? Amount { get; set; }
        public string? FinDocid { get; set; }
        public string? BranchName { get; set; }
        public string? PartyName { get; set; }

    }
}
