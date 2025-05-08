using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
    public class TyreRegroupIssueMasterModel
    {
        public string? RegroupIssMasterID { get; set; }
        public string? RegroupIssDate { get; set; }
        public string? IssueIncharge { get; set; }
        public string? VendorId { get; set; }
        public string? VendorName { get; set; }
        public string? Remarks { get; set; }
        public string? ApprovedYN { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public string? ModifiedDate { get; set; }

        public string? LoggedInUser { get; set; }
        public List<TyreRegroupIssueDtlListmodel>? TyreRegroupIssueDtlList { get; set; }

    }
    public class TyreRegroupIssueDtlListmodel
    {
        public string? RegroupIssMasterID { get; set; }
        public string? RegroupIssDate { get; set; }
        public string? BrandId { get; set; }
        public string? TyreId { get; set; }
        public string? Remarks { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
    }
}
