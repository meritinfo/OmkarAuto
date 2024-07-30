using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Models
{
   public class TyreSalesMasterModel
    {
        public string? MasterID { get; set; }
        public string? TransDate { get; set; }
        public string? SaleIncharge { get; set; }
        public string? PmtType { get; set; }
        public string? NonCustomer { get; set; }
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerAdd { get; set; }
        public string? CustomerGstNo { get; set; }
        public string? GstType { get; set; }
        public string? TyreAmount { get; set; }
        public string? SgstPct { get; set; }
        public string? SgstAmt { get; set; }
        public string? CgstPct { get; set; }
        public string? CgstAmt { get; set; }
        public string? IgstPct { get; set; }
        public string? IgstAmt { get; set; }
        public string? TotalAmount { get; set; }
        public string? RoundOff { get; set; }
        public string? NetAmount { get; set; }
        public string? Remarks { get; set; }
        public string? ApprovedYN { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
        public string? LoggedInUser { get; set; }
        public List<TyreSalesDtlListmodel>? TyreSalesDtlList { get; set; }
    }
    public class TyreSalesDtlListmodel
    {
        public string? MasterID { get; set; }
        public string? TransDate { get; set; }
        public string? BrandId { get; set; }
        public string? TyreId { get; set; }
        public string? TyreAmt { get; set; }
        public string? Remarks { get; set; }
        public string? BranchCode { get; set; }
        public string? YearID { get; set; }
    }
}
